# Product Requirements Document

## Nikhil Portfolio & Client Request Platform

**Document version:** 1.1  
**Product stage:** Version 1 planning  
**Primary objective:** Convert visitors into qualified freelance project requests.

---

## 1. Product Summary

This product is a premium professional portfolio and service website for Nikhil Kumar. It will present his capabilities in full-stack web development, React development, backend/API development, AI integration, debugging, and deployment. Automation services are intentionally reserved for Version 2.

Unlike a traditional portfolio that only displays skills and projects, this platform will allow a potential client to:

1. Understand what Nikhil can build.
2. Review evidence of past work.
3. Choose a required service.
4. Submit structured project requirements and reference files.
5. Select a preferred contact method.
6. Receive confirmation that the request was submitted.

The system will save each request, notify Nikhil by email, and provide a simple private admin area for reviewing requests.

---

## 2. Product Vision

Create a trustworthy digital storefront through which individuals, founders, students, and small businesses can request software work without needing to understand technical terminology.

The long-term vision is to evolve the portfolio into a low-touch freelance business platform with client accounts, quotations, payments, project tracking, automated requirement analysis, and delivery workflows.

---

## 3. Problem Statement

Potential clients often face three problems:

- They do not clearly understand what a developer can do for them.
- They do not know how to describe their software requirement.
- They do not have a simple path from discovering a developer to requesting work.

Traditional portfolios usually list technologies but do not guide a visitor toward taking action. This product will bridge that gap by connecting service explanations, project evidence, and a guided project-request form.

---

## 4. Goals

### 4.1 Business goals

- Generate qualified project leads.
- Build credibility through real project case studies.
- Make it easy to request both small fixes and complete applications.
- Reduce time spent asking every client the same initial questions.
- Establish a foundation for future service automation.

### 4.2 User goals

- Quickly understand which services are available.
- See relevant examples before making contact.
- Explain a requirement without needing technical expertise.
- Attach screenshots, PDFs, or supporting documents.
- Choose email, phone, or WhatsApp as the preferred contact method.
- Know that the request was received successfully.

### 4.3 Engineering goals

- Use a maintainable React and TypeScript frontend.
- Deliver a distinctive, premium interface with smooth, purposeful motion.
- Build a secure Node.js API with validation and rate limiting.
- Store project requests reliably.
- Keep presentation, business logic, and data access separated.
- Support straightforward deployment and future expansion.

---

## 5. Non-Goals for Version 1

Version 1 will not include:

- Online payment collection.
- Automation as an orderable service.
- Automatic price quotation.
- Client registration or login.
- Real-time client chat.
- AI-based requirement analysis.
- A complete project-management system.
- Automatic code generation or project delivery.
- Public comments or project reviews.
- A full content-management system.

These features may be introduced only after the core request workflow is being used.

---

## 5.1 Premium Experience Requirement

The website shall feel intentionally designed rather than assembled from a generic portfolio template. The premium character will come from:

- A consistent visual identity across every page.
- A strong opening sequence in the hero without delaying access to content.
- Smooth page and section transitions.
- Subtle depth, layered surfaces, refined typography, and high-quality project imagery.
- Responsive hover, press, focus, loading, and success states.
- Coordinated motion timing so elements feel part of one system.
- Fast performance and a complete reduced-motion experience.

Motion must guide attention and confirm interaction. It must not become decoration that competes with the services, projects, or project-request form.

---

## 6. Target Users

### 6.1 Small-business owner

Needs a business website, landing page, dashboard, or technical improvement. May not know technical terms and needs a guided form.

### 6.2 Startup founder

Needs a prototype, frontend, API, AI integration, or help finishing an existing application. Wants evidence of technical capability and a quick response.

### 6.3 Individual or student

Needs a portfolio, small web application, bug fix, deployment help, or API integration with a limited budget.

### 6.4 Existing development team

Needs short-term help with React, Node.js, MongoDB, APIs, debugging, responsive design, or deployment.

---

## 7. Value Proposition

### Primary headline

> I build polished web applications, reliable APIs, and practical AI-powered products.

### Supporting message

> From focused bug fixes and landing pages to full-stack products and AI-powered workflows, I turn requirements into reliable software.

### Primary calls to action

- Start a Project
- View My Work
- Message on WhatsApp

---

## 8. Service Categories

### 8.1 Website development

- Landing pages
- Business websites
- Personal portfolios
- Responsive redesigns

### 8.2 React development

- React and TypeScript interfaces
- Dashboards
- Responsive components
- Frontend bug fixes
- API integration

### 8.3 Backend and API development

- Node.js and Express APIs
- MongoDB data models
- Authentication and authorization
- File-upload workflows
- Third-party API integration

### 8.4 AI integration

- LLM API integration
- Chat and document-analysis features
- Resume or text processing
- Retrieval-augmented generation features
- AI evaluation workflows

### 8.5 Technical fixes and deployment

- React and API bug fixing
- Responsive-layout improvements
- Deployment setup and troubleshooting
- Performance and integration fixes
- Small application changes and debugging

### Version 2 service expansion: Automation

Automation will become a separate orderable service in Version 2 after the core portfolio and client-request workflow has been validated. It may include:

- Repetitive workflow automation
- Automated reports and scheduled tasks
- Data processing pipelines
- Business API integrations
- AI-assisted operational workflows

