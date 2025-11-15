# Test Plan for OpenMRS 3.x Service Queues

**Application URL:** https://o3.openmrs.org/openmrs/spa/home/service-queues

## Overview
This test plan covers the major end-to-end flows for the Service Queues module in OpenMRS 3.x. The goal is to ensure all critical user journeys and system behaviors are validated.

---

## 1. User Authentication

- **TC-01:** Login with valid credentials
	- Preconditions: User has a valid username and password.
	- Steps:
		1. Navigate to the login page.
		2. Enter valid username and password.
		3. Click the 'Login' button.
	- Expected Result: User is redirected to the home page or Service Queues page.
	- Postconditions: User session is active.

- **TC-02:** Login with invalid credentials
	- Preconditions: User is on the login page.
	- Steps:
		1. Enter invalid username or password.
		2. Click the 'Login' button.
	- Expected Result: Error message is displayed; user is not logged in.
	- Postconditions: No session is created.

- **TC-03:** Logout flow
	- Preconditions: User is logged in.
	- Steps:
		1. Click the 'Logout' button or link.
	- Expected Result: User is logged out and redirected to the login page.
	- Postconditions: User session is terminated.

## 2. Navigation

- **TC-04:** Navigate to Service Queues from Home
	- Preconditions: User is logged in and on the home page.
	- Steps:
		1. Locate and click the 'Service Queues' link or menu item.
	- Expected Result: User is navigated to the Service Queues page.
	- Postconditions: Service Queues page is displayed.

- **TC-05:** Verify Service Queues page loads correctly
	- Preconditions: User is on the Service Queues page.
	- Steps:
		1. Observe the page layout and content.
	- Expected Result: All expected UI elements (queue list, actions, filters) are visible and functional.
	- Postconditions: Page is ready for interaction.

## 3. Queue Management

- **TC-06:** View all available service queues
	- Preconditions: User is on the Service Queues page.
	- Steps:
		1. Observe the list of queues displayed.
	- Expected Result: All existing queues are listed with relevant details.
	- Postconditions: User can see all queues.

- **TC-07:** Create a new service queue
	- Preconditions: User has permission to create queues.
	- Steps:
		1. Click the 'Create Queue' button.
		2. Fill in required queue details (name, location, service, etc.).
		3. Click 'Save' or 'Create'.
	- Expected Result: New queue appears in the list.
	- Postconditions: Queue is available for use.

- **TC-08:** Edit an existing service queue
	- Preconditions: At least one queue exists; user has edit permission.
	- Steps:
		1. Select a queue from the list.
		2. Click the 'Edit' button.
		3. Modify queue details as needed.
		4. Click 'Save' or 'Update'.
	- Expected Result: Queue details are updated in the list.
	- Postconditions: Changes are saved.

- **TC-09:** Delete a service queue
	- Preconditions: At least one queue exists; user has delete permission.
	- Steps:
		1. Select a queue from the list.
		2. Click the 'Delete' button.
		3. Confirm the deletion.
	- Expected Result: Queue is removed from the list.
	- Postconditions: Queue is deleted from the system.

- **TC-10:** Search for a specific queue
	- Preconditions: Multiple queues exist.
	- Steps:
		1. Enter search criteria (e.g., queue name) in the search box.
		2. Observe the filtered results.
	- Expected Result: Only queues matching the search criteria are displayed.
	- Postconditions: User can easily find specific queues.

## 4. Patient Management in Queues

- **TC-11:** Add a patient to a queue
	- Preconditions: At least one patient and one queue exist; user has permission to add patients.
	- Steps:
		1. Select a patient from the patient list.
		2. Click 'Add to Queue'.
		3. Select the target queue and confirm.
	- Expected Result: Patient appears in the selected queue.
	- Postconditions: Queue is updated with the new patient.

