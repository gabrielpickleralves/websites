---
name: pickler-design-skill
description: "Pickler's design toolkit: one entry point for every frontend design task. Use when designing, redesigning, critiquing, auditing or polishing a website, landing page, dashboard, component, form or native screen; when a page looks generic, templated or AI-made; for typography, color, layout, hierarchy, UX copy, accessibility and responsive behavior; Apple-style gestures, springs and materials; making a web app feel native on a phone; stress-testing UI with worst-case data; building UI variants to compare; picking a UI library; working with Sonner toasts; recreating a UI mock image as static HTML; and drawing a typed wireframe of a screen. For animation and motion use pickler-animations."
argument-hint: "[module] [task], e.g. impeccable critique index.html | taste | emil | apple | mobile | break | prototype | library | sonner | img-to-html | wireframe"
---

# Pickler design skill

Eleven design skills merged into one. Each original lives unchanged in `modules/<name>/`, and its instructions are in `modules/<name>/GUIDE.md` (the file that used to be its `SKILL.md`).

## How to use a module

1. Pick the module from the table below. When a request fits more than one, use the first match in table order.
2. Read `modules/<name>/GUIDE.md` and follow it. Treat `modules/<name>/` as that module's skill base directory: its relative links, `references/`, `reference/`, `scripts/` and `assets/` paths resolve from there.
3. Load other modules only when the task really needs them. Do not run several modules' full workflows on one request.

If the user names a module (`/pickler-design-skill emil ...`, "use impeccable"), use that one.

## Modules

| Request | Module | Alias |
|---|---|---|
| Critique, audit, polish, harden, simplify, bolder, quieter, colorize, typeset, layout, onboard, PRODUCT.md / DESIGN.md, native iOS or Android screens | `impeccable` | impeccable |
| Build or restyle a landing page, marketing site, portfolio or product page; "looks generic / AI-made / templated"; art direction | `design-taste-frontend` | taste |
| Component polish and the invisible details: shadows vs borders, spacing, feel, Emil Kowalski's craft rules | `emil-design-eng` | emil |
| Gesture-driven UI, springs, drag, sheets, momentum, translucent materials, Apple-style typography | `apple-design` | apple |
| A web app that must feel native on a phone: sticky hover, 100vh, input zoom, safe areas, tap highlight | `mobile-native` | mobile |
| Stress-test a component with worst-case data (long names, empty lists, huge numbers) | `break-ui` | break |
| Build several different versions of a UI piece behind a picker | `prototype` | prototype |
| Choose a library for a frontend task (charts, toasts, drag and drop, OTP...) | `pick-ui-library` | library |
| Anything with the Sonner toast library | `ask-sonner` | sonner |
| Recreate a UI mock image (PNG/JPG/WebP) as static HTML + CSS + JS, step by step with approval | `img-to-html` | img-to-html |
| A typed ASCII or SVG wireframe of an image or a screen brief | `to-wireframe` | wireframe |

`prototype`, `pick-ui-library`, `img-to-html` and `to-wireframe` were invoke-only skills: use them only when the user explicitly asks for variants, a library choice, a mock recreated as HTML, or a wireframe.

`img-to-html` runs `to-wireframe` in its first step: when it says `$to-wireframe`, follow `modules/to-wireframe/GUIDE.md`. Its optional asset generation calls `openrouter-img`, which is not installed and needs a paid `OPENROUTER_API_KEY`; without it, build backgrounds in CSS and use icon fonts or SVG, and tell the user.

## When modules disagree

- The user's brief wins over every module's taste.
- The more specific module wins: `mobile-native` on mobile details, `apple-design` on gesture physics, `emil-design-eng` on component details, `design-taste-frontend` on a public page's art direction, `impeccable` on process (critique, audit, polish).
- Only `impeccable` runs its context launcher (`modules/impeccable/scripts/impeccable context`). Do not run it for other modules.

## Skills mentioned by their old names

Modules sometimes name other skills. They now live here:

- `animate`, `animate-expo`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-performance`, `animation-vocabulary`: the `pickler-animations` skill, module of the same name.
- `emil-design-eng`, `impeccable`, `design-taste-frontend`, `apple-design`, `mobile-native`, `break-ui`, `prototype`, `pick-ui-library`, `ask-sonner`, `img-to-html`, `to-wireframe`: this skill, `modules/<name>/`.
