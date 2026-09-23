# Setup for Arjun

The local demo is ready to review without connecting any paid service. Its appointments and deliveries are synthetic. Connecting live providers is a separate activation step.

## Review the demo first

Open the planner and choose **Use synthetic demo details**. Keep the email ending in `.invalid`. Try Portfolio website plus Social & content, or choose “I am not sure.” The diagnostic works even without a website. Prices remain locked until the demo booking is confirmed.

Open `/admin`. The generated local password is in `data/demo-admin-password.txt`. In Proposal review, select the client, inspect the exact client preview and private economics, add a reason, and approve. Unresolved seed economics require a deliberate demo override. Process the demo outbox from Integrations. Return to the client page and refresh its proposal status. In Payments & benefits, record a synthetic first receipt; the continuing entitlement appears separately from any benefit expiry.

## Calendar and Google Meet

1. Use a Google account that Arjun will actually consult from. Create or choose a Google Cloud project and enable Calendar API. Configure OAuth consent and an OAuth web client using a controlled redirect URI.
2. Authorize that account with offline access and the required calendar event and availability scopes. If Sheets will share this OAuth client, also authorize `https://www.googleapis.com/auth/spreadsheets`.
3. Obtain the OAuth client ID, client secret and refresh token through your controlled OAuth setup. Place them in a private `.env` copied from `.env.example`. Do not put them into React environment variables or the admin JSON editor.
4. Set `GOOGLE_CALENDAR_ID` to the relevant calendar ID (or `primary`). Confirm the account can create Google Meet conferences. Run the read-only integration check, then an explicitly authorized test booking and cancellation after live activation gates pass.
5. In Policy, review timezone, weekdays, 10:30–17:30 working window, 60-minute reserved conversation allocation, 30-minute buffer, two-hour notice, 30-day horizon and four-per-day cap. Add holidays and manual blocks. The Google event currently reserves the conversation and buffer together and describes the conversation endpoint in its description.

The adapter uses free/busy, deterministic event IDs, `conferenceDataVersion=1`, and a verified event response. A Meet link alone does not unlock pricing. Pending holds are visible under Bookings and can be reconciled against the provider with the same event ID. Do not manually free a pending hold without confirming whether the external event exists.

## New business WhatsApp connection

Create/verify the appropriate Meta business assets and WhatsApp Business account. Connect the new business number using Meta's supported onboarding flow; this build does not register a number. Get the phone-number ID, authorized access token, supported Graph API version and app secret. Configure an approved English utility template whose body accepts the one text parameter used by this adapter. Template approval and the recipient's applicable messaging permission are prerequisites.

Set `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`, `WHATSAPP_GRAPH_VERSION`, `WHATSAPP_TEMPLATE`, `WHATSAPP_APP_SECRET` and a random `WHATSAPP_VERIFY_TOKEN`. Subscribe the HTTPS callback `/api/callbacks/whatsapp`. Its GET endpoint only handles Meta verification; its POST endpoint verifies the signature. It cannot approve a proposal. Set `FOUNDER_WHATSAPP` separately from client destinations. Founder notifications link to authenticated admin review; no public link performs approval.

Optional client WhatsApp follow-up preferences are captured. This V1 uses email for automatic client proposal notifications; send client WhatsApp only after the final permitted template/destination workflow is explicitly configured. Provider receipt callbacks are recorded, not interpreted as founder decisions or payment confirmation.

## Email sender

Create a Resend account, verify your sending domain and its required DNS records, and set a restricted `RESEND_API_KEY`, `EMAIL_FROM` and `FOUNDER_EMAIL`. DNS changes are a separate authorized action. Resume codes are sent only to the recorded address in live mode. Configure a transactional sender, not a personal mailbox password.

The outbox retries failures with backoff and uses an idempotency key. A provider API acceptance is recorded as sent; it is not proof that a person read the message. Production bounce/delivery reporting can be added without changing quote authority.

## Google Sheets tracker

Create a private spreadsheet shared only with authorized staff. Add a `Sales` tab and set `GOOGLE_SHEET_ID`. Grant the OAuth account write access. The tracker exports stable IDs, timestamps, stage and quote/booking/conversion/referral summaries. Internal costs remain out of this ordinary sales view. Values use RAW writes and formula neutralization. SQLite remains authoritative if Sheets is unavailable. Use the admin Sync tracking control to retry.

## Optional AI and geolocation

The guided form does not require AI. If desired, create an OpenAI API project, set billing/spend limits, issue a restricted API key and set `OPENAI_API_KEY` and `OPENAI_MODEL` after selecting a supported model. A ChatGPT subscription does not provide this application's API credentials. The adapter uses a bounded structured response, never receives the confidential multi-market catalogue, and cannot set money, booking or payment state.

Geolocation is optional. `GEOLOCATION_URL` must be a trusted HTTPS server endpoint under your control or chosen provider; it receives an `ip` query and returns `{ "country_code": "IN" }` (or AE/GB/US). Configure your reverse proxy carefully so the app has the actual trusted client address. Without it, there is no IP suggestion. Company confirmation remains authoritative, and corrections go to founder review.

## Live founder access and storage

Set a unique `ADMIN_PASSWORD` of at least 16 characters using the host's secret manager. Use HTTPS and a private persistent database volume. Set `APP_ORIGIN` to the exact public HTTPS origin. Set accountant/founder-reviewed `PRIVACY_URL`, `TERMS_URL` and `CONTACT_EMAIL`. Never use the demo database as a live customer database without reviewing and removing synthetic records through a controlled migration.

Set `MODE=LIVE` only on a private staging deployment first. Registration stays unavailable while mandatory configuration, approved catalogue or recent integration checks are missing. Optional failures never turn into simulated success. Review all external test actions before performing them: a live booking or test message creates a real external record.

## Small list of outstanding founder decisions

- Scope costs, service owners, capability readiness and contribution policy for each offer.
- Package-specific floors, add-on bounds/dependencies and premium scopes.
- International dated FX reference and budget thresholds; no invented equivalents are seeded.
- Benefit duration, allowance and cost; referral reward/cap; cancellation/reactivation/renewal rules.
- Tax treatment, terms, privacy/contact route and retention period.
- Actual delivery capacity and project start dates, confirmed in consultation.