- **TC-12:** Remove a patient from a queue
	- Preconditions: At least one patient is in a queue.
	- Steps:
		1. Select the patient in the queue.
		2. Click 'Remove from Queue'.
		3. Confirm the removal.
	- Expected Result: Patient is removed from the queue.
	- Postconditions: Queue no longer lists the patient.

- **TC-13:** Move a patient between queues
	- Preconditions: At least two queues exist; patient is in one queue.
	- Steps:
		1. Select the patient in the current queue.
		2. Click 'Move to Another Queue'.
		3. Select the target queue and confirm.
	- Expected Result: Patient is removed from the original queue and added to the target queue.
	- Postconditions: Patient is listed in the new queue only.

- **TC-14:** View patient details from queue
	- Preconditions: At least one patient is in a queue.
	- Steps:
		1. Click on the patient's name or details icon in the queue.
	- Expected Result: Patient details are displayed in a modal or new page.
	- Postconditions: User can view all relevant patient information.

- **TC-15:** Mark patient as served
	- Preconditions: At least one patient is in a queue.
	- Steps:
		1. Select the patient in the queue.
		2. Click 'Mark as Served'.
	- Expected Result: Patient is removed from the active queue and marked as served.
	- Postconditions: Queue reflects the change.

## 5. Queue Operations

- **TC-16:** Start a queue session
	- Preconditions: At least one queue exists; user has permission to start sessions.
	- Steps:
		1. Select a queue.
		2. Click 'Start Session'.
	- Expected Result: Queue session is started and status is updated.
	- Postconditions: Queue is active.

- **TC-17:** End a queue session
	- Preconditions: Queue session is active.
	- Steps:
		1. Select the active queue.
		2. Click 'End Session'.
		3. Confirm the action.
	- Expected Result: Queue session is ended and status is updated.
	- Postconditions: Queue is inactive.

- **TC-18:** Pause and resume a queue
	- Preconditions: Queue session is active.
	- Steps:
		1. Select the active queue.
		2. Click 'Pause'.
		3. Confirm the action.
		4. Click 'Resume' to reactivate the queue.
	- Expected Result: Queue status changes to paused and then back to active.
	- Postconditions: Queue can be paused and resumed as needed.

## 6. Filtering and Sorting

- **TC-19:** Filter queues by location/service
	- Preconditions: Multiple queues exist with different locations/services.
	- Steps:
		1. Select a location or service from the filter options.
	- Expected Result: Only queues matching the selected filter are displayed.
	- Postconditions: Filtered view is shown.

- **TC-20:** Sort queues by name, size, or status
	- Preconditions: Multiple queues exist with varying names, sizes, or statuses.
	- Steps:
		1. Click the sort option (name, size, status).
	- Expected Result: Queues are sorted according to the selected criterion.
	- Postconditions: Sorted view is shown.

## 7. Permissions and Roles

- **TC-21:** Access control for queue management (admin vs. regular user)
	- Preconditions: At least two user roles exist (admin, regular user).
	- Steps:
		1. Log in as an admin and attempt to manage queues.
		2. Log in as a regular user and attempt the same actions.
	- Expected Result: Admin can manage queues; regular user has restricted access.
	- Postconditions: Permissions are enforced.

- **TC-22:** Attempt restricted actions as unauthorized user
	- Preconditions: User is logged in with limited permissions.
	- Steps:
		1. Attempt to perform a restricted action (e.g., delete queue).
	- Expected Result: Action is blocked and an error or warning is shown.
	- Postconditions: No unauthorized changes are made.

## 8. Notifications and Alerts

- **TC-23:** Receive notification when patient is added/removed
	- Preconditions: User is logged in and has notification permissions.
	- Steps:
		1. Add or remove a patient from a queue.
	- Expected Result: Notification is displayed to the user about the action.
	- Postconditions: User is informed of queue changes.

