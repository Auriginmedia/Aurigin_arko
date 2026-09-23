# Founder operating guide

Only the authenticated founder role can access economics, policy, catalogue edits, approvals and receipt confirmation. There is no lower-privilege staff account in this V1; do not share the founder password with sales staff. Give ordinary tracking users access to the restricted sales spreadsheet instead.

## Daily routine

1. Check Bookings for upcoming consultations and pending provider holds. Reconcile pending holds with the provider; a pending hold keeps the client locked.
2. Search Leads by company, industry, market, service, stage or campaign source. Incomplete discovery remains saved.
3. Review Requests. Start review, ask for information/call, reject or open the related proposal. A 24-hour delay queues one reminder, never an automatic approval.
4. In Proposal review, inspect the full client preview and private cost breakdown. Missing costs are uncertainty, not zero.
5. If editing, provide new scope/price lines in integer minor units, add a reason and create a new version. Review that new version before approving it. Approval of an older hash is rejected.
6. Process/retry the outbox and inspect sync failures. Demo recorded means a simulated local record, not a sent message.

## Proposal controls

Prices are authoritative only from the server. A client-supplied desired fee is a request. Normal negotiation reductions use the original fee and do not combine with promotions. The promotional route normally wins for identical scope. Reducing scope saves a linked new version.

Approval is not client acceptance or payment. A client can accept an approved valid version in the portal. A receipt is separately recorded by the founder with amount, reference and time. Duplicate received events do not grant another entitlement or reward. A refund/void event creates a review record; it does not retroactively erase an agreement or automatically punish the client.

The continuing discount has no three-month expiry. A benefit has its own expiry. Do not alter an active accepted agreement by changing the catalogue. Renewal, unrelated services and reactivation require an explicit decision. Association and reward administration endpoints are available for controlled founder operations; the ordinary screen lists the records rather than hiding them in a quote status.

## Catalogue and policy

The Catalogue tab allows private edits and previews before publishing. Monetary values use minor units: `4500000` means INR 45,000. `1100` basis points means 11%. Every publish creates a catalogue/policy record and audit event. Already-created quotes retain their snapshots.

A live service needs a defined scope, documented review note, floor, allocated cost and a net fee that passes the continuing promotion and contribution policy. Founder demo overrides never turn unresolved rows into live-approved offers. Named packages/add-ons remain drafts until their distinct economics and measurable limits are reviewed; do not borrow a generic service floor merely to make them pass.

The Policy editor exposes provisional timezone, slots, buffers, thresholds, dated FX, benefit/referral terms, retention and draft commercial terms. Review before publishing. Keep the original 11% booking plus five-point conversion policy unless an intentional founder policy change is approved. Public launch copy must match a changed promotion.

Planning ranges are a separate two-step workflow: create a specific scope/range, then approve that exact hash. The client sees approved ranges only after booking. No Build Next item becomes an executable build promise merely because a range exists.

## Privacy and recovery

Use the CRM export for future migration. It contains private client information and must be stored securely. Follow the backup/restore instructions in DEPLOYMENT.md. Retention is an editable policy; actual erasure requires a deliberate reviewed maintenance process so contracts, payment evidence and retention duties are not silently destroyed.

## Arko knowledge library and quality review

Open Founder Access at `/admin`, then choose **Knowledge library**. The initial library contains 21 published entries sourced from the 64-page company profile and founder instructions, plus four unpublished questions needing decisions. Location is Shahpur Jat, Delhi; human help is founder Arjun.

1. Choose **Edit and review**, or **Add entry**.
2. Enter the answer, category and source. Use Internal for notes that Arko must not receive.
3. Select **Save draft**. Saving does not replace an existing published answer.
4. Review the saved version and select **Approve and publish this saved version**. Arko can use it on the next message. Unpublish removes it from future retrieval; published history can be restored into a draft.

Hosting, copywriting, revision limits, and cancellation/ownership remain draft questions. Confirm the actual policy before publishing. Placeholder drafts cannot be published. Social packages, care billing period and 3D production scope still require founder decisions. Private India price bands are shown here but cannot be changed by editing knowledge text; server changes are currently needed to update those rates. Floors are enforced for new quotes, revisions and founder approvals, including demo overrides. Existing issued proposals retain their original snapshots.

**Quality review** groups provider failures, exact repeated replies, possible unanswered questions and negative feedback. Customers can rate replies and optionally leave a note. These are rule-based signals and may miss paraphrases or flag a useful reply. Review evidence, create a FAQ draft, write the correct answer in Knowledge library, save and publish, then mark the issue reviewed. Customer claims never publish themselves. No model training is performed.

The library checks button checks source availability, published-only retrieval and band ordering; it is not a live AI evaluation. Run `pnpm release:check` before releases for the production build and automated conversation, ownership, approval and pricing regression tests. Tests use mock providers and do not incur Gemini charges. Separately try a small set of real conversations after a provider/model change (services, location, portfolio, unknown hosting inclusion, a discount request and an attempted policy override).

Library entries, revision history, reports and feedback persist in the app SQLite database; include it in normal backups. Review reports cover new events from this feature onward. Report totals may include older calls. Founder Access remains local until deployment is completed.
