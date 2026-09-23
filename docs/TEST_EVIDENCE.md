# Delivery verification — 18 September 2026

## Automated checks

- `pnpm build`: PASS. TypeScript checking and Vite production build completed. Frontend JavaScript: approximately 240 kB (74 kB gzip); CSS: 11 kB.
- `pnpm test`: **37 passed, 0 failed, 0 skipped**. Final run approximately 11.8 seconds. The complete captured output is [test-run.txt](test-run.txt).
- `node --experimental-transform-types scripts/backup.ts data/backups/delivery-20260918.sqlite`: PASS. SQLite online backup created and reopened read-only; `PRAGMA integrity_check` returned `ok`. The private backup is intentionally excluded from the source archive. A target-host disaster recovery rehearsal remains necessary.

Tests cover additive promotion math, excluded media, non-stacking negotiation, floors/contribution, all market seeds, dated FX priority, milestones, rounding, scope overlap, unknown services, private-data projection, SSRF address checks, spreadsheet formulas and callback signatures. Booking tests exercise timezone/DST, working windows, buffers, holidays, concurrency, idempotency, daily cap, provider failure and cancellation. Workflow tests exercise gated quote/PDF access, two confirmed leads' isolation, client tampering, exact revision approval, stale approval rejection, payment replay, entitlement after month three, independent benefit expiry, frozen benefit terms, resume codes, pending reminders and LIVE fail-closed behavior.

The daily-cap fixture initially failed late in the working day because it assumed four reservations remained today. It now selects a future working day and explicitly attempts a fifth reservation. This corrected the fixture rather than weakening the scheduling rule. A store metadata update also ensures persisted row versions cannot be shadowed by stale serialized metadata; the entitlement test verifies the increment.

## Observed browser journey

Using synthetic `.invalid` contact data in the labelled DEMO workspace:

1. Opened registration, supplied details and separate contact permission, selected India and an uncertain website/social scope.
2. Completed progressive discovery and material assumptions; scope preview contained no prices.
3. Ran the no-website diagnostic path and viewed bounded manual opportunities.
4. Selected an available sample consultation; verified explicit demo confirmation before estimate unlock.
5. Viewed separate one-time and recurring fees, original fee, booking reduction, conditional conversion reduction, exclusions, scope and PDF link.
6. Verified saved progress survived a server restart. On the final preview the saved multi-service proposal remained readable, with clear demo/provisional status.

Desktop at 1440 pixels and mobile at 390 × 844 were visually reviewed in the browser. Controls have native labels, visible focus, keyboard-operable buttons and managed heading focus. This is a manual accessibility check, not a full WCAG audit or a comprehensive browser/device matrix. The final temporary viewport override was reset.

The founder revision/approval/payment and demo outbox sequence is exercised end-to-end through authenticated HTTP integration tests. It is not claimed as a separate complete browser automation suite.

## PDF review

Generated a two-page multi-service proposal, rendered both pages to PNG and inspected each. Verified readable text, explicit currency codes, paragraph wrapping, page numbering, separated fee categories, scope, terms and no visible clipping. The primary HTML proposal remains the accessible view. Non-Latin font coverage and PDF/UA conformance are not established.

## External integrations

No live calendar event, email, WhatsApp delivery, spreadsheet write, AI completion, payment capture or reward payout was performed. Google/Resend/Meta/Sheets/AI request formats were exercised with mocked fetch responses. Demo delivery is recorded in the private outbox and never described as a real provider send. Public-site fetch hardening has unit coverage; no comprehensive adversarial remote-network audit is claimed.

Before launch, complete the controlled provider checks and authorized test delivery in SETUP_FOR_ARJUN.md. A successful read-only connection check does not establish email deliverability, WhatsApp template approval or final meeting behavior. Review remaining scope and operational limitations in REQUIREMENTS.md and DEPLOYMENT.md.