Public Version 1 pages and forms shall not present automation as an available service. It remains documented only in the internal Version 2 roadmap.

---

## 9. Version 1 Scope

### 9.1 Public pages

- Home
- Services
- Projects
- Individual project case study
- About
- Start a Project
- Contact
- Privacy Policy
- 404 page

### 9.2 Core features

- Responsive site navigation
- Service descriptions and service-specific calls to action
- Filterable project showcase
- Detailed case studies
- Multi-step project request form
- Optional file attachments
- Contact form
- WhatsApp deep link
- Form validation and submission feedback
- Email notification to owner
- Confirmation email to requester
- Secure storage of requests
- Basic private admin authentication
- Admin request list and request detail view
- Request status and internal notes
- SEO metadata, sitemap, and social-preview metadata
- Privacy-conscious analytics

---

## 10. Project Request Workflow

### Step 1: Service

The visitor selects one option:

- New website
- Changes to an existing website
- React/frontend development
- Backend/API development
- AI integration
- Bug fixing
- Deployment help
- Other

### Step 2: Project size

- Small task
- Small project
- Medium project
- Large/custom project
- Not sure

### Step 3: Budget

- ₹2,000–₹5,000
- ₹5,000–₹15,000
- ₹15,000–₹30,000
- ₹30,000+
- Need a quote

The ranges must be configurable rather than hard-coded throughout the codebase.

### Step 4: Requirements

The visitor provides:

- Project title
- Description of what should be built or changed
- What already exists
- Required outcome
- Design availability
- Desired deadline
- Reference URL, if any
- Optional attachments

### Step 5: Contact

- Name
- Email
- Phone/WhatsApp, optional unless selected as the preferred method
- Company, optional
- Preferred contact method
- Consent to be contacted about the request

### Completion

After a successful submission:

- Save the request with a unique reference number.
- Send a notification email to Nikhil.
- Send a confirmation email to the requester.
- Display a success page with the reference number and expected next step.
- Prevent accidental duplicate submission.

---

## 11. Admin Workflow

1. Nikhil signs in to the private admin area.
2. He sees request counts and the most recent requests.
3. He filters requests by status, service, budget, and date.
4. He opens a request to inspect requirements and attachments.
5. He adds private notes and updates the status.
6. He contacts the client outside the platform in V1.

Request statuses:

- New
- Reviewing
- Need More Information
- Quote Sent
- Accepted
- In Progress
- Completed
- Declined
- Spam

---

## 12. Project Showcase Content

Initial highlighted projects should include the strongest available proof:

### InterviewForgeAI

AI interview preparation platform with resume parsing, interview generation, session management, answer evaluation, authentication, and dashboard features.

### ParkiScan

Parkinson's disease detection project using spiral drawings and machine-learning models, with prediction and report-generation functionality.

### Lost Item Recovery Platform

Full-stack geo-tagged platform using image similarity and natural-language features to help match lost and found items.

### PrimeBasket

Full-stack e-commerce application featuring authentication, product browsing, cart, ordering, reviews, coupons, and admin functionality.

Each case study should explain:

- The problem
- Intended users
- Nikhil's role
- Major features
- Technical approach
- Difficult problem solved
- Current result or status
- Screenshots
- Live demo and source links when publicly available

---

## 13. Success Metrics

### Product metrics

- Number of project-request submissions per month
- Project-form completion rate
- Valid lead rate
- Contact-to-quote rate
- Quote-to-client conversion rate
- Most requested service
- Most viewed case study
- Primary call-to-action click rate
- Form abandonment by step

### Initial quality targets

- Lighthouse performance score of at least 90 on key public pages under normal test conditions
- No critical accessibility violations
- Successful form submission rate above 99% when dependencies are healthy
- Owner notification sent within two minutes for at least 95% of successful requests
- Core pages usable at widths from 320px upward

---

## 14. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Spam submissions | Honeypot, rate limiting, CAPTCHA after suspicious behavior, server validation |
| Unclear requirements | Guided questions, examples, optional attachments, “Not sure” choices |
| Large or unsafe files | Type allowlist, size limit, secure cloud storage, generated filenames |
| Low trust | Case studies, real links, clear process, professional visual design |
| Notification failure | Persist request first, record notification state, retry email asynchronously |
| Exposure of private requests | Protected admin routes, strong password, secure cookies, authorization checks |
| Motion makes the site slow or distracting | Animate only transform/opacity where possible, lazy load media, enforce motion budgets, test mobile performance |

---

## 15. Release Strategy

### MVP release

- Public portfolio pages
- Service and project content
- Project request form without attachments
- Database storage
- Email notification
- Contact and WhatsApp links

### Version 1 complete

- Attachments
- Admin request management
- Analytics
- SEO and accessibility polish
- Premium motion system and cross-device interaction polish
- Monitoring and backups

### Future versions

- **V2:** Automation service, client accounts, request status, quote management, secure file exchange
- **V3:** Quote acceptance, advance payments, invoices, milestones
- **V4:** AI-assisted requirement clarification, project classification, draft proposals
- **V5:** Productized fixed-price services and increasingly automated delivery

---

## 16. Acceptance Definition

Version 1 is successful when a first-time visitor can understand the available services, verify relevant work, submit a complete request from a phone or desktop, receive confirmation, and have that request appear securely in the admin area with an owner notification.
