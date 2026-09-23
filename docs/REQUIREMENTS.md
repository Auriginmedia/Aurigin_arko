# V1 requirement register

Source: **Aurigin Calculator V1 ART Codex Build Prompt**, founder decisions through 17 September 2026. All eight appendices were read and retained as private versioned seeds. No second pricing document or existing website repository was supplied. “Implemented” below means the local demo and corresponding server path; it does not certify live provider delivery. Defaults are identified in DECISIONS.md.

| ID | Source / authority | Implementation and verification |
|---|---|---|
| R1 | Business and purpose — confirmed | Built-environment client copy, consultation-first flow, separate project and recurring needs; client/main.tsx. Desktop/mobile walkthrough. |
| R2 | Sources and conflicts — confirmed | This register, DECISIONS.md, CATALOGUE_RECONCILIATION.md, server/seed.json. Seed and reconciliation tests. |
| R3 | Founder decisions — confirmed | Server booking gate, additive promotion, continuing entitlement, founder approvals; app.ts, pricing.ts, booking.ts. Workflow and mathematical suites. |
| R4 | Editable defaults — provisional | Versioned Policy for timezone, duration, buffer, notice, horizon, validity, negotiation, thresholds, benefits and retention. policy.ts; dashboard editor. Retention is a review setting, not an automatic deletion job. |
| R5 | Capabilities and costs — confirmed context; costs unverified | Readiness per service, C/D discovery-led routes, private cost assumptions, partner/owner review. catalogue.ts, discovery.ts. Build Next and reconciliation tests. |
| R6 | Public experience — confirmed | Shared registration/discovery, draft autosave, one-time resume, optional diagnostic, booking, two same-market scope choices, proposal and PDF. Mobile/desktop walkthrough plus API gate tests. |
| R7 | Discovery questions — confirmed | Shared schema and service-family questions, material assumptions, assets and stakeholder flags. discovery.ts and client/main.tsx. Uncertain website, overlap and combined-scope tests. Advanced answers trigger scope review rather than automatically pricing every possible feature. |
| R8 | Free diagnostic boundaries — confirmed | One public HTML page maximum, strict HTTPS/public-IP fetch, bounded bytes/time, evidence-labelled findings and manual prompts when unavailable. audits.ts; SSRF tests. No authenticated analytics or browser-rendered audit. |
| R9 | Four native markets — confirmed | Independent INR/AED/GBP/USD seeds; client-confirmed country and reviewed corrections; optional geolocation adapter. Unsupported country stays in review. Native seed and unsupported-market tests. |
| R10 | Pricing protection — confirmed | Integer minor units, explicit scope, floors, unknown-cost review, contribution and exclusions. pricing.ts. Mathematical and public-projection tests. |
| R11 | Promotion — confirmed | 11% plus 5 points from original eligible fees; no passthrough reduction; first founder-verified payment creates entitlement. Pricing/payment replay and independent-benefit tests. |
| R12 | Negotiation — confirmed; schedule provisional | Persisted three-round 4/7/10% route, promotion switching from original fee, focused scope, custom requests. Resume and negotiation tests. |
| R13 | Benefits and referrals — terms provisional | Separate expiry, frozen benefit snapshot, entitlement, referral review after first payment, configurable reward/cap and audited issuance. Benefits disabled by default. Payment replay and expiry tests; actual reward payout is manual. |
| R14 | Priority and custom review — confirmed | Discounted monthly agency fees only, dated FX, priority notifications, qualified quotes still available, pending 24-hour reminders. Boundary/FX and reminder tests. |
| R15 | Booking — confirmed; slot defaults provisional | Google free/busy plus transactional local holds, buffer, four-per-day cap, notice, blackouts, cancellation and pending reconciliation. booking.ts and adapters.ts. Concurrency, timezone, provider-failure and cap tests. |
| R16 | Proposals — confirmed | Separate one-time/monthly/excluded fees, scope and responsibilities, conditional promotion, milestones, terms, version/hash and expiry. proposals.ts. API PDF test and two-page visual review. |
| R17 | Exact founder approval — confirmed | Private preview, revised versions, stale-version rejection, deliberate exceptional override, separate acceptance/payment, deduplicated outbox. Full workflow test. |
| R18 | Adapters and modes — confirmed | Google Calendar/Meet, Resend, Meta templates, Sheets, optional AI/geo, audit and receipt verification. Demo sends nothing. Mock request-contract tests; no live provider account was exercised. Sheets uses a restricted Sales snapshot with stable IDs; specialized per-entity tabs remain a future extension. |
| R19 | Architecture and persistence — implementation choice | React + Express TypeScript, SQLite migration, versioned aggregate records, session/booking/outbox tables, backup and CRM export. Entity details such as lines and service rows are nested in immutable quote/catalogue aggregates. Single-instance deployment only. |
| R20 | AI constraints — confirmed | Optional structured explanation/follow-up adapter, schema checks, call/token limits and output filtering; no private rate card or price-setting authority. Deterministic guided form remains primary. A general conversational tool-calling agent is not included. Mock adapter test; live model quality evaluation still required. |
| R21 | Security and data — confirmed | Ownership checks, origin protection, secure LIVE cookies, validation, URL controls, signed callbacks, private seeds, bounded requests, separate consent. Security/workflow tests. Host hardening, legal review and retention operations remain launch checks. |
| R22 | Founder dashboard — confirmed | Searchable lead/booking/proposal/request/payment/integration views, private economics, policy/catalogue editors and previews. app.ts and main.tsx. API approval/edit tests. Search is a general text filter; dedicated dimension filters and custom controls for every association/reward action are not included. Those authenticated endpoints are documented for controlled operation. |
| R23 | Promotion and measurement — confirmed | Landing copy, entry links, attribution and enumerated funnel events; CRM export and launch checklist. No campaign sends or advertising spend. Cost per qualified consultation requires founder-entered campaign spend and analysis of exported records. |

