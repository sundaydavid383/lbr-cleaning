# LBR Cleaning App — Production and Local Testing Plan

## 1. Project Summary

This is a full-stack cleaning business web application built with:

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (default), with PostgreSQL support available via `DATABASE_PROVIDER`
- Admin area: protected login and content management dashboard
- Payments: Paystack / Flutterwave integration
- Email: SMTP support

This document is designed to help a developer or client understand:

- how to test locally
- how to deploy to production
- what the monthly production cost will be
- how to avoid common Render/Vercel deployment problems

---

## 2. Recommended Production Architecture

### Option A — Recommended and simple

- Frontend: Vercel
- Backend API: Render
- Database: MongoDB Atlas or Render-managed MongoDB/Postgres
- Domain: custom domain for frontend and API
- Email provider: Gmail SMTP, Brevo, or Resend
- Payment provider: Paystack or Flutterwave

### Why this structure works

- Vercel is best for the React frontend
- Render is best for the Node API
- MongoDB Atlas is reliable and easy to manage for a business app
- This setup is fast to deploy and easy to maintain

---

## 3. Local Testing Setup

This app should be tested locally before production deployment.

### 3.1 Backend local setup

```powershell
cd C:\Users\DEV\lbr-cleaning\ibrback
npm install
Copy-Item .env.example .env
node scripts/seedAdmin.js
npm run dev
```

Expected backend URL:

```text
http://localhost:5100
```

Health check:

```powershell
curl.exe http://localhost:5100/welcome
```

Expected response:

```json
{"message":"Welcome to LBR Cleaning API","databaseProvider":"mongodb"}
```

### 3.2 Frontend local setup

```powershell
cd C:\Users\DEV\lbr-cleaning\ibrfront
npm install
npm run dev -- --host 0.0.0.0
```

Expected frontend URL:

```text
http://localhost:5173
```

### 3.3 Local environment configuration

Use these values for local development:

```env
# backend/.env
PORT=5100
DATABASE_PROVIDER=mongodb
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/ibr_cleaning?retryWrites=true&w=majority
MONGODB_POOL_SIZE=10
ADMIN_JWT_SECRET=replace_with_a_long_random_string
VITE_API_URL=http://localhost:5100
CORS_ORIGIN=http://localhost:5173
PAYMENT_CALLBACK_URL=http://localhost:5100/api/payment/verify
```

```env
# frontend/.env
VITE_API_URL=http://localhost:5100
```

---

## 4. Production Setup

### 4.1 Frontend (Vercel)

1. Push the repository to GitHub
2. Import the project into Vercel
3. Set the root folder to `ibrfront`
4. Add environment variable:

```env
VITE_API_URL=https://your-api-domain.com
```

5. Deploy the frontend

### 4.2 Backend (Render)

1. Create a new Web Service in Render
2. Connect the GitHub repo
3. Set the root folder to `ibrback`
4. Set build command:

```bash
npm install
```

5. Set start command:

```bash
npm start
```

6. Add environment variables:

```env
PORT=5100
DATABASE_PROVIDER=mongodb
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/ibr_cleaning?retryWrites=true&w=majority
MONGODB_POOL_SIZE=10
ADMIN_JWT_SECRET=<strong-long-secret>
CORS_ORIGIN=https://your-frontend-domain.com
VITE_API_URL=https://your-api-domain.com
PAYMENT_CALLBACK_URL=https://your-api-domain.com/api/payment/verify
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
PAYSTACK_SECRET_KEY=your_secret_key
PAYSTACK_PUBLIC_KEY=your_public_key
```

### 4.3 Domain recommendations

Use separate domains or subdomains:

- Frontend: `app.yourbusiness.com`
- API: `api.yourbusiness.com`

This is cleaner than using one host for both.

---

## 5. Common Render and Vercel Problems and Fixes

### Problem 1: Frontend cannot reach the API

Cause:

- `VITE_API_URL` is not set correctly
- Frontend was built with the wrong backend URL
- CORS is blocking requests

Fix:

- Set `VITE_API_URL` to the deployed API base URL only
- Do not include a trailing slash unless the app is explicitly designed for it
- Set backend `CORS_ORIGIN` to the Vercel frontend domain exactly

Example:

```env
VITE_API_URL=https://lbr-api.onrender.com
CORS_ORIGIN=https://lbr-cleaning.vercel.app
```

### Problem 2: Backend is running but API requests fail

Check:

- `MONGODB_URI` is valid
- `ADMIN_JWT_SECRET` is set
- `PORT` is correct
- The backend is serving on the expected host

### Problem 3: Payment callback is not returning correctly

Set the correct callback URL:

```env
PAYMENT_CALLBACK_URL=https://your-api-domain.com/api/payment/verify
```

If this does not match the payment provider configuration, the payment flow breaks.

### Problem 4: Vercel SPA route fallback fails

The project already includes `vercel.json` for SPA rewrites, which is good. However, the API and frontend should be split cleanly and the app should not rely on the front end trying to proxy to the backend incorrectly.

