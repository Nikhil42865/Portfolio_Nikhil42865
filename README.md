# Nikhil Kumar — Portfolio & Client Request Platform

A high-converting, professional portfolio and client request platform built with React 19, TypeScript, and Express.

## Project Structure

```text
portfolio/
├── frontend/               # React + TypeScript + Vite SPA
├── backend/                # Node.js + Express + TypeScript API
├── docs/                   # Product requirements, architecture & design docs
├── .env.example            # Environment variable template
└── package.json            # Monorepo orchestration scripts
```

## Features

- **Public Portfolio**:
  - Hero with coordinated entrance motion, tech stack trust strip, and clear conversion triggers.
  - Interactive services showcase (Website, React, Backend/API, AI Integration, Fixes & Deployment).
  - Filterable case study showcase (InterviewForgeAI, ParkiScan, Lost Item Recovery, PrimeBasket).
  - Detailed case study pages with problem, solution, engineering decisions, and architecture details.
  - "About" profile, skills matrix, and working approach.
- **Guided Project Request Flow**:
  - 6-step multi-step form with preselection support, draft persistence, field validation, and file attachments.
  - Client review step and instant submission feedback with unique Reference Number (`PR-XXXXXX`).
  - Contact form and direct WhatsApp deep-links.
- **Private Admin Area**:
  - Secure credential-based authentication with HTTP-only cookies.
  - Metrics dashboard (total, new, reviewing, quote sent, accepted, in progress).
  - Filterable & searchable requests list (table on desktop, card layout on mobile).
  - Request inspection, status updating, and internal notes timeline.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `backend/.env` (and optional `frontend/.env`). Defaults are preconfigured for local offline development.

### 3. Run Development Servers
```bash
# Run both frontend and backend concurrently:
npm run dev

# Or run individually:
npm run dev:frontend   # Runs at http://localhost:5173
npm run dev:backend    # Runs at http://localhost:5000
```
