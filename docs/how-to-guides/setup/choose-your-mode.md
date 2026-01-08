# Choose Your Mode

Bknd offers two key decisions to make when setting up your project:

1. **Configuration mode**: How your Bknd app stores and manages configuration
2. **Deployment approach**: How you run and deploy your Bknd backend

## Configuration Modes

Configuration modes determine where and how your Bknd app's configuration (entity schemas, auth settings, media config, etc.) is stored and managed.

### db mode (Default)

Configuration is stored in the database and can be modified at runtime through the Admin UI.

**When to use db mode:**
- **Development**: Rapid prototyping and iteration
- **Content management**: When you want non-technical users to manage schemas
- **Quick starts**: When you don't need strict version control on configuration

**Setup:**
```typescript
import { createApp } from "bknd/adapter";

const app = await createApp({
  connection: { url: "file:data.db" },
  config: {
    data: {
      entities: {/* ... */}
    },
    auth: { enabled: true }
  },
  options: {
    mode: "db"  // This is the default
  }
});
```

**Benefits:**
- Visual configuration through Admin UI
- Runtime changes without code deployment
- Automatic database migrations when configuration changes
- Configuration versioning in the database

**Trade-offs:**
- Configuration changes aren't tracked in git
- Can lead to configuration drift between environments
- Harder to audit changes over time

### code mode

Configuration is loaded from your initial config object and treated as immutable. The app runs in read-only mode.

**When to use code mode:**
- **Production**: Enforce strict version control
- **Serverless/Edge**: When database writes are restricted
- **Multi-tenant SaaS**: When you need predictable, auditable configuration
- **Compliance**: When changes require code review and deployment

**Setup:**
```typescript
import { createApp } from "bknd/adapter";

const app = await createApp({
  connection: { url: "file:data.db" },
  config: {
    data: {
      entities: {/* ... */}
    },
    auth: { enabled: true }
  },
  options: {
    mode: "code",
    readonly: true  // Optional: explicitly set to read-only
  }
});
```

**Benefits:**
- Configuration is version-controlled in git
- Changes require code review and deployment
- Prevents accidental configuration changes
- Easier to audit and roll back changes

**Trade-offs:**
- No runtime configuration changes
- Requires deployment for configuration updates
- Admin UI becomes read-only for configuration

## Deployment Approaches

### CLI Standalone

Run Bknd as a standalone backend service using the CLI. Best for prototyping or when you have multiple frontends sharing one backend.

**Quick start:**
```bash
npx bknd run
```

**Custom configuration:**
```bash
npx bknd run -p 8080  # Custom port
npx bknd run --memory  # In-memory database
```

**When to use:**
- Quick prototyping and exploration
- Shared backend for multiple apps
- Simple deployment scenarios
- Learning Bknd

**What you get:**
- Admin UI at `http://localhost:3000/admin`
- REST API at `http://localhost:3000/api`
- Automatic database creation

### Framework Embedded

Integrate Bknd directly into your framework (Next.js, React Router, Astro, etc.) for a unified full-stack application.

**Next.js example:**
```bash
npx bknd create -i nextjs my-app
cd my-app
npm run dev
```

**When to use:**
- Full-stack applications
- Tight integration with your frontend framework
- Shared server-side logic
- Type safety across full stack

**What you get:**
- Admin UI at `/admin`
- API routes at `/api/[[...bknd]]`
- Direct access to Bknd APIs in server components
- Seamless TypeScript integration

### Serverless/Edge

Deploy Bknd to serverless platforms like Cloudflare Workers, Vercel Edge, or AWS Lambda.

**Cloudflare Workers example:**
```typescript
// src/index.ts
import { createApp } from "bknd/adapter/cloudflare-worker";

const app = await createApp({
  connection: {
    binding: env.DB  // D1 database binding
  },
  config: {
    // ...your config
  }
});

export default {
  fetch: (req, env, ctx) => app.fetch(req)
};
```

**When to use:**
- Global edge deployment
- Pay-per-use pricing
- Serverless architecture
- Low-latency requirements

**What you get:**
- Edge deployment for fast response times
- Automatic scaling
- Platform-specific database adapters (D1, Neon, etc.)
- Cold start optimization

## Recommended Workflow: Mode Switching

A common pattern is to use **db mode in development** and **code mode in production**:

### Development (db mode)

```bash
# Start with Admin UI and runtime configuration
npx bknd run
# or in your framework app with mode: "db"
```

1. Use Admin UI to experiment with schemas
2. Test different configurations
3. Export configuration when ready for production

### Production (code mode)

1. **Export configuration** from development:
```bash
npx bknd config export > appconfig.json
```

2. **Generate environment file**:
```bash
npx bknd config env > .env.example
```

3. **Deploy with code mode**:
```typescript
const app = await createApp({
  connection: { url: process.env.DATABASE_URL },
  config: require('./appconfig.json'),
  options: {
    mode: "code"
  }
});
```

This gives you the flexibility of UI-driven development with the safety and auditability of code-controlled production.

## Decision Tree

Use this flow to decide on your configuration mode:

```
Need runtime configuration changes?
├─ Yes → Use db mode
│   └─ Development or content-managed apps
└─ No → Need strict version control?
    ├─ Yes → Use code mode
    │   └─ Production or compliant environments
    └─ No → Use db mode (default)
        └─ Simple prototypes
```

Use this flow to decide on your deployment approach:

```
Building a full-stack app?
├─ Yes → Framework Embedded
│   └─ Next.js, React Router, Astro, etc.
└─ No → Need global edge deployment?
    ├─ Yes → Serverless/Edge
    │   └─ Cloudflare Workers, Vercel Edge
    └─ No → CLI Standalone
        └─ Prototyping or shared backend
```

## Related Guides

- [Next.js Integration](./integrations/nextjs.md)
- [Database Configuration](../data/seed-database.md)
- [Deployment to Production](../../getting-started/deploy-to-production.md)
- [Cloudflare Workers Guide](./integrations/cloudflare-workers.md)
