# LBR Cleaning Backend — Database Migration Log

**Goal:** Business logic (controllers) must never know whether data lives in
MongoDB or PostgreSQL. Everything goes through a repository interface;
switching databases is a one-line env var change (`DATABASE_PROVIDER`).

**Current active provider:** `mongodb` (free tier, dev/test phase)
**Future provider:** `postgres` (Render, at launch)

---

## Architecture

```
Controllers  →  repositories/index.js  →  Mongo repo  OR  Postgres model
(business         (the ONE switch            (implements the same
 logic)             point, reads               method names as the
                     DATABASE_PROVIDER)         interface — controllers
                                                 can't tell them apart)
```

- `src/repositories/interfaces/` — the contracts (`ISubscriberRepository`,
  `IOrderRepository`, `IPaymentRepository`). These document the method
  surface every implementation must have. Not enforced at runtime (JS has
  no interfaces) — they're the spec you code against.
- `src/repositories/mongodb/` — Mongoose-backed implementations, active now.
- `src/models/{subscriber,order,payment}.js` — Prisma-backed data access,
  used directly as the repository when `DATABASE_PROVIDER=postgres`. They
  already match the interface method-for-method, so no extra wrapper class
  is needed.
- `src/repositories/index.js` — reads `DATABASE_PROVIDER` once at boot and
  hands back the matching repository set. This is the **only** file that
  contains an `if (provider === ...)` branch. Nothing else in the app does.
- Controllers (`paymentController`, `subscriberController`,
  `notifyController`) only ever call `repositories.xRepository.method()` —
  zero direct Mongoose or Prisma calls.

## Switching databases later (Postgres @ launch)

1. Provision Postgres on Render, set `DATABASE_URL` in `.env`.
2. `npm run prisma:generate` then `npm run prisma:migrate`.
3. Change `DATABASE_PROVIDER=mongodb` → `DATABASE_PROVIDER=postgres`.
4. Restart the app. No controller, route, or business-logic code changes.

## What was fixed in this pass

The repository-pattern skeleton was already in good shape, but a few real
bugs would have broken it in practice:

1. **`repositories/index.js` (postgres branch) called `new Subscriber()`
   etc.** — but those model files export plain objects, not classes, so
   this would have thrown `Subscriber is not a constructor`. Fixed: the
   Postgres branch now uses the model objects directly, since they already
   implement the same method names as the interfaces. Removed the unused
   `Postgres*Repository` wrapper classes — they added indirection without
   adding anything, since there's only ever one Prisma client.
2. **`paymentController.initializePayment` did `Number(orderId)`.**
   MongoDB ids are 24-char hex strings — `Number()` on those returns
   `NaN`, silently corrupting every payment's `orderId` once you're on
   Mongo. Fixed: `orderId` is passed through as-is; the Postgres model
   casts to `Number` internally where it actually needs to.
3. **`verifyPayment` mapped gateway status to `"COMPLETED"`**, which isn't
   a valid value in either the Mongo schema's or Prisma schema's
   `PaymentStatus` enum (`PENDING | PAID | FAILED | REFUNDED`) — so a
   "completed" webhook would have failed Mongoose validation. Fixed the
   `statusMap` to map onto real enum values, and updated the follow-on
   `mappedStatus === "COMPLETED"` checks to `=== "PAID"`.
4. **`Order.updatePaymentStatus` was being called with lowercased
   strings** (`"paid"`, `"failed"`) from the old status logic, again not
   matching the uppercase enum. Fixed alongside #3.
5. **Missing files that were referenced but never provided:**
   `src/config/mongodb.js` (connect/disconnect), `src/config/database.js`
   (Prisma client singleton, only instantiated when
   `DATABASE_PROVIDER=postgres` so Prisma isn't a hard requirement during
   Mongo-only development), `src/config/mailer.js`, `app.js`,
   `package.json`, `.env.example`. All added.
6. **`contactController` had its own separate Nodemailer transporter**
   instead of using the shared `config/mailer.js`. Unified — same Gmail
   config either way, one less place to update credentials.

## Known gaps / things to decide next

- **`POST /appointments/book`** is listed as a live endpoint in the old
  README but no controller for it was in the code you shared — it isn't
  wired into `app.js` yet. Send over that controller (or confirm it
  doesn't exist yet) and it'll go through an `appointmentRepository` the
  same way.
- **Rate limiting / brute-force protection** on `adminLogin`: the
  `wrongAttempt` lockout counter is in-memory, so it resets on every
  server restart and doesn't work across multiple server instances. Fine
  for a single dev instance; worth moving to Redis or a DB-backed counter
  before you're actually handling real user volume.
- **Validation:** none of the routes use a schema validator (Joi/Zod) —
  worth adding once traffic grows, so bad payloads fail fast with a clear
  400 instead of surfacing as a 500 from a DB error.

## Step log

- [x] Step 1 — Reviewed existing repository-pattern skeleton, identified
  the bugs above.
- [x] Step 2 — Rebuilt `src/config/` (mongodb.js, database.js, mailer.js).
- [x] Step 3 — Rebuilt Mongo repositories + schemas, fixed the `PAID`
  status-enum bug in `MongodbPaymentRepository`.
- [x] Step 4 — Rebuilt Postgres-side model files, simplified
  `repositories/index.js` to use them directly (removed the broken
  `new Subscriber()` wrapper pattern).
- [x] Step 5 — Fixed `paymentController` id-casting and status-mapping
  bugs; unified `contactController`'s mailer.
- [x] Step 6 — Added `app.js`, `package.json`, `.env.example`.
- [ ] Step 7 — Wire up `npm install`, set `MONGODB_URI` in `.env`, run
  `npm run dev`, and smoke-test each endpoint against a real MongoDB
  Atlas free-tier cluster.
- [ ] Step 8 — Add `appointmentRepository` once the appointments
  controller is shared.
- [ ] Step 9 (at launch) — Provision Render Postgres, run Prisma migrate,
  flip `DATABASE_PROVIDER`, smoke-test again.
