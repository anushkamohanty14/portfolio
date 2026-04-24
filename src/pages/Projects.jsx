import React, { useState } from 'react'
import { S, PROJECTS } from '../theme.js'

function ProjectCard({ p, onOpen, featured }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(p)}
      className={`dossier-card ${hover ? 'hover' : ''}`}
      style={S.card(hover)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b2d5c', letterSpacing: '0.08em' }}>
          {featured && <span style={{ color: '#d4a5c4', marginRight: 6 }}>★</span>}
          PROJECT {p.num} · {p.year}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8a7a9a', opacity: hover ? 1 : 0, transition: 'opacity .3s' }}>
          OPEN ↗
        </div>
      </div>
      <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#f4d9e4', lineHeight: 1.1, marginTop: 14, transform: hover ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform .4s ease' }}>
        {p.title}
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#8a7a9a', marginTop: 6, fontStyle: 'italic' }}>
        {p.kicker}
      </div>
      <div style={{ maxHeight: hover ? 80 : 0, overflow: 'hidden', transition: 'max-height .5s ease' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#c9bdd4', marginTop: 14, lineHeight: 1.5 }}>
          {p.oneline}
        </div>
      </div>
      <div style={{ borderTop: '1px solid #3a2a4a', marginTop: 'auto', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {p.tags.slice(0, 3).map((t) => (
            <span key={t} style={S.miniTag}>{t}</span>
          ))}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className={hover ? 'dossier-foil' : ''} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#d4a5c4', lineHeight: 1 }}>{p.stat}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#6b2d5c', letterSpacing: '0.05em', marginTop: 2 }}>{p.statLabel}</div>
        </div>
      </div>
    </button>
  )
}

function ProjectModal({ project, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(14,11,26,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 40, backdropFilter: 'blur(4px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: '#1a1230', color: '#f4d9e4', width: '100%', maxWidth: 720, maxHeight: '80vh', overflow: 'auto', border: '1px solid #3a2a4a', padding: 40, position: 'relative' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: 'inherit', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, cursor: 'pointer' }}>
          CLOSE ✕
        </button>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b2d5c', letterSpacing: '0.1em' }}>
          PROJECT {project.num} · {project.year}
        </div>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, lineHeight: 1.05, margin: '8px 0 4px', fontWeight: 400 }}>
          {project.title}
        </h2>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontStyle: 'italic', color: '#c9bdd4', marginBottom: 24 }}>
          {project.kicker}
        </div>
        <div style={{ display: 'flex', gap: 24, padding: '16px 0', borderTop: '1px solid #3a2a4a', borderBottom: '1px solid #3a2a4a', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 40, color: '#d4a5c4', lineHeight: 1 }}>{project.stat}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8a7a9a', marginTop: 3 }}>{project.statLabel}</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.map((t) => <span key={t} style={S.tag}>{t}</span>)}
          </div>
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14.5, lineHeight: 1.7, marginTop: 22, color: '#c9bdd4' }}>
          {project.body.map((para, i) => (
            <p key={i} style={{ margin: '0 0 14px' }}>{para}</p>
          ))}
        </div>
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer" style={{ ...S.link, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, display: 'inline-block', marginTop: 16 }}>
            {project.repo} ↗
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [openProject, setOpenProject] = useState(null)
  return (
    <div>
      <div style={S.eyebrow}>SECTION 02 · PROJECTS & RESEARCH</div>
      <h1 style={{ ...S.hero, fontSize: 56, marginTop: 6 }}>
        Six things I've built <em style={{ color: '#d4a5c4' }}>on purpose</em>.
      </h1>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b2d5c', marginTop: 20, marginBottom: 24, letterSpacing: '0.05em', display: 'flex', gap: 24 }}>
        <span>▸ 6 ENTRIES</span>
        <span>▸ 2 PAPERS UNDER REVIEW</span>
        <span>▸ 3 LIVE DEMOS</span>
      </div>
      <div style={S.projectGrid}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} onOpen={setOpenProject} featured={i < 3} />
        ))}
      </div>
      <div style={{ marginTop: 40, padding: '20px 24px', border: '1px dashed #3a2a4a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: '#c9bdd4', fontStyle: 'italic' }}>
          Want the code? It's on GitHub.
        </div>
        <a href="https://github.com/anushkamohanty14" target="_blank" rel="noreferrer" style={{ ...S.link, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
          github.com/anushkamohanty14 ↗
        </a>
      </div>
      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </div>
  )
}
