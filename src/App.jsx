import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Experience from './pages/Experience.jsx'

function GrainSVG() {
  return (
    <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.12, mixBlendMode: 'overlay', zIndex: 0 }} aria-hidden>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  )
}

function Footer() {
  return (
    <div style={{ padding: '24px 56px', borderTop: '1px solid #3a2a4a', display: 'flex', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#6b2d5c', letterSpacing: '0.1em' }}>
      <span>© ANUSHKA MOHANTY · 2026</span>
      <span>HYDERABAD · 17.3850° N, 78.4867° E</span>
    </div>
  )
}

function CatCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100, visible: false })
  useEffect(() => {
    const move = (e) => {
      const onCat = e.target.closest?.('[data-cat]')
      setPos({ x: e.clientX, y: e.clientY, visible: !!onCat })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div style={{ position: 'fixed', left: pos.x + 12, top: pos.y + 12, pointerEvents: 'none', zIndex: 200, opacity: pos.visible ? 1 : 0, transition: 'opacity .2s', fontFamily: "'Instrument Serif', serif", fontSize: 14, color: '#d4a5c4', fontStyle: 'italic' }}>
      ฅ^•ﻌ•^ฅ
    </div>
  )
}

export default function App() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#0e0b1a', color: '#f4d9e4', fontFamily: 'Inter, sans-serif', position: 'relative' }}>
      <GrainSVG />
      <Nav />
      <main style={{ padding: '48px 56px 80px', maxWidth: 1300, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
        </Routes>
      </main>
      <Footer />
      <CatCursor />
    </div>
  )
}
