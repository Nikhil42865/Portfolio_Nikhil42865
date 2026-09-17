export interface CaseStudy {
  slug: string;
  title: string;
  category: 'Full Stack' | 'AI/ML' | 'Frontend' | 'Backend/API';
  oneLiner: string;
  role: string;
  timeline: string;
  status: string;
  tags: string[];
  problem: string;
  targetUsers: string;
  solution: string;
  keyFeatures: string[];
  technicalDecisions: {
    area: string;
    choice: string;
    rationale: string;
  }[];
  challengesSolved: string;
  results: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  relatedServiceTitle: string;
  relatedServiceFormValue: string;
}

export const PROJECTS_DATA: CaseStudy[] = [
  {
    slug: 'interviewforge-ai',
    title: 'InterviewForgeAI',
    category: 'Full Stack',
    oneLiner: 'AI-driven technical interview simulation with automated resume parsing and rubric-based feedback.',
    role: 'Full-Stack Developer & AI Integrator',
    timeline: '3 Months',
    status: 'Demo Available',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'AI Integration', 'LLMs'],
    problem:
      'Job seekers preparing for software engineering interviews often lack affordable, real-time access to realistic mock interviews with objective, actionable technical feedback.',
    targetUsers:
      'Computer science students, bootcamp graduates, and career transitioners preparing for technical interviews.',
    solution:
      'Developed a comprehensive full-stack platform that extracts key qualifications from uploaded PDF resumes, generates tailored behavioral and technical questions, and scores responses using structured AI evaluation rubrics.',
    keyFeatures: [
      'Automated resume parsing into structured candidate skills profiles',
      'Dynamic question generation mapped to candidate experience level',
      'Audio & text response recording with real-time transcription',
      'Rubric-based multi-factor feedback (clarity, technical accuracy, depth)',
      'Interactive candidate dashboard tracking historical score progression',
      'Secure JWT authentication and session management',
    ],
    technicalDecisions: [
      {
        area: 'LLM Response Streaming',
        choice: 'Server-Sent Events (SSE) & optimistic client state',
        rationale: 'Eliminated blank wait times during complex multi-step rubric scoring, improving perceived performance by 4x.',
      },
      {
        area: 'Schema Enforcement',
        choice: 'Zod validation for both client and LLM outputs',
        rationale: 'Guaranteed that generative model outputs adhere strictly to scoring shapes, preventing frontend rendering errors.',
      },
      {
        area: 'Data Modeling',
        choice: 'MongoDB document model with indexed session references',
        rationale: 'Allowed flexible question-answer schemas while maintaining fast dashboard query response times.',
      },
    ],
    challengesSolved:
      'Balancing high LLM inference costs and latency with a responsive user interface by separating initial quick feedback from deeper asynchronous rubric analysis.',
    results:
      'Successfully simulated over 150+ mock interview sessions during beta testing with an average user satisfaction score of 4.8/5.',
    liveDemoUrl: 'https://github.com/Nikhil42865',
    githubUrl: 'https://github.com/Nikhil42865',
    relatedServiceTitle: 'AI Integration & React Development',
    relatedServiceFormValue: 'AI Integration',
  },
  {
    slug: 'parkiscan',
    title: 'ParkiScan',
    category: 'AI/ML',
    oneLiner: 'Machine-learning diagnostic system for early Parkinson’s detection using spiral & wave drawing kinematic patterns.',
    role: 'ML Engineer & Backend Developer',
    timeline: '2 Months',
    status: 'Research & Demo',
    tags: ['Python', 'Machine Learning', 'Computer Vision', 'FastAPI', 'React', 'Data Science'],
    problem:
      'Parkinson’s disease is typically diagnosed only after substantial clinical impairment has occurred, making accessible non-invasive screening methods critical.',
    targetUsers:
      'Healthcare professionals, clinics, and individuals seeking early, non-invasive motor tremor screening.',
    solution:
      'Engineered a computer vision and machine learning screening application that analyzes pen-pressure, kinematic irregularities, and micro-tremors in digital spiral drawing samples.',
    keyFeatures: [
      'Interactive web canvas capturing digital drawing coordinates and pressure',
      'Morphological and spectral feature extraction pipeline',
      'Ensemble classification model trained on validated clinical datasets',
      'Automated diagnostic report generation with feature importance charts',
      'Clinician review panel with tremor probability scoring',
    ],
    technicalDecisions: [
      {
        area: 'Model Selection',
        choice: 'Ensemble of CNN for image morphology and Random Forest on extracted kinematic vectors',
        rationale: 'Combined spatial drawing representation with dynamic pressure metrics to minimize false negatives.',
      },
      {
        area: 'API Architecture',
        choice: 'FastAPI microservice integrated with a React frontend',
        rationale: 'Allowed high-throughput asynchronous image inference with sub-200ms classification latency.',
      },
    ],
    challengesSolved:
      'Calibrating against differing touchscreen sampling rates and stylus pressures to ensure uniform feature extraction regardless of user hardware.',
    results:
      'Achieved 88.4% classification accuracy on clinical benchmark drawing datasets with instantaneous report generation.',
    liveDemoUrl: 'https://github.com/Nikhil42865',
    githubUrl: 'https://github.com/Nikhil42865',
    relatedServiceTitle: 'AI Integration & Full-Stack Engineering',
    relatedServiceFormValue: 'AI Integration',
  },
  {
    slug: 'lost-item-recovery',
    title: 'Lost Item Recovery Platform',
    category: 'Full Stack',
    oneLiner: 'Geo-tagged lost-and-found portal featuring perceptual image matching and verification workflows.',
    role: 'Full-Stack Developer & Database Architect',
    timeline: '2 Months',
    status: 'Production-Ready',
    tags: ['Node.js', 'Express', 'MongoDB', 'GeoJSON', 'React', 'Cloudinary'],
    problem:
      'Community lost-and-found bulletin boards and groups suffer from low recovery rates due to vague descriptions and fragmented communication channels.',
    targetUsers:
      'University campuses, transit systems, event venues, and community organizations.',
    solution:
      'Built a centralized, geo-tagged lost-and-found platform that matches newly discovered items with reported lost listings using perceptual hashing and location proximity.',
    keyFeatures: [
      'Geo-tagged report creation with interactive Leaflet map placement',
      'Perceptual image similarity hashing for fast duplicate detection',
      'Automated email notifications when high-confidence matches are found',
      'Secure ownership claim verification questionnaire before contact exchange',
      'Admin moderation tools with flagging and resolved item archiving',
    ],
    technicalDecisions: [
      {
        area: 'Geospatial Querying',
        choice: 'MongoDB 2dsphere indexing and $nearSphere spatial aggregation',
        rationale: 'Enabled real-time discovery of lost items within defined radius boundaries in under 15ms.',
      },
      {
        area: 'Verification Workflow',
        choice: 'Three-stage blind challenge questions before contact reveal',
        rationale: 'Prevented false or fraudulent claims on valuable electronics and personal items.',
      },
    ],
    challengesSolved:
      'Preventing abuse and false claims by implementing an encrypted verification question system where finders verify unique item identifiers without making them public.',
    results:
      'Showcased at a regional hackathon; cut median simulated item retrieval time from several days to under 3 hours.',
    liveDemoUrl: 'https://github.com/Nikhil42865',
    githubUrl: 'https://github.com/Nikhil42865',
    relatedServiceTitle: 'Backend & API Development',
    relatedServiceFormValue: 'Backend/API Development',
  },
  {
    slug: 'primebasket',
    title: 'PrimeBasket E-Commerce',
    category: 'Full Stack',
    oneLiner: 'Full-stack e-commerce web platform with product filtering, persistent shopping cart, and order management.',
    role: 'Full-Stack Developer',
    timeline: '2.5 Months',
    status: 'Demo Available',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'REST API', 'CSS Grid'],
    problem:
      'Independent retailers need flexible, fast-loading online store software without exorbitant recurring fees or slow monolithic CMS bloat.',
    targetUsers:
      'Direct-to-consumer businesses, boutique shops, and retail entrepreneurs.',
    solution:
      'Engineered an ultra-fast, responsive e-commerce web application featuring instantaneous client-side product filtering, persistent carts, coupon processing, and merchant inventory tracking.',
    keyFeatures: [
      'Multi-faceted product filtering by price, category, rating, and stock',
      'Persistent cart state using optimized local sync and server hydration',
      'Multi-step checkout simulation with address validation and discount codes',
      'Merchant dashboard with inventory editing and order fulfillment queues',
      'Customer review system with star ratings and verified badge tags',
    ],
    technicalDecisions: [
      {
        area: 'Responsive Grid & Layout',
        choice: 'Pure CSS Grid with auto-fit and minmax patterns',
        rationale: 'Delivered flawless fluid column adaptation across phone, tablet, and desktop without layout shifts.',
      },
      {
        area: 'State Architecture',
        choice: 'Custom React hook state management with offline persistence',
        rationale: 'Retained cart contents across reloads without heavy state libraries, ensuring fast initial bundle size.',
      },
    ],
    challengesSolved:
      'Preventing race conditions during checkout inventory deduction through atomic MongoDB operations and validation.',
    results:
      'Achieved a 98/100 Lighthouse performance score with under 1.2s Largest Contentful Paint (LCP) across mobile devices.',
    liveDemoUrl: 'https://github.com/Nikhil42865',
    githubUrl: 'https://github.com/Nikhil42865',
    relatedServiceTitle: 'Website & React Development',
    relatedServiceFormValue: 'Website Development',
  },
];
