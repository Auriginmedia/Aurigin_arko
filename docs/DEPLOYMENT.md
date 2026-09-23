# Deployment and React integration

## Architecture

One React/Vite frontend and one TypeScript Express server are sufficient for this V1. Node's SQLite driver provides durable single-instance records, transactions and booking uniqueness. A small server worker processes notifications and reminders. External systems use adapters; none is the authority for internal approval or price state.

Domain files are `catalogue.ts`, `discovery.ts`, `audits.ts`, `pricing.ts`, `policy.ts`, `booking.ts`, `proposals.ts`, `adapters.ts` and the API composition in `app.ts`. Zod validates commands. The public build imports no server catalogue. The migration stores versioned domain records as typed JSON aggregates, with dedicated session, booking, idempotency and outbox tables. Stable domain IDs and ownership are preserved for CRM migration.

## Host requirements

- Node 24+, a single application process and durable disk for SQLite/WAL/SHM.
- TLS at a reverse proxy; forward requests to localhost:4173. `APP_ORIGIN` must match the browser origin exactly.
- Only `dist/` may be served as static content. Do not expose the app folder, docs, data, `.env`, server files or seed JSON.
- No cross-origin iframe deployment is configured. CSP uses `frame-ancestors 'none'`; cookies are HTTP-only and SameSite Strict. Prefer native route integration.
- Outbound HTTPS to chosen providers and public websites for safe audits. Constrain audit egress at the host as additional defense.
- Backups, log protection, monitoring and resource limits. Never deploy ephemeral SQLite as durable storage.

For multi-instance hosting, move the authoritative store to a transactional shared database and replace the single-process rate limiter/outbox scheduler with shared locking. Do not simply scale this SQLite process horizontally. The included interfaces and stable IDs provide the migration boundary.

## Mount in the existing React website

The original website repository was not supplied. This delivery therefore does not alter it. For native integration, copy the planner components/styles into its router under `/quote` and the founder screen under `/admin`, keeping the `/api` handlers server-side. Rename or scope the global CSS to the route if the existing site has a design system. Keep provider secrets and catalogue modules entirely out of client imports.

Alternatively, reverse-proxy `/quote`, `/admin`, `/api` and the Vite asset path to this application on the same host. Check asset path collisions with the existing site. For a `/planner` base path, adjust Vite `base`, route links, cookie path and API prefix together and retest. Do not iframe cross-origin without redesigning session and accessibility behavior and running an explicit cross-origin test.

## Environment and secret rotation

Copy `.env.example` to `.env` outside any public artifact. The app loads it server-side. In production use the hosting secret manager. Rotate provider tokens at their issuer, update the host and restart. To revoke all browser sessions after an incident, delete rows from `sessions` in a reviewed maintenance transaction. Changing the founder password does not itself revoke existing sessions; revoke them deliberately. Protect the database and local password file with host filesystem permissions.

No bearer token is embedded in a URL. Resume codes are short-lived, hashed and single-use. PDFs are generated on demand behind the same owner session and are never written to a public directory. A valid historical PDF may remain downloadable after cancellation; project initiation still needs consultation.

## Back up and restore

Use the included `scripts/backup.ts` while the server runs; it uses SQLite's backup API rather than copying an active database file without its WAL. Store the resulting backup on private encrypted storage with a retention policy. The source archive intentionally excludes runtime data and credentials.

```powershell
node --experimental-transform-types scripts/backup.ts data/backups/review.sqlite
```

For restore, stop the application, preserve the existing database/WAL/SHM as a dated recovery copy, place the validated backup at `DATABASE_PATH`, and restart. Run `PRAGMA integrity_check` before accepting traffic. Verify a known lead, quote version and booking. Never overwrite a live database casually. Test restore in a separate workspace periodically.

## Scheduled work and retention

The outbox/reminder loop runs every ten seconds while this process is running. Email retries use capped backoff and deduplication. Sheets sync is operator-triggered and repeatable; failures do not change authoritative records. Pending calendar holds require reconciliation and are never blindly expired after an uncertain external result.

Retention defaults to 365 days and remains provisional. This version does not autonomously erase records; review jurisdictional and contract obligations before implementing a purge schedule. Use the configured interval to build a private review list, then perform a backed-up, logged erasure operation with explicit scope.

## Known deployment limits

- Actual Google/Meta/Resend/Sheets/OpenAI credentials and real network contracts were not exercised; mock contract tests validate request shape, not provider acceptance.
- Admin is password-based with a single founder role; use an authenticated private network or add SSO/MFA before broad staff access.
- The PDF is plain, paginated and text-searchable. The accessible HTML proposal is the primary reading surface; tagged PDF/PDF-UA compliance is not claimed. Non-Western glyphs need an embedded Unicode font before internationalized PDF names are accepted.
- Safe audit fetches currently inspect one HTML page (within the five-page maximum), honor robots conservatively, and do not execute client JavaScript. Inaccessible/uncertain evidence falls back to manual questions.
- There is no payment gateway checkout, capacity planner, automatic referral money transfer, campaign sender or autonomous renewal repricing.
