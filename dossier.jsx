/* global React */
const { useState, useRef, useEffect } = React;

// Inject holographic/foil CSS once
if (typeof document !== "undefined" && !document.getElementById("dossier-foil-styles")) {
  const el = document.createElement("style");
  el.id = "dossier-foil-styles";
  el.textContent = `
    @keyframes dossierFoilShift {
      0%   { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    .dossier-foil {
      background: linear-gradient(110deg,
        #d4a5c4 0%, #e8d5e0 14%, #c9d1e0 28%,
        #f4e4f0 42%, #b8c4d6 56%, #e0c8d8 70%,
        #d4a5c4 84%, #f4d9e4 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent; color: transparent;
      font-style: italic;
      animation: dossierFoilShift 8s linear infinite;
    }
    .dossier-foil-static {
      background: linear-gradient(110deg,
        #b8c4d6 0%, #e8d5e0 30%, #d4a5c4 50%, #e8d5e0 70%, #b8c4d6 100%);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent; color: transparent;
    }
    .dossier-card { position: relative; overflow: hidden; }
    .dossier-card::before {
      content: ""; position: absolute; inset: -1px;
      background: conic-gradient(from 120deg at 50% 50%,
        transparent 0deg, rgba(184,196,214,0.35) 60deg,
        rgba(232,213,224,0.4) 120deg, rgba(212,165,196,0.3) 180deg,
        rgba(184,196,214,0.2) 240deg, transparent 320deg);
      opacity: 0; transition: opacity .5s ease;
      pointer-events: none; mix-blend-mode: screen;
    }
    .dossier-card.hover::before { opacity: 0.7; animation: dossierFoilSpin 6s linear infinite; }
    .dossier-card > * { position: relative; z-index: 1; }
    @keyframes dossierFoilSpin {
      0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }
    }
    .dossier-hairline-silver {
      background: linear-gradient(90deg,
        transparent, rgba(184,196,214,0.4) 20%,
        rgba(232,213,224,0.6) 50%,
        rgba(184,196,214,0.4) 80%, transparent);
      height: 1px; width: 100%;
    }
    .dossier-dots {
      background-image:
        radial-gradient(circle at 20% 30%, rgba(232,213,224,0.5) 0.5px, transparent 1px),
        radial-gradient(circle at 70% 60%, rgba(184,196,214,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 40% 80%, rgba(212,165,196,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 85% 20%, rgba(232,213,224,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 10% 70%, rgba(184,196,214,0.4) 0.5px, transparent 1px);
      background-size: 80px 80px, 120px 120px, 100px 100px, 140px 140px, 90px 90px;
    }
  `;
  document.head.appendChild(el);
}

// ============ DOSSIER — dark editorial ============
function Dossier() {
  const [page, setPage] = useState("home"); // home | projects | experience
  const [openProject, setOpenProject] = useState(null);
  const [sparkData] = useState(() => Array.from({ length: 40 }, () => Math.random()));

  return (
    <div style={dossierStyles.root}>
      <GrainSVG />
      <DossierNav page={page} setPage={setPage} />
      <div style={dossierStyles.page}>
        {page === "home" && <DossierHome setPage={setPage} sparkData={sparkData} />}
        {page === "projects" && <DossierProjects onOpen={setOpenProject} />}
        {page === "experience" && <DossierExperience />}
      </div>
      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} theme="dark" />}
      <CatCursor />
      <DossierFooter />
    </div>
  );
}

function DossierNav({ page, setPage }) {
  const items = [
    { id: "home", label: "About", num: "01" },
    { id: "projects", label: "Projects", num: "02" },
    { id: "experience", label: "Experience", num: "03" },
  ];
  return (
    <div style={dossierStyles.nav}>
      <div style={dossierStyles.navBrand}>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, lineHeight: 1, letterSpacing: "-0.01em" }}>
          Anushka <span className="dossier-foil" style={{ fontStyle: "italic" }}>Mohanty</span>
        </div>
        <div style={dossierStyles.navTag}>ISSUE Nº 21 — SPRING 2026</div>
      </div>
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {items.map((it) => (
          <button key={it.id} onClick={() => setPage(it.id)} style={dossierStyles.navBtn(page === it.id)}>
            <span style={{ color: "#6b2d5c", marginRight: 6 }}>{it.num}</span>
            {it.label}
          </button>
        ))}
        <div style={dossierStyles.dot} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#8a7a9a", letterSpacing: "0.1em" }}>
          HYD · 28.4°C
        </div>
      </div>
    </div>
  );
}

