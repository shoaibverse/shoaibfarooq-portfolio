import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code, MapPin, GraduationCap, Sparkles, BookOpen, HeartHandshake } from 'lucide-react';
import { CERTIFICATES_DATA, EDUCATION_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { SectionHeading } from './ui/SectionHeading';
import { ProfilePhoto } from './ui/ProfilePhoto';
import { RevealGroup, RevealItem } from './ui/Reveal';
import { EASE_OUT, VIEWPORT, springSoft } from '../lib/motion';

export const About: React.FC = () => {
  const focusCards = [
    {
      icon: <Code className="h-4 w-4 text-primary" />,
      title: 'Frontend & Web Apps',
      body: 'Python tooling plus responsive interfaces in HTML, CSS, JavaScript and React, with an emphasis on clarity.',
    },
    {
      icon: <Sparkles className="h-4 w-4 text-accent" />,
      title: 'AI & LLM Workflows',
      body: 'Machine learning in Python, AI image tools and prompt-driven features that ship inside real products.',
    },
  ];

  return (
    <section id="about" className="relative border-t border-line-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label="Background" title="A little about me" className="mb-12" />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Narrative */}
          <RevealGroup
            stagger={0.1}
            className="space-y-5 text-sm leading-relaxed text-body sm:text-base lg:col-span-7"
          >
            {PERSONAL_INFO.aboutText.map((paragraph, index) => (
              <RevealItem key={index}>
                <p className="measure-md text-sm leading-relaxed text-body sm:text-[15px]">
                  {paragraph}
                </p>
              </RevealItem>
            ))}

            <RevealItem className="pt-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {focusCards.map((card) => (
                  <motion.div
                    key={card.title}
                    whileHover={{ y: -3 }}
                    transition={springSoft}
                    className="spotlight edge-glow rounded-xl border border-line-soft bg-surface/60 p-4 transition-colors duration-300 hover:border-line"
                  >
                    <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-heading">
                      {card.icon}
                      <span>{card.title}</span>
                    </div>
                    <p className="text-xs text-muted">{card.body}</p>
                  </motion.div>
                ))}
              </div>
            </RevealItem>
          </RevealGroup>

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
            className="space-y-4 lg:col-span-5"
          >
            <div className="spotlight edge-glow rounded-2xl border border-line bg-surface/80 p-5 shadow-xl shadow-black/20 backdrop-blur-md transition-colors duration-300 hover:border-primary/25">
              <div className="space-y-4">
                <ProfilePhoto />

                <div className="space-y-1.5 text-center sm:text-left">
                  <h3 className="text-lg font-bold tracking-tight text-heading">{PERSONAL_INFO.name}</h3>
                  <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-primary sm:justify-start">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Computer Science Student</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted sm:justify-start">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Lahore, Pakistan 🇵🇰</span>
                  </div>
                  <div className="pt-1">
                    <span className="inline-block rounded-md border border-primary/20 bg-primary-tint px-2.5 py-1 font-mono text-[11px] text-primary-soft">
                      • {PERSONAL_INFO.availabilityStatus}
                    </span>
                  </div>
                </div>
              </div>

              <RevealGroup
                stagger={0.08}
                className="mt-5 space-y-2 border-t border-line-soft pt-4 text-xs text-body"
              >
                <RevealItem tight>
                  <div className="flex items-start gap-2">
                    <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>
                      <strong className="text-heading">Learning Mindset:</strong> Constantly refining fundamentals
                      while building real software.
                    </span>
                  </div>
                </RevealItem>
                <RevealItem tight>
                  <div className="flex items-start gap-2">
                    <HeartHandshake className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>
                      <strong className="text-heading">Pragmatic Craft:</strong> Striving for clean architecture,
                      fast loads, and honest code.
                    </span>
                  </div>
                </RevealItem>
              </RevealGroup>
            </div>

            {/* Education timeline + certifications */}
            <div className="spotlight edge-glow rounded-2xl border border-line bg-surface/80 p-5 backdrop-blur-md">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-heading">
                <GraduationCap className="h-4 w-4 text-primary" />
                Education
              </h3>
              <ol className="relative space-y-4 border-l border-line pl-5">
                {EDUCATION_DATA.map((item, index) => (
                  <motion.li
                    key={item.degree}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.1 }}
                    className="relative"
                  >
                    <span
                      className={`absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-ink ${
                        index === 0 ? 'bg-primary shadow-[0_0_0_4px_rgba(242,177,76,0.2)]' : 'bg-line'
                      }`}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <span className="text-sm font-semibold text-heading">{item.degree}</span>
                      <span className="font-mono text-[11px] text-muted">{item.period}</span>
                    </div>
                    <p className="text-xs text-body">{item.institution}</p>
                    {item.note && <p className="mt-0.5 font-mono text-[11px] text-primary-soft">{item.note}</p>}
                  </motion.li>
                ))}
              </ol>

              <div className="mt-5 border-t border-line-soft pt-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-heading">
                  <Award className="h-4 w-4 text-sage" />
                  Certifications
                </h3>
                <ul className="space-y-2 text-xs text-body">
                  {CERTIFICATES_DATA.filter((cert) => cert.inCv).map((cert) => (
                    <li key={cert.id} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {cert.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
