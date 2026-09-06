# LBR Cleaning App

A full-stack cleaning business application with a Node/Express backend, MongoDB support, and a React/Vite frontend. This guide is written for developers and technical operators who need to run the app, manage the admin area, and hand the project off safely.

## 1. Project overview

This app includes:

- Customer-facing website pages for home, about, services, blog, contact, and booking
- Customer signup/login flow
- Booking and payment flows
- Admin content management system (CMS)
- Admin dashboard and message handling
- MongoDB support with easy switching to PostgreSQL via `DATABASE_PROVIDER`

### Main folders

- `ibrback/` — Express API server and database logic
- `ibrfront/` — React frontend app
- `python/` — helper scripts
- `PROJECT.md` — project architecture notes

---

## 2. Requirements

Before starting, make sure you have:

- Node.js 18+ and npm
- MongoDB Atlas connection string or a local MongoDB instance
- Git
- A browser for the frontend

### Recommended setup

For Windows PowerShell:

```powershell
node -v
npm -v
```

If either command fails, install Node.js LTS first.

---

## 3. Quick start guide

### Step 1: Open the backend folder

```powershell
cd C:\Users\DEV\lbr-cleaning\ibrback
```

### Step 2: Install backend dependencies

```powershell
npm install
```

### Step 3: Create your backend environment file

Copy the example file:

```powershell
Copy-Item .env.example .env
```

Then edit `ibrback/.env` and fill in the real values.

Use the template values below as a guide:

```env
PORT=5100
DATABASE_PROVIDER=mongodb
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ibr_cleaning?retryWrites=true&w=majority
MONGODB_POOL_SIZE=10
ADMIN_JWT_SECRET=replace_with_a_long_random_string
VITE_API_URL=http://localhost:5100
CORS_ORIGIN=http://localhost:5173
```

If you are using MongoDB Atlas, your `MONGODB_URI` must point to an actual cluster.

### Step 4: Create the first admin account

This project does not expose public admin sign-up. The first admin is created by seeding the database.

Edit `ibrback/.env` and add:

```env
ADMIN_SEED_EMAIL=admin@yourdomain.com
ADMIN_SEED_PASSWORD=ChangeMe123!
```

Then run:

```powershell
node scripts/seedAdmin.js
```

Expected result:

- The script creates the admin user in the configured database
- It prints a success message with the admin email

Important: After the admin is created, remove these two lines from the `.env` file:

```env
ADMIN_SEED_EMAIL=
ADMIN_SEED_PASSWORD=
```

The app should not rely on these values at runtime.

### Step 5: Start the backend server

```powershell
npm run dev
```

Or for a normal production-style start:

```powershell
npm start
```

The backend listens on:

- `http://localhost:5100`

Health check:

```powershell
curl.exe http://localhost:5100/welcome
```

Expected response:

```json
{"message":"Welcome to LBR Cleaning API","databaseProvider":"mongodb"}
```

---

## 4. Frontend startup

Open a second terminal:

```powershell
cd C:\Users\DEV\lbr-cleaning\ibrfront
```

Install dependencies:

```powershell
npm install
```

Start the app:

```powershell
npm run dev -- --host 0.0.0.0
```

The frontend runs on:

- `http://localhost:5173`

If you want to use a custom backend URL, create a `.env` file in `ibrfront/` with:

```env
VITE_API_URL=http://localhost:5100
```

---

## 5. Admin login instructions

Once the front-end is running, open:

- `http://localhost:5173/admin/login`

Use the admin account created in the seed step:

- Email: the value you used in `ADMIN_SEED_EMAIL`
- Password: the value you used in `ADMIN_SEED_PASSWORD`

After login, the admin can access:

- `/admin/cms` — content library dashboard
- `/admin/edit/home` — visual CMS editor
- `/admin/message` — customer messages
- `/admin/create-admin` — create another admin account

### Create another admin

Only an already authenticated admin can create another admin.

1. Log into the admin area
2. Go to `Create Admin`
3. Enter the new admin name, email, and password
4. Save

There is no public admin signup route by design.

---

## 6. Customer app flow

