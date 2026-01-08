# Learnings

## Task 1.3: "Choose Your Mode" Decision Tree

### Bknd Mode Terminology
- **UI-only mode** (default): Configuration stored in database (`__bknd` config table), managed through Admin UI. Internally referred to as "db mode" in `options.mode: "db"`.
- **Code-only mode**: Configuration from initial config object, immutable. `options.mode: "code"`.
- **Hybrid mode**: Combine both - visual dev (db mode) + code production (code mode) with automatic mode switching.

### CLI Commands
- Export config: `npx bknd config --out appconfig.json` (not `export` subcommand)
- Export secrets: `npx bknd secrets --out .env.local --format env`
- Generate types: `npx bknd types --out bknd-types.d.ts`
- Sync database: `npx bknd sync --force`

### Mode Helpers
Bknd provides `code()` and `hybrid()` helpers from `bknd/modes` that:
- Automatically sync config, types, and secrets
- Handle mode switching automatically in hybrid mode
- Skip config validation in production for performance
- Require `writer` (and `reader` for hybrid) adapters for syncing

### Schema Syncing
In Code-only mode, schema changes require manual syncing with `npx bknd sync --force`. The `--force` flag is required for schema mutations.

## Task 1.5: "Create First User" Guide

### Key Discovery: Multiple User Creation Methods

Bknd provides three distinct ways to create users, each suited for different use cases:

1. **Admin UI**: Visual method (exact workflow unclear - requires testing)
2. **CLI**: Best for initial setup and admin users (`npx bknd user create`)
3. **Programmatic**: For application code (App.createUser, UserPool, EntityManager)

### CLI User Creation Details

The CLI command `npx bknd user create` is well-documented in source code:
- Location: `app/src/cli/commands/user.ts`
- Prompts for: role (optional), email, password
- Validates email format and password length (min 3 characters)
- Returns success message: "Created user: {email}"
- Requires auth enabled and password strategy configured

Additional CLI commands available:
- `npx bknd user update` - Update user password
- `npx bknd user token` - Generate JWT token (Node.js only, not Bun)

### Programmatic User Creation Patterns

Three levels of programmatic control:

1. **Helper method** (simplest):
   ```typescript
   app.createUser({ email, password, role })
   ```

2. **UserPool** (more control):
   ```typescript
   auth.userPool.create("password", { email, strategy_value, role })
   ```

3. **EntityManager** (full control, but requires manual password hashing):
   ```typescript
   em.repo("users").insertOne({ email, strategy, strategy_value })
   ```

### Important Implementation Details

- **Password hashing**: When using EntityManager directly, you must hash passwords using the configured PasswordStrategy
- **strategy_value field**: This field stores the hashed password (for password strategy) or other auth identifiers
- **UserPool.toggleStrategyValueVisibility()**: Internal method that temporarily exposes hidden fields during user creation
- **Role assignment**: Users store role as a string field, not a relation to a separate Role entity

### Auth Configuration Requirements

For user creation to work, auth module needs:
- `enabled: true`
- At least one strategy configured (password, oauth, custom_oauth)
- Entity name defaults to "users" but can be customized

### Unknown Areas Requiring Testing

1. **Admin UI user creation**: Exact workflow unclear - need to test actual UI to document properly
2. **Custom user fields**: How to add custom fields to user entity (beyond default email/role)
3. **OAuth user creation**: How users are created through OAuth providers
4. **Password validation**: Production-ready password requirements (CLI only validates length >= 3)

### Documentation Pattern: Be Explicit About Unknowns

When API/feature behavior is unclear based on available documentation:
- Create a dedicated "What we don't know" section
- Use clear TODO markers
- Provide workarounds if possible
- Encourage community contributions to fill gaps

Example from "Create First User" guide:
```
**Status**: ⚠️ Unable to confirm exact workflow

**What we know:**
- Admin UI is accessible at `/admin` by default
- The Admin UI can manage data including users

**What we don't know:**
- Exact location of user creation in Admin UI
- Required fields in the Admin UI form

**TODO**: This section needs to be updated after testing...
```

### Source Code Locations

Key files for understanding user creation:
- `app/src/cli/commands/user.ts` - CLI user commands
- `app/src/auth/AppUserPool.ts` - UserPool implementation
- `app/src/auth/auth-schema.ts` - Auth configuration schema
- `app/src/auth/auth-entities.ts` - User entity definition

### Next Steps for Better Documentation

1. Test Admin UI user creation to fill unknown details
2. Document custom user field configuration
3. Add examples for OAuth user creation
4. Document password validation best practices for production
5. Create comparison table showing when to use each user creation method
