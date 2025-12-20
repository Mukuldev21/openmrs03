# OpenMRS Test Cases - Service Queues Module

**Version:** 1.0  
**Last Updated:** 2025-12-19  
**Total Test Cases:** 59

---

## Module 1: Authentication

| TC ID | Test Case Title | Priority | Type | Preconditions | Test Steps | Expected Results | Test Data |
|-------|----------------|----------|------|---------------|------------|------------------|-----------|
| TC001 | Successful Login with Valid Credentials | Critical | Functional, Smoke | User is on login page | 1. Navigate to login page<br>2. Enter username: admin<br>3. Click Continue<br>4. Enter password: Admin123<br>5. Click Log in | - Redirected to Service Queues page<br>- URL contains /home/service-queues<br>- Service Queues header visible<br>- No error messages | username: admin<br>password: Admin123 |
| TC002 | Login Failure with Invalid Credentials | Critical | Functional, Negative | User is on login page | 1. Navigate to login page<br>2. Enter username: invaliduser<br>3. Click Continue<br>4. Enter password: wrongpassword<br>5. Click Log in | - Error notification displayed<br>- User remains on login page<br>- URL contains /login | username: invaliduser<br>password: wrongpassword |
| TC003 | Login with Empty Username | High | Functional, Validation | User is on login page | 1. Navigate to login page<br>2. Leave username empty<br>3. Click Continue | - Validation error displayed<br>- Continue button disabled OR error message shown<br>- Cannot proceed to password field | username: (empty)<br>password: Admin123 |
| TC004 | Login with Empty Password | High | Functional, Validation | User on password screen | 1. Navigate to login page<br>2. Enter username: admin<br>3. Click Continue<br>4. Leave password empty<br>5. Click Log in | - Validation error displayed<br>- Log in button disabled OR error shown<br>- Form submission prevented | username: admin<br>password: (empty) |
| TC005 | Login with Empty Username and Password | Medium | Functional, Validation | User is on login page | 1. Navigate to login page<br>2. Leave username empty<br>3. Leave password empty<br>4. Attempt to click Continue | - Validation error for username<br>- Form submission prevented<br>- User remains on login page | username: (empty)<br>password: (empty) |
| TC006 | Login with Special Characters in Username | Medium | Security, Negative | User is on login page | 1. Navigate to login page<br>2. Enter username: admin@#$%<br>3. Click Continue<br>4. Enter password: Admin123<br>5. Click Log in | - Login fails with error message<br>- No SQL injection/XSS vulnerabilities<br>- Special characters handled gracefully | username: admin@#$%<br>password: Admin123 |
| TC007 | Login with SQL Injection Attempt | High | Security, Negative | User is on login page | 1. Navigate to login page<br>2. Enter username: admin' OR '1'='1<br>3. Click Continue<br>4. Enter password: ' OR '1'='1<br>5. Click Log in | - Login fails<br>- No database errors exposed<br>- Malicious input handled safely<br>- No system info revealed | username: admin' OR '1'='1<br>password: ' OR '1'='1 |
| TC008 | Login with XSS Attempt | High | Security, Negative | User is on login page | 1. Navigate to login page<br>2. Enter username: &lt;script&gt;alert('XSS')&lt;/script&gt;<br>3. Click Continue<br>4. Enter password: Admin123<br>5. Click Log in | - Script not executed<br>- Input sanitized/escaped<br>- No alert popup<br>- Login fails appropriately | username: &lt;script&gt;alert('XSS')&lt;/script&gt;<br>password: Admin123 |
| TC009 | Login with Very Long Username | Low | Functional, Boundary | User is on login page | 1. Navigate to login page<br>2. Enter 500+ character username<br>3. Click Continue<br>4. Enter password: Admin123<br>5. Click Log in | - Input handled gracefully<br>- Truncated OR validation error<br>- Application doesn't crash<br>- Login fails with message | username: 'a' repeated 500 times<br>password: Admin123 |
| TC010 | Case Sensitivity in Username | Medium | Functional | User is on login page | 1. Navigate to login page<br>2. Enter username: ADMIN (uppercase)<br>3. Click Continue<br>4. Enter password: Admin123<br>5. Click Log in | - Verify case-sensitive behavior<br>- Document expected result<br>- Consistent error handling | username: ADMIN<br>password: Admin123 |
| TC011 | Successful Logout | Critical | Functional, Smoke | User is logged in | 1. Login with valid credentials<br>2. Verify on Service Queues page<br>3. Click user menu button<br>4. Click Logout option | - Redirected to login page<br>- Login form visible<br>- URL contains /login<br>- Session terminated | N/A |
| TC012 | Session Persistence After Page Refresh | High | Functional | User is logged in | 1. Login with valid credentials<br>2. Verify on Service Queues page<br>3. Refresh browser (F5)<br>4. Wait for page reload | - User remains logged in<br>- Service Queues page reloads<br>- No redirect to login<br>- Session data preserved | N/A |
| TC013 | Multiple Failed Login Attempts | Medium | Security, Negative | User is on login page | 1. Attempt login with invalid credentials (5 times)<br>2. Observe behavior after each attempt | - Each attempt shows error<br>- Account lockout may occur (if implemented)<br>- No account enumeration<br>- Activity logged | username: invaliduser<br>password: wrongpassword |
| TC014 | Browser Back Button After Logout | Medium | Security | User is logged in | 1. Login with valid credentials<br>2. Navigate to Service Queues<br>3. Logout successfully<br>4. Click browser back button | - Cannot access protected page<br>- Redirect to login page<br>- Session invalidated<br>- No cached sensitive data | N/A |

