# OpenMRS 3.x Service Queues E2E Tests

This project contains end-to-end (E2E) tests for the OpenMRS 3.x Service Queues module using Playwright.

## About OpenMRS

[OpenMRS](https://openmrs.org/) is an open-source platform that supplies users with a customizable electronic medical record system, widely used in healthcare settings around the world.

## About This Project (`openmrs03`)

This repository (`openmrs03`) is focused on automated testing for the Service Queues feature in OpenMRS 3.x. It uses Playwright and the Page Object Model to ensure robust, maintainable, and scalable test coverage.

## Project Structure

```
openmrs03/
├── fixtures/         # Test data and reusable fixtures
│   └── Logindetails.ts
├── pages/            # Page Object Model classes for UI pages
│   ├── BasePage.ts
│   ├── HomePage.ts
│   └── LoginPage.ts
├── tests/            # Playwright test specs
│   ├── auth.spec.ts
│   └── example.spec.ts
├── playwright.config.ts  # Playwright configuration
├── package.json          # Project dependencies and scripts
├── testplan.md           # Manual test plan and scenarios
└── README.md             # Project documentation
```

## Technologies Used

- **Playwright**: For browser automation and E2E testing
- **TypeScript**: For type-safe test and page object code
- **GitHub Actions**: For CI/CD and test reporting

## About `testplan.md`

The `testplan.md` file contains a comprehensive manual test plan for the Service Queues module. It outlines:
- Test case IDs and descriptions
- Preconditions and postconditions
- Step-by-step instructions
- Expected results for each scenario

This file serves as both a reference for manual testers and a blueprint for automated test coverage.

## How to Run Tests

1. Install dependencies:
   ```
   npm install
   ```
2. Run all tests:
   ```
   npx playwright test
   ```
3. View HTML report:
   ```
   npx playwright show-report
   ```

## Notes
- Test data is managed in `fixtures/Logindetails.ts`.
- Page objects are in the `pages/` folder for maintainability.
- Test results and reports are available in the `playwright-report/` directory after each run.
- The test plan in `testplan.md` helps ensure all critical user journeys are covered.

---
Simple, effective, and easy to extend for new test cases.
