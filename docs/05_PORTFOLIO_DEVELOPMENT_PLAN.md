# Development Plan

## Nikhil Portfolio & Client Request Platform

**Document version:** 1.1  
**Recommended approach:** Build the conversion path first, then add operational features.

---

## 1. Delivery Strategy

Development should proceed in vertical slices. Each milestone should leave behind something that works and can be tested, rather than building the entire frontend before verifying backend behavior.

The critical path is:

```text
Visitor understands offer
        ↓
Visitor trusts the work
        ↓
Visitor submits requirement
        ↓
Request is safely stored
        ↓
Owner is notified and can review it
```

AI, payments, and complex client management are postponed until this path is proven.

---

## 2. Recommended Repository Structure

Either a monorepo or two repositories will work. A small monorepo is recommended:

```text
portfolio-platform/
├── frontend/
├── backend/
├── docs/
│   ├── 01_PORTFOLIO_PRD.md
│   ├── 02_PORTFOLIO_REQUIREMENTS.md
│   ├── 03_PORTFOLIO_ARCHITECTURE.md
│   ├── 04_PORTFOLIO_UI_UX.md
│   └── 05_PORTFOLIO_DEVELOPMENT_PLAN.md
├── .github/workflows/
├── .env.example
├── README.md
└── package.json
```

Use independent frontend/backend scripts at first. Add workspace tooling only if it clearly reduces repetition.

---

## 3. Phase 0 — Product and Content Preparation

### Tasks

- Confirm the public name: personal name, studio name, or combined brand.
- Confirm services offered at launch.
- Confirm that Automation is reserved for Version 2 and is not shown as an orderable Version 1 service.
- Confirm budget ranges and whether they should appear publicly.
- Select three or four featured projects.
- Gather screenshots, links, stack, role, and accurate project status.
- Draft About content and working process.
- Confirm email, WhatsApp, GitHub, LinkedIn, and résumé.
- Define initial privacy and data-retention statements.
- Create a simple content inventory with no invented facts.

### Output

- Approved content sheet
- Asset folder
- Confirmed page list
- Launch scope locked

### Exit criteria

- Every homepage section has real or explicitly marked placeholder content.
- Every featured project has enough information for a case study.

---

## 4. Phase 1 — Foundation and Quality Tooling

### Frontend tasks

- Create React + TypeScript + Vite application.
- Enable strict TypeScript settings.
- Configure routing.
- Add CSS reset, tokens, global styles, and responsive container.
- Define shared motion durations, easing curves, distances, and reduced-motion overrides.
- Configure ESLint, formatting, Vitest, and React Testing Library.
- Create the Axios instance with base URL, timeout, credentials policy, and normalized error handling.

### Backend tasks

- Create Node.js + Express + TypeScript application.
- Add environment validation.
- Configure MongoDB connection.
- Add structured logging and request IDs.
- Add error handling, 404 handling, Helmet, CORS, and JSON size limits.
- Add test framework and Supertest.
- Add liveness and readiness routes.

### Repository tasks

- Add `.env.example` with descriptions but no values.
- Add `.gitignore`.
- Add README setup instructions.
- Add CI for lint, type check, test, and build.

### Tests

- Frontend smoke render
- API health route
- Unknown API route returns standard 404 response
- Environment configuration failure is explicit

### Exit criteria

- Both applications run locally.
- Quality scripts pass in CI.
- Frontend can call a backend health endpoint.

---

## 5. Phase 2 — Design System and Public Shell

### Tasks

- Build Button, Link, Input, Textarea, Select, Checkbox, Tag, Card, Alert, Spinner, and Modal/Drawer primitives as needed.
- Build reusable PageTransition, SectionReveal, StaggerGroup, HoverLift, and FormStepTransition primitives.
- Build Header, Mobile Navigation, Page Container, Section, and Footer.
- Add skip link and visible focus treatment.
- Implement public routes and 404 page.
- Implement responsive typography and spacing.
- Implement the shortened first-visit hero sequence and near-instant reduced-motion alternative.
- Create loading/error fallbacks for route-level failures.