function DossierHome({ setPage, sparkData }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48 }}>
      {/* LEFT — hero editorial */}
      <div style={{ position: "relative" }}>
        <div style={dossierStyles.eyebrow}>FEATURE · ABOUT ME</div>
        <h1 style={dossierStyles.hero}>
          A third-year CS student who <em style={{ color: "#d4a5c4" }}>reads</em> data like poetry — and occasionally <span className="dossier-foil">the reverse</span>.
        </h1>
        <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
          <div style={{ width: 180, height: 220, background: "linear-gradient(180deg,#2a1a3a,#1a1230)", border: "1px solid #3a2a4a", position: "relative", overflow: "hidden", flexShrink: 0 }} data-cat>
            <div style={dossierStyles.photoLabel}>PLATE 01 — PORTRAIT</div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Instrument Serif', serif", fontSize: 72, color: "#3a2a4a", fontStyle: "italic" }}>
              A
            </div>
            <CatSvg variant="peek" style={{ position: "absolute", bottom: -2, right: 8, width: 44, opacity: 0.85 }} />
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14.5, lineHeight: 1.7, color: "#c9bdd4" }}>
            <p style={{ margin: "0 0 14px" }}>
              21, Hyderabad. Third-year CS at Mahindra University — endlessly curious about <em style={{ color: "#d4a5c4", fontStyle: "italic" }}>retail, behaviour and machine learning</em>. I've forecasted returns across 50K SKUs, grounded a medical-AI chatbot in a 16-entity knowledge graph, and co-authored two papers on misinformation diffusion.
            </p>
            <p style={{ margin: 0, color: "#8a7a9a", fontSize: 13 }}>
              Summer 2026 · seeking AI / ML / Data Science / Data Analytics roles. Recently at Hiroshima University's AI/ML immersion program.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — data column */}
      <div style={{ borderLeft: "1px solid #3a2a4a", paddingLeft: 32, position: "relative" }}>
        <div style={dossierStyles.eyebrow}>THE DATA COLUMN</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 20 }}>
          <Stat label="CGPA" value="7.68" hint="/ 10 cumulative" />
          <Stat label="Latest SGPA" value="8.56" hint="/ 10" />
          <Stat label="Papers submitted" value="2" hint="COMSNETS · ICDCN" />
          <Stat label="Club founded" value="200" hint="Cognitia members" />
        </div>

        <div style={{ marginTop: 28, padding: "18px 0", borderTop: "1px solid #3a2a4a", borderBottom: "1px solid #3a2a4a" }}>
          <div style={dossierStyles.eyebrow}>RESEARCH INTERESTS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {["Retail × Data", "Multimodal AI", "RAG + Knowledge Graphs", "Social Network Simulation", "Cognitive Load in UX", "Forecasting", "Behavioural Experimentation"].map((t) => (
              <span key={t} style={dossierStyles.tag}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={dossierStyles.eyebrow}>LIVE READOUT — internship model R²</div>
          <Sparkline data={sparkData} />
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#8a7a9a", marginTop: 6, display: "flex", justifyContent: "space-between" }}>
            <span>0.12</span>
            <span style={{ color: "#d4a5c4" }}>peak R² = 0.67 · LightGBM</span>
            <span>0.67</span>
          </div>
        </div>

        <button onClick={() => setPage("projects")} style={dossierStyles.ctaBtn}>
          <span>Read the projects</span>
          <span style={{ marginLeft: 10, fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>→</span>
        </button>
      </div>

      {/* FULL-WIDTH poem placeholder + contact */}
      <div style={{ gridColumn: "1 / -1", marginTop: 12, position: "relative" }}>
        <div className="dossier-hairline-silver" />
      </div>
      <div style={{ gridColumn: "1 / -1", paddingTop: 28, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48, position: "relative" }}>
        <div data-cat>
          <div style={dossierStyles.eyebrow}>FROM THE NOTEBOOK — A POEM</div>
          <blockquote style={dossierStyles.quote}>
            <span style={{ color: "#8a7a9a", fontStyle: "normal", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.05em" }}>
              [ drop your own poem here — this block is yours ]
            </span>
          </blockquote>
        </div>
        <div>
          <div style={dossierStyles.eyebrow}>CORRESPONDENCE</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#c9bdd4", marginTop: 12, lineHeight: 2 }}>
            <div>se23ucse028@<br/>&nbsp;&nbsp;mahindrauniversity.edu.in</div>
            <div style={{ color: "#8a7a9a" }}>+91 70328 57007</div>
            <div><a style={dossierStyles.link} href="https://github.com/anushkamohanty14">github.com/anushkamohanty14 ↗</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }) {
  return (
    <div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#8a7a9a", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
      <div className="dossier-foil-static" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 40, lineHeight: 1, marginTop: 4 }}>{value}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#6b2d5c", marginTop: 3 }}>{hint}</div>
    </div>
  );
}

function Sparkline({ data }) {
  const W = 260, H = 50;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / (max - min || 1)) * H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg width={W} height={H} style={{ display: "block", marginTop: 8 }}>
      <polyline points={pts} fill="none" stroke="#d4a5c4" strokeWidth="1" />
      <polyline points={`0,${H} ${pts} ${W},${H}`} fill="rgba(212,165,196,0.08)" />
    </svg>
  );
}

// ============ PROJECTS PAGE ============
const PROJECTS = [
  {
    id: "returns",
    num: "01",
    title: "Return-Forecasting Pipeline",
    kicker: "Empover i-Tech · Data Science Intern",
    year: "2025",
    tags: ["LightGBM", "XGBoost", "Power BI", "SQL"],
    stat: "R² 0.67",
    statLabel: "across 50K+ SKUs",
    oneline: "Forecasting returns across 2,000+ distributors — turning model output into inventory decisions.",
    body: [
      "Engineered 32 lag-based temporal and sales features from 3 years of distributor data across 18+ regions.",
      "Selected the best model across 4 regression algorithms via RandomizedSearchCV — LightGBM won at R² = 0.67.",
      "Shipped a Power BI dashboard surfacing top return drivers by SKU, distributor, and region. Used directly by inventory planners to allocate stock.",
      "Refactored 5 fragmented notebooks into 25 reusable parameterised pipeline functions — 89% codebase reduction."
    ],
    repo: null,
  },
  {
    id: "truehire",
    num: "02",
    title: "TrueHire",
    kicker: "AI-Powered Career Intelligence",
    year: "2025",
    tags: ["FastAPI", "scikit-learn", "SciPy", "MongoDB"],
    stat: "894 jobs",
    statLabel: "O*NET occupation coverage",
    oneline: "A 3-signal hybrid scoring engine for personalised career recommendations.",
    body: [
      "Cosine similarity for cognitive fit (40%), dot-product for work-activity matching (30%), Jaccard for tech-skill overlap (30%).",
      "Quantified cognitive readiness across 9 ability domains — accuracy (70%) × reaction time (30%), mapped to population percentiles via empirical CDF.",
      "Architected a clean 4-layer system (browser → API → ML pipeline → data store) with 13+ REST endpoints and sub-3s latency SLAs."
    ],
    repo: "github.com/anushkamohanty14",
  },
  {
    id: "fakenews",
    num: "03",
    title: "Fake News Spread Simulator",
    kicker: "Research — submitted to COMSNETS & ICDCN 2026",
    year: "2025",
    tags: ["NetworkX", "FastAPI", "Monte Carlo", "vis-network.js"],
    stat: "52.3 pp",
    statLabel: "peak misinformation reduction",
    oneline: "A five-state probabilistic diffusion framework with non-Markovian forwarding limits.",
    body: [
      "Designed the core model: five-state probabilistic diffusion with cumulative node-level forwarding constraints.",
      "Validated across Erdős–Rényi, Watts–Strogatz, and Barabási–Albert topologies with 50-run Monte Carlo.",
      "Topology-dependent finding: forwarding limits cut peak misinformation 26.5 pp in random networks, 0.7 pp in small-world; fact-checkers most effective in scale-free networks (−25.6 pp via hub firebreaks)."
    ],
    repo: "github.com/anushkamohanty14",
  },
  {
    id: "skin",
    num: "04",
    title: "Multimodal Skin Lesion Classification",
    kicker: "HAM10000 · PyTorch",
    year: "2024",
    tags: ["Swin Transformer", "PubMedBERT", "Gated Fusion", "Focal Loss"],
    stat: "+6.7 pp",
    statLabel: "Macro-F1 over vision-only",
    oneline: "Fusing Swin Transformer with PubMedBERT via a gated fusion network.",
    body: [
      "Fused fine-tuned Swin Transformer (images) with PubMedBERT (clinical metadata) via a gated fusion network.",
      "91.02% accuracy across 3 independent runs, Sparse Focal Loss (γ=2.0) handling 7-class imbalance.",
      "Ablation: Swin-only F1 0.750, PubMedBERT-only 0.720, fusion 0.817 — confirmed complementary visual/clinical signals."
    ],
    repo: "github.com/anushkamohanty14",
  },
  {
    id: "daira",
    num: "05",
    title: "Pediatric Medical AI — Reasoning Layer",
    kicker: "Daira EdTech · Founder's Office",
    year: "2026",
    tags: ["Neo4j", "MedGemma", "Gemini 2.5 Flash", "RAG"],
    stat: "16 × 18",
    statLabel: "entities × relationships",
    oneline: "A knowledge-graph RAG source for a pediatric chatbot spanning 0–6 years of development.",
    body: [
      "Architected a 16-entity, 18-relationship Neo4j schema mapping developmental milestones, red flags, growth parameters, vaccines, and interventions.",
      "Used directly as the structured RAG source for a MedGemma + Gemini 2.5 Flash pipeline.",
      "Scraped and analysed online forum data, quantifying 6 concern-intent categories ('Is this normal?' 28%, 'Is this a red flag?' 22%) to ground feature prioritisation."
    ],
    repo: null,
  },
  {
    id: "cogload",
    num: "06",
    title: "Cognitive Load in UX & AI",
    kicker: "Undergraduate Research · presented at ISRC Istanbul",
    year: "2024",
    tags: ["PsychoPy", "Behavioural Experimentation", "A/B"],
    stat: "−19%",
    statLabel: "task completion time (n=120)",
    oneline: "Identifying menu navigation as the primary friction point in AI interfaces.",
    body: [
      "Controlled PsychoPy experiments across 3 interface variants, collecting 2,000+ behavioural signals from n=120.",
      "Found menu navigation caused 34% of user hesitation — the single largest friction source.",
      "Reduced task completion time by 19% in the redesigned variant."
    ],
    repo: null,
  },
];

function DossierProjects({ onOpen }) {
  return (
    <div style={{ position: "relative" }}>
      <CatSvg variant="sitting" style={{ position: "absolute", top: -6, right: 30, width: 56, opacity: 0.55 }} />
      <div style={dossierStyles.eyebrow}>SECTION 02 — PROJECTS & RESEARCH</div>
      <h1 style={{ ...dossierStyles.hero, fontSize: 56, marginTop: 6 }}>
        Six things I've built <em style={{ color: "#d4a5c4" }}>on purpose</em>.
      </h1>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#c9bdd4", marginTop: 16, maxWidth: 620, fontStyle: "italic", lineHeight: 1.6 }}>
        Sorted by recency. Each is clickable — hover for the one-line summary, click for the whole story, stats and all. <span style={{ color: "#d4a5c4" }}>★</span> = the ones I'd talk about first in an interview.
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#6b2d5c", marginTop: 20, marginBottom: 24, letterSpacing: "0.05em", display: "flex", gap: 24 }}>
        <span>▸ 6 ENTRIES</span>
        <span>▸ 2 PAPERS UNDER REVIEW</span>
        <span>▸ 3 LIVE DEMOS</span>
        <span>▸ 1 CAT APPROVES</span>
      </div>
      <div style={dossierStyles.projectGrid}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} onOpen={onOpen} featured={i < 3} />)}
      </div>

      {/* marginalia footer */}
      <div style={{ marginTop: 40, padding: "20px 24px", border: "1px dashed #3a2a4a", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }} data-cat>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: "#c9bdd4", fontStyle: "italic" }}>
          Want the code? It's on GitHub.
        </div>
        <a href="https://github.com/anushkamohanty14" style={{ ...dossierStyles.link, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
          github.com/anushkamohanty14 ↗
        </a>
      </div>
    </div>
  );
}

