const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { repositories } = require("../repositories");

const { userRepository } = repositories;

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const TOKEN_EXPIRY = "8h";

const getJwtSecret = () => {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error("ADMIN_JWT_SECRET is not set in the environment");
  }
  return secret;
};

/**
 * Create a new user (used by the seed script, and later by any
 * admin-only "create user" endpoint).
 */
const createUser = async ({ name, email, phone, password, role = "user", address, city, propertyType, referralSource, avatar }) => {
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    throw new Error("A user with that email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  return userRepository.create({ name, email, phone, passwordHash, role, address, city, propertyType, referralSource, avatar });
};

const updateUser = async (userId, data) => {
  const cleaned = Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined)
  );
  return userRepository.update(userId, cleaned);
};

/**
 * Verify credentials, enforce lockout, and issue a JWT on success.
 * Throws a plain Error with a `.status` for the controller to map to
 * an HTTP response — keeps this function DB- and framework-agnostic.
 */
const login = async ({ email, password, requiredRole = null }) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  if (user.lockUntil && new Date(user.lockUntil) > new Date()) {
    const minutesLeft = Math.ceil((new Date(user.lockUntil) - new Date()) / 60000);
    const err = new Error(`Account locked. Try again in ${minutesLeft} minute(s).`);
    err.status = 403;
    err.locked = true;
    throw err;
  }

  if (requiredRole && user.role !== requiredRole) {
    const err = new Error("You do not have access to this area");
    err.status = 403;
    throw err;
  }

  if (!user.isActive) {
    const err = new Error("This account has been disabled");
    err.status = 403;
    throw err;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    const failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
    const update = { failedLoginAttempts };

    if (failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
      update.lockUntil = new Date(Date.now() + LOCK_DURATION_MS);
    }

    await userRepository.update(user.id, update);

    const err = new Error(
      failedLoginAttempts >= MAX_FAILED_ATTEMPTS
        ? `Too many failed attempts. Account locked for ${LOCK_DURATION_MS / 60000} minutes.`
        : `Invalid email or password. ${MAX_FAILED_ATTEMPTS - failedLoginAttempts} attempt(s) left.`
    );
    err.status = 401;
    if (failedLoginAttempts >= MAX_FAILED_ATTEMPTS) err.locked = true;
    throw err;
  }

  await userRepository.update(user.id, {
    failedLoginAttempts: 0,
    lockUntil: null,
    lastLoginAt: new Date(),
  });

  const token = jwt.sign(
    { sub: String(user.id), email: user.email, role: user.role },
    getJwtSecret(),
    { expiresIn: TOKEN_EXPIRY }
  );

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, avatar: user.avatar },
  };
};

const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};

module.exports = { createUser, login, verifyToken };
