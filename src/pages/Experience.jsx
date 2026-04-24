import React from 'react'
import { S } from '../theme.js'

const timeline = [
  {
    when: 'Mar 2026 – Present',
    role: 'AI/ML Intern',
    org: "Daira EdTech · Founder's Office",
    bullets: [
      'Architected a 16-entity, 18-relationship Neo4j knowledge graph for a pediatric medical chatbot, now the structured RAG source for a MedGemma + Gemini 2.5 Flash pipeline.',
      'Scraped and analysed online forum data, quantifying 6 concern-intent categories to ground feature prioritisation in real parental behaviour.',
    ],
    tag: 'RAG · Neo4j · LLM',
  },
  {
    when: 'Jan 2026',
    role: 'Advanced Transdisciplinary Immersion',
    org: 'Hiroshima University, Japan',
    bullets: [
      'AI/ML, robotics, and embedded systems program.',
      'Also: finally got to Osaka. Takoyaki was, in fact, worth it.',
    ],
    tag: 'Immersion',
  },
  {
    when: 'Jun 2025 – Aug 2025',
    role: 'Data Science Intern',
    org: 'Empover i-Tech',
    bullets: [
      'Built a return-forecasting ML pipeline across 2,000+ distributors and 50K+ SKUs — engineered 32 lag-based features, selected LightGBM at R² = 0.67.',
      'Shipped a Power BI dashboard used directly by inventory planners to allocate stock.',
      'Refactored 5 notebooks into 25 reusable pipeline functions — 89% codebase reduction.',
    ],
    tag: 'Retail × ML · Forecasting',
  },
  {
    when: 'Aug 2024 – Oct 2025',
    role: 'Undergraduate Research Intern',
    org: 'Cognitive Load in UX & AI · Mahindra University',
    bullets: [
      'Presented at International Scientific Research Congress 2024, Istanbul.',
      'Reduced task completion time by 19% (n=120) by identifying menu navigation as the primary friction point.',
    ],
    tag: 'Research',
  },
  {
    when: 'Aug 2024 – May 2025',
    role: 'Founder & Vice-President',
    org: 'Cognitia · Cognitive Science Club, Mahindra University',
    bullets: [
      'Grew Cognitia to 200+ members across 5+ events by leading a 17-person cross-functional team.',
      'Designed a data-driven curriculum making AI and neuroscience accessible to 350+ students.',
    ],
    tag: 'Leadership',
  },
]

export default function Experience() {
  return (
    <div>
      <div style={S.eyebrow}>SECTION 03 · EXPERIENCE</div>
      <h1 style={{ ...S.hero, fontSize: 56, marginTop: 6 }}>
        The working <em style={{ color: '#d4a5c4' }}>history</em>.
      </h1>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#c9bdd4', marginTop: 16, maxWidth: 560, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 36 }}>
        Internships, research, a club I founded, and the brief-but-formative month in Japan.
      </div>
      <div style={{ position: 'relative', paddingLeft: 28 }}>
        <div style={{ position: 'absolute', left: 6, top: 8, bottom: 8, width: 1, background: '#3a2a4a' }} />
        {timeline.map((t, i) => (
          <div key={i} style={{ position: 'relative', paddingBottom: 36 }}>
            <div style={{ position: 'absolute', left: -26, top: 6, width: 9, height: 9, borderRadius: '50%', background: '#d4a5c4', border: '2px solid #0e0b1a', boxShadow: '0 0 0 2px #6b2d5c' }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#6b2d5c', letterSpacing: '0.15em' }}>{t.when}</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: '#f4d9e4', marginTop: 6, lineHeight: 1.15 }}>{t.role}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#d4a5c4', fontStyle: 'italic', marginTop: 4 }}>{t.org}</div>
            <ul style={{ margin: '14px 0 0', paddingLeft: 18, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#c9bdd4', lineHeight: 1.7 }}>
              {t.bullets.map((b, j) => <li key={j} style={{ marginBottom: 6 }}>{b}</li>)}
            </ul>
            <div style={{ marginTop: 10 }}>
              <span style={S.tag}>{t.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