The regular app is usually used by visitors and customers:

- Home page: `/`
- Services: `/service`
- Book a cleaning: `/apply`
- Contact: `/contact`
- Login: `/login`
- Signup: `/signup`

### Example booking flow

1. Go to `/apply`
2. Fill out the booking form
3. Choose a service and payment option
4. If the payment option is pay-before, the platform redirects to the payment flow
5. After successful payment or booking submission, the order is saved

---

## 7. Database notes

The project supports two providers:

- `DATABASE_PROVIDER=mongodb`
- `DATABASE_PROVIDER=postgres`

The default used by this project is MongoDB.

If you switch to Postgres, update:

```env
DATABASE_PROVIDER=postgres
DATABASE_URL=postgresql://postgres:password@localhost:5432/ibr_cleaning?schema=public
```

Then run Prisma generation as needed:

```powershell
cd C:\Users\DEV\lbr-cleaning\ibrback
npx prisma generate
```

---

## 8. Troubleshooting

### Backend won’t start

Check these first:

- `ibrback/.env` exists
- `MONGODB_URI` is valid
- `ADMIN_JWT_SECRET` is set
- MongoDB access is allowed

### MongoDB connection error

Common causes:

- Wrong cluster URI
- MongoDB network restrictions
- Missing credentials
- IP not allowed in MongoDB Atlas

### Admin login does not work

Check:

- The admin actually exists in the database
- The password is exact
- The account is active
- `ADMIN_JWT_SECRET` is present
- You are hitting the correct login URL: `/api/admin/login`

### Frontend cannot reach backend

Check:

- The backend is running on `:5100`
- `VITE_API_URL` is correct
- `CORS_ORIGIN` matches the frontend host

### Port already in use

If `5173` or `5100` is occupied, change the port in the relevant env or config files.

---

## 9. Owner handover checklist

This is the recommended handover process before giving the laptop or repo to another developer or client owner.

### Secret cleanup checklist

- [ ] Remove all live credentials from `.env` files before sharing the machine
- [ ] Keep only placeholders or example values in `*.example` files
- [ ] Rotate all real API keys, MongoDB credentials, and payment secrets
- [ ] Do not commit `.env` files to Git
- [ ] Use a secret manager or deployment environment variables in production
- [ ] Keep `ADMIN_JWT_SECRET` strong and unique

### Developer handover checklist

- [ ] Confirm MongoDB URI works in the target environment
- [ ] Confirm admin email/password can be recreated if needed
- [ ] Confirm backend runs with `npm run dev` or `npm start`
- [ ] Confirm frontend runs with `npm run dev -- --host 0.0.0.0`
- [ ] Confirm admin login works at `/admin/login`
- [ ] Confirm a customer can browse and submit a booking
- [ ] Confirm payment credentials are set correctly for the live provider
- [ ] Confirm there is a working backup of the database and environment values

---

## 10. Recommended production safety steps

Before releasing to production or handing the system to a client:

1. Create a fresh admin account for the real owner
2. Remove temporary seed credentials
3. Replace test payment keys with live keys
4. Set strong `ADMIN_JWT_SECRET`
5. Keep all secrets in environment variables, not in source files
6. Turn on monitoring and backups for MongoDB
7. Keep a copy of the admin email and recovery instructions in a secure location

---

## 11. Useful commands summary

### Backend

```powershell
cd C:\Users\DEV\lbr-cleaning\ibrback
npm install
Copy-Item .env.example .env
node scripts/seedAdmin.js
npm run dev
```

### Frontend

```powershell
cd C:\Users\DEV\lbr-cleaning\ibrfront
npm install
npm run dev -- --host 0.0.0.0
```

### Admin login URL

```text
http://localhost:5173/admin/login
```

---

## 12. Final note

This project is designed so a new developer or admin can usually run it without asking for manual setup details. If the environment is fresh, the most important steps are:

1. Fill in the `.env` values
2. Create the first admin account
3. Start backend
4. Start frontend
5. Log in at `/admin/login`

If the app is being handed over to a client or owner, always rotate any real credentials before sharing the machine or repo.
