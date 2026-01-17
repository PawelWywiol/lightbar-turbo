# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm run dev              # all apps
pnpm run dev:web          # web app only
pnpm run dev:esp          # esp app only

# Build
pnpm run build            # all
pnpm run build:web        # web only
pnpm run build:esp        # esp only

# Quality
pnpm run lint             # biome check --write
pnpm run format           # biome format
pnpm run tsc              # typecheck all

# Unit tests (vitest)
pnpm run test             # all packages (excludes e2e)
pnpm run test:changed     # only tests related to changed files
pnpm run test:cov         # with coverage

# Single test file
cd apps/web && pnpm vitest path/to/file.test.ts --run

# E2E tests (playwright, needs web server running)
pnpm run test:e2e                                # via turbo (CI config)
cd apps/web-e2e && pnpm run test:local-dev       # against local dev server
cd apps/web-e2e && pnpm run test:local-build     # against local build
cd apps/web-e2e && pnpm run test:regression      # @regression + @core only
cd apps/web-e2e && pnpm run debug:local-dev      # debug mode
cd apps/web-e2e && pnpm run show-report          # view last report

# Circular deps check
pnpm run madge

# Embedded firmware (requires PlatformIO CLI: pip install platformio)
cd embedded/esp && pio run              # build firmware
cd embedded/esp && pio run -t upload    # flash to device
cd embedded/esp && pio device monitor   # serial monitor (115200 baud)
pnpm run deploy:apps:esp                # build apps/esp → gzip → embedded/esp/data/
```

## Architecture

Turborepo monorepo with pnpm workspaces.

**Apps:**
- `apps/web` - React 19 + React Router 7 fullstack app (SSR via @react-router/node)
- `apps/esp` - Preact web UI for embedded device (uses @preact/compat for React compatibility)
- `apps/web-e2e` - Playwright e2e tests for web app

**Embedded (git submodule):**
- `embedded/esp` - ESP32-C3 firmware (C, ESP-IDF 5.2.1, PlatformIO)
  - Controls addressable RGB LED strips via RMT peripheral
  - HTTP server serving gzipped web UI from LittleFS
  - WiFi dual-mode (AP + STA), NVS credential storage
  - Frame-based animation system (24 FPS)
  - Binary protocol for streaming frame uploads

**Packages:**
- `packages/config` - shared config and Zod schemas
- `packages/devices` - device management components/hooks
- `packages/ui` - Radix UI + Tailwind components (CVA for variants)
- `packages/utils` - utility functions
- `packages/tsconfig` - shared TS configs

**Key patterns:**
- Web app uses React Router fs-routes convention
- ESP app aliases React to Preact via vite config
- Shared packages imported as `workspace:*`
- Tailwind CSS 4 with @tailwindcss/vite plugin
- Embedded UI pipeline: `apps/esp` builds → gzipped → `embedded/esp/data/public_html/` → flashed to LittleFS

## Code Style

- Biome for linting/formatting (not ESLint)
- Single quotes, trailing commas, semicolons
- 2-space indent, 100 char line width
- Conventional commits enforced via commitlint
