export interface ServiceItem {
  id: string;
  formServiceValue: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  exampleTasks: string[];
  technologies: string[];
  proofProjectSlug: string;
  proofProjectTitle: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'website-development',
    formServiceValue: 'Website Development',
    title: 'Website Development',
    tagline: 'High-converting, responsive websites engineered for speed and clarity.',
    description:
      'From sleek modern landing pages to complete business websites, I build accessible, fast-loading digital storefronts that make a lasting impression and convert visitors into clients.',
    deliverables: [
      'Custom responsive design tailored for mobile, tablet, and desktop',
      'SEO optimization, meta tags, and open-graph previews',
      'High performance with near-perfect Lighthouse scores',
      'Smooth, purposeful interactions and accessible keyboard navigation',
      'Domain, DNS, and hosting deployment setup',
    ],
    exampleTasks: [
      'Turn Figma or design mockups into pixel-perfect responsive code',
      'Build a modern product landing page with lead capture forms',
      'Redesign an outdated business website for better mobile conversions',
    ],
    technologies: ['HTML5', 'Vanilla CSS', 'TypeScript', 'Vite', 'SEO & Performance'],
    proofProjectSlug: 'primebasket',
    proofProjectTitle: 'PrimeBasket E-Commerce',
  },
  {
    id: 'react-development',
    formServiceValue: 'React Development',
    title: 'React & TypeScript Engineering',
    tagline: 'Scalable, component-driven single-page applications and interactive dashboards.',
    description:
      'I engineer performant React applications using strict TypeScript, clean architecture, and modular components that are easy to maintain, scale, and test.',
    deliverables: [
      'Interactive single-page applications with smooth routing',
      'Data-dense dashboards with charts, filters, and real-time updates',
      'Reusable, design-system compliant component libraries',
      'Predictable state management and robust client-side validation',
      'Complete test suites using Vitest and React Testing Library',
    ],
    exampleTasks: [
      'Build an administrative dashboard with filtering and export features',
      'Refactor complex legacy code into modular React components',
      'Integrate frontend applications with REST or GraphQL APIs',
    ],
    technologies: ['React', 'TypeScript', 'React Router', 'CSS Modules', 'Vitest'],
    proofProjectSlug: 'interviewforge-ai',
    proofProjectTitle: 'InterviewForgeAI',
  },
  {
    id: 'backend-api-development',
    formServiceValue: 'Backend/API Development',
    title: 'Backend & API Engineering',
    tagline: 'Reliable Node.js & Express REST APIs with secure MongoDB data architecture.',
    description:
      'I build secure, production-ready server applications with strict input validation, resilient database schemas, rate limiting, and structured logging.',
    deliverables: [
      'RESTful API architecture with Zod schema validation',
      'Secure authentication via HTTP-only session cookies and JWT',
      'MongoDB schemas, indexes, and aggregation pipelines',
      'File upload pipelines with format and size verification',
      'Webhook handling, email dispatch, and third-party integrations',
    ],
    exampleTasks: [
      'Design and deploy backend APIs for web or mobile applications',
      'Implement role-based access control and admin security',
      'Optimize database queries and add indexing for fast response times',
    ],
    technologies: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'Mongoose', 'Zod'],
    proofProjectSlug: 'lost-item-recovery',
    proofProjectTitle: 'Lost Item Recovery Platform',
  },
  {
    id: 'ai-integration',
    formServiceValue: 'AI Integration',
    title: 'Practical AI Integration',
    tagline: 'Integrate LLMs, document analysis, and smart workflows into web products.',
    description:
      'I bring practical AI capabilities to software applications—including automated document analysis, resume parsing, conversational assistants, and structured scoring pipelines.',
    deliverables: [
      'OpenAI, Anthropic, and Gemini API integration',
      'Document parsing, entity extraction, and text summarization',
      'Structured JSON outputs and schema-guided LLM responses',
      'Retrieval-Augmented Generation (RAG) and embedding search',
      'Optimistic UI states and streaming response handling',
    ],
    exampleTasks: [
      'Build an automated resume analyzer and scoring assistant',
      'Integrate intelligent Q&A functionality into a web dashboard',
      'Implement prompt evaluation pipelines with fallback handling',
    ],
    technologies: ['LLM APIs', 'Prompt Engineering', 'LangChain/RAG Concepts', 'Python', 'Node.js'],
    proofProjectSlug: 'interviewforge-ai',
    proofProjectTitle: 'InterviewForgeAI',
  },
  {
    id: 'technical-fixes-deployment',
    formServiceValue: 'Technical Fixes/Deployment',
    title: 'Technical Fixes & Deployment',
    tagline: 'Fast debugging, responsive UI troubleshooting, and zero-downtime deployment.',
    description:
      'Got a stubborn bug, a broken mobile layout, or a deployment that fails at the finish line? I diagnose issues systematically and get your software running smoothly.',
    deliverables: [
      'Root-cause diagnosis for frontend and backend runtime bugs',
      'Fixing broken mobile layouts, overflow glitches, and responsiveness',
      'Resolving CORS errors, cookie issues, and authentication drops',
      'CI/CD pipeline configuration and automated build fixes',
      'Production deployment to Vercel, Render, Railway, or AWS',
    ],
    exampleTasks: [
      'Troubleshoot and fix critical bugs blocking your product release',
      'Optimize bundle size and fix slow page rendering issues',
      'Configure environment variables and deploy applications safely',
    ],
    technologies: ['Debugging', 'DevOps', 'Vercel', 'Render', 'Docker Basics', 'Git'],
    proofProjectSlug: 'parkiscan',
    proofProjectTitle: 'ParkiScan Project',
  },
];
