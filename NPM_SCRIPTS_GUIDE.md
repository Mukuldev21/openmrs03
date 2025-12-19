# OpenMRS Test Automation - NPM Scripts Guide

## Available Test Scripts

### 1. Run All Tests
```bash
npm run test
```
- Runs all test files in the project
- Uses 1 worker (sequential execution)
- Project: "OpenMRS E2E Test"

### 2. Run Specific Module or Test Case
```bash
npm run test -- --grep="Module 1"
```
```bash
npm run test -- --grep="TC012"
```
- Use `--grep` to filter tests by module name or test case ID
- Examples:
  - `npm run test -- --grep="Module 1"` - Run all Module 1 tests
  - `npm run test -- --grep="TC012"` - Run only TC012 test
  - `npm run test -- --grep="Authentication"` - Run all authentication tests
  - `npm run test -- --grep="TC001|TC002"` - Run multiple specific tests

### 3. Run Tests with Visual Browser (Headed Mode)
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

### Run All Module 1 Authentication Tests
```bash
npm run test -- --grep="Module 1"
```

### Run Specific Test Cases
```bash
# Single test
npm run test -- --grep="TC001"

# Multiple tests
npm run test -- --grep="TC001|TC002|TC011"

# All login tests
npm run test -- --grep="Login"

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

## CI/CD Integration

For continuous integration, use:
```bash
npm run test
```

This will run all tests sequentially with proper error reporting.

## Notes

- All tests run with `--workers=1` to ensure sequential execution and avoid conflicts
- Tests use environment variables from `.env` file
- No storage state is used for Module 1 (Authentication tests)
- Execution time: ~3.9 minutes for all 14 Module 1 tests

## Troubleshooting

If you see `npm warn Unknown cli config "--grep"`, you can ignore it. The flag still works correctly and will be passed to Playwright.

Alternative syntax (if needed):
```bash
npx playwright test --grep="TC001" --project="OpenMRS E2E Test" --workers=1
```