### Tests

- Keyboard navigation of header and mobile menu
- Mobile menu closes correctly
- Active route states
- 404 behavior
- Motion primitives do not hide content when animation is unavailable
- Reduced-motion behavior removes nonessential movement
- Visual checks at 320px, 768px, 1024px, and a wide desktop viewport

### Exit criteria

- Public shell is responsive and accessible.
- Shared visual components are documented through examples or a development page.

---

## 6. Phase 3 — Homepage, Services, About, and Contact Presentation

### Tasks

- Implement homepage hero.
- Orchestrate the hero entrance, ambient background, and CTA feedback as one coordinated sequence.
- Implement services preview.
- Implement featured projects preview using temporary structured content.
- Implement “How I Work” and “Why Work With Me.”
- Implement dual CTA section for project request and WhatsApp.
- Build full Services page.
- Build About page.
- Add contact methods; keep actual form submission for a later phase if desired.
- Add SEO metadata for completed pages.
- Add restrained section reveals, card interaction states, and route transitions.

### Tests

- Calls to action navigate to correct routes.
- Service CTA preselection parameter works.
- External links contain safe attributes.
- Content does not overflow at supported widths.
- Motion does not block navigation, clicking, scrolling, or text selection.

### Exit criteria

- A visitor can understand the offer, available services, and next action without viewing the projects page.

---

## 7. Phase 4 — Projects and Case Studies

### Tasks

- Define the typed project content model.
- Add InterviewForgeAI, ParkiScan, Lost Item Recovery Platform, and PrimeBasket content.
- Build project index and category filters.
- Build reusable case-study page template.
- Add premium project-card media transitions and case-study reveal patterns.
- Add optimized responsive screenshots.
- Add optional demo/repository actions.
- Add project-specific metadata and social previews.

### Tests

- All published slugs resolve.
- Unknown project slug returns 404.
- Filters work by mouse, touch, and keyboard.
- Missing optional links do not leave blank actions.
- Images have correct dimensions and alternative text.
- Project motion remains stable when images load slowly.

### Exit criteria

- At least three complete, truthful case studies are ready.
- Each major service has at least one relevant proof point where available.

---

## 8. Phase 5 — Project Request API Without Attachments

### Backend tasks

- Define Zod request schema.
- Create Mongoose project-request model and indexes.
- Generate non-sequential public reference numbers.
- Implement request repository, service, controller, and route.
- Add rate limiter and spam honeypot handling.
- Add idempotency or duplicate-submission protection.
- Return normalized validation errors.
- Add redacted logging.

### Frontend tasks

- Build form shell and step indicator.
- Implement directional form-step transitions and stable-height behavior.
- Add service, size/budget, project details, contact, and review steps.
- Implement field and step validation.
- Preserve state during backward navigation.
- Implement submit, error-recovery, and success states.
- Add consent copy and privacy link.

### Tests

- Valid request persists.
- Missing or malformed fields are rejected.
- Conditional phone requirement works.
- Rate limit works.
- Honeypot behavior works.
- Repeat submission does not create unintended duplicates.
- Frontend retains data after recoverable failure.
- Animation completion is not required for validation or submission.
- Complete mobile end-to-end request flow passes.

### Exit criteria

- A real request can be submitted and verified directly in the database.
- No email or attachment dependency is required for core request persistence.

---

## 9. Phase 6 — Notifications and Contact Form

### Tasks

- Create email-provider adapter.
- Create owner notification template.
- Create requester confirmation template.
- Trigger notification only after persistence.
- Store delivery states and failure information.
- Add a bounded retry strategy or outbox worker.
- Implement contact-message validation, persistence, spam protection, and notification.
- Add safe email preview/test workflow for development.

### Tests

