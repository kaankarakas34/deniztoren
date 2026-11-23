# DENİZTÖREN.COM

This repository is dedicated to deniztoren.com. Do not copy configuration, issues,
credentials or content from other projects.

Read `docs/master-build-brief.md` and `docs/architecture-and-design-decisions.md`
before implementation. The user's brief takes priority over third-party skills.

- Next.js App Router, TypeScript strict, Tailwind, next-intl.
- No application database, ORM, Redis, Supabase, Firebase or WordPress.
- Keystatic stores content and media in Git. Never expose secrets in client code.
- Public content must exclude drafts, future publications and demo content.
- Do not invent the owner's portrait, biography, credentials or market data.
- Motion is the primary animation engine; native scroll; respect reduced motion.
- Project-local skills are in `.agents/skills/`.
- Use pnpm. Verify `pnpm lint`, `pnpm typecheck`, `pnpm build` after code changes.
- Record incomplete work honestly. Setup completion is not site completion.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
