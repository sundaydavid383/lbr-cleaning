/**
 * Run once to create your first admin account:
 *   node scripts/seedAdmin.js
 *
 * Reads ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD from .env, hashes the
 * password, and writes the admin into whichever database is active
 * (DATABASE_PROVIDER). After it runs successfully, delete those two
 * lines from .env — the password now lives (hashed) in the database,
 * not in a config file.
 */
require("dotenv").config();
const { init, disconnect } = require("../src/repositories");
const authService = require("../src/services/authService");

const run = async () => {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    console.error("Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in .env before running this script.");
    process.exit(1);
  }

  await init();

  try {
    const admin = await authService.createUser({
      name: "Admin",
      email,
      password,
      role: "admin",
    });
    console.log(`✅ Admin account created: ${admin.email}`);
    console.log("You can now remove ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD from .env.");
  } catch (error) {
    console.error("❌ Failed to seed admin:", error.message);
  } finally {
    await disconnect();
    process.exit(0);
  }
};

run();