---
## Module 2: Service Queues - Page Load & Navigation

| TC ID | Test Case Title | Priority | Type | Preconditions | Test Steps | Expected Results | Test Data |
|-------|----------------|----------|------|---------------|------------|------------------|-----------|
| TC015 | Service Queues Page Initial Load | Critical | Functional, Smoke | User is logged in | 1. Login with valid credentials<br>2. Verify redirect to Service Queues<br>3. Wait for page to fully load | - Page header 'Service queues' visible<br>- Breadcrumb shows 'Clinic'<br>- All metrics cards displayed<br>- Patient queue table visible<br>- Action buttons present<br>- No loading spinners | N/A |
| TC016 | Navigation to Service Queues from Other Modules | High | Functional | User is on different page | 1. Navigate to another module (Appointments)<br>2. Click 'Service queues' in side nav<br>3. Wait for page load | - Service Queues page loads<br>- URL changes to /home/service-queues<br>- Page content displayed correctly<br>- No console errors | N/A |

---

## Module 3: Service Queues - Metrics

| TC ID | Test Case Title | Priority | Type | Preconditions | Test Steps | Expected Results | Test Data |
|-------|----------------|----------|------|---------------|------------|------------------|-----------|
| TC017 | Checked In Patients Metric Display | High | Functional | User is on Service Queues page | 1. Locate 'Checked in patients' card<br>2. Verify card is visible<br>3. Verify 'Patients: X' label<br>4. Verify count is valid number | - Card displays header<br>- Patient count shown as 'Patients: X'<br>- Count is numeric and non-negative<br>- Card properly styled | N/A |
| TC018 | Waiting For Metric Display | High | Functional | User is on Service Queues page | 1. Locate 'Waiting for:' card<br>2. Verify card visible<br>3. Verify 'Patients: X' displayed<br>4. Verify 'Urgent: X' displayed<br>5. Verify dropdown filter present | - Card displays header<br>- Total patients count shown<br>- Urgent patients count shown<br>- Dropdown filter functional<br>- All counts numeric and non-negative | N/A |
| TC019 | Average Wait Time Metric Display | High | Functional | User is on Service Queues page | 1. Locate 'Average wait time today' card<br>2. Verify card visible<br>3. Verify 'Minutes: X' or 'Minutes: --' displayed | - Card displays header<br>- Wait time shown as 'Minutes: X' or '--'<br>- Format is consistent<br>- Card properly styled | N/A |
| TC020 | Metrics Update After Queue Changes | Medium | Functional, Integration | User is on Service Queues page | 1. Note current metrics values<br>2. Add a patient to queue<br>3. Observe metrics cards<br>4. Verify metrics update | - Metrics refresh automatically or after reload<br>- 'Checked in patients' count increases<br>- 'Waiting for' count updates<br>- Changes reflect in real-time | Patient data |

---

