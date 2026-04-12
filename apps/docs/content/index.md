---
title: Recruitt Hub
navigation: false
---

::hero
---
title: Welcome to Recruitt
description: The next-generation AI recruitment platform. This documentation is your central hub for the architecture, APIs, and components that power the Turborepo ecosystem.
icon: lucide:rocket
---
#links
  :::u-button
  ---
  icon: lucide:server
  to: /server/overview
  size: xl
  color: lime
  ---
  Server Reference
  :::

  :::u-button
  ---
  icon: lucide:monitor
  to: /web/overview
  size: xl
  color: neutral
  variant: outline
  ---
  Web Reference
  :::

#code
```bash [Terminal]
# 1. Clone the monorepo
git clone https://github.com/Yves-Developer/recruitt.git
cd recruitt

# 2. Install workspace dependencies
pnpm install

# 3. Spin up the entire ecosystem
pnpm dev
```
::

<br>

::card-grid
#title
Monorepo Architecture
#description
Recruitt is structured as a fast, scalable Turborepo composed of the following core layers.

  :::card
  ---
  icon: lucide:server-cog
  title: Express Backend (apps/server)
  description: Robust RESTful API built with Express.js, integrating MongoDB via Mongoose and utilizing @google/generative-ai.
  to: /server/overview
  ---
  :::

  :::card
  ---
  icon: lucide:monitor-smartphone
  title: Next.js Web (apps/web)
  description: High-performance frontend leveraging Next.js 16 App Router, Tailwind CSS v4, and Redux Toolkit.
  to: /web/overview
  ---
  :::

  :::card
  ---
  icon: lucide:component
  title: Shared UI (@repo/ui)
  description: A centralized repository of reusable React components strictly typed and styled for consistency.
  ---
  :::

  :::card
  ---
  icon: lucide:settings-2
  title: Configurations (@repo/*)
  description: Shared ESLint and TypeScript base settings mapped seamlessly to all monorepo packages.
  ---
  :::
::

<br>

### The Development Flow

::list
#title
Monorepo Fundamentals

- **Dependency Management** - Powered by `pnpm` workspace functionality to securely hoist node_modules.
- **Microservices Setup** - The `server` and `web` applications are entirely decoupled, connected via strictly typed endpoints.
- **Targeted Compilation** - Use `pnpm dev --filter=server` or `--filter=web` to quickly isolate the development environments.
- **Consistent Typings** - Shared typescript interfaces between `server` and `web` enforce seamless contract bindings.
::

---

### Need assistance?
If you're making modifications to the database models or creating a new complex React component, navigate to their respective documentation sections above to see the established patterns for this project.
