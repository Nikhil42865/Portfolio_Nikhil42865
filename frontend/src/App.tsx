import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { CaseStudyPage } from './pages/public/CaseStudyPage';
import { AboutPage } from './pages/public/AboutPage';
import { StartProjectPage } from './pages/public/StartProjectPage';
import { ContactPage } from './pages/public/ContactPage';
import { PrivacyPage } from './pages/public/PrivacyPage';
import { NotFoundPage } from './pages/public/NotFoundPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminRequestDetailPage } from './pages/admin/AdminRequestDetailPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/start-project" element={<StartProjectPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/requests/:id" element={<AdminRequestDetailPage />} />

          {/* Unmatched 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
};
