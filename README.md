# Aurigin Project Planner V1

A local, reviewable React and TypeScript application built from the complete Aurigin Calculator V1 ART prompt, including all eight pricing appendices. This delivery is a **DEMO**, not a live commercial launch.

## Open the application

- **Arko conversational version:** http://127.0.0.1:4173/arko — [preview and API setup](docs/ARKO.md). Supports Gemini-backed replies when privately configured; this archive does not include API credentials. Read START-HERE.md first.
- Client planner: http://127.0.0.1:4173/quote
- Founder dashboard: http://127.0.0.1:4173/admin
- Founder password: open `data/demo-admin-password.txt` locally. It is generated on first start and never included in browser code.

Use **Use synthetic demo details** to begin. Demo registration requires an email ending in `.invalid`. Choose your services, complete the scope, book a sample consultation and view the unlocked estimate. No real calendar event, email, WhatsApp message, reward payment or spreadsheet write occurs in demo mode.

## Run it again

Requires Node.js 24 or newer and pnpm. The installed dependencies and lockfile are included in the working folder; the source archive omits dependencies and private runtime state.

```powershell
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

Open the two URLs above. `pnpm test` runs the automated tests. The first start applies the SQL migration, creates a persistent SQLite database in `data/`, and seeds the private catalogue. Use one application process with a durable local volume.

The app uses native Node TypeScript transformation to avoid a platform-specific tsx launch problem in this Windows environment. The startup warning identifies that Node feature as experimental. The frontend is built by Vite. Production deployment should pin a tested Node 24 release and rerun the checks in its target environment.

## What works

- Registration, separate service/marketing permission, attribution, shared problem/service discovery, autosaved drafts and one-time resume codes.
- Non-priced recommendations, bounded diagnostic, scope assumptions and smaller-scope alternatives.
- Transactional booking holds, daily cap, timezone/buffer rules, confirmed-booking quote gate and pending-provider reconciliation.
- Native-market server pricing in minor units, additive 11% + 5 percentage point promotion, non-stacking negotiation, recurring priority routing, cost/floor protection and reconciliation.
- Versioned proposals, authorized PDF generation, exact-version founder review, immutable accepted commercial snapshots and separate client acceptance/payment records.
- Continuing discount entitlement, independently dated benefits, first-payment referral review and deduplicated demo notifications.
- Founder dashboard, catalogue preview/publish, editable policy, planning ranges, integration status, sync retry and CRM export.
- Callable production adapters for Google Calendar/Meet, email, WhatsApp, Google Sheets, public-site audit, geolocation and optional AI. Payment verification uses an authenticated founder receipt record; online checkout is intentionally absent.

## Before live use

1. Review the private [catalogue reconciliation](docs/CATALOGUE_RECONCILIATION.md). No seed is approved-live. Confirm scope, owner, actual costs and contribution before publishing offers.
2. Follow [Arjun's setup guide](docs/SETUP_FOR_ARJUN.md) to connect credentials, founder identity, sender and tracker.
3. Approve legal/contact links, timezone, provisional policies, retention and international FX references. Run a controlled provider test and target-host security review.
4. Deploy only after explicit authorization. No production domain, DNS or provider account was changed for this build.

## Documentation

- [Founder operating guide](docs/ADMIN_GUIDE.md)
- [Deployment and website integration](docs/DEPLOYMENT.md)
- [Confirmed decisions and provisional defaults](docs/DECISIONS.md)
- [Requirement traceability](docs/REQUIREMENTS.md)
- [Provider costs and official references](docs/PROVIDERS.md)
- [Test evidence and limits](docs/TEST_EVIDENCE.md)
- [Launch checklist](docs/LAUNCH_CHECKLIST.md)

Private seed data, reports, database, credentials and server source must never be placed in a static public directory. Only `dist/` is public.
