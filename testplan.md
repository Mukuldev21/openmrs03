# OpenMRS Test Plan - Service Queues Module

## 1. Introduction

### 1.1 Purpose
This test plan defines the comprehensive testing strategy for the OpenMRS Service Queues module, focusing on authentication flows and service queue management functionality.

### 1.2 Scope

#### In Scope
- User authentication (login/logout)
- Service Queues dashboard functionality
- Patient queue management
- Filtering and search capabilities
- Queue metrics and statistics
- Patient movement between queues

#### Out of Scope
- Patient registration workflows
- Clinical documentation
- Reporting modules

### 1.3 Test Environment
- **Application URL:** https://o3.openmrs.org/openmrs/spa/home
- **Test Credentials:** admin / Admin123
- **Browsers:** Chrome, Firefox, Safari (via Playwright)

### 1.4 Testing Approach
- **Architecture:** Page Object Model (POM) with Component Object Model (COM)
- **Framework:** Playwright with TypeScript
- **Standards:** Enterprise SDET standards as defined in [AI_TEST_STANDARDS.md](file:///c:/Users/mukul/Downloads/openmrs03/openmrs03/AI_TEST_STANDARDS.md)
- **Strategy:** Hybrid testing (API + UI) with fixture-based dependency injection

---

## 2. Test Modules

### Module 1: Authentication
**Test Cases:** TC001 - TC015  
**Priority:** Critical  
**Coverage:**
- Valid/invalid login scenarios
- Security testing (SQL injection, XSS)
- Session management
- Logout functionality

### Module 2: Service Queues - Page Load & Navigation
**Test Cases:** TC016 - TC017  
**Priority:** Critical  
**Coverage:**
- Initial page load verification
- Navigation from other modules

### Module 3: Service Queues - Metrics
**Test Cases:** TC018 - TC021  
**Priority:** High  
**Coverage:**
- Checked-in patients metric
- Waiting for metric
- Average wait time metric
- Metrics update validation

### Module 4: Service Queues - Patient Queue Table
**Test Cases:** TC022 - TC027  
**Priority:** Critical  
**Coverage:**
- Table structure validation
- Empty state handling
- Data display verification
- Patient name navigation
- Pagination and sorting

### Module 5: Service Queues - Search & Filter
**Test Cases:** TC028 - TC035  
**Priority:** High  
**Coverage:**
- Patient search functionality
- Service filter
- Status filter
- Combined search and filter
- Filter persistence

### Module 6: Service Queues - Add Patient
**Test Cases:** TC036 - TC041  
**Priority:** High  
**Coverage:**
- Add patient dialog workflow
- Patient search in dialog
- Queue assignment
- Validation handling
- Duplicate prevention

### Module 7: Service Queues - Move Patient
**Test Cases:** TC042 - TC044  
**Priority:** High  
**Coverage:**
- Move patient between queues
- Priority/status updates
- Cancel operations

### Module 8: Service Queues - Queue Operations
**Test Cases:** TC045 - TC050  
**Priority:** Medium  
**Coverage:**
- Clear queue functionality
- Expand/collapse rows
- Overflow menu actions

### Module 9: Service Queues - Wait Time & Priority
**Test Cases:** TC051 - TC056  
**Priority:** Medium  
**Coverage:**
- Wait time display and calculation
- Priority level management
- Status management

### Module 10: Service Queues - Accessibility & Performance
**Test Cases:** TC057 - TC060  
**Priority:** Low  
**Coverage:**
- Keyboard navigation
- ARIA labels
- Page load performance
- Large dataset handling

---

## 3. Test Summary

| Module | Test Cases | Priority | Status |
|--------|-----------|----------|--------|
| Authentication | TC001-TC015 (15) | Critical | Planned |
| Page Load & Navigation | TC016-TC017 (2) | Critical | Planned |
| Metrics | TC018-TC021 (4) | High | Planned |
| Patient Queue Table | TC022-TC027 (6) | Critical | Planned |
| Search & Filter | TC028-TC035 (8) | High | Planned |
| Add Patient | TC036-TC041 (6) | High | Planned |
| Move Patient | TC042-TC044 (3) | High | Planned |
| Queue Operations | TC045-TC050 (6) | Medium | Planned |
| Wait Time & Priority | TC051-TC056 (6) | Medium | Planned |
| Accessibility & Performance | TC057-TC060 (4) | Low | Planned |
| **TOTAL** | **60** | - | - |

---

## 4. Test Execution Strategy

### 4.1 Test Prioritization
1. **Critical (P0):** Authentication, page load, core queue operations
2. **High (P1):** Search, filters, metrics, add/move patient
3. **Medium (P2):** Validation, edge cases, queue operations
4. **Low (P3):** Accessibility, performance

### 4.2 Test Execution Order
1. **Smoke Tests:** TC001, TC016, TC022
2. **Regression Tests:** All functional tests
3. **Security Tests:** TC006, TC007, TC008
4. **Performance Tests:** TC059, TC060
5. **Accessibility Tests:** TC057, TC058

### 4.3 Automation Approach
- **Framework:** Playwright with TypeScript
- **Architecture:** Page Object Model + Component Object Model
- **Fixtures:** Custom fixtures for dependency injection
- **Data Management:** Separate fixture files for test data
- **Reporting:** Playwright HTML reporter

---

## 5. Test Data Requirements

### 5.1 User Credentials
- Valid user: admin / Admin123
- Invalid user scenarios
- Special characters and security test payloads
- Empty field scenarios

### 5.2 Patient Queue Data
- Patient records with various priorities (Urgent, Normal, Low)
- Different queue types (Triage, Consultation, Laboratory)
- Various statuses (Waiting, In Progress, Completed)
- Wait time scenarios

### 5.3 Test Environment Data
- Multiple patients in queue for table testing
- Empty queue state for edge case testing
- Large dataset (100+ patients) for performance testing

---

## 6. Entry and Exit Criteria

### 6.1 Entry Criteria
- Test environment is available and stable
- Test data is prepared
- Test credentials are valid
- Page Object Model structure is implemented
- Playwright framework is configured

### 6.2 Exit Criteria
- All critical and high priority tests are executed
- 95% of test cases pass
- All critical defects are resolved
- Test execution report is generated
- Stakeholder sign-off is obtained

---

## 7. Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Test environment instability | High | Medium | Use stable test environment, implement retry logic |
| Dynamic element IDs | Medium | High | Use data-testid attributes, semantic locators |
| Test data dependencies | Medium | Medium | Use API for data seeding, implement cleanup |
| Flaky tests | Medium | High | Implement proper waits, use Playwright auto-wait |
| Browser compatibility | Low | Low | Test on multiple browsers using Playwright projects |

---

## 8. Defect Management

### 8.1 Defect Severity Levels
- **Critical:** Application crash, data loss, security vulnerability
- **High:** Core functionality broken, major feature unusable
- **Medium:** Feature partially working, workaround available
- **Low:** UI/UX issues, minor inconsistencies

### 8.2 Defect Reporting
All defects will be logged with:
- Test case ID reference
- Steps to reproduce
- Expected vs actual results
- Screenshots/videos
- Environment details

---

## 9. Deliverables

- Test Plan document (this document)
- [Test Cases document](file:///c:/Users/mukul/Downloads/openmrs03/openmrs03/testcases.md) with detailed steps
- Page Object Model classes
- Component Object Model classes
- Test fixtures and data files
- Test execution reports
- Defect reports

---

## 10. References

- [AI_TEST_STANDARDS.md](file:///c:/Users/mukul/Downloads/openmrs03/openmrs03/AI_TEST_STANDARDS.md) - Enterprise testing standards
- [testcases.md](file:///c:/Users/mukul/Downloads/openmrs03/openmrs03/testcases.md) - Detailed test case specifications
- [implementation_plan.md](file:///C:/Users/mukul/.gemini/antigravity/brain/254631c1-0a74-4de6-819d-e24f1eb639c5/implementation_plan.md) - Technical implementation plan

---

**Document Version:** 1.0  
**Last Updated:** 2025-12-19  
**Author:** Senior SDET  
**Status:** Approved
