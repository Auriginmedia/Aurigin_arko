# Aurigin / Arko developer handoff

Source snapshot: 22 September 2026. This is the current local demo application, not a deployed production service.

## Quick start

Install Node.js 24 and pnpm. Open a terminal in this extracted folder:

```powershell
pnpm install --frozen-lockfile
Copy-Item .env.example .env
pnpm release:check
pnpm start
```

On macOS/Linux, use `cp .env.example .env` instead. Keep MODE=DEMO for local tests. Open http://127.0.0.1:4173/arko (chat), /quote (form planner), or /admin (Founder Access). The first start creates the SQLite database and a NEW founder password in data/demo-admin-password.txt if ADMIN_PASSWORD is blank. The owner's password is not included.

To enable AI, set GEMINI_API_KEY privately in .env and ARKO_AI_ENABLED=true. The example selects gemini-3.1-flash-lite; verify access for your provider account. AI requests use the provider API even in DEMO mode. Without credentials the app offers a labelled example and editable brief. Never put credentials in client code or commit .env.

## Project map

- client/: React/TypeScript UI, Founder Access, chat, Aurigin logo and Arko mascot.
- server/app.ts: Express routes, authentication, quote workflow and commercial enforcement.
- server/arko.ts and arko-model.ts: conversation handling and Gemini/OpenAI adapters.
- server/knowledge.ts: initial approved company knowledge, India price bands and quality review.
- server/store.ts and migrations/: SQLite persistence.
- tests/: automated API, conversation, pricing, booking and security regression tests.
- docs/: operating, setup and deployment references. ADMIN_GUIDE.md includes the new knowledge workflow.

## Latest functionality

The library seeds 21 published entries and four draft FAQs from the company profile and founder instructions. Location: Shahpur Jat, Delhi; human contact: founder Arjun. Only published public knowledge is sent to the AI. Customers can rate replies. Rule-based quality reports flag failures, exact repeats and possible unanswered questions. FAQ suggestions require a founder-written answer and approval; the model does not train itself.

India price bands are private server controls. New quotes, revisions and approvals enforce the founder floors. Social content packaging remains unpriced. Website-care billing period and 3D scope need confirmation. Legacy catalogue and policy documentation includes earlier design assumptions; inspect current server/knowledge.ts and server/app.ts for the latest India pricing behavior. Editing knowledge text does not alter prices.

## State and launch limits

This handoff intentionally starts a fresh database. Existing chats, leads, customer details, local founder edits, feedback, issued proposals, sessions and passwords are excluded. Source-seeded knowledge and pricing are included. Any later migration of business data must be handled separately.

Calendar/Meet, email, Sheets and WhatsApp adapters exist, but production credentials and deployment are still required. WhatsApp conversational messaging is not implemented. Demo booking and notifications are simulated, and registration uses synthetic .invalid email addresses. Hosting, HTTPS, legal links, delivery scope, approved live catalogue, provider verification and production security review remain launch tasks. The server currently binds to 127.0.0.1; review reverse proxy/container networking before deployment. Run one application process with durable SQLite storage and backups. This is not a static-only website.

Current verification: production build and 52 automated tests passed before this source handoff; a live Gemini check answered the approved location and human contact correctly. Run pnpm release:check in your environment before changes are released. Automated tests use mock providers. The optional scripts/check-arko*.mjs diagnostics make live API calls and can consume quota; they are not needed for setup.

Only dist/ is intended as public frontend content. Never expose server/, source pricing, database, logs or credentials through a web server. Share this archive privately with the developer since it contains internal pricing and implementation details.
