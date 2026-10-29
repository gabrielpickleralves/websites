---
name: recurso-pickler
description: "Pickler's working resources: one entry point for how Claude works. Use when writing, reviewing or refactoring code (Karpathy guidelines: surface assumptions, simplest solution, surgical changes, verifiable goals); for 'ponytail', 'be lazy', 'simplest solution', yagni, over-engineering, code review, repo audit, listing shortcut debt; for /caveman, 'caveman mode', 'be brief', 'less tokens'; and to recommend Claude Code automations (hooks, skills, subagents, MCP servers) or set up Claude Code for a project."
argument-hint: "[module] [args], e.g. karpathy | ponytail ultra | review | audit | debt | gain | help | caveman | stop caveman | setup"
---

# Recurso pickler

Nine resource skills merged into one. Each original lives unchanged in `modules/<name>/`, and its instructions are in `modules/<name>/GUIDE.md` (the file that used to be its `SKILL.md`).

## How to use a module

1. Pick the module from the table below. If the user names one (`/recurso-pickler caveman`, "ponytail review"), use that one.
2. Read `modules/<name>/GUIDE.md` and follow it. Treat `modules/<name>/` as that module's skill base directory: its relative links and `references/` resolve from there.
3. Pass the rest of the user's arguments to the module, as if they had invoked the old skill. For example, `/recurso-pickler ponytail ultra` is the old `/ponytail ultra`.

## Modules

| Request | Module | Alias |
|---|---|---|
| Writing, reviewing or refactoring code: avoid overcomplication, surgical changes, surface assumptions, verifiable goals | `karpathy-guidelines` | karpathy |
| "ponytail", "be lazy", "simplest solution", yagni, bloat; levels lite / full / ultra | `ponytail` | ponytail |
| Review a change, a commit or a PR | `ponytail-review` | review |
| Audit the whole repo | `ponytail-audit` | audit |
| List `shortcut:` comments as a debt ledger | `ponytail-debt` | debt |
| Ponytail's measured savings | `ponytail-gain` | gain |
| Ponytail quick reference | `ponytail-help` | help |
| /caveman, "caveman mode", "be brief", "less tokens"; "stop caveman" / "normal mode" turns it off | `caveman` | caveman |
| Recommend Claude Code automations, set up Claude Code for a project | `claude-automation-recommender` | setup |

## Modes that stay on

- `caveman` stays on for the whole session once turned on, until "stop caveman" or "normal mode".
- `ponytail` keeps its level (lite, full, ultra) until the user changes it. Its plugin hooks are not installed, so the level is not tracked between sessions.

`karpathy-guidelines` and `ponytail` point the same way (smallest correct change). Use both together; where ponytail is stricter, follow ponytail only when it is on.

## Skills mentioned by their old names

Modules name each other by their old skill names (`/ponytail-review`, `/caveman`, ...): those are the modules of the same name here, run through `/recurso-pickler <module>`. `ultracave` and `megacave`, named by `caveman`, are not installed.