- Correct email data mapping
- Request survives provider failure
- Failure increments retry state
- Confirmation excludes private/internal information
- Contact form success and failure handling

### Exit criteria

- A production-like test request appears in storage and delivers expected notifications.
- Provider failure is visible operationally without losing the lead.

---

## 10. Phase 7 — Attachment Uploads

### Tasks

- Configure private Cloudinary or S3-compatible storage.
- Add multipart upload middleware with explicit limits.
- Validate extensions, MIME types, file count, individual size, and total size.
- Generate safe storage identifiers.
- Associate metadata with the request.
- Clean up partial uploads after failed workflows where possible.
- Build frontend selection, list, progress, remove, and error states.
- Add authorized admin download/view approach.

### Tests

- Allowed files upload successfully.
- Unsupported type is rejected.
- Oversized file and total payload are rejected.
- More than five files are rejected.
- Misleading filename/type combinations are rejected where detectable.
- Partial failures do not produce false success.
- Private files are not anonymously exposed.

### Exit criteria

- A prospective client can submit allowed reference files securely.
- Nikhil can access attachments through the protected workflow.

---

## 11. Phase 8 — Admin Authentication and Request Management

### Authentication tasks

- Create admin user model/bootstrap process.
- Hash admin password securely.
- Implement login, current-session, and logout endpoints.
- Configure HTTP-only secure cookie and allowed origins.
- Add strict login rate limiting.
- Protect all admin endpoints and routes.

### Admin interface tasks

- Build login page and protected route handling.
- Build dashboard summary.
- Build paginated request list.
- Add search and filters.
- Build request-detail view.
- Add status update and private notes.
- Add attachment access.
- Add responsive card representation for small screens.

### Tests

- Invalid login remains generic.
- Unauthenticated requests receive 401.
- Non-admin access receives 403 where applicable.
- Logout invalidates session.
- Filtering and pagination return correct data.
- Status and notes persist.
- Admin routes are excluded from indexing.

### Exit criteria

- Nikhil can securely process requests without directly accessing the database.

---

## 12. Phase 9 — Accessibility, SEO, Analytics, and Performance

### Accessibility tasks

- Audit keyboard use and focus order.
- Add form error summary and announcements.
- Verify contrast and zoom behavior.
- Test reduced-motion behavior.
- Correct headings, landmarks, labels, and alternative text.

### SEO tasks

- Add page-specific title and descriptions.
- Add canonical URLs.
- Add sitemap and robots configuration.
- Add favicon and web manifest where appropriate.
- Add social-preview image and metadata.
- Add structured data for personal/professional profile and projects where valid.

### Analytics tasks

- Track CTA clicks and anonymous funnel events.
- Track project-form start, step completion, success, and failure.
- Exclude field values and personal data.

### Performance tasks

- Convert/compress images.
- Add responsive image sources.
- Lazy load below-the-fold media.
- Inspect bundle size and remove unnecessary dependencies.
- Verify caching behavior.
- Profile route transitions, scroll reveals, ambient effects, and form-step animation on a mid-range mobile profile.
- Pause continuous effects while offscreen or when the document is hidden.
- Remove any motion effect that creates long tasks, layout shift, or input delay.

### Exit criteria

- Lighthouse and accessibility targets in the requirements document are met or documented exceptions are accepted.

---

## 13. Phase 10 — Deployment and Launch

### Deployment tasks

- Create separate preview and production configurations.
- Provision production MongoDB database.
- Provision email and object-storage accounts.
- Configure environment secrets.
- Configure production CORS and cookie policies.
- Deploy API.
- Deploy frontend.
- Configure custom domain and HTTPS.
- Add health monitoring and error alerts.
- Enable managed database backups.

### Launch verification

- Submit one real project request from mobile data.
- Confirm database record.
- Confirm owner and requester email.
- Confirm admin login and status update.
- Confirm attachment access.
- Confirm WhatsApp and social links.
- Confirm sitemap and social preview.
- Confirm error monitoring with a safe test event.
- Verify no secrets or source maps with sensitive data are exposed.

