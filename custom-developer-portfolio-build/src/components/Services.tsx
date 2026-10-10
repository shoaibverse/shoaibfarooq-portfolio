import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layout, Cpu, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';
import { SectionHeading } from './ui/SectionHeading';
import { VIEWPORT, springSoft, staggerContainer, staggerItem } from '../lib/motion';

interface ServicesProps {
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForContact }) => {
  // Accent used only on the first service; the rest read as neutral
  // so the section doesn't feel like a row of colored badges.
  const getIcon = (iconName: string, isAccent: boolean) => {
    const color = isAccent ? 'text-primary' : 'text-body';
    switch (iconName) {
      case 'Globe':
        return <Globe className={`h-5 w-5 ${color}`} />;
      case 'Layout':
        return <Layout className={`h-5 w-5 ${color}`} />;
      case 'Cpu':
        return <Cpu className={`h-5 w-5 ${color}`} />;
      case 'Briefcase':
        return <Briefcase className={`h-5 w-5 ${color}`} />;
      default:
        return <Globe className={`h-5 w-5 ${color}`} />;
    }
  };

  return (
    <section id="services" className="relative border-t border-line-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Offerings"
          title="What I can build"
          description="Practical development services focused on clean code, responsive layouts, and practical AI implementations."
        />

        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              transition={springSoft}
              className="spotlight edge-glow group flex flex-col justify-between rounded-2xl border border-line-soft bg-surface/60 p-6 transition-colors duration-300 hover:border-primary/25 hover:bg-surface"
            >
              <div>
                <div className="mb-3 flex items-center gap-3.5">
                  <motion.div
                    whileHover={{ rotate: -5, scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 14 }}
                    className="icon-pop rounded-xl border border-line-soft bg-surface-deep p-2.5"
                  >
                    {getIcon(service.icon, index === 0)}
                  </motion.div>
                  <h3 className="text-lg font-bold text-heading transition-colors duration-200 group-hover:text-primary-soft">
                    {service.title}
                  </h3>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-body">{service.description}</p>

                <div className="mb-6 space-y-2">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                    Deliverables &amp; Focus
                  </span>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-body">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-line-soft pt-4">
                <span className="max-w-[200px] truncate text-[11px] italic text-muted sm:max-w-xs">
                  {service.idealFor}
                </span>

                <button
                  onClick={() => onSelectServiceForContact(service.title)}
                  className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors duration-200 hover:text-primary-soft"
                >
                  <span>Inquire</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