function ProjectCard({ p, onOpen, featured }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(p)}
      className={`dossier-card ${hover ? "hover" : ""}`}
      style={dossierStyles.card(hover)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#6b2d5c", letterSpacing: "0.08em" }}>
          {featured && <span style={{ color: "#d4a5c4", marginRight: 6 }}>★</span>}
          PROJECT {p.num} · {p.year}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#8a7a9a", opacity: hover ? 1 : 0, transition: "opacity .3s" }}>
          OPEN ↗
        </div>
      </div>
      <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "#f4d9e4", lineHeight: 1.1, marginTop: 14, transform: hover ? "translateY(-2px)" : "translateY(0)", transition: "transform .4s ease" }}>
        {p.title}
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8a7a9a", marginTop: 6, fontStyle: "italic" }}>
        {p.kicker}
      </div>

      <div style={{ maxHeight: hover ? 80 : 0, overflow: "hidden", transition: "max-height .5s ease" }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#c9bdd4", marginTop: 14, lineHeight: 1.5 }}>
          {p.oneline}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #3a2a4a", marginTop: 18, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {p.tags.slice(0, 3).map(t => (
            <span key={t} style={dossierStyles.miniTag}>{t}</span>
          ))}
        </div>
        <div style={{ textAlign: "right" }}>
          <div className={hover ? "dossier-foil" : ""} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: "#d4a5c4", lineHeight: 1, transition: "color .3s" }}>{p.stat}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#6b2d5c", letterSpacing: "0.05em", marginTop: 2 }}>{p.statLabel}</div>
        </div>
      </div>
    </button>
  );
}