## Module 4: Service Queues - Patient Queue Table

| TC ID | Test Case Title | Priority | Type | Preconditions | Test Steps | Expected Results | Test Data |
|-------|----------------|----------|------|---------------|------------|------------------|-----------|
| TC021 | Patient Queue Table Structure | Critical | Functional, Smoke | User is on Service Queues page | 1. Locate patient queue table<br>2. Verify table header<br>3. Verify all column headers present | - Table visible<br>- Columns: Name, Coming from, Priority, Status, Queue, Wait time, Actions<br>- Table properly formatted | N/A |
| TC022 | Empty Queue State | High | Functional | Queue is empty | 1. Navigate to Service Queues with empty queue<br>2. Verify table display | - Table structure visible<br>- Empty state message displayed<br>- No error messages<br>- Action buttons functional | N/A |
| TC023 | Patient Queue Table with Data | Critical | Functional | Queue has patients | 1. Navigate to Service Queues<br>2. Verify patient rows displayed<br>3. Verify each row has data in all columns | - Patient rows visible<br>- Each row shows: name (link), coming from, priority, status, queue, wait time, actions<br>- Data properly aligned | Patient data |
| TC024 | Patient Name Link Navigation | Medium | Functional | Queue has patients | 1. Locate patient row<br>2. Click patient name link<br>3. Verify navigation | - Navigates to patient chart<br>- New page loads with patient details<br>- URL contains patient ID<br>- Back navigation returns to queues | Patient data |
| TC025 | Queue Table Pagination | Medium | Functional | Queue has 100+ patients | 1. Navigate to Service Queues<br>2. Verify pagination controls<br>3. Click next page<br>4. Verify page navigation | - Pagination controls visible<br>- Page numbers displayed<br>- Next/Previous buttons work<br>- Patient count per page consistent | Large dataset |
| TC026 | Queue Table Sorting | Low | Functional | Queue has multiple patients | 1. Click column header (Name, Wait time)<br>2. Verify sorting behavior<br>3. Click again to reverse sort | - Table sorts by selected column<br>- Sort order indicator displayed<br>- Data correctly sorted<br>- Sorting persists during session | Patient data |

---
## Module 5: Service Queues - Search & Filter

| TC ID | Test Case Title | Priority | Type | Preconditions | Test Steps | Expected Results | Test Data |
|-------|----------------|----------|------|---------------|------------|------------------|-----------|
| TC027 | Search Patient by Name | High | Functional | Queue has multiple patients | 1. Locate search box (ID: table-toolbar-search-:rt:)<br>2. Enter patient name or partial name<br>3. Verify search results | - Search box accepts input<br>- Table filters to matching patients<br>- Non-matching patients hidden<br>- Search is case-insensitive<br>- Partial matches supported | Patient data |
| TC028 | Search with No Results | Medium | Functional, Negative | Queue has patients | 1. Enter search term with no matches<br>2. Verify empty state | - Table shows empty state<br>- Message indicates no results<br>- Search can be cleared<br>- No errors occur | Search: 'NonExistentName' |
| TC029 | Clear Search Results | Medium | Functional | Search has been performed | 1. Perform a search<br>2. Clear search box<br>3. Verify table resets | - All patients displayed again<br>- Table returns to original state<br>- Filters remain applied | N/A |
| TC030 | Filter by Service | High | Functional | Queue has patients from different services | 1. Locate Service filter (ID: downshift-:r1k:-toggle-button)<br>2. Click to open dropdown<br>3. Select a service<br>4. Verify filtering | - Dropdown opens with options<br>- Selecting service filters table<br>- Only patients from selected service shown<br>- Filter can be cleared | Service names |
| TC031 | Filter by Status | High | Functional | Queue has patients with different statuses | 1. Locate Status filter (ID: downshift-:rs:-toggle-button)<br>2. Click to open dropdown<br>3. Select a status<br>4. Verify filtering | - Dropdown shows status options<br>- Table filters to selected status<br>- Label shows 'Show patients with status: [selected]'<br>- Multiple selections may be supported | Status values |
| TC032 | Filter by Waiting For | Medium | Functional | Queue has patients | 1. Locate 'Waiting for:' metrics card<br>2. Click dropdown filter (ID: downshift-:r1g:-toggle-button)<br>3. Select an option<br>4. Verify filtering | - Dropdown opens with options<br>- Selecting option filters data<br>- Metrics update accordingly<br>- Filter can be cleared | N/A |
| TC033 | Combined Search and Filter | Medium | Functional, Integration | Queue has multiple patients | 1. Apply service filter<br>2. Apply status filter<br>3. Enter search term<br>4. Verify combined filtering | - All filters work together (AND logic)<br>- Only patients matching ALL criteria shown<br>- Clearing one filter maintains others<br>- Results are accurate | Patient data, filters |
| TC034 | Filter Persistence Across Navigation | Low | Functional | Filters have been applied | 1. Apply filters to queue table<br>2. Navigate to another page<br>3. Return to Service Queues<br>4. Verify filter state | - Filters may reset OR persist<br>- Document expected behavior<br>- Behavior is consistent | N/A |

