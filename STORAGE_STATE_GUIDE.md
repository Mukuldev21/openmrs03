# OpenMRS Test Implementation - Storage State Configuration

## Module-Specific Storage State Usage

### Module 1: Authentication Tests ❌ NO STORAGE STATE

**File:** `tests/auth-core.spec.ts`

**Reason:** Authentication tests MUST NOT use storage state because:
1. We are testing the login/logout functionality itself
2. Using storage state would bypass the authentication flow
3. Each test needs to verify the complete login/logout sequence
4. Storage state would invalidate the purpose of these tests

**Implementation:** Each test performs full login sequence:
- Navigate to login page
- Enter credentials
- Submit login form
- Verify successful authentication

---

### Modules 2-10: Other Tests ✅ CAN USE STORAGE STATE

For non-authentication tests (Modules 2-10), storage state **should** be used to:
- Avoid repeated login operations
- Speed up test execution
- Focus tests on the functionality being tested

**How to implement for future modules:**

1. **Create auth setup file** (e.g., `tests/auth.setup.ts`):
```typescript
import { test as setup } from '@playwright/test';
import { LoginDetails } from './fixtures/Logindetails';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Username' }).fill(LoginDetails.validUser.username);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(LoginDetails.validUser.password);
  await page.getByRole('button', { name: 'Log In' }).click();
  
  // Wait for successful login
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await page.waitForTimeout(5000);
  
  // Save storage state
  await page.context().storageState({ path: authFile });
});
```

2. **Update playwright.config.ts**:
```typescript
export default defineConfig({
  projects: [
    // Setup project that runs ONCE before all tests
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    
    // Authentication tests - NO storage state
    {
      name: 'Module 1: Authentication',
      testMatch: /auth.*\.spec\.ts/,
      // NO storageState - tests login itself
    },
    
    // Other modules - USE storage state
    {
      name: 'Module 2-10: Other Tests',
      testMatch: /(?!auth).*\.spec\.ts/, // All except auth tests
      dependencies: ['setup'],
      use: {
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],
});
```

---

## Current Configuration

**File:** `playwright.config.ts`

**Status:** ✅ Correct - No storage state configured

Our current configuration correctly does NOT use storage state, which is appropriate for Module 1 authentication tests.

---

## Best Practices

### ✅ DO Use Storage State For:
- UI tests that assume user is logged in
- Tests for modules 2-10 (non-authentication features)
- Performance optimization (avoid repeated logins)
- Integration tests requiring authenticated state

### ❌ DO NOT Use Storage State For:
- Authentication tests (Module 1)
- Login/logout functionality tests
- Session management tests
- Security tests related to authentication
- Any test validating the login flow itself

---

## Verification

To verify no storage state is being used in Module 1 tests:

```bash
# Search for storageState in project
grep -r "storageState" tests/auth*.spec.ts
# Should return no results

# Search in playwright config
grep "storageState" playwright.config.ts
# Should return no results (currently)
```

✅ **Confirmed:** No storage state is used in Module 1 authentication tests.