- **TC-24:** System alert for queue errors or conflicts
	- Preconditions: System is running; possible error or conflict scenario exists.
	- Steps:
		1. Trigger an error or conflict (e.g., add same patient twice).
	- Expected Result: System displays an alert or error message.
	- Postconditions: User is aware of the issue.

## 9. Error Handling

- **TC-25:** Handle network/server errors gracefully
	- Preconditions: System is online; simulate network/server failure.
	- Steps:
		1. Attempt any queue operation during a network/server outage.
	- Expected Result: User sees a clear error message and is not blocked from other actions when connection is restored.
	- Postconditions: System recovers gracefully.

- **TC-26:** Validate required fields when creating/editing queues
	- Preconditions: User is creating or editing a queue.
	- Steps:
		1. Leave one or more required fields blank.
		2. Attempt to save the queue.
	- Expected Result: Validation error is shown and queue is not saved.
	- Postconditions: Data integrity is maintained.


## 10. UI/UX

- **TC-27:** Responsive design on different devices
	- Preconditions: User has access to devices with different screen sizes (desktop, tablet, mobile).
	- Steps:
		1. Open the Service Queues page on various devices or use browser tools to simulate.
	- Expected Result: UI adapts and remains usable on all screen sizes.
	- Postconditions: No layout or usability issues.

- **TC-28:** Accessibility checks (screen reader, keyboard navigation)
	- Preconditions: User has access to a screen reader and/or keyboard-only navigation.
	- Steps:
		1. Navigate the Service Queues page using only the keyboard.
		2. Use a screen reader to read page content.
	- Expected Result: All interactive elements are accessible and labeled; content is readable.
	- Postconditions: Application meets accessibility standards.

## 11. Session Management

- **TC-29:** Session persists after page refresh
	- Preconditions: User is logged in and on the Service Queues page.
	- Steps:
		1. Add a patient to a queue or perform any queue action.
		2. Refresh the browser page.
	- Expected Result: The user remains logged in, and the queue state is preserved after refresh.
	- Postconditions: Session and queue data are consistent.

- **TC-30:** Automatic logout after inactivity/timeout
	- Preconditions: User is logged in.
	- Steps:
		1. Remain inactive for the configured session timeout period.
	- Expected Result: User is automatically logged out and redirected to the login page.
	- Postconditions: Session is terminated securely.

## 12. Bulk Actions

- **TC-31:** Bulk add patients to a queue
	- Preconditions: Multiple patients exist in the system; user has permission to add patients.
	- Steps:
		1. Select multiple patients from the patient list.
		2. Choose 'Add to Queue' and select the target queue.
		3. Confirm the action.
	- Expected Result: All selected patients are added to the queue.
	- Postconditions: Queue reflects the new patients.

- **TC-32:** Bulk remove patients from a queue
	- Preconditions: Queue contains multiple patients.
	- Steps:
		1. Select multiple patients in the queue.
		2. Choose 'Remove from Queue'.
		3. Confirm the action.
	- Expected Result: All selected patients are removed from the queue.
	- Postconditions: Queue is updated accordingly.

- **TC-33:** Bulk mark patients as served
	- Preconditions: Queue contains multiple patients.
	- Steps:
		1. Select multiple patients in the queue.
		2. Choose 'Mark as Served'.
		3. Confirm the action.
	- Expected Result: All selected patients are marked as served and removed from the active queue.
	- Postconditions: Queue reflects the changes.

## 13. Data Export/Import

- **TC-34:** Export queue data to CSV/Excel
	- Preconditions: User is on the Service Queues page with at least one queue present.
	- Steps:
		1. Click the 'Export' button.
		2. Select CSV or Excel format.
		3. Download the file.
	- Expected Result: File is downloaded with correct queue data.
	- Postconditions: No data is changed in the system.

- **TC-35:** Import patients into a queue from file
	- Preconditions: User has a valid import file (CSV/Excel) with patient data; user has permission to add patients.
	- Steps:
		1. Click the 'Import' button on the queue page.
		2. Upload the file.
		3. Confirm the import.
	- Expected Result: Patients from the file are added to the selected queue.
	- Postconditions: Queue is updated with new patients.