---

## Module 6: Service Queues - Add Patient

| TC ID | Test Case Title | Priority | Type | Preconditions | Test Steps | Expected Results | Test Data |
|-------|----------------|----------|------|---------------|------------|------------------|-----------|
| TC035 | Open Add Patient to Queue Dialog | Critical | Functional | User is on Service Queues page | 1. Click 'Add patient to queue' button (testid: Search Patient Button)<br>2. Verify dialog opens | - Modal/dialog opens<br>- Patient search interface displayed<br>- Search input field focused<br>- Dialog has close button<br>- Background dimmed | N/A |
| TC036 | Search Patient in Add Dialog | High | Functional | Add patient dialog is open | 1. Enter patient name or ID in search<br>2. Verify search results appear<br>3. Select a patient from results | - Search executes as user types<br>- Matching patients displayed<br>- Patient details shown (name, ID, age)<br>- Clicking patient selects them | Patient search data |
| TC037 | Add Patient to Specific Queue | Critical | Functional | Patient selected in add dialog | 1. Select patient from search results<br>2. Choose queue from dropdown<br>3. Set priority (if applicable)<br>4. Set status (if applicable)<br>5. Click Add/Submit button<br>6. Verify patient added | - Patient appears in queue table<br>- Row shows correct queue, priority, status<br>- Metrics update (checked in count increases)<br>- Success notification displayed<br>- Dialog closes automatically | Patient data, queue data |
| TC038 | Add Patient - Cancel Action | Medium | Functional | Add patient dialog is open | 1. Search for a patient<br>2. Select a patient<br>3. Click Cancel or close button<br>4. Verify dialog closes | - Dialog closes without adding patient<br>- No changes to queue table<br>- No error messages<br>- User returns to Service Queues page | N/A |
| TC039 | Add Patient - Validation Errors | Medium | Functional, Negative | Add patient dialog is open | 1. Attempt to submit without selecting patient<br>2. Attempt to submit without selecting queue<br>3. Verify validation messages | - Validation errors displayed<br>- Required fields highlighted<br>- Submit button may be disabled<br>- Cannot proceed without valid data | N/A |
| TC040 | Add Duplicate Patient to Same Queue | Medium | Functional, Negative | Patient already in a queue | 1. Attempt to add same patient to same queue<br>2. Verify system behavior | - System prevents duplicate OR shows warning<br>- Existing queue entry highlighted<br>- User informed of existing entry | Existing patient data |

---

## Module 7: Service Queues - Move Patient

| TC ID | Test Case Title | Priority | Type | Preconditions | Test Steps | Expected Results | Test Data |
|-------|----------------|----------|------|---------------|------------|------------------|-----------|
| TC041 | Move Patient to Different Queue | High | Functional | Queue has at least one patient | 1. Locate patient row in table<br>2. Click 'Move' button (aria-label='Move')<br>3. Verify move dialog opens<br>4. Select destination queue<br>5. Click confirm/submit<br>6. Verify patient moved | - Move dialog opens<br>- Available queues listed<br>- Selecting queue moves patient<br>- Patient row updates with new queue name<br>- Success notification displayed | Patient data, queue names |
| TC042 | Move Patient - Cancel Action | Medium | Functional | Move dialog is open | 1. Click 'Move' button for a patient<br>2. Move dialog opens<br>3. Click Cancel or close button<br>4. Verify dialog closes | - Dialog closes without moving patient<br>- Patient remains in original queue<br>- No changes to table<br>- No error messages | N/A |
| TC043 | Move Patient - Update Priority/Status | Medium | Functional | Move dialog is open | 1. Open move dialog for a patient<br>2. Change priority level<br>3. Change status<br>4. Submit changes<br>5. Verify updates | - Priority updates in table<br>- Status updates in table<br>- Changes are saved<br>- Wait time may reset or adjust | Patient data, priority/status values |

