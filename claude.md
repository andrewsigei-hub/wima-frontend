# Frontend — Guest House Website

## Tech Stack

- Framework: React 19 + React Router 7
- Build tool: Vite 7
- Styling: Tailwind CSS 4 (via `@tailwindcss/postcss`) + Autoprefixer
- Icons: lucide-react
- Third-party: react-google-reviews
- Linting: ESLint 9 (flat config, react-hooks + react-refresh plugins)

## Structure

- `src/components/` — shared UI components
- `src/lib/` — public-facing API wrapper (calls the Flask backend)
- `src/admin/` — separate admin panel
  - `src/admin/context/`
  - `src/admin/components/`
  - `src/admin/lib/`
- `dist/` — build output. Never hand-edit; never treat as source of truth.

Keep the public site and the admin panel cleanly separated. Admin components import from `src/admin/lib`, not `src/lib`, unless explicitly sharing a utility — and if you do share one, it belongs in `src/lib`, not duplicated in both places.

## Design Recreation Workflow

When given a reference image (screenshot, mockup, Figma export) and asked to build or match a page/section:

1. **Generate** the React component(s) using Tailwind utility classes. Follow the existing project structure — new UI goes in `src/components/` (or `src/admin/components/` for admin work), not as one-off inline pages.
2. **Screenshot** the rendered result (Puppeteer against the local Vite dev server, or equivalent) at the relevant breakpoint(s).
3. **Compare** the screenshot against the reference. Check for mismatches in:
   - Spacing and padding (measure in px)
   - Font sizes, weights, and line heights
   - Colors (exact hex/oklch values — Tailwind 4 uses CSS variables, so check the actual computed color, not just the class name)
   - Alignment and positioning
   - Border radii, shadows, and effects
   - Responsive behavior (mobile-first — check at minimum: mobile, tablet, desktop)
   - Icon sizing and placement (lucide-react icons)
4. **Fix** every mismatch found. Edit the component code.
5. **Re-screenshot** and compare again.
6. **Repeat** steps 3–5 until the result is within ~2–3px of the reference everywhere.

Do NOT stop after one pass. Always do at least 2 comparison rounds. Only stop when the user says so or when no visible differences remain.

## Rules

- Do not add features, sections, or content not present in the reference image.
- Match the reference exactly — do not "improve" the design unprompted. If you see a genuine usability issue, flag it separately rather than silently changing the design.
- If the user provides CSS classes, Tailwind tokens, or a design system/style guide, use them verbatim.
- Keep code clean but don't over-abstract — a component doesn't need to be split into five files on day one. Inline Tailwind classes are fine.
- When comparing screenshots, be specific about what's wrong (e.g., "heading is 32px but reference shows ~24px", "gap between cards is 16px but should be 24px").
- Use placeholder images from `https://placehold.co/` only when real source images aren't provided yet — flag clearly that they're placeholders.
- Respect the existing component structure and naming conventions already in the codebase before introducing new patterns.

## Technical Defaults

- Mobile-first responsive design.
- New pages/routes go through React Router 7 — check `src/` for how routes are currently organized before adding new ones.
- Icons: use `lucide-react`, not inline SVGs or another icon library, unless a needed icon doesn't exist in the set.
- Run ESLint before considering a change done; fix warnings, don't suppress them without a reason.
