# Software Requirements Specification

## Nikhil Portfolio & Client Request Platform

**Document version:** 1.1  
**Related document:** `01_PORTFOLIO_PRD.md`

---

## 1. Purpose

This document defines the functional, non-functional, data, interface, security, and operational requirements for Version 1 of the portfolio and client-request platform.

Requirement identifiers are intended to be referenced in design, implementation, and testing.

---

## 2. System Actors

| Actor | Description |
|---|---|
| Visitor | Any person browsing public portfolio content |
| Prospective client | A visitor who submits a project or contact request |
| Administrator | Nikhil, who reviews and manages incoming requests |
| Email provider | External service that sends notifications and confirmations |
| File-storage provider | External service used for approved attachments |
| Analytics provider | Privacy-conscious service used for aggregate usage data |

---

## 3. Functional Requirements

### 3.1 Navigation and public content

- **FR-001:** The system shall provide responsive navigation to Home, Services, Projects, About, Start a Project, and Contact.
- **FR-002:** The system shall display a visible primary call to action above the fold on the homepage.
- **FR-003:** The mobile navigation shall be keyboard accessible and closable by link selection, close control, Escape key, and outside interaction where appropriate.
- **FR-004:** The footer shall display navigation, contact options, social links, and legal links.
- **FR-005:** Public content shall be available without authentication.
- **FR-006:** The system shall display a useful 404 page for unmatched public routes.

### 3.2 Services

- **FR-010:** The system shall list all supported service categories.
- **FR-011:** Each service shall include a client-focused description, example deliverables, and a relevant call to action.
- **FR-012:** Selecting a service-specific call to action shall preselect that service in the project-request form when technically possible.
- **FR-013:** Service names, descriptions, and ordering shall be stored in a centralized content configuration or data source.
- **FR-014:** Version 1 shall offer Website Development, React Development, Backend/API Development, AI Integration, and Technical Fixes/Deployment.
- **FR-015:** Automation shall not appear as a selectable or orderable Version 1 service.
- **FR-016:** The content model shall allow Automation to be introduced as a Version 2 service without changing the project-request data model.

### 3.3 Projects and case studies

- **FR-020:** The system shall display featured project cards with title, summary, image, role, and technology tags.
- **FR-021:** Visitors shall be able to filter projects by category or technology.
- **FR-022:** Each public project shall have a dedicated case-study route.
- **FR-023:** A case study shall support problem, solution, features, technical decisions, challenges, screenshots, and result sections.
- **FR-024:** Live demo and source-code links shall be optional and shall not render when unavailable.
- **FR-025:** External links shall be visually identifiable and opened safely.

### 3.4 About and credibility

- **FR-030:** The About page shall describe professional focus, working approach, relevant skills, and availability.
- **FR-031:** The website shall offer a downloadable résumé only when a current résumé file is configured.
- **FR-032:** The website shall display a truthful skills list without unsupported proficiency claims.
- **FR-033:** Social profiles shall be configurable.

### 3.5 Project request form

- **FR-040:** The system shall provide a multi-step project-request form.
- **FR-041:** The form shall collect service type, project size, budget, requirements, deadline, and contact details.
- **FR-042:** The user shall be able to move backward without losing entered data.
- **FR-043:** The system shall validate required fields before advancing or submitting.
- **FR-044:** Validation errors shall appear next to the relevant field and in an accessible summary when submitted.
- **FR-045:** The final step shall display a review of the entered information.
- **FR-046:** Submission shall require explicit contact consent.
- **FR-047:** The submit control shall be disabled while a submission is being processed.
- **FR-048:** A successful submission shall return a unique human-readable reference number.
- **FR-049:** A successful submission shall redirect to or render a confirmation state.
- **FR-050:** A failed submission shall preserve form data and show a recoverable error message.
- **FR-051:** The form shall offer a “Not sure” or equivalent option where a non-technical visitor may not know the correct answer.
- **FR-052:** The system shall use server-side validation even when client-side validation succeeds.
- **FR-053:** The system shall protect the form from automated spam and excessive requests.
- **FR-054:** The system shall avoid duplicate records caused by repeated clicks or network retries.

### 3.6 Attachments

