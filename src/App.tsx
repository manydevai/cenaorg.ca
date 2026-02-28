import { useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LogoWall } from './components/LogoWall';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { ImpactStatsSection } from './components/ImpactStatsSection';
import { VisionSection } from './components/VisionSection';
import { ProgramsSection } from './components/ProgramsSection';
import { PartnersSection } from './components/PartnersSection';
import { MembersSection } from './components/MembersSection';
import { EventsSection } from './components/EventsSection';
import { TeamSection } from './components/TeamSection';
import { SupportSection } from './components/SupportSection';
import { ChristmasGallerySection } from './components/ChristmasGallerySection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  useEffect(() => {
    // Set viewport meta tag for mobile responsiveness
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');

    // Google Analytics - Load gtag.js script
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-JJX7SJEF3R';
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'G-JJX7SJEF3R');

    // Store gtag globally for potential future use
    (window as any).gtag = gtag;
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white overflow-x-hidden relative">
        <Header />
        <main>
          <HeroSection />
          <LogoWall />
          <AboutSection />
          <ImpactStatsSection />
          <MissionSection />
          <VisionSection />
          <ProgramsSection />
          <PartnersSection />
          <MembersSection />
          <EventsSection />
          <TeamSection />
          <SupportSection />
          <ChristmasGallerySection />
          <BlogSection />
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </LanguageProvider>
  );
}