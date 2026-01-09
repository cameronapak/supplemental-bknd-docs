## Task 18.0: Schema Permissions (v0.20.0)

### What I learned:
- **Schema permissions protect sensitive operations**: Reading and modifying application schema requires `system.schema.read` permission
- **Module-level context filtering**: The `system.schema.read` permission supports optional `module` context filter to restrict access to specific modules (e.g., `data` only, excluding `auth` or `system`)
- **Protected endpoints**: Schema-related endpoints like `/api/system/schema`, `/api/data/schema`, `/api/system/config` are all protected by this permission
- **Default user roles lack schema access**: Default roles typically do not have `system.schema.read` permission for security reasons
- **Schema Security section placement**: In schema.md, the Schema Security section should be placed before Admin Configuration section (line 841)
- **Documentation already existed**: auth-module.md already had comprehensive Schema Permissions section (lines 349-409), so task was primarily about ensuring schema.md also had the documentation
- **Security best practices**: Schema access should be restricted to admin roles only, as schema operations expose application structure and configuration

## Task 19.0: License Update - Apache 2.0

### What I learned:
- Bknd is licensed under Apache-2.0 license (verified from GitHub repo)
- Apache-2.0 is permissive license allowing commercial use, modification, and distribution
- When updating docs for license changes, update both README.md (description + dedicated section) and docs/index.md (Official Resources section)
- License information should be prominent in documentation repositories to set clear expectations for users
- Always verify license from official sources (GitHub LICENSE.md file, not just assumptions)

## Task 17.0: MCP Navigation (v0.20.0)

### What I learned:
- **MCP (Model Context Protocol)** is an open standard introduced by Anthropic in November 2024 for connecting AI applications to external systems
- **MCP server in Bknd**: Built-in experimental feature that enables AI assistants and IDEs to interact with Bknd instances
- **Enabling MCP**: Can be enabled via config (`config.server.mcp.enabled: true`) or through Admin UI (Settings → Server → Mcp checkbox)
- **MCP access points**:
  - MCP UI: `/mcp` (relative to Admin UI basepath)
  - Admin UI menu: Click user menu (top right) → MCP
  - MCP API endpoint: `/api/system/mcp` (independent of Admin path)
- **Route-aware configuration**:
  - Admin UI path controlled by `config.server.admin.basepath` (default: `/admin`)
  - MCP UI always at `{adminBasepath}/mcp`
  - MCP API endpoint always at `/api/system/mcp`
  - Example: If admin basepath is `/my-admin`, then MCP UI is `/my-admin/mcp`
- **MCP transports**: Bknd supports both Streamable HTTP (`/api/system/mcp`) and STDIO (`npx bknd mcp`) transports
- **Authentication**: MCP uses same authentication as main API (JWT tokens), ensuring permissions work consistently
  - HTTP: Pass `Authorization: Bearer <token>` header to client
  - STDIO: Use `--token <token>` or `BEARER_TOKEN` environment variable
- **External tool integration**: MCP can be used with IDEs and AI assistants like Cursor, VS Code, Claude Desktop through config files
- **Dynamic tool generation**: Bknd MCP server automatically generates tools and resources from schema-defined entities, Hono routes, and manual definitions
- **Built-in MCP client**: Bknd provides `McpClient` from `bknd/utils` for direct usage without external clients
- **Experimental status**: MCP is currently experimental in v0.20.0 and may change in future versions
- **Documentation update locations**:
  - `docs/architecture-and-concepts/how-bknd-works.md`: Added MCP section to Request Lifecycle
  - `docs/reference/schema.md`: Added Admin Configuration section with MCP settings
  - Integration guides: Updated Admin UI sections to mention MCP availability and configuration

## Task 4.0: Auth Module Updates (v0.20.0)

### What I learned:
- **Source code verification is critical**: Use opensrc to fetch package source and verify actual implementation before updating docs
  - Task descriptions may contain outdated information (e.g., "password length is hardcoded" was incorrect for v0.20.0)
  - Search source for actual configuration options (e.g., `minLength` in PasswordStrategy.ts)
  - Verify permission names from SystemPermissions exports
- **New auth config options in v0.20.0**:
  - `default_role_register` - Set default role for newly registered users (must match configured role)
  - `minLength` in password config - Configurable password minimum length (default: 8, minimum: 1)
- **Schema permissions**: Schema operations protected by `system.schema.read` permission with optional module context filter
- **logout endpoint**: Supports `redirect` query parameter to override configured `pathLoggedOut`
- **Documentation update workflow**:
  1. Read existing file to understand structure
  2. Use opensrc to verify implementation details
  3. Update configuration tables with new options
  4. Remove outdated TODO notes
  5. Add examples for new features

## Task 6.0: React SDK Updates (v0.20.0)

### What I learned:
- **`useApi()` hook provides direct access to API modules**: The `api` object includes `data`, `auth`, `media`, and `system` modules
- **Direct API usage vs. hooks**: While `useAuth()` provides `logout()` method, you can also access `api.auth.logout()` directly through `useApi()`
- **Auth API logout behavior**: Calls `/api/auth/logout` endpoint with `Accept: application/json` header to prevent redirect, then triggers `onTokenUpdate` callback to clear token
- **Documentation organization**: When documenting SDK methods, show both hook-level convenience methods (like `useAuth().logout()`) and direct API access (like `api.auth.logout()`)
- **React SDK already had logout documented**: Task 6.0 items 6.2 and 6.3 were already complete - only needed to add direct API usage documentation in `useApi()` section