- **FR-060:** A prospective client may attach screenshots, PDF documents, or common document files.
- **FR-061:** The interface shall display allowed types, maximum file count, and maximum size before upload.
- **FR-062:** The client shall be able to remove a selected file before submission.
- **FR-063:** The server shall verify file type, extension, reported MIME type, and size.
- **FR-064:** Uploaded files shall use generated storage identifiers rather than user-supplied filenames.
- **FR-065:** Attachment metadata shall be associated with the correct project request.
- **FR-066:** If an upload fails, the system shall clearly identify the failed file and avoid creating a misleading successful state.

Recommended V1 policy:

- Maximum 5 files
- Maximum 10 MB per file
- Maximum 25 MB total
- Allowed: PNG, JPEG, WebP, PDF, DOC, DOCX, TXT

### 3.7 Contact options

- **FR-070:** The Contact page shall provide a short contact form.
- **FR-071:** The contact form shall collect name, email, subject, and message.
- **FR-072:** The website shall provide configurable email, GitHub, LinkedIn, and WhatsApp links.
- **FR-073:** The WhatsApp link may include a prefilled introductory message.
- **FR-074:** Public pages shall not expose secrets or private administrative contact data.

### 3.8 Notifications

- **FR-080:** The system shall persist a valid request before attempting to send email.
- **FR-081:** The system shall notify the administrator of each new valid project request.
- **FR-082:** The system shall send a confirmation email to the requester.
- **FR-083:** Email failures shall be logged without deleting the submitted request.
- **FR-084:** The system shall record notification status and retry count.
- **FR-085:** Emails shall avoid including private attachment URLs that bypass authorization.

### 3.9 Admin authentication

- **FR-090:** Admin routes shall require authentication.
- **FR-091:** The administrator shall sign in using configured credentials or a securely stored admin account.
- **FR-092:** Passwords shall be stored only as strong salted hashes.
- **FR-093:** The authenticated session shall use a secure, HTTP-only cookie in production.
- **FR-094:** Login attempts shall be rate limited.
- **FR-095:** The administrator shall be able to sign out and invalidate the active session.
- **FR-096:** No public registration endpoint shall be available in V1.

### 3.10 Admin request management

- **FR-100:** The admin dashboard shall display total requests and counts by important status.
- **FR-101:** The administrator shall be able to list requests in reverse chronological order.
- **FR-102:** The administrator shall be able to paginate results.
- **FR-103:** The administrator shall be able to filter by status, service, budget, and submitted date.
- **FR-104:** The administrator shall be able to search by reference number, name, email, or project title.
- **FR-105:** The request-detail screen shall show all submitted fields and attachment metadata.
- **FR-106:** The administrator shall be able to update request status.
- **FR-107:** The administrator shall be able to add private notes.
- **FR-108:** Status changes and note creation shall retain timestamps.
- **FR-109:** The administrator shall be able to mark a request as spam.
- **FR-110:** Permanent deletion shall not be required in the initial release; archival is preferred.

### 3.11 Analytics and SEO

- **FR-120:** The system shall provide unique title and description metadata for major public pages.
- **FR-121:** The system shall provide canonical URLs, sitemap, robots instructions, favicon, and social-preview metadata.
- **FR-122:** Project case studies shall support structured metadata where appropriate.
- **FR-123:** Analytics shall record page views, CTA clicks, project-form starts, step progress, successful submissions, and errors without recording form content.
- **FR-124:** Admin pages shall not be indexable by search engines.

### 3.12 Premium interaction and motion

- **FR-130:** The public site shall use a shared motion system instead of unrelated component-by-component animations.
- **FR-131:** Route changes shall provide a brief visual transition without delaying navigation or blocking interaction.
- **FR-132:** The hero shall use a coordinated entrance sequence for the label, headline, supporting text, actions, and featured visual.
- **FR-133:** Below-the-fold sections may reveal progressively as they enter the viewport, but their content shall remain available when scripting or animation is unavailable.
- **FR-134:** Buttons, links, cards, filters, navigation, and form controls shall provide polished hover, press, focus, and state-change feedback.
- **FR-135:** Project imagery may use subtle depth or parallax effects only on capable devices and only when it does not harm readability or performance.
- **FR-136:** The multi-step project form shall animate step changes, progress updates, validation, upload progress, and success feedback without causing layout instability.
- **FR-137:** Loading states shall use branded skeletons or progress feedback rather than blank screens.
- **FR-138:** The complete experience shall remain usable with reduced motion enabled.

