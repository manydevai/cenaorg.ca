import { motion } from 'framer-motion';
import { Award, TrendingUp, Heart, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function VisionSection() {
  const { t } = useLanguage();

  const goals = [
    {
      icon: Award,
      title: t('vision.goal1'),
      description: t('vision.goal1_desc'),
      color: '#8B0000',
    },
    {
      icon: TrendingUp,
      title: t('vision.goal2'),
      description: t('vision.goal2_desc'),
      color: '#C5A059',
    },
    {
      icon: Heart,
      title: t('vision.goal3'),
      description: t('vision.goal3_desc'),
      color: '#121212',
    },
  ];

  return (
    <section id="vision" className="py-24 sm:py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-24">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, x: '100vw' }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="inline-block text-[#C5A059] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-6"
            >
              {t('vision.badge')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-4xl sm:text-6xl font-serif text-[#121212] leading-tight tracking-tight"
            >
              {t('vision.title')}
            </motion.h2>
          </div>
          <div className="lg:max-w-sm">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              className="text-gray-500 text-sm leading-loose"
            >
              {t('vision.description')}
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 overflow-x-hidden">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: 'easeOut',
              }}
              className="bg-white p-12 border border-gray-200 transition-shadow duration-700 hover:shadow-[30px_30px_0px_-15px_rgba(197,160,89,0.1)] group cursor-default"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 border border-gray-100" style={{ color: goal.color }}>
                  <goal.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-4xl font-serif text-gray-100 group-hover:text-gray-200 transition-colors">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-xl font-serif mb-6 text-[#121212] uppercase tracking-tighter">
                {goal.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-sans mb-10">
                {goal.description}
              </p>

              <div className="flex items-center text-[10px] tracking-[0.2em] font-bold text-[#8B0000] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                {t('vision.read_objective')} <ArrowUpRight className="ml-2 h-3 w-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}