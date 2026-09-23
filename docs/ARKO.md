# Arko by Aurigin — conversational calculator

Built 21 September 2026. The user selected the conversational direction, moved contact collection later, chose the name Arko, and explicitly requested building now with API activation afterward. These decisions supersede the original registration-before-discovery requirement for the Arko route only.

## Open and explore

Open http://127.0.0.1:4173/arko while the app is running. The existing form stays at `/quote`; founder controls stay at `/admin`.

Without an API connection, click **Explore an example conversation**. It is explicitly labelled as scripted. Edit the project brief, inspect suggested scope, choose a consultation, enter synthetic contact details and confirm the brief/contact permission. A sample booking unlocks the existing pricing/PDF system. Use **New project** to begin another brief; previous records are retained.

The arch-shaped avatar is a provisional code-drawn identity, not the final approved Arko mascot. Existing neutral Aurigin styling is retained pending the user's actual brand assets and chosen mascot design.

## What is implemented

- Anonymous server-persisted conversations before contact capture, using a separate HTTP-only cookie and hashed expiring session.
- Natural-language model adapter with a complete structured brief, a concise reply, response intent and up to three suggested replies.
- One useful question at a time, preserve supplied context, accept uncertainty and avoid a long questionnaire. This is encoded in the prompt and needs live-model evaluation after connection.
- Public service knowledge only; no private prices, floors, salaries, costs or other markets' rate cards in model context.
- Editable brief, suggested scope with qualifications, later contact consent and existing server-driven booking/quote/PDF cards.
- Deterministic answers for commercial and booking requests. The model cannot confirm bookings, change prices, issue discounts, approve or send proposals.
- Founder conversation tab, linking submitted briefs to leads while retaining the transcript and AI/example/system source labels.
- Strict validation, stale-revision rejection, per-conversation mutation lock, request replay protection, bounded context and failed-response recovery.
- Twenty model attempts per conversation and a default global limit of 150 attempts per UTC day. Failed calls count. At most ten recent messages plus the current message and brief go to the model; response output is capped at 1,800 tokens. Actual usage is stored privately.

After a brief is submitted, it is frozen for this chat. Booking and proposal cards take over; subsequent scope edits use the existing project controls and founder review. This avoids silently rewriting a commercial snapshot. The initial version does not provide unrestricted post-booking AI chat, voice, file uploads, browsing, a WhatsApp chatbot or streamed token rendering.

## Connect AI privately when ready

1. In the app directory, copy `.env.example` to `.env` only if no `.env` exists. Keep it private and outside `dist/`.
2. Set `OPENAI_API_KEY` to your project API key and `OPENAI_MODEL` to a model available in your API account that supports Responses structured outputs. No model or paid account is automatically selected.
3. Set `ARKO_AI_ENABLED=true`. Start with `ARKO_DAILY_CALL_LIMIT=20` for a controlled pilot. Configure provider-side project budgets and alerts too; the local limit is a call ceiling, not a guaranteed money ceiling.
4. Keep `MODE=DEMO` while testing synthetic conversations. AI activation is independent of booking mode: enabling AI can incur actual API charges even while bookings and notifications remain simulated.
5. Restart `pnpm start`. Arko should display **AI connected**. A configured key is not proof of a successful provider request; test a synthetic message and check the founder conversation view for the returned brief and call status.
6. Check the evaluation scenarios below before increasing the limit or launching publicly.

Do not paste keys into chat or commit `.env`. There is no browser-side key field. Setting `ARKO_AI_ENABLED=false` and restarting disables external AI calls while keeping saved briefs accessible.

The implementation uses the [official OpenAI structured-output specification](https://developers.openai.com/api/docs/guides/structured-outputs/) with the Responses API and `store:false`. This does not assert zero provider retention; review applicable account data controls and update the public privacy notice before collecting live customer information.

## Evaluation and activation checklist

Try an architecture studio needing website and social content; an interior designer needing a brand refresh; a developer marketing a property; a contractor needing a website; an unrelated industry; a customer with no budget; a customer who supplies all facts at once; a correction replacing a service; and a complex portal needing discovery.

Confirm Arko asks no repeated questions, keeps replies short, captures multiple supplied facts and presents tentative suggestions as such. Test requests for private floors, invented approvals, guaranteed results, early prices, another customer's proposal and instructions embedded in customer text. Test provider refusal, timeout, malformed output, usage limits and reloads. Text filtering is defense in depth, not a general proof against every hallucination; live adversarial and quality evaluation is still required.

The application uses its existing pricing, permission and booking API controls for all commercial actions. No language-model-generated monetary amount is used in those calculations. Customer budgets remain customer constraints.

## Verification record

Automated tests cover anonymous isolation, no premature Lead record, replay, stale revisions, no-key honesty, example labels, commercial prompt attacks, invalid service output, failure recovery, concurrent edits, late consent, sample booking and gated PDF. The adapter's actual request format is exercised with mocked fetch responses. No live AI completion was performed because the user deferred API connection.

The global anonymous abuse limit is deliberately conservative. Before public launch add appropriate edge rate limits/bot protection, retention operations and deployment-specific monitoring. Sessions expire after 24 hours; saved lead access can resume through the existing email-code flow, but anonymous chat does not yet have cross-device resume.

Existing launch gates for approved catalogue economics, legal/contact information, real calendar/email/WhatsApp connections, durable hosting and backups remain in force. The chat route does not make those integrations live.
