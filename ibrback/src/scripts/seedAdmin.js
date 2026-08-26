// filepath: ibrback/src/scripts/seedAdmin.js
// Usage:
//   node src/scripts/seedAdmin.js                           // create default admin
//   node src/scripts/seedAdmin.js --email=foo@bar.com --password=Secret123 --name="Foo Bar"
//   node src/scripts/seedAdmin.js --reset                     // reset admin@example.com to default

require("dotenv").config();
const bcrypt = require("bcryptjs");
const { init, disconnect, repositories } = require("../repositories");
const { userRepository } = repositories;

const DEFAULT_ADMIN = {
  name: "Admin User",
  email: "admin@example.com",
  password: "change_this_before_seeding",
};

async function ensureAdmin({ name, email, password }) {
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    const hash = await bcrypt.hash(password, 12);
    await userRepository.update(existing._id, {
      passwordHash: hash,
      name,
      role: "admin",
      isActive: true,
      failedLoginAttempts: 0,
      lockUntil: null,
    });
    console.log(`✅ Admin updated: ${email}`);
  } else {
    const hash = await bcrypt.hash(password, 12);
    await userRepository.create({
      name,
      email,
      passwordHash: hash,
      role: "admin",
      isActive: true,
      phone: "+234 801 234 5678",
    });
    console.log(`✅ Admin created: ${email}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const flags = {
    email: args.find((a) => a.startsWith("--email="))?.split("=")[1],
    password: args.find((a) => a.startsWith("--password="))?.split("=")[1],
    name: args.find((a) => a.startsWith("--name="))?.split("=")[1],
    reset: args.includes("--reset"),
  };

  await init();

  if (flags.reset) {
    await ensureAdmin(DEFAULT_ADMIN);
    console.log("🔑 Login with:", DEFAULT_ADMIN.email, "/", DEFAULT_ADMIN.password);
    process.exit(0);
  }

  const email = flags.email || DEFAULT_ADMIN.email;
  const password = flags.password || DEFAULT_ADMIN.password;
  const name = flags.name || DEFAULT_ADMIN.name;

  await ensureAdmin({ name, email, password });
  console.log("🔑 Login with:", email, "/", password);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ seedAdmin error:", err.message);
  process.exit(1);
}).finally(() => disconnect());
