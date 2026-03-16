import { motion } from 'framer-motion';
import { TEAM } from '../assets/images';
import { useLanguage } from '../contexts/LanguageContext';

// Puzzle directions for each card position
const puzzleDirections = [
  { x: 0, y: -80 },   // Top-Left: slides from top
  { x: -80, y: 0 },   // Top-Middle: slides from left
  { x: 0, y: 80 },    // Top-Right: slides from bottom
  { x: 80, y: 0 },    // Bottom-Left: slides from right
  { x: 0, y: -80 },   // Bottom-Middle: slides from top
  { x: -80, y: 0 },   // Bottom-Right: slides from left
];

export function TeamSection() {
  const { t } = useLanguage();

  const teamMembers = [
    { name: 'Cristina Indira Manuel', roleKey: 'team.role_president', image: TEAM.members.cristinaManuel },
    { name: 'Marileny Fernando António', roleKey: 'team.role_vp_operations', image: TEAM.members.marilenyAntonio },
    { name: 'Sebastião Sala', roleKey: 'team.role_finance', image: TEAM.members.sebastiaoSala },
    { name: 'Iolanda Maria Mendes', roleKey: 'team.role_international', image: TEAM.members.iolandaMendes },
    { name: 'Daniel Love Fernando António', roleKey: 'team.role_youth', image: TEAM.members.danielLove },
    { name: 'Dulce Angelina Figueiredo', roleKey: 'team.role_hr', image: TEAM.members.dulceFigueiredo },
  ];

  return (
    <section id="team" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-center">
          <div className="lg:col-span-6">
            <motion.span
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-block text-[#8B0000] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-6"
            >
              {t('team.badge')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: 'spring',
                stiffness: 70,
                damping: 15,
                mass: 1,
              }}
              className="text-4xl sm:text-6xl font-serif text-[#121212] leading-tight tracking-tight"
            >
              {t('team.title')}
            </motion.h2>
          </div>
          <div className="lg:col-span-6 border-l border-gray-100 pl-8">
            <p className="text-gray-500 text-lg leading-relaxed italic">
              {t('team.description')}
            </p>
          </div>
        </div>

        {/* Puzzle Grid Profile Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-100">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: puzzleDirections[index].x,
                y: puzzleDirections[index].y,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              className="group relative h-[500px] overflow-hidden border-b lg:border-r border-gray-100 last:border-r-0 cursor-default"
            >
              {/* Background Profile Image */}
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                style={{ objectPosition: '50% 15%' }}
              />

              {/* Architectural Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>

              {/* Content Box */}
              <div className="absolute bottom-0 left-0 p-12 w-full transform group-hover:-translate-y-4 transition-transform duration-700">
                <span className="block text-[9px] tracking-[0.4em] uppercase font-bold text-[#C5A059] mb-4">
                  {t(member.roleKey)}
                </span>
                <h4 className="text-2xl font-serif text-white tracking-tight uppercase leading-none">
                  {member.name}
                </h4>

                <div className="h-px w-0 group-hover:w-full bg-[#C5A059]/40 mt-8 transition-all duration-1000"></div>
              </div>

              {/* Hidden Hover Badge */}
              <div className="absolute top-12 left-12 p-3 border border-white/20 text-white/40 text-[8px] tracking-[0.5em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {t('team.council_member')}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leadership Vision Bar */}
        <div className="mt-32 p-12 lg:p-20 bg-[#121212] relative overflow-hidden text-center group">
          <div className="absolute top-0 right-0 w-48 h-1 bg-[#8B0000]"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-serif text-white mb-8 tracking-tight uppercase">
              {t('team.leadership_title')}
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed italic border-l-2 border-[#C5A059]/30 pl-12 mx-auto inline-block text-left">
              "{t('team.leadership_message')}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}