---

## 4. Business Rules

- **BR-001:** A project request is not a contract or confirmed order.
- **BR-002:** A price range selected by the visitor is informational and does not create a binding quotation.
- **BR-003:** Work begins only after scope, price, timeline, and payment terms are separately agreed.
- **BR-004:** Only the administrator can change request status or internal notes.
- **BR-005:** A request reference number shall not reveal database identifiers or request volume.
- **BR-006:** The system shall not publicly display client submissions.
- **BR-007:** Contact consent is required for project-request submission.
- **BR-008:** Unsupported or suspicious attachments shall be rejected.
- **BR-009:** Automation inquiries received through “Other” may be considered manually, but Automation shall not be marketed as a Version 1 service.

---

## 5. Data Requirements

### 5.1 Project request

Required logical fields:

- Internal ID
- Public reference number
- Service type
- Project size
- Budget range
- Project title
- Description
- Existing assets/system description
- Desired outcome
- Design availability
- Desired deadline
- Reference URL
- Contact name
- Email
- Phone/WhatsApp
- Company
- Preferred contact method
- Consent timestamp
- Status
- Source page or campaign, when available
- Notification state
- Created and updated timestamps

### 5.2 Attachment

- Internal ID
- Request ID
- Original display name
- Storage provider identifier
- Storage URL or key
- MIME type
- Size
- Upload timestamp
- Security-scan state, if scanning is enabled

### 5.3 Admin note

- Internal ID
- Request ID
- Note text
- Created timestamp
- Updated timestamp

### 5.4 Project case study

- Slug
- Title
- Short summary
- Problem
- Solution
- Role
- Features
- Technical decisions
- Challenges
- Results
- Technology tags
- Images
- Live demo URL
- Repository URL
- Featured flag
- Publication state

---

## 6. API Requirements

Recommended API surface:

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| POST | `/api/v1/project-requests` | Submit project request | Public, rate limited |
| POST | `/api/v1/contact-messages` | Submit contact message | Public, rate limited |
| POST | `/api/v1/admin/auth/login` | Admin login | Public, strictly rate limited |
| POST | `/api/v1/admin/auth/logout` | Admin logout | Admin |
| GET | `/api/v1/admin/auth/me` | Get session user | Admin |
| GET | `/api/v1/admin/project-requests` | List/filter requests | Admin |
| GET | `/api/v1/admin/project-requests/:id` | Read one request | Admin |
| PATCH | `/api/v1/admin/project-requests/:id/status` | Update status | Admin |
| POST | `/api/v1/admin/project-requests/:id/notes` | Add private note | Admin |

API responses shall use a consistent success/error envelope and shall never return server stack traces to clients.

---

## 7. Non-Functional Requirements

### 7.1 Performance

- **NFR-001:** Public page content should become usable quickly on a typical mobile 4G connection.
- **NFR-002:** Large images shall use modern formats and responsive sizes.
- **NFR-003:** Noncritical routes, images, and components shall be lazy loaded where beneficial.
- **NFR-004:** API list endpoints shall use pagination and bounded page sizes.
- **NFR-005:** Database fields used for frequent filtering and sorting shall be indexed.

### 7.2 Availability and reliability

- **NFR-010:** A successfully accepted request shall not be lost because an email provider is temporarily unavailable.
- **NFR-011:** Production errors shall be logged with a request/correlation identifier.
- **NFR-012:** The API shall implement graceful shutdown and database connection handling.
- **NFR-013:** The system shall provide health/readiness information suitable for deployment monitoring.

### 7.3 Security

- **NFR-020:** All production traffic shall use HTTPS.
- **NFR-021:** Secrets shall be supplied through environment configuration and excluded from source control.
- **NFR-022:** Inputs shall be validated and normalized at the API boundary.
- **NFR-023:** The API shall apply secure headers, explicit CORS configuration, body-size limits, and rate limiting.
- **NFR-024:** Authentication cookies shall use `HttpOnly`, `Secure`, and an appropriate `SameSite` policy.
- **NFR-025:** Authorization shall be enforced on the server for every admin operation.
- **NFR-026:** Logs shall avoid passwords, session tokens, full message bodies, and unnecessary personal data.
- **NFR-027:** Dependencies shall be reviewed for known vulnerabilities before release.
- **NFR-028:** File uploads shall be stored outside the application server's public executable path.

