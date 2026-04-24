import React from 'react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'About', num: '01', end: true },
  { to: '/projects', label: 'Projects', num: '02' },
  { to: '/experience', label: 'Experience', num: '03' },
]

export default function Nav() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '22px 56px',
      borderBottom: '1px solid #3a2a4a',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'rgba(14,11,26,0.95)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, lineHeight: 1, letterSpacing: '-0.01em', color: '#f4d9e4' }}>
        Anushka <span className="dossier-foil" style={{ fontStyle: 'italic' }}>Mohanty</span>
      </div>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {items.map((it) => (
          <NavLink key={it.to} to={it.to} end={it.end} className="nav-link">
            <span style={{ color: '#6b2d5c', marginRight: 6 }}>{it.num}</span>
            {it.label}
          </NavLink>
        ))}
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#d4a5c4' }} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8a7a9a', letterSpacing: '0.1em' }}>
          HYD · 28.4°C
        </div>
      </div>
    </nav>
  )
}
