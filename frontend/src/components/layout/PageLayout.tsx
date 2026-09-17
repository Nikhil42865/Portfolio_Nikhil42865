import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top upon route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main
        id="main-content"
        style={{
          paddingTop: 'var(--header-height)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
};