function ProjectModal({ project, onClose, theme }) {
  const dark = theme === "dark";
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: dark ? "rgba(14,11,26,0.85)" : "rgba(26,19,48,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 40, backdropFilter: "blur(4px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: dark ? "#1a1230" : "#faf5ec", color: dark ? "#f4d9e4" : "#1a1230", width: "100%", maxWidth: 720, maxHeight: "80vh", overflow: "auto", border: `1px solid ${dark ? "#3a2a4a" : "#c9bdd4"}`, padding: 40, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "inherit", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, cursor: "pointer" }}>CLOSE ✕</button>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#6b2d5c", letterSpacing: "0.1em" }}>
          PROJECT {project.num} · {project.year}
        </div>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, lineHeight: 1.05, margin: "8px 0 4px", fontWeight: 400 }}>
          {project.title}
        </h2>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontStyle: "italic", color: dark ? "#c9bdd4" : "#6b2d5c", marginBottom: 24 }}>
          {project.kicker}
        </div>

        <div style={{ display: "flex", gap: 24, padding: "16px 0", borderTop: `1px solid ${dark ? "#3a2a4a" : "#c9bdd4"}`, borderBottom: `1px solid ${dark ? "#3a2a4a" : "#c9bdd4"}`, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 40, color: "#d4a5c4", lineHeight: 1 }}>{project.stat}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#8a7a9a", marginTop: 3 }}>{project.statLabel}</div>
          </div>
          <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map(t => <span key={t} style={{ ...dossierStyles.tag, background: dark ? "rgba(212,165,196,0.08)" : "rgba(107,45,92,0.08)" }}>{t}</span>)}
          </div>
        </div>

        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14.5, lineHeight: 1.7, marginTop: 22, color: dark ? "#c9bdd4" : "#1a1230" }}>
          {project.body.map((para, i) => (
            <p key={i} style={{ margin: "0 0 14px" }}>{para}</p>
          ))}
        </div>

        {project.repo && (
          <a href={`https://${project.repo}`} style={{ ...dossierStyles.link, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, display: "inline-block", marginTop: 16 }}>
            {project.repo} ↗
          </a>
        )}
      </div>
    </div>
  );
}

