import { AnimatedCounter } from './AnimatedCounter';
import { useLanguage } from '../contexts/LanguageContext';
import { TEAM } from '../assets/images';

export function ImpactStatsSection() {
    const { t } = useLanguage();

    const stats = [
        {
            value: 300,
            suffix: '+',
            label: t('about.stats.members'),
            color: 'text-[#8B0000]'
        },
        {
            value: 20,
            suffix: '+',
            label: t('hero.active_programs'),
            color: 'text-[#121212]'
        },
        {
            value: 50,
            suffix: '+',
            label: t('hero.partners'),
            color: 'text-[#C5A059]'
        },
        {
            value: 100,
            suffix: '%',
            label: t('about.stats.years'),
            color: 'text-[#8B0000]'
        }
    ];

    return (
        <section className="relative w-full bg-white flex flex-col pt-8 lg:pt-10">
            {/* Mirror Wall for Counters (Above the Photo) */}
            <div className="relative z-20 w-full backdrop-blur-2xl bg-white/70 border-b border-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] pt-0 pb-12 lg:pb-16">
                {/* Subtle top gloss for mirror effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col justify-center relative z-10 text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#121212] leading-[1.1] tracking-tighter text-center mb-12 lg:mb-16">
                        {t('about.five_years_goals')}
                    </h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 w-full">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center text-center group cursor-default">
                                <div className={`text-4xl sm:text-5xl lg:text-6xl font-serif ${stat.color} mb-3 transition-transform duration-500 group-hover:scale-110 flex items-baseline drop-shadow-sm`}>
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="h-0.5 w-12 bg-[#C5A059] mb-4 opacity-50"></div>
                                <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#121212] font-black leading-relaxed max-w-[150px] drop-shadow-sm">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* The "Cinematic Transit" Team Photo */}
            {/* clip-path:inset(0) + position:fixed = cinematic fixed background on mobile */}
            <div
                className="relative z-0 w-full h-[350px] md:h-[400px] lg:h-[70vh] border-t border-b border-white/5 overflow-hidden"
                style={{ clipPath: 'inset(0)' }}
            >
                {/* Desktop: bg-fixed positions relative to VIEWPORT */}
                <div
                    className="absolute inset-0 w-full h-full bg-no-repeat bg-fixed hidden lg:block"
                    style={{
                        backgroundImage: `url(${TEAM.teamPhoto})`,
                        backgroundSize: '95% auto',
                        backgroundPosition: 'center 8vh',
                    }}
                />

                {/* Mobile: position:fixed bg-image clipped by clip-path on parent */}
                {/* backface-visibility: hidden promotes GPU layer without breaking position:fixed */}
                <div
                    className="lg:hidden fixed inset-0 w-full h-full"
                    style={{
                        backgroundImage: `url(${TEAM.teamPhoto})`,
                        backgroundSize: '100% auto',
                        backgroundPosition: '50% 30%',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'white',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                    }}
                />

                {/* Subtle Cinematic Fades */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10 pointer-events-none"></div>
            </div>
        </section>
    );
}
