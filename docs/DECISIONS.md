# Decision log

The build follows the founder prompt dated 17 September 2026. All eight appendices were read. No separate pricing document or original website repository was supplied.

| ID | Decision | Status | Implementation |
|---|---|---|---|
| D01 | Prices and PDFs require a server-confirmed consultation | Confirmed | API owner gate and booking events |
| D02 | 11% booking plus five points from original eligible fee; no sequential multiplication | Confirmed | pricing.ts |
| D03 | Conversion means verified first payment; acceptance and approval stay separate | Confirmed | PaymentRecord, ClientAcceptance, ApprovalDecision |
| D04 | Continuing entitlement has no automatic three-month expiry | Confirmed | DiscountEntitlement separate from Benefit |
| D05 | Negotiated route cannot stack with promotions | Confirmed | route-specific server calculation |
| D06 | Monthly net thresholds INR 50,000 India, INR 100,000 equivalent international | Confirmed | priority(), versioned FX snapshot |
| D07 | Inclusive boundary; 4/7/10 negotiation schedule | Provisional | Policy |
| D08 | Asia/Kolkata, 60-minute reservation, 30-minute buffer, two-hour notice, 30-day horizon | Provisional | Policy and booking availability |
| D09 | Four consultations/day, Mon–Fri 10:30–17:30, with Arjun | Confirmed | server availability/cap |
| D10 | 15-day estimate validity and 365-day retention review | Provisional | Policy |
| D11 | 20% minimum contribution target | Provisional engineering seed, not founder approval | economics(); visible admin setting |
| D12 | Uncosted catalogue rows cannot become live offers | Confirmed | draft/demo-ready seed and live gates |
| D13 | Missing cost is unknown rather than zero | Confirmed | reconciliation and approval controls |
| D14 | Explicit demo scope caps for pages, assets, revisions, meetings and community hours | Provisional | catalogue.ts scopes |
| D15 | One-page bounded public HTML audit, no rendered-JS/private analytics claims | V1 implementation choice within five-page ceiling | audits.ts |
| D16 | One application, React/Vite + Express + persistent single-instance SQLite | Implementation choice; no prior repo | app.ts, migration, README |
| D17 | Direct Google Calendar/Meet, Meta templates, Resend and Sheets REST adapters | Implementation choice | adapters.ts; no paid service activated |
| D18 | Native same-origin route preferred; iframe disabled | Implementation choice | secure cookies and CSP |
| D19 | Benefits disabled until allowance and cost approval; referral amounts/caps blank | Confirmed/provisional terms | Policy and benefit seed |
| D20 | No automatic renewal increases or reactivation assumptions | Confirmed | frozen quote snapshots; founder association review |
| D21 | No production deployment, DNS change, phone registration or real messaging | Confirmed delivery boundary | local demo only |

The application does not claim current team capacity from pending hires, guaranteed marketing outcomes, foreign offices, certifications, portfolio clients or first-of-its-kind status. BeeBark subscriptions are not part of Aurigin quotes.
