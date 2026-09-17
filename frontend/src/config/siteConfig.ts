/**
 * Centralized Site and Contact Configuration
 * Update your personal, social, and contact details here in one place.
 */

export const siteConfig = {
  name: 'Nikhil Kumar',
  role: 'Full-Stack Developer, API Architect & AI Integrator',
  headline: 'I build polished web applications, reliable APIs, and practical AI-powered products.',

  contact: {
    phone: '6202591561',
    phoneFormatted: '+91 6202591561',
    whatsappNumber: '916202591561',
    email: 'nikhil42865@gmail.com',
  },

  social: {
    github: 'https://github.com/Nikhil42865',
    linkedin: 'https://www.linkedin.com/in/nikhilkumar-ai',
  },

  getWhatsappUrl: (message = 'Hi Nikhil, I reviewed your portfolio and would like to discuss a project.') => {
    return `https://wa.me/916202591561?text=${encodeURIComponent(message)}`;
  },
};