### 7.4 Accessibility

- **NFR-030:** The site should conform to WCAG 2.2 AA for core flows.
- **NFR-031:** All interactive elements shall be keyboard operable.
- **NFR-032:** Focus indicators shall remain clearly visible.
- **NFR-033:** Form fields shall have programmatic labels, instructions, and error associations.
- **NFR-034:** Content shall maintain sufficient color contrast.
- **NFR-035:** Motion shall respect the user's reduced-motion preference.

### 7.5 Responsive behavior

- **NFR-040:** The website shall support phones, tablets, laptops, and large desktop screens.
- **NFR-041:** No essential content or action shall require horizontal scrolling at 320 CSS pixels.
- **NFR-042:** Touch targets shall be comfortably usable on mobile devices.

### 7.6 Maintainability

- **NFR-050:** TypeScript strict mode shall be enabled where compatible with the selected toolchain.
- **NFR-051:** Reusable UI components shall not contain duplicated page-specific content.
- **NFR-052:** API business logic shall be separated from route wiring and database models.
- **NFR-053:** Formatting, linting, type checks, and tests shall be runnable through documented scripts.
- **NFR-054:** Public content shall be centralized to make updates straightforward.

### 7.7 Privacy

- **NFR-060:** The site shall collect only information needed to evaluate and respond to a request.
- **NFR-061:** A privacy notice shall state what is collected, why, and how users can request deletion.
- **NFR-062:** Analytics shall not record typed form values or attachment contents.
- **NFR-063:** Personal data retention shall be documented and periodically reviewed.

### 7.8 Motion quality and performance

- **NFR-070:** Most micro-interactions should complete within approximately 120–240ms, while larger page or section transitions should normally complete within approximately 300–600ms.
- **NFR-071:** Motion shall use a small set of shared durations and easing curves to create a consistent rhythm.
- **NFR-072:** Continuous decorative animation shall be limited and shall pause when offscreen or when the page is not visible.
- **NFR-073:** Animation shall prefer compositor-friendly properties such as transforms and opacity and shall avoid repeated layout-triggering work.
- **NFR-074:** Motion shall not cause unexpected cumulative layout shift.
- **NFR-075:** Scroll-driven effects shall be tested on mid-range mobile hardware and removed when they make interaction less responsive.
- **NFR-076:** Under `prefers-reduced-motion`, nonessential animation and parallax shall be disabled and essential transitions shall become near-instant.
- **NFR-077:** Keyboard focus, screen-reader feedback, and form state changes shall not depend on animation completion.
- **NFR-078:** The premium visual treatment shall not reduce the stated Lighthouse, accessibility, or mobile-usability targets.

---

## 8. Environment and Configuration

Expected server configuration keys include:

- Runtime environment
- Application and frontend origins
- Server port
- MongoDB connection string
- Session/JWT secret if applicable
- Admin bootstrap credentials or admin user configuration
- Email provider credentials and sender address
- Owner notification email
- File-storage credentials and folder/bucket configuration
- CAPTCHA keys if enabled
- Logging and monitoring configuration

Actual secret values must never be committed.

---

## 9. Testing Requirements

### Unit testing

- Validation schemas
- Reference-number generation
- Status-transition rules
- Email template data mapping
- Utility functions

### Integration testing

- Request creation and persistence
- Invalid request rejection
- Duplicate submission handling
- Authentication and authorization
- Request filtering and pagination
- Status updates and notes
- Notification failure behavior

### End-to-end testing

- Browse services and projects
- Complete a project request on mobile and desktop
- Recover from validation errors
- Submit attachments
- Log into admin area
- Find and update the submitted request

### Quality gates

- Formatting passes
- Linting passes
- Type checking passes
- Automated tests pass
- Production build succeeds
- No critical accessibility issue in the core flow
- No known critical dependency vulnerability

---

## 10. Definition of Done

A feature is done when its stated acceptance criteria pass, loading/error/empty states are implemented, responsive and keyboard behavior are verified, relevant tests exist, errors are logged appropriately, and its production configuration is documented.