---
## Module 8: Service Queues - Queue Operations

| TC ID | Test Case Title | Priority | Type | Preconditions | Test Steps | Expected Results | Test Data |
|-------|----------------|----------|------|---------------|------------|------------------|-----------|
| TC044 | Clear Queue - Confirmation Dialog | High | Functional | Queue has patients | 1. Click 'Clear queue' button<br>2. Verify confirmation dialog appears | - Confirmation dialog displayed<br>- Warning message explains action<br>- 'Confirm' and 'Cancel' buttons present<br>- Action not executed until confirmed | N/A |
| TC045 | Clear Queue - Confirm Action | High | Functional | Confirmation dialog is open | 1. Click 'Clear queue' button<br>2. Confirmation dialog appears<br>3. Click 'Confirm' button<br>4. Verify queue cleared | - All patients removed from queue<br>- Table shows empty state<br>- Metrics reset to zero<br>- Success notification displayed<br>- Action logged (if applicable) | N/A |
| TC046 | Clear Queue - Cancel Action | Medium | Functional | Confirmation dialog is open | 1. Click 'Clear queue' button<br>2. Confirmation dialog appears<br>3. Click 'Cancel' button<br>4. Verify queue unchanged | - Dialog closes<br>- Queue remains unchanged<br>- All patients still visible<br>- No notifications | N/A |
| TC047 | Clear Empty Queue | Low | Functional, Edge Case | Queue is already empty | 1. Verify queue is empty<br>2. Click 'Clear queue' button<br>3. Verify system behavior | - Button may be disabled OR action completes without error<br>- Appropriate message shown<br>- No negative side effects | N/A |
| TC048 | Expand All Rows | Low | Functional | Queue has patients with expandable rows | 1. Click 'Expand all rows' button<br>2. Verify all rows expand | - All patient rows expand<br>- Additional details visible<br>- Button text may change to 'Collapse all rows'<br>- Expansion is smooth | Patient data |
| TC049 | Collapse All Rows | Low | Functional | All rows are expanded | 1. Click 'Collapse all rows' button<br>2. Verify all rows collapse | - All expanded rows collapse<br>- Only summary info visible<br>- Button text changes to 'Expand all rows'<br>- Table returns to compact view | N/A |

---

## Module 9: Service Queues - Wait Time & Priority

| TC ID | Test Case Title | Priority | Type | Preconditions | Test Steps | Expected Results | Test Data |
|-------|----------------|----------|------|---------------|------------|------------------|-----------|
| TC050 | Wait Time Display Format | Medium | Functional | Queue has patients | 1. Verify wait time column in table<br>2. Check format of wait time values | - Wait time in consistent format<br>- Format: 'X min', 'X hours Y min', etc.<br>- Time calculated from check-in<br>- Time updates periodically or on refresh | Patient data |
| TC051 | Wait Time Calculation Accuracy | Medium | Functional | Patient has been in queue for known duration | 1. Note patient check-in time<br>2. Calculate expected wait time<br>3. Compare with displayed wait time<br>4. Verify accuracy | - Displayed wait time matches calculation<br>- Time accurate within acceptable margin<br>- Time increases as patient waits<br>- Time resets appropriately when moved | Patient data with timestamps |
| TC052 | Average Wait Time Calculation | Medium | Functional | Multiple patients have been processed | 1. Note individual wait times<br>2. Calculate expected average<br>3. Compare with 'Average wait time today' metric<br>4. Verify accuracy | - Average calculated correctly<br>- Metric updates as patients added/removed<br>- Calculation includes only relevant patients<br>- Display shows '--' when no data | Patient data |
| TC053 | Priority Display in Table | Medium | Functional | Queue has patients with different priorities | 1. Verify priority column in table<br>2. Check priority values (Urgent, Normal, Low)<br>3. Verify visual indicators | - Priority clearly displayed<br>- Visual indicators (colors, icons) differentiate levels<br>- Urgent patients highlighted<br>- Priority is sortable (if sorting available) | Patient data with priorities |
| TC054 | Urgent Patient Count in Metrics | Medium | Functional | Queue has urgent patients | 1. Locate 'Waiting for:' metrics card<br>2. Verify 'Urgent: X' count<br>3. Compare with table data | - Urgent count matches number of urgent patients in table<br>- Count updates when priority changes<br>- Count is accurate and real-time | Patient data with urgent priority |
| TC055 | Status Change Workflow | Medium | Functional | Patient is in queue | 1. Select a patient<br>2. Change status (via Move or Edit action)<br>3. Verify status updates<br>4. Verify metrics update | - Status changes successfully<br>- Table reflects new status<br>- Metrics update accordingly<br>- Change is persisted | Patient data, status values |

