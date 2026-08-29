# VPL Security Operations — Jessie / Public Site

Status: approved defensive runbook

## Objective
Keep the site available, keep customer data private, protect expensive AI/email/database resources, and make abusive automation expensive before it reaches business logic.

## Defense layers
1. **Vercel edge** — platform DDoS mitigation, Firewall/WAF, Bot Protection, AI-bot controls, and Attack Challenge Mode when needed.
2. **Network boundary (`proxy.ts`)** — block exploit-scanner paths, disallowed HTTP methods, known automation clients, cross-site mutation attempts, origin mismatches, and oversized public API requests.
3. **Application mutation guard (`lib/security-guard.ts`)** — per-route burst and hourly budgets, a cross-endpoint resource budget, strict JSON-only mutations, payload caps, origin validation, and an emergency security mode.
4. **Business authorization** — server-side catalog eligibility, owner/admin bearer authorization, and fail-closed production service checks.
5. **Jessie governance** — prompt-injection resistance, medical-advice classifier, output guard, bounded context, and immutable Constitution.
6. **Secrets** — server-only environment variables; never expose service-role keys or private API tokens to browser code.

## Security modes
`VPL_SECURITY_MODE=normal`
Normal production posture.

`VPL_SECURITY_MODE=elevated`
Cuts application-level mutation budgets approximately in half while keeping legitimate traffic available. Use during suspicious spikes or active abuse investigation.

`VPL_SECURITY_MODE=lockdown`
Public POST/PUT/PATCH/DELETE routes protected by the mutation guard return 503. Static/catalog pages remain available. Use when preserving availability and downstream resources is more important than accepting new forms, orders, or Jessie requests.

## Attack response
- If volumetric: use Vercel Firewall/Attack Challenge Mode first; application code cannot absorb a bandwidth flood safely.
- If bot/form spam: raise security mode, inspect Firewall and Vercel logs, block/challenge abusive patterns at the edge, and keep application quotas in place.
- If Jessie abuse: block/challenge `/api/jessie` at the edge, preserve the medical/prompt-injection guards, and never increase token or request budgets to accommodate attack traffic.
- If admin probing: rotate `ADMIN_TOKEN` if exposure is suspected and review access logs. Never disclose whether a guessed token was close or valid beyond generic unauthorized responses.
- If credential exposure: rotate the credential immediately in the provider and Vercel; do not rely on deleting it from Git history.

## Edge configuration target
- Enable Vercel managed Bot Protection.
- Enable AI-bot blocking for unwanted crawlers/model trainers.
- Add edge rate limits for `/api/jessie`, `/api/orders`, `/api/inquiry`, `/api/specialty`, and `/api/admin/*`.
- Prefer challenge/deny before compute for obvious automation.
- Use BotID on high-value browser-originated mutations when enabled for the project.
- If plan supports the OWASP managed ruleset, deploy log-first, review false positives, then enforce.

## Jessie security role
Jessie is not an autonomous firewall administrator. She may explain security status, recognize social-engineering/prompt-injection attempts in her own conversation, refuse unsafe requests, and route suspicious events to the owner. Firewall changes, secret rotation, account recovery, and destructive security actions require an authorized operator or tightly scoped automation.

## Non-goals
No system is "unhackable." Do not claim MIT-level, military-grade, or guaranteed security. The standard is measurable defense-in-depth, least privilege, rapid containment, logging, recovery, and continuous hardening.
