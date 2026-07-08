import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
import { FeaturedEventSection } from './components/FeaturedEventSection';
import { TeamSection } from './components/TeamSection';
import { SupportSection } from './components/SupportSection';
import { ChristmasGallerySection } from './components/ChristmasGallerySection';
import { RecentEventsLinkSection } from './components/RecentEventsLinkSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
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
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');

    // Initialize AOS after all images/layout shifts are finished
    const initAOS = () => {
      AOS.init({
        duration: 600,
        once: true,
        easing: 'ease-out-cubic',
        disable: false,
        startEvent: 'DOMContentLoaded',
        offset: 20,
        mirror: true,
      });
    };
    window.addEventListener('load', initAOS);

    // Debounced AOS.refresh() on scroll to force recalculation on mobile touch
    let refreshTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        AOS.refresh();
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Fallback: init immediately if window already loaded
    if (document.readyState === 'complete') {
      initAOS();
    }

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

    // Cleanup event listeners
    return () => {
      window.removeEventListener('load', initAOS);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
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
        <RecentEventsLinkSection />
        <TeamSection />
        <SupportSection />
        <FeaturedEventSection />
        <ChristmasGallerySection />
        <BlogSection />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}