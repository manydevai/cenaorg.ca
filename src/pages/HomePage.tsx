import { HeroSection } from '../components/HeroSection';
import { LogoWall } from '../components/LogoWall';
import { AboutSection } from '../components/AboutSection';
import { MissionSection } from '../components/MissionSection';
import { VisionSection } from '../components/VisionSection';
import { ProgramsSection } from '../components/ProgramsSection';
import { PartnersSection } from '../components/PartnersSection';
import { MembersSection } from '../components/MembersSection';
import { EventsSection } from '../components/EventsSection';
import { FeaturedEventSection } from '../components/FeaturedEventSection';
import { TeamSection } from '../components/TeamSection';
import { SupportSection } from '../components/SupportSection';
import { ChristmasGallerySection } from '../components/ChristmasGallerySection';
import { RecentEventsLinkSection } from '../components/RecentEventsLinkSection';
import { BlogSection } from '../components/BlogSection';

// HomePage - CENA Main Landing Page
export function HomePage() {
    return (
        <>
            <HeroSection />
            <LogoWall />
            <AboutSection />
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
        </>
    );
}
