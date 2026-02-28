import { HeroSection } from '../components/HeroSection';
import { LogoWall } from '../components/LogoWall';
import { AboutSection } from '../components/AboutSection';
import { MissionSection } from '../components/MissionSection';
import { VisionSection } from '../components/VisionSection';
import { ProgramsSection } from '../components/ProgramsSection';
import { PartnersSection } from '../components/PartnersSection';
import { MembersSection } from '../components/MembersSection';
import { EventsSection } from '../components/EventsSection';
import { TeamSection } from '../components/TeamSection';
import { SupportSection } from '../components/SupportSection';
import { ChristmasGallerySection } from '../components/ChristmasGallerySection';
import { BlogSection } from '../components/BlogSection';

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
            <TeamSection />
            <SupportSection />
            <ChristmasGallerySection />
            <BlogSection />
        </>
    );
}
