---
name: pickler-animations
description: "Pickler's animation toolkit: one entry point for every motion task. Use when asked to animate something, add motion or a transition, make a component feel alive; for React Native / Expo animations, gestures, sheets and haptics; when an animation is janky or drops frames; to name a motion effect ('what is it called when...'); to review animation code; to audit all the motion in a codebase; or to find places that should animate and places that should not."
argument-hint: "[module] [task], e.g. animate the menu | expo | performance | vocabulary | review | improve | opportunities"
---

# Pickler animations

Seven animation skills merged into one. Each original lives unchanged in `modules/<name>/`, and its instructions are in `modules/<name>/GUIDE.md` (the file that used to be its `SKILL.md`).

## How to use a module

1. Pick the module from the table below. When a request fits more than one, use the first match in table order.
2. Read `modules/<name>/GUIDE.md` and follow it. Treat `modules/<name>/` as that module's skill base directory: its relative links and reference files resolve from there.
3. Load other modules only when the task really needs them.

If the user names a module (`/pickler-animations review`, "use animate"), use that one.

## Modules

| Request | Module | Alias |
|---|---|---|
| Name a motion effect from a vague description | `animation-vocabulary` | vocabulary |
| Animation drops frames, stutters, is janky; which property to animate; `will-change` | `animation-performance` | performance |
| Animation in React Native or Expo: Reanimated, gestures, sheets, haptics, screen transitions | `animate-expo` | expo |
| Review existing animation code or a diff strictly | `review-animations` | review |
| Audit all the motion in a codebase and plan fixes (changes nothing) | `improve-animations` | improve |
| Find what should and should not animate (changes nothing) | `find-animation-opportunities` | opportunities |
| Build a web animation, transition or motion from scratch | `animate` | animate |

`review-animations` was an invoke-only skill: use it when the user asks for an animation review, not on every animation change.

## Skills mentioned by their old names

Modules name each other by their old skill names (`animate`, `review-animations`, ...): those are the modules of the same name here. `emil-design-eng`, `apple-design` and `mobile-native` are modules of the `pickler-design-skill` skill.