## 14. Integration

- **TC-36:** Integration with patient registration module
	- Preconditions: Patient registration module is enabled.
	- Steps:
		1. Register a new patient.
		2. Attempt to add the patient to a queue.
	- Expected Result: Newly registered patient is available for queue assignment.
	- Postconditions: Patient appears in queue and registration records.

- **TC-37:** Integration with appointment scheduling
	- Preconditions: Appointment scheduling module is enabled.
	- Steps:
		1. Schedule an appointment for a patient.
		2. Add the patient to a relevant queue.
	- Expected Result: Patient's queue status reflects appointment details.
	- Postconditions: Queue and appointment data are consistent.

- **TC-38:** Integration with reporting/analytics
	- Preconditions: Reporting/analytics module is enabled.
	- Steps:
		1. Complete several queue operations (add, serve, remove patients).
		2. Generate a report/analytics dashboard.
	- Expected Result: Reports accurately reflect queue activity.
	- Postconditions: Data is available for analysis.

## 15. Audit and History

- **TC-39:** View audit log of queue actions
	- Preconditions: User has permission to view audit logs.
	- Steps:
		1. Navigate to the audit log section.
		2. Filter logs by queue or user.
	- Expected Result: All queue actions (add, remove, edit) are logged and visible.
	- Postconditions: Audit trail is maintained.

- **TC-40:** View patient queue history
	- Preconditions: Patient has been in at least one queue.
	- Steps:
		1. Open patient details.
		2. View queue history tab/section.
	- Expected Result: All queue assignments and actions for the patient are listed chronologically.
	- Postconditions: History is accurate and complete.

## 16. Localization/Internationalization

- **TC-41:** Display UI in different supported languages
	- Preconditions: Application supports multiple languages.
	- Steps:
		1. Change language in user or system settings.
		2. Navigate to Service Queues page.
	- Expected Result: All UI elements are displayed in the selected language.
	- Postconditions: Language preference is retained.

- **TC-42:** Handle date/time and number formats per locale
	- Preconditions: Application supports locale-based formatting.
	- Steps:
		1. Change locale in user or system settings.
		2. View queue and patient data.
	- Expected Result: Dates, times, and numbers are formatted per locale.
	- Postconditions: Formatting is consistent throughout the UI.

## 17. Performance and Load

- **TC-43:** Load test with large number of queues/patients
	- Preconditions: Test environment with ability to create many queues/patients.
	- Steps:
		1. Populate system with a large number of queues and patients.
		2. Perform typical queue operations (add, remove, serve).
	- Expected Result: System remains stable and responsive.
	- Postconditions: No data loss or crashes.

- **TC-44:** Response time under heavy usage
	- Preconditions: Multiple users performing actions simultaneously.
	- Steps:
		1. Simulate concurrent users managing queues.
		2. Measure response times for key actions.
	- Expected Result: Response times meet performance requirements.
	- Postconditions: System performance is acceptable.

## 18. API Validation

- **TC-45:** Validate queue management via API
	- Preconditions: API access is enabled and documented.
	- Steps:
		1. Use API client to create, edit, and delete queues.
		2. Verify changes in the UI.
	- Expected Result: API actions are reflected in the application.
	- Postconditions: Data integrity is maintained.

- **TC-46:** Validate patient queue actions via API
	- Preconditions: API access is enabled and documented.
	- Steps:
		1. Use API client to add, remove, and serve patients in queues.
		2. Verify changes in the UI.
	- Expected Result: API actions are reflected in the application.
	- Postconditions: Data integrity is maintained.

---

## Notes
- Each test case should include preconditions, steps, expected results, and postconditions.
- Regression and smoke tests should be derived from these major flows.
- Update this plan as new features are added to the Service Queues module.
