# Hello World App — AI Agent Instructions

## Tech Stack
React 19 + Vite 7 + TailwindCSS 4 + React Router + TanStack Query
NestJS 11 + Prisma 6 + PostgreSQL
Single Docker image (NestJS serves React SPA)

## Coding Standards
- TypeScript strict mode, no any types
- One NestJS module per entity
- Frontend: pages in src/pages/, hooks in src/hooks/
- Git: conventional commits, feature branches from main

## Build Verification
Run after every code change. Max 5 retries.
1. Frontend: npm run lint && npm run build
2. Backend: npm run lint && npm test && npm run build
3. Prisma: npx prisma validate && npx prisma generate
4. Docker: docker compose up -d --build
5. Health check: curl -f http://localhost:3000/api/health
6. Cleanup: docker compose down

## Parent Task Context
- **Task:** Scaffold monorepo structure + Prisma schema
- **Objective:** Initialize the monorepo with frontend/, backend/, Dockerfile, docker-compose.yml, CLAUDE.md, CI workflow, and Prisma User model
- **Scope:** Not specified
- **Acceptance Criteria:** - Monorepo structure matches web-project-scaffold template
- Dockerfile multi-stage build present
- docker-compose.yml with postgres + healthcheck
- Prisma schema with User model
- CLAUDE.md present
- .github/workflows/ci.yml present