---

## 6. Production Cost Estimate

The following costs are realistic for a small business website with admin CMS, booking flow, payments, and email.

### 6.1 Recommended monthly cost estimate

| Item | Estimated Cost | Notes |
|---|---:|---|
| Vercel frontend | $0 – $20 | Free tier is usually enough for small traffic |
| Render backend | $0 – $10 | Free or low-cost depending on usage |
| MongoDB Atlas | $0 – $15 | Free tier for testing; small paid tier for production |
| Domain | $10 – $20/year | Usually yearly not monthly |
| Email service | $0 – $20 | Brevo/Resend or SMTP usage |
| Payment fees | Transaction-based | Paystack/Flutterwave charge per transaction |
| Monitoring / uptime | $0 – $15 | optional |
| Total | $0 – $60/month | realistic starting range |

### 6.2 Production starter budget

For a client-ready MVP, a reasonable starting budget is:

```text
$20 to $50 per month
```

This covers:

- frontend hosting
- backend hosting
- database
- basic monitoring
- email service

### 6.3 If the client wants a very lean launch

```text
$0 to $15 per month
```

Possible with:

- Vercel free tier
- Render free tier or low-cost plan
- MongoDB free tier
- Brevo free or SMTP
- No custom domain yet

### 6.4 If the client wants a more stable production setup

```text
$40 to $80 per month
```

This is better for:

- custom domain
- production DB tier
- monitoring
- stronger uptime and reliability
- faster support workflows

---

## 7. Cost Proposal for Client Send-Off

### Simple proposal wording

> We recommend a lightweight production deployment for the LBR Cleaning web app using Vercel for the frontend and Render for the backend. This setup keeps the app fast, stable, and easy to maintain while keeping operating costs low for a new business website. The expected monthly running cost is approximately $20–$50 depending on the chosen database tier, email provider, and domain setup. Payment processing fees are separate and charged per transaction by the chosen gateway.

### Full client-ready version

> The LBR Cleaning platform will be deployed using a modern cloud stack designed for speed, simplicity, and low operating cost. The frontend will be hosted on Vercel, the API will run on Render, and the application database will be hosted on MongoDB Atlas or a managed Postgres service. This setup provides secure hosting, automatic deployments, and a predictable monthly cost. Estimated monthly cost for a production-ready MVP is between $20 and $50, excluding transaction fees from payment processing. This includes hosting, database access, basic monitoring, email delivery, and SSL/domain support.

---

## 8. Local Testing vs Production Checklist

### Local testing checklist

- [ ] Backend starts on `http://localhost:5100`
- [ ] Frontend starts on `http://localhost:5173`
- [ ] `VITE_API_URL` is set correctly
- [ ] `CORS_ORIGIN` matches the frontend URL
- [ ] Admin account created successfully
- [ ] Customer signup/login works
- [ ] Booking form submits successfully
- [ ] Payment flow works in test mode
- [ ] Email sends in test mode

### Production checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] `VITE_API_URL` updated to production API URL
- [ ] `CORS_ORIGIN` updated to production frontend domain
- [ ] `PAYMENT_CALLBACK_URL` updated to production backend URL
- [ ] MongoDB credentials are production-safe
- [ ] Admin JWT secret is secure and different from local values
- [ ] Payment keys are live production keys, not test keys
- [ ] SSL and custom domain configured
- [ ] Uptime and error monitoring enabled

---

## 9. Recommended Launch Strategy

### Phase 1 — Local development / testing

- Run full app locally
- Validate booking, payment, admin and CMS functions
- Confirm all environment variables work

### Phase 2 — Staging deployment

- Deploy backend to a staging Render service
- Deploy frontend to a preview Vercel URL
- Run real smoke tests before live launch

### Phase 3 — Production launch

- Switch env values from staging to production
- Use live payment keys
- Point the frontend to the production API
- Confirm admin login and CMS management work live

---

## 10. Recommended final decision

For this app, the cleanest production plan is:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Domain: custom domain with HTTPS
- Payments: Paystack or Flutterwave

This gives the client a reliable, modern, low-maintenance production stack without overengineering the app.

---

## 11. Production Recommendation Summary

### Best budget option

- Vercel free
- Render free or low-cost
- MongoDB free tier
- Brevo free or SMTP
- Total: $0–$15/month

### Best stable option

- Vercel hobby/pro plan
- Render standard plan
- MongoDB Atlas small tier
- Brevo or Resend
- Total: $20–$50/month

### Best business-ready option

- Vercel standard
- Render standard
- Managed MongoDB
- Custom domain
- Monitoring and support
- Total: $40–$80/month

---

## 12. Final Note

The app is already working correctly in local development and has been verified to run on the local stack. The main production requirement is configuration discipline: correct environment variables, correct CORS settings, correct API URL, and correct payment callback URLs. Once those are configured properly, Vercel and Render can be used reliably for a stable production deployment.