## Appendix coverage

| Source | Preserved representation | Commercial status |
|---|---|---|
| India, UAE, UK, USA service appendices | 52 native-market generic service rows | Draft or demo-ready; no approved-live seed |
| Named packages | 48 separate package/market rows with source scopes | Private references pending mapping/cost approval |
| Add-on card | 72 add-on/market rows | Private references pending approved measurable scope |
| Industry solutions | Six solution seeds | Guided combination references, not invented bundled live prices |
| Effort and floors | Eleven cost assumptions plus original appendix text | Internal unverified assumptions and reconciliation |

Generic offers drive the working demo; named packages and add-ons are not silently substituted into those prices. New live offerings must pass catalogue approval. Original appendix text is retained server-side and must never be served publicly.

## Task acceptance evidence

| Task | Evidence |
|---|---|
| T1 | Standalone workspace inspection, complete extracted source review, decisions and reconciliation before live seeding |
| T2 | Local client → confirmed demo booking → unlocked multi-service quote/PDF → exact founder approval → verified demo receipt → entitlement/outbox |
| T3 | pricing.test.ts and workflow.test.ts: specified arithmetic, rounding, floors, thresholds, exclusions, month-three entitlement and independent benefit expiry |
| T4 | booking.test.ts, workflow.test.ts and adapters.test.ts: booking races, caps, owner isolation, stale approval, replay, provider failure, UI walkthrough |
| T5 | README, migration, private versioned seeds, environment template, source/lockfile, tests, setup/admin/deployment/provider/launch documentation |
| T6 | README and TEST_EVIDENCE.md distinguish demonstrated demo flow from credentials, commercial approval and remaining production checks |

## Known limits to review before launch

The local V1 is usable, but not certified production-ready. PDF text supports the English-first scope and basic Latin characters; non-Latin names need an embedded Unicode font and additional PDF QA. The HTML proposal is the accessible primary view; PDF/UA certification is not claimed. No MFA, automatic legal retention deletion, multi-node database operation, full browser regression suite, live provider delivery test or penetration test is included. Provider contract tests use mocks. No production deployment, DNS change, charge, phone registration or real client communication occurred.
