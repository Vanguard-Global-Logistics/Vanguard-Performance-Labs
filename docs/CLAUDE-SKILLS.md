# CLAUDE-SKILLS — honest status & assignment

> Reality check: "skills/plugins" availability depends on what's actually installed in THIS Claude Code
> environment. Do NOT assume the marketplace names below are present. On first run, Claude Code should
> verify each and update the Status column. Several will likely be "not installed" — that's expected and
> fine; the repo brain (CLAUDE.md + docs/) works regardless.

## Capabilities that are core to Claude Code (effectively always available)
| Capability | Purpose | When | Required? |
|---|---|---|---|
| TypeScript checking (LSP/tsc) | Catch broken imports, prop/type errors, client/server boundary issues | Continuously; before every completion | Required |
| Frontend design judgment | Splash composition, Jessie/vial placement, typography, responsive, lighting | All visual work | Required |
| GitHub operations | Branches, commits, PRs, tags, restore points | Every major change | Required |
| Reading current official docs | Next.js/React/Tailwind/Supabase/Playwright before framework changes | Before framework-level edits | Required |
| Code review pass | Review a feature before merge to main | At review/merge | Required |
| Playwright | Render + screenshot at 4 viewports; compare to references | Before claiming visual completion; in CI | Required |

## Marketplace/optional plugins named in the owner's skills doc — VERIFY, don't assume
| Named skill | Likely nature | Action on first run |
|---|---|---|
| Context7 | Docs-retrieval plugin | Verify install; if absent, use built-in doc lookup |
| FeatureDev | Vertical-slice workflow | Verify; if absent, follow the "vertical slice" rule manually |
| PR Review Toolkit | PR review plugin | Verify; if absent, use standard review checklist |
| CLAUDE.md Management | Brain upkeep | This repo already IS the brain; keep docs/ current |
| Skill Creator | Build a custom skill | Optional; use to author "Vanguard Visual QA" if available |
| Code Simplifier | Post-approval cleanup | Optional; only AFTER visual+functional approval, then re-run Playwright |
| Superpowers | Misc utilities | Optional |
| Hookify | Pre-commit/CI guards | Optional; if present, add the guards in the owner's doc §12 |

## Priority
- **Always active:** TypeScript · current-docs lookup · frontend design · Playwright · CLAUDE.md brain adherence.
- **At review/merge:** GitHub · code review · (PR toolkit if installed).
- **After visual+functional approval:** Code Simplifier (then re-run Playwright).
- **Selective:** Skill Creator · Superpowers · Hookify.

## First-run task
Verify each row's real status in this environment, then update the Status here and commit. Do not merely
restate this list — record what is actually installed.