### Exit criteria

- The complete production workflow passes.
- A rollback procedure is documented.

---

## 14. Suggested Milestone Schedule

This is an effort guide, not a promise. Adjust it based on available weekly hours.

| Milestone | Scope | Suggested effort |
|---|---|---:|
| M1 | Content, foundation, design system | 4–6 focused days |
| M2 | Public pages and responsive polish | 5–7 focused days |
| M3 | Projects and case studies | 3–5 focused days |
| M4 | Project request form and API | 5–7 focused days |
| M5 | Email, uploads, and contact | 4–6 focused days |
| M6 | Admin dashboard | 5–7 focused days |
| M7 | QA, SEO, accessibility, launch | 3–5 focused days |

For learning quality, stop at each milestone to explain the design, run tests, and fix defects before adding the next feature.

---

## 15. Testing Matrix

| Area | Unit | Integration | End-to-end | Manual |
|---|:---:|:---:|:---:|:---:|
| Public navigation | ✓ |  | ✓ | ✓ |
| Project content/filter | ✓ |  | ✓ | ✓ |
| Request validation | ✓ | ✓ | ✓ | ✓ |
| Request persistence |  | ✓ | ✓ | ✓ |
| Email notification | ✓ | ✓ |  | ✓ |
| File uploads | ✓ | ✓ | ✓ | ✓ |
| Admin authentication | ✓ | ✓ | ✓ | ✓ |
| Admin filtering/status | ✓ | ✓ | ✓ | ✓ |
| Responsive/accessibility |  |  | ✓ | ✓ |

---

## 16. Issue Priority Rules

### P0 — Release blocker

- Data loss
- Authentication bypass
- Exposure of private client data
- Project request cannot be submitted
- Production site unavailable

### P1 — High

- Owner notification consistently fails
- Attachments unavailable to admin
- Core mobile layout unusable
- Major accessibility blocker

### P2 — Normal

- Noncritical visual defect
- Secondary animation problem
- Minor content inconsistency

P0 and P1 issues must be resolved before public launch.

---

## 17. Version Roadmap After Launch

### Version 1.1

- Improve content based on analytics.
- Add testimonials only when genuine.
- Add request export and better email templates.
- Improve spam controls based on observed traffic.

### Version 2

- Add Automation as a new service category.
- Add automation-specific intake questions covering trigger, input, action, frequency, integrations, and expected output.
- Client authentication
- Client dashboard
- Request/project status timeline
- Secure file exchange
- Quote creation and acceptance

### Version 3

- Advance payment
- Invoice generation
- Milestones
- Delivery approval
- Productized fixed-price services

### Version 4

- AI requirement summarization
- Missing-information detection
- Draft clarification questions
- Complexity classification
- Draft proposal and scope generation

All AI-generated client-facing output should remain reviewable before it becomes binding or is sent automatically.

---

## 18. Developer Learning Checkpoints

At the end of every phase, Nikhil should be able to answer:

1. What problem does this phase solve for the client or operator?
2. What data enters and leaves the feature?
3. Where is that data validated?
4. What can fail?
5. How is failure shown to the user and logged for the developer?
6. What security boundary applies?
7. Which tests prove the feature works?
8. What would change if traffic grew by 100 times?

The goal is not only to finish a portfolio; it is to own the system well enough to explain and maintain it.

---

## 19. Immediate Next Actions

1. Choose the public brand/name.
2. Confirm the five launch services: Website Development, React Development, Backend/API Development, AI Integration, and Technical Fixes/Deployment.
3. Gather screenshots and links for four projects.
4. Write truthful case-study facts using the template in the UI/UX document.
5. Create the repository and complete Phase 1.
6. Build the homepage shell before starting the backend.
7. Implement the request workflow before adding admin extras.