---

## Module 10: Service Queues - Accessibility & Performance

| TC ID | Test Case Title | Priority | Type | Preconditions | Test Steps | Expected Results | Test Data |
|-------|----------------|----------|------|---------------|------------|------------------|-----------|
| TC056 | Keyboard Navigation | Medium | Accessibility | User is on Service Queues page | 1. Use Tab key to navigate through elements<br>2. Use Enter/Space to activate buttons<br>3. Use arrow keys in dropdowns<br>4. Verify all interactive elements accessible | - All interactive elements keyboard accessible<br>- Focus indicators visible<br>- Tab order is logical<br>- No keyboard traps<br>- Screen reader announcements appropriate | N/A |
| TC057 | ARIA Labels and Roles | Medium | Accessibility | User is on Service Queues page | 1. Inspect elements with screen reader<br>2. Verify ARIA labels present<br>3. Verify roles are appropriate<br>4. Test with NVDA or JAWS | - All buttons have aria-label or accessible name<br>- Table has proper ARIA roles<br>- Form fields have labels<br>- Dynamic content changes announced<br>- Page structure is semantic | N/A |
| TC058 | Page Load Time | Medium | Performance | User is logged in | 1. Clear browser cache<br>2. Navigate to Service Queues page<br>3. Measure page load time<br>4. Verify performance metrics | - Page loads within acceptable time (< 3 seconds)<br>- First Contentful Paint (FCP) < 1.5s<br>- Time to Interactive (TTI) < 3s<br>- No performance warnings in console | N/A |
| TC059 | Large Queue Performance | Medium | Performance | Queue has 100+ patients | 1. Navigate to Service Queues with large dataset<br>2. Perform search, filter, sort operations<br>3. Measure response times<br>4. Verify UI remains responsive | - Page handles large datasets gracefully<br>- Pagination or virtual scrolling implemented<br>- Operations complete within acceptable time<br>- No browser freezing or lag<br>- Memory usage reasonable | Large dataset (100+ patients) |

---

## Test Case Summary

| Module | Test Cases | Priority Breakdown |
|--------|-----------|-------------------|
| Authentication | TC001-TC014 (14) | Critical: 3, High: 3, Medium: 7, Low: 1 |
| Page Load & Navigation | TC015-TC016 (2) | Critical: 1, High: 1 |
| Metrics | TC017-TC020 (4) | High: 3, Medium: 1 |
| Patient Queue Table | TC021-TC026 (6) | Critical: 2, High: 1, Medium: 2, Low: 1 |
| Search & Filter | TC027-TC034 (8) | High: 3, Medium: 4, Low: 1 |
| Add Patient | TC035-TC040 (6) | Critical: 2, High: 1, Medium: 3 |
| Move Patient | TC041-TC043 (3) | High: 1, Medium: 2 |
| Queue Operations | TC044-TC049 (6) | High: 2, Medium: 1, Low: 3 |
| Wait Time & Priority | TC050-TC055 (6) | Medium: 6 |
| Accessibility & Performance | TC056-TC059 (4) | Medium: 4 |
| **TOTAL** | **59** | **Critical: 8, High: 12, Medium: 31, Low: 8** |

---

**Document Version:** 1.0  
**Last Updated:** 2025-12-19  
**Author:** Senior SDET
