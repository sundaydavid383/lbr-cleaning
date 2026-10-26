# How to Get an Admin Account

This guide explains how to create an admin account for the LBR Cleaning web app. Admin accounts have full access to the CMS, ImageKit uploads, and site editing features.

## Important Notes

- **Do not use the regular signup page** (/signup) to create an admin. It only creates customer accounts with ole: "user".
- **Always use /admin/login** to sign in as an admin, not the regular /login page.
- The admin password is hashed and stored in the database. Never commit admin credentials to Git.

---

## Method 1: Using the Seed Script (Recommended)

This is the easiest and safest way to create your first admin account.

### For Local Development

1. **Open the backend environment file**
   `ash
   cd ibrback
   `

2. **Add seed credentials to .env**
   Open ibrback/.env and add the following lines:
   `env
   ADMIN_SEED_EMAIL=youradmin@example.com
   ADMIN_SEED_PASSWORD=YourStrongPassword123!
   `

3. **Run the seed script**
   `ash
   node scripts/seedAdmin.js
   `

   You should see:
   `
   ✅ Admin account created: youradmin@example.com
   You can now remove ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD from .env.
   `

4. **Remove the seed credentials**
   Delete ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD from ibrback/.env immediately after success.

5. **Sign in**
   - Go to: http://127.0.0.1:5173/admin/login
   - Enter your email and password
   - You'll be redirected to /admin/cms

### For Production (Render)

You can run the seed script against your production database from your local machine.

1. **Get your production MongoDB URI**
   Copy your MONGODB_URI from your Render dashboard (Environment tab).

2. **Update local .env temporarily**
   In ibrback/.env, replace MONGODB_URI with your production URI and add:
   `env
   ADMIN_SEED_EMAIL=youradmin@example.com
   ADMIN_SEED_PASSWORD=YourStrongPassword123!
   `

3. **Run the script**
   `ash
   cd ibrback
   node scripts/seedAdmin.js
   `

4. **Clean up**
   Remove the seed lines and restore your local MONGODB_URI (or just delete them). Your admin is now created in the production database.

**Alternative: Use Render Shell**
1. Go to your Render service → Shell tab
2. Add ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD as temporary environment variables
3. Run: 
ode scripts/seedAdmin.js
4. Remove those temporary environment variables

---

## Method 2: Using the Admin Recovery Endpoint

Use this if the seed script doesn't work or if you need to recover/create an admin quickly.

### Requirements
- Your backend must be running (local or production)
- You need the ADMIN_RECOVERY_KEY from your .env (local) or Render Environment variables

### Steps

1. **Get your recovery key**
   Look for ADMIN_RECOVERY_KEY in ibrback/.env or Render dashboard.

2. **Send a POST request**
   Use curl, Postman, or Thunder Client.

   **Local:**
   `ash
   curl -X POST http://localhost:5100/api/admin/recover \
     -H "Content-Type: application/json" \
     -d '{"recoveryKey":"your_recovery_key_here","name":"Admin","email":"youradmin@example.com","password":"YourStrongPassword123!"}'
   `

   **Production:**
   `ash
   curl -X POST https://your-backend.onrender.com/api/admin/recover \
     -H "Content-Type: application/json" \
     -d '{"recoveryKey":"your_recovery_key_here","name":"Admin","email":"youradmin@example.com","password":"YourStrongPassword123!"}'
   `

3. **Sign in**
   Go to /admin/login with the email and password you just created.

---

## Signing In as Admin

1. Navigate to: **/admin/login** (e.g., http://127.0.0.1:5173/admin/login or https://your-app.vercel.app/admin/login)
2. Enter your admin email and password
3. Click **Sign In**
4. You'll be redirected to /admin/cms where you can manage content, upload images, and edit the website

---

## Troubleshooting

| Issue | Solution |
|---|---|
| "A user with that email already exists" | That email is already registered. Use a different email, or delete the user from MongoDB. |
| "Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in .env" | Make sure you added both lines to ibrback/.env and saved the file. |
| "Invalid recovery key" | Check your ADMIN_RECOVERY_KEY in .env or Render environment variables. |
| Can't access edit mode | Make sure you're logged in at /admin/login and your account has ole: "admin". |
| Login page doesn't redirect to CMS | Try clearing localStorage or using a different browser. |

---

## Security Tips

- Use a strong, unique password for your admin account
- Remove ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD immediately after seeding
- Never share your ADMIN_RECOVERY_KEY publicly
- In production, rotate your ADMIN_JWT_SECRET if compromised
