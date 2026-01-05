## Bknd vs PocketBase Feature Comparison

PocketBase is powerful and paved the way for single-executable backends. 

In this document, I want to explore the comparison and contrast of Bknd versus PocketBase. 

### Core Architecture & Tech Stack

| Dimension | Bknd | PocketBase |
|-----------|------|------------|
| **Programming Language** | TypeScript/JavaScript | Go |
| **Architecture Philosophy** | Modular, composable, embeddable | All-in-one, standalone service |
| **Deployment Approach** | Embeddable, standalone, serverless | Standalone service (single binary) |
| **Web Standards** | Based on WinterTC Minimum Common Web Platform API | Custom Go implementation |
| **Package Size** | ~300KB gzipped (minimal) | ~15MB (single executable) |

### Database Support

| Dimension | Bknd | PocketBase |
|-----------|------|------------|
| **SQLite Family** | ✅ LibSQL, Node SQLite, Bun SQLite, Cloudflare D1, SQLocal | ✅ SQLite 3 (built-in) |
| **PostgreSQL** | ✅ Vanilla Postgres, Supabase, Neon, Xata | ❌ Not supported |
| **Extensibility** | Extensible via adapter pattern | Limited to SQLite |

### Runtimes & Deployment Environments

| Dimension | Bknd | PocketBase |
|-----------|------|------------|
| **Node.js** | ✅ 22+ | ❌ Not supported |
| **Bun** | ✅ 1.0+ | ❌ Not supported |
| **Deno** | ✅ | ❌ Not supported |
| **Browser** | ✅ | ❌ Not supported |
| **Cloudflare Workers/Pages** | ✅ | ❌ Not supported |
| **Vercel/Netlify** | ✅ | ❌ Requires external container |
| **AWS Lambda** | ✅ | ❌ Requires external container |
| **Docker** | ✅ | ✅ |
| **Standalone** | ✅ CLI mode | ✅ Primary mode |

### Core Feature Modules

| Dimension | Bknd | PocketBase |
|-----------|------|------------|
| **Data Module** | ✅ Modular design, RLS support | ✅ Entity system, RLS |
| **Auth Module** | ✅ Multi-strategy (password, OAuth, custom) | ✅ Password, OAuth |
| **Media Module** | ✅ Multiple storage backends (S3, R2, Cloudinary, local) | ✅ Local file storage |
| **Workflows** | ✅ Flows system | ❌ Not built-in |
| **MCP Integration** | ✅ Server, client, UI | ❌ Not supported |

### Frontend Integration

| Dimension | Bknd | PocketBase |
|-----------|------|------------|
| **React Integration** | ✅ Embeddable Admin UI, React Elements | ❌ External admin interface |
| **Next.js** | ✅ Full integration | ❌ Requires separate deployment |
| **React Router** | ✅ Full integration | ❌ Requires separate deployment |
| **Astro** | ✅ Full integration | ❌ Requires separate deployment |
| **TypeScript SDK** | ✅ Type-safe, SWR integrated | ⚠️ JavaScript SDK |
| **React Hooks** | ✅ useApi, useEntity, useApiQuery, useEntityQuery | ⚠️ Basic SDK |
| **Auto-config Components** | ✅ Media.Dropzone, login/register forms | ❌ Manual build required |

### API & Developer Experience

| Dimension | Bknd | PocketBase |
|-----------|------|------------|
| **REST API** | ✅ Complete OpenAPI spec | ✅ REST API |
| **Real-time Features** | ⚠️ Requires custom implementation (event-based) | ✅ Built-in realtime subscriptions |
| **Type Safety** | ✅ Full TypeScript support | ⚠️ JavaScript SDK only |
| **Database Migrations** | ✅ Schema builder, version management | ✅ Built-in migrations |
| **Query Language** | ✅ EntityManager, chainable API | ✅ Concise query syntax |
| **Permissions System** | ✅ RLS + RBAC + custom permissions | ✅ RLS |

### Extensibility & Flexibility

| Dimension | Bknd | PocketBase |
|-----------|------|------------|
| **Plugin System** | ✅ AppPlugin architecture | ⚠️ JavaScript hooks |
| **Event System** | ✅ Complete event architecture | ⚠️ Basic hooks |
| **Custom Adapters** | ✅ Database, storage, runtime adapters | ⚠️ Limited extension |
| **Middleware** | ✅ Hono-based | ⚠️ Basic support |
| **Custom Logic** | ✅ Add routes in same app | ⚠️ Requires external service |

### Use Case Comparison

**Bknd is better for:**
- ✅ Deployment in Serverless environments (Cloudflare, Vercel, Lambda)
- ✅ Full frontend-backend integration (Next.js, React Router)
- ✅ Need for PostgreSQL or multi-database support
- ✅ Building AI Agent-integrated applications (built-in MCP)
- ✅ Need for flexible workflow automation
- ✅ Require extreme type safety and TypeScript support
- ✅ Need for embeddable backend (runs inside frontend frameworks)
- ✅ Multi-tenant SaaS applications

**PocketBase is better for:**
- ✅ Simple scenarios needing single-file deployment
- ✅ Applications with built-in real-time requirements
- ✅ Small teams or personal projects
- ✅ Rapid prototyping (simpler setup)
- ✅ No dependency on specific cloud service providers

### Key Differences Summary

1. **Architecture Philosophy**: Bknd is a modular, composable "collection of primitives," while PocketBase is a complete all-in-one solution

2. **Deployment Flexibility**: Bknd runs anywhere (from browser to edge computing), PocketBase primarily as a standalone service

3. **Developer Experience**: Bknd provides deep TypeScript integration and React components, PocketBase is simpler but with weaker type support

4. **Extensibility**: Bknd's adapter pattern allows customization of nearly everything, PocketBase extensions are more limited

5. **Learning Curve**: Bknd offers more flexible configuration but higher complexity, PocketBase is simpler out-of-the-box

6. **Ecosystem**: Bknd integrates with modern web development ecosystem (React, Next.js, Serverless), PocketBase is self-contained

In short, Bknd is a flexible backend primitive designed for the modern serverless and edge computing era, while PocketBase is a traditional monolithic backend service—each serving different use cases and development philosophies.