function DossierExperience() {
  const timeline = [
    { when: "Mar 2026 — Present", role: "AI/ML Intern", org: "Daira EdTech · Founder's Office", bullets: [
      "Architected a 16-entity, 18-relationship Neo4j knowledge graph for a pediatric medical chatbot — now the structured RAG source for a MedGemma + Gemini 2.5 Flash pipeline.",
      "Scraped and analysed online forum data, quantifying 6 concern-intent categories to ground feature prioritisation in real parental behaviour.",
    ], tag: "RAG · Neo4j · LLM" },
    { when: "Jan 2026", role: "Advanced Transdisciplinary Immersion", org: "Hiroshima University, Japan", bullets: [
      "AI/ML, robotics, and embedded systems program.",
      "Also: finally got to Osaka. Takoyaki was, in fact, worth it.",
    ], tag: "Immersion" },
    { when: "Jun 2025 — Aug 2025", role: "Data Science Intern", org: "Empover i-Tech", bullets: [
      "Built a return-forecasting ML pipeline across 2,000+ distributors and 50K+ SKUs — engineered 32 lag-based features, selected LightGBM at R² = 0.67.",
      "Shipped a Power BI dashboard used directly by inventory planners to allocate stock.",
      "Refactored 5 notebooks into 25 reusable pipeline functions — 89% codebase reduction.",
    ], tag: "Retail × ML · Forecasting" },
    { when: "Aug 2024 — Oct 2025", role: "Undergraduate Research Intern", org: "Cognitive Load in UX & AI · Mahindra University", bullets: [
      "Presented at International Scientific Research Congress 2024, Istanbul.",
      "Reduced task completion time by 19% (n=120) by identifying menu navigation as the primary friction point.",
    ], tag: "Research" },
    { when: "Aug 2024 — May 2025", role: "Founder & Vice-President", org: "Cognitia — Cognitive Science Club, Mahindra University", bullets: [
      "Grew Cognitia to 200+ members across 5+ events by leading a 17-person cross-functional team.",
      "Designed a data-driven curriculum making AI and neuroscience accessible to 350+ students.",
    ], tag: "Leadership" },
  ];
  return (
    <div style={{ position: "relative" }}>
      <CatSvg variant="walking" style={{ position: "absolute", top: 10, right: 30, width: 56, opacity: 0.6 }} />
      <div style={dossierStyles.eyebrow}>SECTION 03 — EXPERIENCE</div>
      <h1 style={{ ...dossierStyles.hero, fontSize: 56, marginTop: 6 }}>
        The working <em style={{ color: "#d4a5c4" }}>history</em>.
      </h1>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#c9bdd4", marginTop: 16, maxWidth: 560, fontStyle: "italic", lineHeight: 1.6, marginBottom: 36 }}>
        Internships, research, a club I founded, and the brief-but-formative month in Japan.
      </div>

      <div style={{ position: "relative", paddingLeft: 28 }}>
        <div style={{ position: "absolute", left: 6, top: 8, bottom: 8, width: 1, background: "#3a2a4a" }} />
        {timeline.map((t, i) => (
          <div key={i} style={{ position: "relative", paddingBottom: 36 }}>
            <div style={{ position: "absolute", left: -26, top: 6, width: 9, height: 9, borderRadius: "50%", background: "#d4a5c4", border: "2px solid #0e0b1a", boxShadow: "0 0 0 2px #6b2d5c" }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#6b2d5c", letterSpacing: "0.15em" }}>{t.when}</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: "#f4d9e4", marginTop: 6, lineHeight: 1.15 }}>
              {t.role}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "#d4a5c4", fontStyle: "italic", marginTop: 4 }}>{t.org}</div>
            <ul style={{ margin: "14px 0 0", paddingLeft: 18, fontFamily: "Inter, sans-serif", fontSize: 14, color: "#c9bdd4", lineHeight: 1.7 }}>
              {t.bullets.map((b, j) => <li key={j} style={{ marginBottom: 6 }}>{b}</li>)}
            </ul>
            <div style={{ marginTop: 10 }}>
              <span style={dossierStyles.tag}>{t.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ CAT DRAWINGS ============
function CatSvg({ variant = "sitting", style }) {
  const stroke = "#d4a5c4";
  const common = { fill: "none", stroke, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  if (variant === "sitting") {
    return (
      <svg viewBox="0 0 100 100" style={style}>
        {/* body */}
        <path {...common} d="M30 82 Q28 48 48 42 Q70 42 70 78 Z" />
        {/* head */}
        <circle {...common} cx="48" cy="36" r="14" />
        {/* ears */}
        <path {...common} d="M38 26 L34 14 L44 22 Z" />
        <path {...common} d="M58 26 L62 14 L52 22 Z" />
        {/* eyes */}
        <path {...common} d="M42 35 q1 2 2 0" />
        <path {...common} d="M52 35 q1 2 2 0" />
        {/* nose + mouth */}
        <path {...common} d="M48 40 l0 2 M46 42 q2 2 4 0" />
        {/* tail */}
        <path {...common} d="M70 78 Q88 72 82 52" />
        {/* whiskers */}
        <path {...common} d="M40 42 l-8 -1 M40 44 l-8 2 M56 42 l8 -1 M56 44 l8 2" />
      </svg>
    );
  }
  if (variant === "loaf") {
    return (
      <svg viewBox="0 0 100 60" style={style}>
        <path {...common} d="M18 50 Q14 24 50 22 Q86 22 82 50 Z" />
        <path {...common} d="M30 26 L26 14 L38 22" />
        <path {...common} d="M70 26 L74 14 L62 22" />
        <path {...common} d="M40 32 q1 2 2 0 M58 32 q1 2 2 0" />
        <path {...common} d="M50 36 l0 2 M48 38 q2 2 4 0" />
        <path {...common} d="M36 34 l-8 -1 M36 36 l-8 2 M64 34 l8 -1 M64 36 l8 2" />
      </svg>
    );
  }
  if (variant === "walking") {
    return (
      <svg viewBox="0 0 120 60" style={style}>
        <path {...common} d="M20 44 Q18 28 40 26 L80 26 Q92 26 94 40" />
        <circle {...common} cx="96" cy="28" r="10" />
        <path {...common} d="M88 22 L86 12 L94 20" />
        <path {...common} d="M104 22 L106 12 L98 20" />
        <path {...common} d="M92 28 q1 1 2 0 M98 28 q1 1 2 0" />
        <path {...common} d="M96 32 l0 1 M95 33 q1 1 2 0" />
        <path {...common} d="M20 44 l0 10 M34 44 l0 10 M62 44 l0 10 M80 44 l0 10" />
        <path {...common} d="M20 44 Q8 38 10 22" />
      </svg>
    );
  }
  if (variant === "peek") {
    return (
      <svg viewBox="0 0 100 60" style={style}>
        <path {...common} d="M20 58 Q20 30 50 28 Q80 30 80 58" />
        <path {...common} d="M30 34 L26 22 L38 30" />
        <path {...common} d="M70 34 L74 22 L62 30" />
        <path {...common} d="M42 40 q1 2 2 0 M56 40 q1 2 2 0" />
        <path {...common} d="M50 44 l0 2 M48 46 q2 2 4 0" />
      </svg>
    );
  }
  if (variant === "tail") {
    return (
      <svg viewBox="0 0 100 120" style={style}>
        <path {...common} d="M20 110 Q10 60 40 40 Q70 25 60 10" />
      </svg>
    );
  }
  return null;
}

function DossierFooter() {
  return (
    <div style={{ marginTop: 60, padding: "24px 56px", borderTop: "1px solid #3a2a4a", display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#6b2d5c", letterSpacing: "0.1em" }}>
      <span>© ANUSHKA MOHANTY · 2026</span>
      <span>HYDERABAD — 17.3850° N, 78.4867° E</span>
      <span>SET IN INSTRUMENT SERIF & JETBRAINS MONO</span>
    </div>
  );
}

function CatCursor() {
  // small cat footprint follower that only appears on hover over [data-cat] elements
  const [pos, setPos] = useState({ x: -100, y: -100, visible: false });
  useEffect(() => {
    const move = (e) => {
      const onCat = e.target.closest?.("[data-cat]");
      setPos({ x: e.clientX, y: e.clientY, visible: !!onCat });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div style={{ position: "fixed", left: pos.x + 12, top: pos.y + 12, pointerEvents: "none", zIndex: 200, opacity: pos.visible ? 1 : 0, transition: "opacity .2s", fontFamily: "'Instrument Serif', serif", fontSize: 14, color: "#d4a5c4", fontStyle: "italic" }}>
      ฅ^•ﻌ•^ฅ
    </div>
  );
}

function GrainSVG() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.12, mixBlendMode: "overlay" }} aria-hidden>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

const dossierStyles = {
  root: {
    width: 1200,
    minHeight: 900,
    background: "#0e0b1a",
    color: "#f4d9e4",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, sans-serif",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "22px 56px",
    borderBottom: "1px solid #3a2a4a",
    position: "relative",
    zIndex: 2,
  },
  navBrand: { display: "flex", flexDirection: "column", gap: 4 },
  navTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#6b2d5c", letterSpacing: "0.15em" },
  navBtn: (active) => ({
    background: "none",
    border: "none",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    color: active ? "#f4d9e4" : "#8a7a9a",
    cursor: "pointer",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "6px 0",
    borderBottom: active ? "1px solid #d4a5c4" : "1px solid transparent",
    transition: "color .2s, border-color .2s",
  }),
  dot: { width: 4, height: 4, borderRadius: "50%", background: "#d4a5c4" },
  page: { padding: "48px 56px 40px", position: "relative", zIndex: 1 },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "#6b2d5c",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },
  hero: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: 72,
    lineHeight: 1.02,
    fontWeight: 400,
    margin: "14px 0 0",
    letterSpacing: "-0.015em",
    color: "#f4d9e4",
    textWrap: "pretty",
  },
  photoLabel: {
    position: "absolute",
    top: 8,
    left: 8,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    color: "#8a7a9a",
    letterSpacing: "0.1em",
    zIndex: 2,
  },
  tag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "#d4a5c4",
    background: "rgba(212,165,196,0.06)",
    border: "1px solid #3a2a4a",
    padding: "4px 9px",
    letterSpacing: "0.05em",
  },
  miniTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    color: "#8a7a9a",
    padding: "2px 6px",
    border: "1px solid #3a2a4a",
  },
  quote: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: 28,
    lineHeight: 1.4,
    color: "#c9bdd4",
    fontStyle: "italic",
    margin: "16px 0 0",
    borderLeft: "2px solid #6b2d5c",
    paddingLeft: 24,
  },
  link: { color: "#d4a5c4", textDecoration: "none", borderBottom: "1px solid #6b2d5c" },
  ctaBtn: {
    marginTop: 32,
    background: "none",
    border: "1px solid #6b2d5c",
    color: "#f4d9e4",
    padding: "14px 20px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    letterSpacing: "0.1em",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    textTransform: "uppercase",
    transition: "background .2s",
  },
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 1,
    background: "#3a2a4a",
    border: "1px solid #3a2a4a",
  },
  card: (hover) => ({
    background: hover ? "#1a1230" : "#0e0b1a",
    textAlign: "left",
    border: "none",
    padding: 28,
    cursor: "pointer",
    color: "inherit",
    fontFamily: "inherit",
    transition: "background .4s ease",
    minHeight: 220,
    display: "flex",
    flexDirection: "column",
  }),
};

window.Dossier = Dossier;
window.PROJECTS = PROJECTS;
window.ProjectModal = ProjectModal;
window.CatCursor = CatCursor;
window.GrainSVG = GrainSVG;
window.CatSvg = CatSvg;
