import React from 'react'
import { useNavigate } from 'react-router-dom'
import { S } from '../theme.js'

function CatSvgPeek({ style }) {
  const common = { fill: 'none', stroke: '#d4a5c4', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }
  return (
    <svg viewBox="0 0 100 60" style={style}>
      <path {...common} d="M20 58 Q20 30 50 28 Q80 30 80 58" />
      <path {...common} d="M30 34 L26 22 L38 30" />
      <path {...common} d="M70 34 L74 22 L62 30" />
      <path {...common} d="M42 40 q1 2 2 0 M56 40 q1 2 2 0" />
      <path {...common} d="M50 44 l0 2 M48 46 q2 2 4 0" />
    </svg>
  )
}

function Stat({ label, value, hint }) {
  return (
    <div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8a7a9a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
      <div className="dossier-foil-static" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 40, lineHeight: 1, marginTop: 4 }}>{value}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#6b2d5c', marginTop: 3 }}>{hint}</div>
    </div>
  )
}

function Sparkline({ data }) {
  const W = 260, H = 50
  const max = Math.max(...data), min = Math.min(...data)
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((v - min) / (max - min || 1)) * H
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  return (
    <svg width={W} height={H} style={{ display: 'block', marginTop: 8 }}>
      <polyline points={pts} fill="none" stroke="#d4a5c4" strokeWidth="1" />
      <polyline points={`0,${H} ${pts} ${W},${H}`} fill="rgba(212,165,196,0.08)" />
    </svg>
  )
}

const sparkData = Array.from({ length: 40 }, () => Math.random())

const SKILLS = [
  'Python', 'SQL', 'Java', 'PyTorch', 'TensorFlow', 'scikit-learn',
  'LightGBM', 'XGBoost', 'FastAPI', 'MongoDB', 'Neo4j',
  'RAG Pipelines', 'Knowledge Graphs', 'LLM Fine-tuning',
  'Power BI', 'PsychoPy', 'Docker', 'Streamlit',
]

export default function Home() {
  const navigate = useNavigate()
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48 }}>

      {/* LEFT — hero */}
      <div style={{ position: 'relative' }}>
        <div style={S.eyebrow}>FEATURE · ABOUT ME</div>
        <h1 style={S.hero}>
          A third-year CS student who <em style={{ color: '#d4a5c4' }}>reads</em> data like poetry.
        </h1>
        <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
          <div
            style={{ width: 180, height: 220, border: '1px solid #3a2a4a', position: 'relative', overflow: 'hidden', flexShrink: 0 }}
            data-cat
          >
            <div style={S.photoLabel}>PLATE 01 · PORTRAIT</div>
            <img src="/portfolio/photo.jpg" alt="Anushka Mohanty" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <CatSvgPeek style={{ position: 'absolute', bottom: -2, right: 8, width: 44, opacity: 0.85 }} />
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14.5, lineHeight: 1.7, color: '#c9bdd4' }}>
            <p style={{ margin: '0 0 14px' }}>
              Third-year CS at Mahindra University, Hyderabad. Two deployed systems, research submitted
              to COMSNETS and ICDCN, and measurable impact across{' '}
              <em style={{ color: '#d4a5c4', fontStyle: 'italic' }}>
                RAG pipelines, multimodal deep learning, network simulation, and feature engineering
              </em>.
            </p>
            <p style={{ margin: 0, color: '#8a7a9a', fontSize: 13 }}>
              Targeting Summer 2026 AI/ML and Data Science roles. Recently completed an advanced
              AI/ML and Robotics immersion at Hiroshima University, Japan.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — stats */}
      <div style={{ borderLeft: '1px solid #3a2a4a', paddingLeft: 32 }}>
        <div style={S.eyebrow}>THE DATA COLUMN</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 20 }}>
          <Stat label="CGPA" value="7.68" hint="/ 10 cumulative" />
          <Stat label="Latest SGPA" value="8.56" hint="/ 10" />
          <Stat label="Papers submitted" value="2" hint="COMSNETS · ICDCN" />
          <Stat label="Club founded" value="200" hint="Cognitia members" />
        </div>

        <div style={{ marginTop: 28, padding: '18px 0', borderTop: '1px solid #3a2a4a', borderBottom: '1px solid #3a2a4a' }}>
          <div style={S.eyebrow}>RESEARCH INTERESTS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            {['Retail × Data', 'Multimodal AI', 'RAG + Knowledge Graphs', 'Social Network Simulation', 'Cognitive Load in UX', 'Forecasting', 'Behavioural Experimentation'].map((t) => (
              <span key={t} style={S.tag}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={S.eyebrow}>LIVE READOUT · INTERNSHIP MODEL R²</div>
          <Sparkline data={sparkData} />
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8a7a9a', marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
            <span>0.12</span>
            <span style={{ color: '#d4a5c4' }}>peak R² = 0.67 · LightGBM</span>
            <span>0.67</span>
          </div>
        </div>

        <button onClick={() => navigate('/projects')} style={S.ctaBtn}>
          <span>Read the projects</span>
          <span style={{ marginLeft: 10, fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>→</span>
        </button>
      </div>

      {/* FULL-WIDTH divider */}
      <div style={{ gridColumn: '1 / -1', marginTop: 12 }}>
        <div className="dossier-hairline-silver" />
      </div>

      {/* FULL-WIDTH: Skills + Personal Details + Contact */}
      <div style={{ gridColumn: '1 / -1', paddingTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48 }}>

        <div>
          <div style={S.eyebrow}>TECHNICAL SKILLS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
            {SKILLS.map((sk) => (
              <span key={sk} style={S.tag}>{sk}</span>
            ))}
          </div>
        </div>

        <div>
          <div style={S.eyebrow}>PERSONAL DETAILS</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#c9bdd4', marginTop: 14, lineHeight: 1 }}>
            {[
              { label: 'NAME', value: 'Anushka Mohanty' },
              { label: 'PHONE', value: '+91 70328 57007' },
              { label: 'COLLEGE EMAIL', value: 'se23ucse028@mahindrauniversity.edu.in' },
              { label: 'PERSONAL EMAIL', value: 'anushkamohanty2004@gmail.com' },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 9, color: '#6b2d5c', letterSpacing: '0.15em', marginBottom: 5 }}>{label}</div>
                <div style={{ wordBreak: 'break-all' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={S.eyebrow}>CORRESPONDENCE</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#c9bdd4', marginTop: 14, lineHeight: 2 }}>
            <a style={S.link} href="https://github.com/anushkamohanty14" target="_blank" rel="noreferrer">
              github.com/anushkamohanty14 ↗
            </a>
            <div style={{ color: '#8a7a9a', marginTop: 12, fontSize: 11, lineHeight: 1.8 }}>
              Mahindra University<br />
              Hyderabad, India<br />
              B.Tech Computer Science<br />
              Aug 2023 – Present
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
