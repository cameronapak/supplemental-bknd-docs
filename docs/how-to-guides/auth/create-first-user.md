# Create Your First User

Learn how to create users in Bknd using different methods. Users are stored in the entity configured for authentication (default: `users`).

## Prerequisites

Before creating users, ensure:
- [ ] Auth module is enabled in your `bknd.config.ts`
- [ ] A password strategy is configured
- [ ] Your database is initialized and schema is synced

## Method 1: Admin UI

**Status**: ⚠️ Unable to confirm exact workflow

The Admin UI provides a visual interface for managing users, but the exact steps are currently unclear. Based on available information:

**What we know:**
- Admin UI is accessible at `/admin` by default
- The Admin UI can manage data including users
- It provides a full graphical user interface for backend management

**What we don't know:**
- Exact location of user creation in the Admin UI (specific tab or menu)
- Required fields in the Admin UI form
- Whether users are created under a dedicated "Users" section or within the general Data module

**Next steps:**
- Visit `http://localhost:3000/admin` (or your configured admin path)
- Look for tabs or sections related to "Users", "Authentication", or "Data"
- Check if there's a "Create User" or similar button

**TODO**: This section needs to be updated after testing the Admin UI user creation flow. If you have experience using the Admin UI to create users, please contribute.

## Method 2: CLI (Recommended for First User)

Use the CLI to create users quickly, especially for your initial admin user.

### Step 1: Create User Command

Run the following command in your project directory:

```bash
npx bknd user create
```

### Step 2: Provide User Information

The CLI will prompt you for:

1. **Role** (optional): Select from configured roles or choose `<none>`
   ```
   Select role
   > admin
   > editor
   > viewer
   > <none>
   ```

2. **Email**: Enter the user's email address
   ```
   Enter email
   > admin@example.com
   ```

3. **Password**: Enter a password (minimum 3 characters)
   ```
   Enter password
   > ••••••
   ```

### Step 3: Confirmation

If successful, you'll see:

```
✓ Created user: admin@example.com
```

### Using CLI Options

You can also specify configuration file and database URL:

```bash
npx bknd user create --config ./bknd.config.ts --db-url file:./database.db
```

### Requirements

- **Auth module must be enabled**: The command will fail if `auth.enabled: false`
- **Password strategy must be configured**: The command requires a password strategy
- **Node runtime**: Some commands (like token generation) require Node.js runtime

### Additional CLI Commands

```bash
# Update a user's password
npx bknd user update

# Generate a JWT token for a user (Node.js only)
npx bknd user token
```

## Method 3: Programmatic (Custom Applications)

For creating users programmatically in your application code.

### Using App.createUser()

Bknd provides a helper method on the App instance:

```typescript
import { createApp } from "bknd";

const app = createApp(config);
await app.build();

// Create a user with email/password
const user = await app.createUser({
  email: "user@example.com",
  password: "hashed_password_here",
  role: "admin", // optional
});

console.log(user); // { id, email, role, ... }
```

### Using AppUserPool Directly

For more control, use the UserPool from the Auth module:

```typescript
const auth = app.module.auth;

// Create a user with password strategy
const user = await auth.userPool.create("password", {
  email: "user@example.com",
  strategy_value: "hashed_password_here", // Required: stores email/password hash
  role: "admin", // optional
  profile: { // optional additional fields
    name: "John Doe"
  }
});

console.log(user);
```

### Using EntityManager

For full control, use the EntityManager directly:

```typescript
const em = app.modules.ctx().em;
const usersRepo = em.repository("users");

// Note: You must hash passwords yourself when using EntityManager
const user = await usersRepo.insertOne({
  email: "user@example.com",
  strategy: "password",
  strategy_value: "hashed_password_here", // This field must be set
  role: "admin",
});

console.log(user);
```

**Important**: When using EntityManager directly, you must hash passwords using the configured strategy:

```typescript
import { PasswordStrategy } from "bknd/auth";

const strategy = new PasswordStrategy({
  hashing: "sha256", // or "bcrypt"
});

const hashedPassword = await strategy.hash("plaintext_password");

// Then use hashedPassword in your user creation
```

## Troubleshooting

### "Auth is not enabled"

```
✗ Auth is not enabled
```

**Solution**: Enable the auth module in your `bknd.config.ts`:

```typescript
export default {
  config: {
    auth: {
      enabled: true, // ← Set to true
      // ... other auth config
    }
  }
} satisfies BkndConfig;
```

### "Password strategy not configured"

```
✗ Password strategy not configured
```

**Solution**: Configure the password strategy in your auth config:

```typescript
export default {
  config: {
    auth: {
      enabled: true,
      strategies: {
        password: {
          type: "password",
          enabled: true,
          config: {
            hashing: "sha256", // or "bcrypt" (planned)
          },
        },
      },
    }
  }
} satisfies BkndConfig;
```

### "Invalid password" (CLI validation)

```
✗ Invalid password
```

**Solution**: The CLI requires passwords to be at least 3 characters. Use a stronger password in production.

### "User not found" (CLI update/token)

```
✗ User not found
```

**Solution**: Check that the user exists in your database:

```bash
# Verify database contains the user
sqlite3 database.db "SELECT email FROM users;"
```

## Next Steps

After creating your first user:

1. **Test authentication**: Use the CLI to generate a token:
   ```bash
   npx bknd user token
   ```

2. **Set up roles and permissions**: Configure roles in your `bknd.config.ts`:
   ```typescript
   export default {
     config: {
       auth: {
         roles: {
           admin: {
             permissions: ["*"], // Full access
           },
           user: {
             permissions: ["data.entity.read"],
           }
         }
       }
     }
   } satisfies BkndConfig;
   ```

3. **Protect your API**: Use the Guard to protect endpoints
4. **Create a signup form**: Use `bknd/elements` for pre-built auth components

## Related Documentation

- [Auth Module](../reference/auth-module.md) - Complete auth module documentation
- [Add Authentication](../getting-started/add-authentication.md) - Full authentication tutorial
- [Enable Public Access with Guard](./public-access-guard.md) - Configure permission-based access
- [Choose Your Mode](./setup/choose-your-mode.md) - Understanding configuration modes