## Task 5.0: Data Module Updates (v0.20.0)

### What I learned:
- **readOneBy method**: Alternative to findOne that uses findMany with limit: 1 internally
   - Supports more query options (where, select, join, with) compared to findOne
   - Excludes limit, offset, and sort (automatically set to limit: 1, offset: 0)
   - Returns same result structure as findOne
   - Use case: When you need field selection or joins in single-record queries
- **Auto-join behavior**: Automatic joins triggered when filtering by related entity fields
   - Uses dot notation in where clause (e.g., `{"author.username": "john"}`)
   - Bknd automatically adds necessary joins behind the scenes
   - Checks if related field exists in relationship before adding join
   - Index warnings triggered for non-indexed related fields
   - Performance considerations: Auto-joins are convenient but may load unnecessary data; manual joins with explicit field selection can be more efficient
- **uploadToEntity overwrite parameter**: Media API method for uploading files to entity fields
   - `overwrite` parameter (boolean) controls behavior when file already exists
   - Default (overwrite not set): Error if file exists
   - `overwrite: true`: Replaces existing file with new one
   - Use case: Allow replacing profile pictures, cover images, etc. in update operations
- **Documentation structure**: When adding new methods, place them logically near related methods
   - readOneBy placed after findOne (both are single-record read methods)
   - Auto-join section added after Eager Loading Relations (both relate to joins)
   - Media Uploads added to Mutator API (Media API accessed through app.media)

## Task 16.0: Auto-Join Documentation (v0.20.0)

### What I learned:
- **Auto-join implementation details**:
  - Triggered when using dot notation in where clause (e.g., `{"posts.title": "value"}`)
  - Automatically validates that related entity exists and has a defined relationship
  - Checks if field exists on related entity before adding join
  - Adds join to validated options when filter conditions are processed (line 146 in Repository.ts)
  - Throws InvalidSearchParamsException if relation doesn't exist or field is invalid
- **Performance implications of auto-join**:
  - Auto-join loads all columns from related table by default
  - Can use explicit `join` parameter with `select` to load only needed columns
  - Index warnings are issued for non-indexed related fields (checkIndex method)
  - Best practice: Add `.index()` to fields used in auto-join filters
  - Consider using `with` parameter for eager loading vs filtering
- **Auto-join in media relationships**:
  - Works with polymorphic relations (polyToOne, polyToMany)
  - Can filter by media fields like mime_type, width, height
  - Useful for finding entities with specific media types
  - Same performance considerations apply - use explicit joins with select for optimization
- **Documentation organization**:
  - Auto-join section placed in Filtering section of query-system.md (logical location)
  - Performance considerations added as dedicated section with examples
  - Media-specific auto-join examples added to entity-media-relationships.md
  - Cross-referenced best practices between general query docs and media-specific docs

## Task 14.0 & 15.0: Hybrid Mode Improvements (v0.20.0)

### What I learned:
- **Reader returns objects improvement (v0.20.0)**:
  - The `reader` function in hybrid mode now accepts objects directly, not just strings
  - Previously required `JSON.parse()` on string return values
  - Now can return objects directly from async functions, enabling direct JSON imports
  - Simplifies config loading: `reader: async () => (await import("./config.json")).default`
  - Backwards compatible with string returns (still works with `reader` from adapters)
- **sync_required flag behavior**:
  - Flag is set by `ModuleHelper.ts` when schema changes are detected (lines 29, 40, 44, 62, 70)
  - Triggers automatic schema sync in hybrid mode during development (not in production)
  - Checked in `hybrid.ts` line 78: `if (ctx.flags.sync_required && !isProd && syncSchemaOptions.force)`
  - Allows seamless schema updates during development without manual sync commands
  - Reset to false after sync completes (ModuleHelper.ts lines 40, 44)
- **Better config handling**:
  - Production validation is skipped for performance improvement (hybrid.ts line 74: `skipValidation: isProd`)
  - Configuration is loaded from file using `reader` function (hybrid.ts line 50-51)
  - If no config file found, default config is created automatically (hybrid.ts line 54)
  - `writer` function is required for type/config syncing to work
  - Secrets are merged into configuration from `secrets` option
- **Documentation approach**:
  - Added "New in v0.20.0" section at top of Hybrid Mode section for visibility
  - Provided separate code example showing v0.20.0 improvements with detailed comments
  - Updated existing "Hybrid mode helper" section with v0.20.0 annotations
  - Added reference to hybrid mode in build-your-first-api.md production note
  - Marked items as completed in tasks-bknd-v0.20.0-docs-update.md
- **Key implementation details**:
  - `isProduction` flag determines mode: `db` in dev, `code` in production (hybrid.ts line 70)
  - `syncSchemaOptions.force` controls whether sync happens when `sync_required` is true
  - Config file path defaults to "bknd-config.json" but can be customized via `configFilePath`
  - Types file path defaults to "bknd-types.d.ts" but can be customized via `typesFilePath`