# OpenMRS Test Automation - NPM Scripts Guide

## Available Test Scripts

### 1. Run All Tests (Parallel Execution - Default)
```bash
npm run test
```
- Runs all test files in parallel for faster execution
- Uses default Playwright workers (based on CPU cores)
- Project: "OpenMRS E2E Test"
- ⚠️ **Note:** Module 1 authentication tests may have conflicts in parallel mode

### 2. Run Tests Sequentially (Recommended for Module 1)
```bash
npm run test:sequential
```
- Runs tests one at a time (sequential execution)
- Uses 1 worker to avoid session conflicts
- **Recommended for:** Module 1 (Authentication tests)
- Slower but safer for tests that modify shared state

### 3. Run Specific Module or Test Case
```bash
npm run test -- --grep="Module 1"
npm run test:sequential -- --grep="Module 1"
```
```bash
npm run test -- --grep="TC012"
```
- Use `--grep` to filter tests by module name or test case ID
- **For Module 1:** Prefer `npm run test:sequential -- --grep="Module 1"`
- Examples:
  - `npm run test:sequential -- --grep="Module 1"` - Run all Module 1 tests (sequential)
  - `npm run test -- --grep="TC012"` - Run only TC012 test (parallel OK)
  - `npm run test -- --grep="Authentication"` - Run all authentication tests
  - `npm run test -- --grep="TC001|TC002"` - Run multiple specific tests

### 4. Run Tests with Visual Browser (Headed Mode)
```bash
npm run test:headed
```
- Opens browser window to watch tests execute
- Useful for debugging and development

### 4. Debug Mode
```bash
npm run test:debug
```
- Opens Playwright Inspector for step-by-step debugging
- Set breakpoints and inspect page state

###5. Interactive UI Mode
```bash
npm run test:ui
```
- Opens Playwright UI for interactive test running
- View test results, screenshots, traces
- Rerun individual tests

### 6. View Test Report
```bash
npm run test:report
```
- Opens the HTML test report from last run
- View detailed test results, screenshots, traces

## Examples

### Parallel Execution (Fast - For Most Tests)
```bash
# Run all tests in parallel
npm run test

# Run specific module in parallel (if no session conflicts)
npm run test -- --grep="Module 2"

# Run multiple non-auth tests in parallel
npm run test -- --grep="TC016|TC017|TC018"
```

### Sequential Execution (Safe - For Authentication Tests)
```bash
# Run all tests sequentially
npm run test:sequential

# Run Module 1 authentication tests (recommended)
npm run test:sequential -- --grep="Module 1"

# Run specific auth test sequentially
npm run test:sequential -- --grep="TC001"
```

### Run All Module 1 Authentication Tests (Sequential - Recommended)
```bash
npm run test:sequential -- --grep="Module 1"
```

### Run Specific Test Cases
```bash
# Single test (parallel)
npm run test -- --grep="TC001"

# Single auth test (sequential - recommended)
npm run test:sequential -- --grep="TC001"

# Multiple tests
npm run test -- --grep="TC001|TC002|TC011"

# All login tests (sequential for Module 1)
npm run test:sequential -- --grep="Login"

# All security tests
npm run test -- --grep="TC006|TC007|TC008|TC009"
```

### Debug a Specific Test
```bash
npm run test:debug -- --grep="TC012"
```

### Run Tests with Browser Visible
```bash
npm run test:headed -- --grep="Authentication"
```

## Parallel vs Sequential: When to Use Which?

### Use Parallel (`npm run test`)
✅ **When:**
- Running Module 2-10 tests (non-authentication)
- Tests don't share session state
- Want faster execution
- Running in CI/CD pipeline (most cases)

**Benefits:**
- 3-5x faster execution
- Better resource utilization
- Ideal for large test suites

### Use Sequential (`npm run test:sequential`)
✅ **When:**
- Running Module 1 (Authentication tests)
- Tests modify shared session state
- Debugging test failures
- Tests have timing dependencies

**Benefits:**
- No session conflicts
- Predictable execution order
- Easier to debug issues
- Required for auth tests

## Performance Comparison

| Test Suite | Sequential | Parallel | Speedup |
|------------|-----------|----------|---------|
| Module 1 (14 tests) | 3.9 min | N/A* | - |
| Module 2-10 | ~10 min | ~2-3 min | 3-4x |
| All Modules | ~15 min | ~5-6 min | 2.5-3x |

*Module 1 must run sequentially to avoid session conflicts

## CI/CD Integration

### For Parallel Execution (Recommended)
```bash
npm run test
```
This will run all tests in parallel for faster CI/CD pipelines.

### For Sequential Execution (If Needed)
```bash
npm run test:sequential
```
Use this if you encounter session conflicts in CI/CD.

### Module-Specific CI/CD
```bash
# Authentication tests (sequential)
npm run test:sequential -- --grep="Module 1"

# Other modules (parallel)
npm run test -- --grep="Module 2|Module 3"
```

## Notes

- **Parallel execution** is now the default for faster test runs
- **Module 1 (Authentication)** tests should use `npm run test:sequential` to avoid session conflicts
- Tests use environment variables from `.env` file
- No storage state is used for Module 1 (Authentication tests)
- Execution time: 
  - Sequential (Module 1): ~3.9 minutes for 14 tests
  - Parallel (all tests): Estimated 2-3x faster for modules 2-10

## Troubleshooting

If you see `npm warn Unknown cli config "--grep"`, you can ignore it. The flag still works correctly and will be passed to Playwright.

Alternative syntax (if needed):
```bash
npx playwright test --grep="TC001" --project="OpenMRS E2E Test" --workers=1
```
