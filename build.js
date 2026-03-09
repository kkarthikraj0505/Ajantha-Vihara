import { useState, useEffect } from "react";

// ─── Fonts ───────────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* ── LOGO / BRAND ── */
      --brand-red:      #8B1A1A;   /* aviss circle crimson */
      --brand-red-l:    #A52828;   /* hover state */
      --brand-red-faint:#F5EAEA;   /* tint backgrounds */
      --brand-red-pale: #E8C4C4;   /* borders */
      /* ── NEUTRALS ── */
      --ivory:          #FAF7F2;
      --parchment:      #F2EAD8;
      --parchment-d:    #E5D6BB;
      --warm-white:     #FDFAF5;
      /* ── GOLD (secondary accent) ── */
      --gold:           #B8800A;
      --gold-l:         #D4A020;
      --gold-pale:      #F0D080;
      --gold-faint:     #FAF0D0;
      /* ── TEXT (matches logo dark brown) ── */
      --text-deep:      #2A1A08;   /* "ajanta" wordmark colour */
      --text-mid:       #5A3A18;
      --text-soft:      #8A6040;
      --smoke:          #B8A898;
      /* ── PATHWAY COLOURS ── */
      --gyaan-color:    #4A6A8A;   /* cerulean – sky / knowledge */
      --abhaas-color:   #5A7A5A;   /* forest sage – earth / practice */
      --prabodh-color:  #7A4060;   /* plum – healing / feminine */
      /* ── UTILITY ── */
      --shadow-warm:    rgba(42,26,8,0.10);
      --shadow-brand:   rgba(139,26,26,0.18);
      --glow-brand:     rgba(139,26,26,0.22);
      --maroon:         #6A1010;
      --maroon-l:       #8B2020;
      /* ── TYPOGRAPHY ── */
      --ff-display:     'Cormorant Garamond', Georgia, serif;
      --ff-body:        'Crimson Pro', Georgia, serif;
      --ff-label:       'Cinzel', serif;
      --ff-wordmark:    'Libre Baskerville', Georgia, serif;
    }

    html, body { font-family: var(--ff-body); background: var(--ivory); color: var(--text-deep); }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--parchment); }
    ::-webkit-scrollbar-thumb { background: var(--brand-red-pale); border-radius: 10px; }

    @keyframes fadeUp    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer   { 0%,100%{opacity:.6} 50%{opacity:1} }
    @keyframes rootGrow  { from{stroke-dashoffset:600} to{stroke-dashoffset:0} }
    @keyframes pulseBrand{ 0%,100%{box-shadow:0 0 0 0 var(--glow-brand)} 50%{box-shadow:0 0 0 8px transparent} }
    @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
    @keyframes brushSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

    .fade-up   { animation: fadeUp .55s ease both; }
    .fade-up-2 { animation: fadeUp .55s .08s ease both; }
    .fade-up-3 { animation: fadeUp .55s .16s ease both; }

    button { cursor:pointer; border:none; background:none; font-family:inherit; }

    .grain::after {
      content:''; position:absolute; inset:0; pointer-events:none; z-index:0;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.032'/%3E%3C/svg%3E");
    }
  `}</style>
);

// ─── AVISS Logo SVG (faithful recreation) ────────────────────────────────────
const AVISSLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    {/* Brushstroke circle — irregular like the real logo */}
    <ellipse cx="50" cy="46" rx="43" ry="42"
      fill="var(--brand-red)"
      style={{ filter: "url(#brush)" }}/>
    {/* Texture filter for organic feel */}
    <defs>
      <filter id="brush" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
    {/* "aviss" text */}
    <text x="50" y="52" textAnchor="middle" dominantBaseline="middle"
      fontFamily="'Cormorant Garamond', Georgia, serif"
      fontStyle="italic" fontWeight="400"
      fontSize="24" fill="white" letterSpacing="1">
      aviss
    </text>
  </svg>
);

// ─── Ajanta Vihara Wordmark ───────────────────────────────────────────────────
const WordmarkFull = ({ compact = false }) => (
  <div style={{ lineHeight: 1 }}>
    <div style={{
      fontFamily: "var(--ff-wordmark)",
      fontSize: compact ? 17 : 22,
      color: "var(--text-deep)",
      letterSpacing: "-0.01em",
      lineHeight: 1.1,
    }}>
      <span style={{ fontWeight: 700 }}>ajanta</span>
      <span style={{ fontWeight: 400 }}>vihara</span>
    </div>
    <div style={{
      fontFamily: "var(--ff-label)",
      fontSize: compact ? 7 : 8.5,
      letterSpacing: "0.22em",
      color: "var(--text-soft)",
      marginTop: compact ? 1 : 2,
      textTransform: "uppercase",
    }}>
      Institute of Spiritual Sciences
    </div>
  </div>
);

// ─── Icon library ─────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.5 }) => {
  const p = {
    home:      <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    learn:     <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>,
    train:     <><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></>,
    heal:      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
    book:      <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
    community: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    message:   <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
    settings:  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    bell:      <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    play:      <polygon points="5 3 19 12 5 21 5 3"/>,
    pause:     <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    check:     <polyline points="20 6 9 17 4 12"/>,
    chevronR:  <polyline points="9 18 15 12 9 6"/>,
    chevronL:  <polyline points="15 18 9 12 15 6"/>,
    star:      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    video:     <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
    audio:     <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
    pdf:       <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    quiz:      <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    journal:   <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
    flame:     <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/>,
    moon:      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>,
    globe:     <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    retreat:   <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {p[name]}
    </svg>
  );
};

// ─── Brand Divider (gold ornamental, matches site's Group 48095430) ───────────
const GoldDivider = ({ my = 16 }) => (
  <div style={{ margin: `${my}px 0`, display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,var(--parchment-d),transparent)" }} />
    <svg width="22" height="13" viewBox="0 0 22 13">
      <path d="M11 1L20 6.5L11 12L2 6.5Z" fill="none" stroke="var(--brand-red)" strokeWidth="1" opacity=".5"/>
      <circle cx="11" cy="6.5" r="2" fill="var(--brand-red)" opacity=".4"/>
    </svg>
    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,var(--parchment-d),transparent)" }} />
  </div>
);

// ─── Progress Ring ─────────────────────────────────────────────────────────────
const ProgressRing = ({ pct, size = 56, stroke = 3.5, color = "var(--brand-red)", bg = "var(--parchment-d)" }) => {
  const r = (size - stroke * 2) / 2, circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s ease" }} />
    </svg>
  );
};

// ─── Cloud / Root Background ──────────────────────────────────────────────────
const CloudRootsBg = ({ opacity = 0.06 }) => (
  <svg viewBox="0 0 900 260" preserveAspectRatio="xMidYMid slice"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}>
    <ellipse cx="150" cy="55" rx="120" ry="45" fill="#8B1A1A" opacity=".18" />
    <ellipse cx="290" cy="38" rx="90" ry="32" fill="#D4A020" opacity=".22" />
    <ellipse cx="700" cy="48" rx="130" ry="50" fill="#8B1A1A" opacity=".14" />
    <ellipse cx="500" cy="18" rx="160" ry="55" fill="#FAF0D0" opacity=".4" />
    <path d="M450,260 Q420,200 380,160 Q340,120 300,100" stroke="#8B1A1A" strokeWidth="1.5" fill="none" opacity=".3" strokeDasharray="400" style={{ animation: "rootGrow 3s ease forwards" }} />
    <path d="M450,260 Q470,190 510,155 Q550,120 600,95" stroke="#8B1A1A" strokeWidth="1.5" fill="none" opacity=".3" strokeDasharray="400" style={{ animation: "rootGrow 3.5s ease forwards" }} />
    <path d="M450,260 Q440,220 400,195 Q360,170 320,155" stroke="#5A3A18" strokeWidth="1" fill="none" opacity=".22" strokeDasharray="300" style={{ animation: "rootGrow 4s ease forwards" }} />
    {[300, 340, 380, 420, 460, 500, 540].map((x, i) => (
      <circle key={i} cx={x} cy={80 + Math.sin(i * .8) * 28} r="2" fill="#8B1A1A" opacity=".22" />
    ))}
  </svg>
);

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
const TopBar = ({ onNav, currentView }) => (
  <header style={{
    position: "sticky", top: 0, zIndex: 100,
    background: "rgba(250,247,242,0.94)", backdropFilter: "blur(14px)",
    borderBottom: "1px solid var(--parchment-d)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 28px", height: 66,
    boxShadow: "0 2px 24px rgba(42,26,8,0.07)"
  }}>
    {/* Logo + Wordmark */}
    <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
      onClick={() => onNav("dashboard")}>
      <div style={{ animation: "float 5s ease-in-out infinite", flexShrink: 0 }}>
        <AVISSLogo size={44} />
      </div>
      <WordmarkFull compact />
    </div>

    {/* Navigation tabs */}
    <nav style={{ display: "flex", gap: 3 }}>
      {[
        { id: "dashboard", label: "Dashboard" },
        { id: "course", label: "Science of Self" },
        { id: "healing", label: "Healing Space" },
        { id: "components", label: "Components" },
      ].map(t => (
        <button key={t.id} onClick={() => onNav(t.id)} style={{
          padding: "6px 16px", borderRadius: 20,
          fontFamily: "var(--ff-body)", fontSize: 14,
          color: currentView === t.id ? "var(--brand-red)" : "var(--text-soft)",
          background: currentView === t.id ? "var(--brand-red-faint)" : "transparent",
          border: currentView === t.id ? "1px solid var(--brand-red-pale)" : "1px solid transparent",
          fontWeight: currentView === t.id ? 600 : 400,
          transition: "all .2s"
        }}>{t.label}</button>
      ))}
    </nav>

    {/* Actions */}
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <button style={{ position: "relative", color: "var(--text-soft)", padding: 4 }}>
        <Icon name="bell" size={18} />
        <span style={{ position: "absolute", top: 2, right: 2, width: 7, height: 7, background: "var(--brand-red)", borderRadius: "50%", border: "1.5px solid var(--ivory)" }} />
      </button>
      <button style={{ color: "var(--text-soft)", padding: 4 }}><Icon name="globe" size={18} /></button>
      {/* Avatar with aviss circle */}
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "var(--brand-red)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", boxShadow: "0 2px 8px var(--shadow-brand)"
      }}>
        <span style={{ fontFamily: "var(--ff-display)", fontStyle: "italic", fontSize: 14, color: "white" }}>J</span>
      </div>
    </div>
  </header>
);

// ─── SIDE NAV ─────────────────────────────────────────────────────────────────
const SideNav = ({ activeItem, onSelect }) => {
  const items = [
    { id: "home", icon: "home", label: "Home", badge: null },
    { id: "prabodh", icon: "heal", label: "ATMA-PRABODH® (Heal)", badge: "1", section: "Evolution Pathways" },
    { id: "gyaan", icon: "learn", label: "ATMA-GYAAN® (Learn)", badge: "3 new" },
    { id: "abhaas", icon: "train", label: "ATMA-ABHAAS® (Train)", badge: null },
    { id: "gita", icon: "book", label: "Gita Companion", badge: null, section: "Resources" },
    { id: "retreats", icon: "retreat", label: "Spiritual Retreats", badge: null },
    { id: "community", icon: "community", label: "Circles", badge: "5" },
    { id: "messages", icon: "message", label: "Messages", badge: "2" },
    { id: "settings", icon: "settings", label: "Settings", badge: null },
  ];
  return (
    <aside style={{
      width: 236, flexShrink: 0,
      background: "var(--warm-white)",
      borderRight: "1px solid var(--parchment-d)",
      display: "flex", flexDirection: "column",
      padding: "20px 0",
      minHeight: "calc(100vh - 66px)"
    }}>
      {items.map(item => (
        <div key={item.id}>
          {item.section && (
            <div style={{ padding: "14px 20px 4px", fontFamily: "var(--ff-label)", fontSize: 7.5, letterSpacing: ".22em", color: "var(--smoke)", textTransform: "uppercase" }}>
              {item.section}
            </div>
          )}
          <button onClick={() => onSelect(item.id)} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 18px", width: "100%", textAlign: "left",
            color: activeItem === item.id ? "var(--brand-red)" : "var(--text-mid)",
            background: activeItem === item.id ? "linear-gradient(90deg,var(--brand-red-faint),transparent)" : "transparent",
            borderLeft: activeItem === item.id ? "3px solid var(--brand-red)" : "3px solid transparent",
            fontSize: 13, fontFamily: "var(--ff-body)",
            fontWeight: activeItem === item.id ? 600 : 400,
            transition: "all .18s"
          }}>
            <Icon name={item.icon} size={15} color={activeItem === item.id ? "var(--brand-red)" : "var(--smoke)"} />
            <span style={{ flex: 1, lineHeight: 1.2 }}>{item.label}</span>
            {item.badge && (
              <span style={{ fontSize: 9, fontFamily: "var(--ff-label)", letterSpacing: ".04em", background: activeItem === item.id ? "var(--brand-red)" : "var(--parchment-d)", color: activeItem === item.id ? "white" : "var(--text-soft)", padding: "1px 6px", borderRadius: 10 }}>
                {item.badge}
              </span>
            )}
          </button>
        </div>
      ))}

      {/* Footer with aviss badge + quote */}
      <div style={{ marginTop: "auto", padding: "16px 16px 8px", borderTop: "1px solid var(--parchment-d)", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
          <AVISSLogo size={24} />
          <div style={{ fontFamily: "var(--ff-label)", fontSize: 7, letterSpacing: ".16em", color: "var(--brand-red)", textTransform: "uppercase", lineHeight: 1.3 }}>
            Conscious<br/>Evolution
          </div>
        </div>
        <p style={{ fontFamily: "var(--ff-display)", fontStyle: "italic", fontSize: 11.5, color: "var(--text-soft)", lineHeight: 1.65 }}>
          "Transition from fear to love, to light."
          <br /><span style={{ fontFamily: "var(--ff-body)", fontSize: 10, fontStyle: "normal", color: "var(--smoke)" }}>— Jyoti, Founder</span>
        </p>
      </div>
    </aside>
  );
};

// ─── HERO STRIP ───────────────────────────────────────────────────────────────
const HeroStrip = ({ userState }) => {
  const s = {
    new: {
      greeting: "Awaken to Your Highest Potential",
      sub: "Merging Science & Spirit for a Conscious Future",
      cta: "Begin Your Journey",
      course: null, pct: 0,
    },
    mid: {
      greeting: "Namaste, Arjun",
      sub: "Continue where you paused — your Atma-Dhaara® pathway awaits",
      cta: "Continue Journey",
      course: "Science of Self — Foundation Series",
      module: "Module 3 · Ego & the Witness",
      pct: 52,
    },
    advanced: {
      greeting: "Namaste, Priya",
      sub: "Three pathways in flow — deepen your integration",
      cta: "Resume Practice",
      course: "Science of Conscious Evolution",
      module: "Module 6 · Ekikaran Integration",
      pct: 84,
    },
  }[userState];

  return (
    <div style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, var(--warm-white) 0%, #F8EEE8 45%, var(--parchment) 100%)",
      borderRadius: 16, padding: "32px 36px", marginBottom: 24,
      border: "1px solid var(--parchment-d)",
      boxShadow: "0 4px 32px var(--shadow-warm)"
    }} className="grain fade-up">
      <CloudRootsBg opacity={0.08} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "var(--ff-label)", fontSize: 9, letterSpacing: ".22em", color: "var(--brand-red)", marginBottom: 8, opacity: .85 }}>
            ATMA-DHAARA® · EVOLUTION PATHWAYS
          </div>
          <h1 style={{ fontFamily: "var(--ff-display)", fontSize: 33, fontWeight: 500, color: "var(--text-deep)", lineHeight: 1.2, marginBottom: 6 }}>
            {s.greeting}
          </h1>
          <p style={{ fontFamily: "var(--ff-body)", fontSize: 16, color: "var(--text-mid)", marginBottom: s.course ? 16 : 22 }}>
            {s.sub}
          </p>
          {s.course && (
            <div style={{ background: "rgba(250,247,242,.82)", backdropFilter: "blur(4px)", border: "1px solid var(--parchment-d)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "inline-block", minWidth: 295 }}>
              <div style={{ fontSize: 12, color: "var(--text-soft)", fontFamily: "var(--ff-body)", marginBottom: 2 }}>{s.course}</div>
              <div style={{ fontSize: 14, color: "var(--brand-red)", fontFamily: "var(--ff-body)", fontWeight: 600, marginBottom: 8 }}>{s.module}</div>
              <div style={{ background: "var(--parchment-d)", borderRadius: 20, height: 5, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.pct}%`, background: "linear-gradient(90deg,var(--brand-red-l),var(--brand-red))", borderRadius: 20 }} />
              </div>
              <div style={{ fontSize: 11, color: "var(--text-soft)", marginTop: 4, fontFamily: "var(--ff-body)" }}>{s.pct}% complete</div>
            </div>
          )}
          <button style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--brand-red)",
            color: "white", padding: "13px 26px", borderRadius: 30,
            fontFamily: "var(--ff-label)", fontSize: 11, letterSpacing: ".1em",
            boxShadow: "0 4px 18px var(--shadow-brand)",
            animation: "pulseBrand 3.5s infinite", transition: "transform .2s"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}>
            {s.cta} <Icon name="chevronR" size={13} color="white" />
          </button>
        </div>

        {/* Large AVISS logo watermark */}
        <div style={{ opacity: .1, flexShrink: 0 }}>
          <AVISSLogo size={160} />
        </div>
      </div>
    </div>
  );
};

// ─── JOURNEY MAP ─────────────────────────────────────────────────────────────
const JourneyMapCard = ({ userState }) => {
  const data = {
    new:      [{ n: "ATMA-PRABODH®", l: "Heal",  p: 0,  c: "var(--prabodh-color)" }, { n: "ATMA-GYAAN®",  l: "Learn", p: 0,  c: "var(--gyaan-color)" }, { n: "ATMA-ABHAAS®", l: "Train", p: 0,  c: "var(--abhaas-color)" }],
    mid:      [{ n: "ATMA-PRABODH®", l: "Heal",  p: 20, c: "var(--prabodh-color)" }, { n: "ATMA-GYAAN®",  l: "Learn", p: 52, c: "var(--gyaan-color)" }, { n: "ATMA-ABHAAS®", l: "Train", p: 30, c: "var(--abhaas-color)" }],
    advanced: [{ n: "ATMA-PRABODH®", l: "Heal",  p: 60, c: "var(--prabodh-color)" }, { n: "ATMA-GYAAN®",  l: "Learn", p: 88, c: "var(--gyaan-color)" }, { n: "ATMA-ABHAAS®", l: "Train", p: 75, c: "var(--abhaas-color)" }],
  }[userState];

  return (
    <div style={{ background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 14, padding: "22px", boxShadow: "0 2px 16px var(--shadow-warm)" }} className="fade-up-2">
      <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".18em", color: "var(--brand-red)", marginBottom: 3, opacity: .8 }}>YOUR PATH</div>
      <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 21, color: "var(--text-deep)", fontWeight: 500, marginBottom: 3 }}>Atma-Dhaara® Journey Map</h3>
      <p style={{ fontFamily: "var(--ff-body)", fontSize: 12.5, color: "var(--text-soft)", lineHeight: 1.5, marginBottom: 14 }}>
        Four lenses: Psychological · Energetic · Karmic · Spiritual
      </p>
      <div style={{ position: "relative", height: 70, marginBottom: 16 }}>
        <svg viewBox="0 0 400 70" style={{ width: "100%", height: "100%" }}>
          <line x1="200" y1="65" x2="200" y2="40" stroke="var(--brand-red)" strokeWidth="1.5" opacity=".6" />
          <line x1="200" y1="40" x2="80"  y2="10" stroke="var(--prabodh-color)" strokeWidth="1.5" strokeDasharray={data[0].p < 1 ? "6,4" : "none"} />
          <line x1="200" y1="40" x2="200" y2="10" stroke="var(--gyaan-color)"   strokeWidth="1.5" strokeDasharray={data[1].p < 1 ? "6,4" : "none"} />
          <line x1="200" y1="40" x2="320" y2="10" stroke="var(--abhaas-color)"  strokeWidth="1.5" strokeDasharray={data[2].p < 1 ? "6,4" : "none"} />
          {data.map((d, i) => {
            const xs = [80, 200, 320];
            return <circle key={i} cx={xs[i]} cy="10" r="6" fill={d.p > 0 ? d.c : "var(--parchment-d)"} stroke={d.c} strokeWidth="1.5" />;
          })}
          {/* Root node */}
          <circle cx="200" cy="65" r="5" fill="var(--brand-red)" opacity=".7" />
        </svg>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9 }}>
        {data.map((d, i) => (
          <div key={i} style={{ textAlign: "center", padding: "11px 7px", background: "var(--ivory)", borderRadius: 10, border: `1px solid ${d.c}33`, cursor: "pointer", transition: "transform .2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}>
            <ProgressRing pct={d.p} size={48} color={d.c} bg="var(--parchment-d)" />
            <div style={{ marginTop: 5, fontFamily: "var(--ff-label)", fontSize: 7.5, letterSpacing: ".08em", color: d.c, lineHeight: 1.3 }}>{d.n}</div>
            <div style={{ fontSize: 11, color: "var(--text-soft)", marginTop: 1, fontFamily: "var(--ff-body)" }}>{d.p}% · {d.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── TODAY'S FOCUS ─────────────────────────────────────────────────────────────
const TodayFocusCard = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let t;
    if (playing) t = setInterval(() => setProgress(p => p >= 100 ? (clearInterval(t), setPlaying(false), 0) : p + 0.5), 70);
    return () => clearInterval(t);
  }, [playing]);
  return (
    <div style={{
      background: "linear-gradient(145deg,var(--brand-red) 0%,var(--maroon-l) 100%)",
      borderRadius: 14, padding: "22px",
      boxShadow: "0 4px 24px var(--shadow-brand)",
      color: "white", position: "relative", overflow: "hidden"
    }} className="fade-up-3">
      <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, background: "radial-gradient(circle,rgba(255,255,255,.1) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -20, right: -20 }}>
        <AVISSLogo size={90} />
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ fontFamily: "var(--ff-label)", fontSize: 9, letterSpacing: ".18em", color: "rgba(255,255,255,.65)", marginBottom: 4 }}>TODAY'S PRACTICE</div>
        <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 21, fontWeight: 500, lineHeight: 1.3, marginBottom: 4 }}>Morning Witness Meditation</h3>
        <p style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "rgba(255,255,255,.68)", lineHeight: 1.55, marginBottom: 18, maxWidth: 260 }}>
          Alignment of Body, Mind &amp; Soul through Energy. Settle into stillness — observe the silent witness behind it all.
        </p>
        <div style={{ background: "rgba(255,255,255,.12)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <button onClick={() => setPlaying(p => !p)} style={{
              width: 42, height: 42, borderRadius: "50%",
              background: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,.2)", flexShrink: 0,
              transition: "transform .15s"
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
              onMouseLeave={e => e.currentTarget.style.transform = ""}>
              <Icon name={playing ? "pause" : "play"} size={16} color="var(--brand-red)" strokeWidth={2} />
            </button>
            <div>
              <div style={{ fontFamily: "var(--ff-body)", fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Witness Practice · ATMA-GYAAN®</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)" }}>⏱ 7 minutes</div>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,.18)", borderRadius: 20, height: 4 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "rgba(255,255,255,.7)", borderRadius: 20, transition: "width .1s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,.45)", marginTop: 4, fontFamily: "var(--ff-body)" }}>
            <span>{`${Math.floor(progress * .07 * 60 / 100)}:${String(Math.floor(progress * 7 * 60 / 100 % 60)).padStart(2, "0")}`}</span><span>7:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── LEARNING TILE ─────────────────────────────────────────────────────────────
const LearningTile = ({ title, seriesLabel, desc, pct, tagFull, color, cta, onOpen }) => (
  <div style={{ background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 14, padding: "18px", boxShadow: "0 2px 12px var(--shadow-warm)", display: "flex", flexDirection: "column", gap: 11, transition: "transform .2s,box-shadow .2s", cursor: "pointer" }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px var(--shadow-warm)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px var(--shadow-warm)"; }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <span style={{ fontFamily: "var(--ff-label)", fontSize: 7.5, letterSpacing: ".12em", background: `${color}15`, color, padding: "2px 8px", borderRadius: 20, border: `1px solid ${color}33` }}>{tagFull}</span>
        <h4 style={{ fontFamily: "var(--ff-display)", fontSize: 17, fontWeight: 500, color: "var(--text-deep)", marginTop: 7, lineHeight: 1.3 }}>{title}</h4>
        <div style={{ fontFamily: "var(--ff-body)", fontSize: 11, color: "var(--text-soft)", marginTop: 1 }}>{seriesLabel}</div>
      </div>
      <ProgressRing pct={pct} size={48} color={color} bg="var(--parchment-d)" />
    </div>
    <p style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "var(--text-soft)", lineHeight: 1.6, flex: 1 }}>{desc}</p>
    <button onClick={onOpen} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "var(--ivory)", border: `1px solid ${color}44`, color: "var(--text-deep)", padding: "9px 0", borderRadius: 8, fontFamily: "var(--ff-body)", fontSize: 13, fontWeight: 600 }}>
      {cta} <Icon name="chevronR" size={13} color={color} />
    </button>
  </div>
);

// ─── LIVE SESSIONS ────────────────────────────────────────────────────────────
const LiveSessionsCard = () => {
  const sessions = [
    { title: "Open Satsang with Founder Jyoti", tag: "ATMA-GYAAN®", tc: "var(--gyaan-color)", date: "Today", time: "7:00 PM IST", live: true },
    { title: "The Witnessing Consciousness — Webinar", tag: "ATMA-GYAAN®", tc: "var(--gyaan-color)", date: "Sat, 15 Mar", time: "6:00 PM IST", live: false },
    { title: "Pranayama & Subtle Body Workshop", tag: "ATMA-ABHAAS®", tc: "var(--abhaas-color)", date: "Sun, 16 Mar", time: "7:30 AM IST", live: false },
    { title: "Healing Circle — Ekikaran Group", tag: "ATMA-PRABODH®", tc: "var(--prabodh-color)", date: "Mon, 17 Mar", time: "5:00 PM IST", live: false },
  ];
  return (
    <div style={{ background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 14, padding: "22px", boxShadow: "0 2px 16px var(--shadow-warm)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".18em", color: "var(--brand-red)", marginBottom: 2, opacity: .8 }}>SCHEDULE</div>
          <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: "var(--text-deep)", fontWeight: 500 }}>Upcoming Live Sessions</h3>
        </div>
        <button style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "var(--brand-red)", display: "flex", alignItems: "center", gap: 4 }}>View all <Icon name="chevronR" size={12} color="var(--brand-red)" /></button>
      </div>
      {sessions.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 13px", borderRadius: 10, marginBottom: 8, background: s.live ? "linear-gradient(90deg,var(--brand-red-faint),transparent)" : "var(--ivory)", border: s.live ? "1px solid var(--brand-red-pale)" : "1px solid transparent" }}>
          {s.live && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--brand-red)", animation: "shimmer 1.5s infinite", flexShrink: 0 }} />}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--ff-body)", fontSize: 14, fontWeight: 600, color: "var(--text-deep)", lineHeight: 1.2 }}>{s.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 3 }}>
              <span style={{ fontFamily: "var(--ff-label)", fontSize: 7.5, letterSpacing: ".08em", color: s.tc, background: `${s.tc}18`, padding: "1px 6px", borderRadius: 10 }}>{s.tag}</span>
              <span style={{ fontFamily: "var(--ff-body)", fontSize: 12, color: "var(--text-soft)" }}>{s.date} · {s.time}</span>
            </div>
          </div>
          <button style={{ padding: "6px 13px", borderRadius: 20, fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".08em", background: s.live ? "var(--brand-red)" : "var(--parchment-d)", color: s.live ? "white" : "var(--text-mid)" }}>
            {s.live ? "JOIN NOW" : "ADD"}
          </button>
        </div>
      ))}
    </div>
  );
};

// ─── MOOD WIDGET ──────────────────────────────────────────────────────────────
const MoodWidget = () => {
  const [sel, setSel] = useState(null);
  const moods = [{ icon: "🌱", label: "Emerging" }, { icon: "☀️", label: "Clear" }, { icon: "🌊", label: "Flowing" }, { icon: "🌙", label: "Still" }, { icon: "🌩️", label: "Turbulent" }];
  return (
    <div style={{ background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 14, padding: "22px", boxShadow: "0 2px 16px var(--shadow-warm)" }}>
      <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".18em", color: "var(--brand-red)", marginBottom: 3, opacity: .8 }}>DAILY REFLECTION</div>
      <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: "var(--text-deep)", fontWeight: 500, marginBottom: 13 }}>How are you today?</h3>
      <div style={{ display: "flex", gap: 7, marginBottom: 15 }}>
        {moods.map((m, i) => (
          <button key={i} onClick={() => setSel(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 8px", borderRadius: 10, flex: 1, background: sel === i ? "var(--brand-red-faint)" : "var(--ivory)", border: sel === i ? `1.5px solid var(--brand-red)` : "1px solid var(--parchment-d)", transition: "all .15s" }}>
            <span style={{ fontSize: 18 }}>{m.icon}</span>
            <span style={{ fontFamily: "var(--ff-body)", fontSize: 11, color: sel === i ? "var(--brand-red)" : "var(--text-soft)" }}>{m.label}</span>
          </button>
        ))}
      </div>
      <button style={{ width: "100%", padding: "10px", borderRadius: 8, background: "var(--ivory)", border: "1px solid var(--parchment-d)", fontFamily: "var(--ff-body)", fontSize: 13, fontWeight: 600, color: "var(--text-deep)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <Icon name="journal" size={14} color="var(--brand-red)" /> Open Journal
      </button>
    </div>
  );
};

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
const NotificationsPanel = () => {
  const notes = [
    { icon: "flame", color: "var(--prabodh-color)", title: "New resource added", sub: "Founder Jyoti added notes to your ATMA-GYAAN® Module 3" },
    { icon: "community", color: "var(--abhaas-color)", title: "Circle update", sub: "Anita shared a reflection in your ATMA-ABHAAS® cohort" },
    { icon: "star", color: "var(--gold)", title: "Badge earned!", sub: "You completed Science of Self — Module 2" },
  ];
  return (
    <div style={{ background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 14, padding: "22px", boxShadow: "0 2px 16px var(--shadow-warm)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".18em", color: "var(--brand-red)", marginBottom: 2, opacity: .8 }}>UPDATES</div>
          <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: "var(--text-deep)", fontWeight: 500 }}>Messages & Notifications</h3>
        </div>
        <span style={{ fontFamily: "var(--ff-label)", fontSize: 8, background: "var(--brand-red)", color: "white", padding: "2px 7px", borderRadius: 10 }}>3 NEW</span>
      </div>
      {notes.map((n, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "10px", background: "var(--ivory)", borderRadius: 10, marginBottom: 8, cursor: "pointer" }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${n.color}15`, border: `1px solid ${n.color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name={n.icon} size={15} color={n.color} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--ff-body)", fontSize: 14, fontWeight: 600, color: "var(--text-deep)", lineHeight: 1.2 }}>{n.title}</div>
            <div style={{ fontFamily: "var(--ff-body)", fontSize: 12, color: "var(--text-soft)", marginTop: 2, lineHeight: 1.4 }}>{n.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const DashboardView = ({ onOpenCourse }) => {
  const [userState, setUserState] = useState("mid");
  const [navItem, setNavItem] = useState("home");
  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 66px)" }}>
      <SideNav activeItem={navItem} onSelect={setNavItem} />
      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto", background: "var(--ivory)" }}>
        {/* State switcher */}
        <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "var(--text-soft)" }}>Preview state:</span>
          {["new", "mid", "advanced"].map(s => (
            <button key={s} onClick={() => setUserState(s)} style={{ padding: "4px 14px", borderRadius: 20, fontFamily: "var(--ff-body)", fontSize: 13, background: userState === s ? "var(--brand-red)" : "var(--parchment)", color: userState === s ? "white" : "var(--text-mid)", border: `1px solid ${userState === s ? "var(--brand-red)" : "var(--parchment-d)"}`, transition: "all .15s" }}>
              {{ new: "First-time", mid: "Mid-Journey", advanced: "Advanced" }[s]}
            </button>
          ))}
        </div>
        <HeroStrip userState={userState} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <JourneyMapCard userState={userState} />
          <TodayFocusCard />
        </div>
        {/* Prabodh → Gyaan → Abhaas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
          <LearningTile title="Healing Plan" seriesLabel="Jagriti / Gautam pathway"
            desc="Individually curated therapies — energy scanning, somatic practices, consciousness studies & sacred sciences."
            pct={userState === "new" ? 0 : userState === "mid" ? 20 : 60} tagFull="ATMA-PRABODH®" color="var(--prabodh-color)" cta="View Plan" onOpen={() => {}} />
          <LearningTile title="Science of Self" seriesLabel="Foundation Series"
            desc="Explore the nature of Ātman through ancient wisdom frameworks. Progressive journey from foundational awareness to conscious evolution."
            pct={userState === "new" ? 0 : userState === "mid" ? 52 : 88} tagFull="ATMA-GYAAN®" color="var(--gyaan-color)" cta="Resume Course" onOpen={onOpenCourse} />
          <LearningTile title="Workshop Cohort" seriesLabel="ATMA-ABHAAS® Sadhana — May"
            desc="Embodying wisdom through skill, discipline & real-world application. Conscious leadership in practice."
            pct={userState === "new" ? 0 : userState === "mid" ? 30 : 75} tagFull="ATMA-ABHAAS®" color="var(--abhaas-color)" cta="View Cohort" onOpen={() => {}} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <LiveSessionsCard />
          <MoodWidget />
        </div>
        <NotificationsPanel />
      </main>
    </div>
  );
};

// ─── COURSE MODULE VIEW ───────────────────────────────────────────────────────
const CourseView = () => {
  const [activeModule, setActiveModule] = useState(3);
  const [activeLesson, setActiveLesson] = useState(2);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [markedComplete, setMarkedComplete] = useState(false);
  const [reflection, setReflection] = useState("");
  const [activeTab, setActiveTab] = useState("lesson");

  const modules = [
    { id: 0, title: "Module 0 · Orientation", lessons: [{ id: 0, title: "Welcome & Course Overview", type: "video", done: true }, { id: 1, title: "How to Use This Platform", type: "pdf", done: true }] },
    { id: 1, title: "Module 1 · The Question", lessons: [{ id: 0, title: "Who Am I? — The Fundamental Inquiry", type: "video", done: true }, { id: 1, title: "The Seeker's Orientation", type: "audio", done: true }, { id: 2, title: "Key Concepts Overview", type: "pdf", done: true }, { id: 3, title: "Reflection Practice", type: "journal", done: true }] },
    { id: 2, title: "Module 2 · Pancha Kosha", lessons: [{ id: 0, title: "Five Sheaths of Existence", type: "video", done: true }, { id: 1, title: "Guided Body-Layer Scan", type: "audio", done: true }, { id: 2, title: "Module 2 Quiz", type: "quiz", done: true }] },
    { id: 3, title: "Module 3 · Ego & the Witness ← Now", lessons: [{ id: 0, title: "Understanding the Ego-Mind", type: "video", done: true }, { id: 1, title: "The Witnessing Presence", type: "video", done: true }, { id: 2, title: "Witness Meditation", type: "audio", done: false }, { id: 3, title: "Reflection — Ego vs. Witness", type: "journal", done: false }, { id: 4, title: "Module 3 Quiz", type: "quiz", done: false }] },
    { id: 4, title: "Module 4 · The Silent Self", lessons: [{ id: 0, title: "Turīya — The Fourth State", type: "video", done: false }, { id: 1, title: "Deep Silence Practice", type: "audio", done: false }] },
    { id: 5, title: "Module 5 · Sūkṣma & Sthūla", lessons: [] },
    { id: 6, title: "Module 6 · Integration", lessons: [] },
    { id: 7, title: "Module 7 · Conscious Evolution", lessons: [] },
  ];

  const typeIcon = { video: "video", audio: "audio", pdf: "pdf", quiz: "quiz", journal: "journal" };
  const typeColor = { video: "var(--gyaan-color)", audio: "var(--abhaas-color)", pdf: "var(--gold)", quiz: "var(--maroon-l)", journal: "var(--brand-red)" };
  const done = modules.flatMap(m => m.lessons).filter(l => l.done).length;
  const total = modules.flatMap(m => m.lessons).length;
  const cur = modules[activeModule]?.lessons[activeLesson] ?? modules[3].lessons[2];

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 66px)", background: "var(--ivory)" }}>
      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? 265 : 0, flexShrink: 0, overflow: "hidden", transition: "width .3s ease", background: "var(--warm-white)", borderRight: "1px solid var(--parchment-d)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "14px 16px 8px", borderBottom: "1px solid var(--parchment-d)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <AVISSLogo size={28} />
            <div>
              <div style={{ fontFamily: "var(--ff-label)", fontSize: 7.5, letterSpacing: ".18em", color: "var(--gyaan-color)", marginBottom: 1 }}>ATMA-GYAAN®</div>
              <div style={{ fontFamily: "var(--ff-wordmark)", fontSize: 13, fontWeight: 700, color: "var(--text-deep)", lineHeight: 1.2 }}>Science of Self</div>
              <div style={{ fontFamily: "var(--ff-body)", fontSize: 11, color: "var(--text-soft)" }}>Foundation Series</div>
            </div>
          </div>
          <div style={{ background: "var(--parchment-d)", borderRadius: 20, height: 4 }}>
            <div style={{ height: "100%", width: `${(done / total * 100).toFixed(0)}%`, background: "linear-gradient(90deg,var(--brand-red-l),var(--brand-red))", borderRadius: 20 }} />
          </div>
          <div style={{ fontFamily: "var(--ff-body)", fontSize: 11, color: "var(--text-soft)", marginTop: 3 }}>{done}/{total} lessons</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
          {modules.map(mod => (
            <div key={mod.id}>
              <div style={{ padding: "7px 16px", fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".1em", color: "var(--text-soft)", background: mod.id === activeModule ? "var(--brand-red-faint)" : "transparent", borderLeft: mod.id === activeModule ? "3px solid var(--brand-red)" : "3px solid transparent" }}>
                {mod.title}
              </div>
              {mod.lessons.map(l => (
                <button key={l.id} onClick={() => { setActiveModule(mod.id); setActiveLesson(l.id); setMarkedComplete(l.done); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 16px 7px 22px", background: mod.id === activeModule && l.id === activeLesson ? "rgba(139,26,26,.06)" : "transparent", borderLeft: mod.id === activeModule && l.id === activeLesson ? "3px solid var(--brand-red)" : "3px solid transparent" }}>
                  <div style={{ width: 19, height: 19, borderRadius: "50%", flexShrink: 0, background: l.done ? "var(--abhaas-color)" : "var(--parchment-d)", border: `1.5px solid ${l.done ? "var(--abhaas-color)" : mod.id === activeModule && l.id === activeLesson ? "var(--brand-red)" : "var(--parchment-d)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {l.done ? <Icon name="check" size={10} color="white" strokeWidth={2.5} /> : <Icon name={typeIcon[l.type]} size={9} color={typeColor[l.type]} />}
                  </div>
                  <span style={{ fontFamily: "var(--ff-body)", fontSize: 12.5, textAlign: "left", lineHeight: 1.3, flex: 1, fontWeight: mod.id === activeModule && l.id === activeLesson ? 600 : 400, color: mod.id === activeModule && l.id === activeLesson ? "var(--brand-red)" : "var(--text-mid)" }}>{l.title}</span>
                  <span style={{ fontSize: 9, color: typeColor[l.type], fontFamily: "var(--ff-label)", flexShrink: 0 }}>{l.type.slice(0, 3).toUpperCase()}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "12px 24px", background: "var(--warm-white)", borderBottom: "1px solid var(--parchment-d)", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setSidebarOpen(o => !o)} style={{ width: 32, height: 32, borderRadius: 8, background: "var(--ivory)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--parchment-d)" }}>
            <Icon name={sidebarOpen ? "chevronL" : "chevronR"} size={14} color="var(--text-soft)" />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".18em", color: "var(--brand-red)", opacity: .8 }}>MODULE 3 · EGO & THE WITNESS</div>
            <div style={{ fontFamily: "var(--ff-display)", fontSize: 16, color: "var(--text-deep)", fontWeight: 500 }}>{cur.title}</div>
          </div>
          {["lesson", "notes", "resources"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "5px 14px", borderRadius: 20, fontFamily: "var(--ff-body)", fontSize: 12, background: activeTab === tab ? "var(--brand-red-faint)" : "transparent", color: activeTab === tab ? "var(--brand-red)" : "var(--text-soft)", border: activeTab === tab ? "1px solid var(--brand-red-pale)" : "1px solid transparent", textTransform: "capitalize" }}>{tab}</button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {activeTab === "lesson" && (
            <div className="fade-up">
              {cur.type === "video" && (
                <div style={{ width: "100%", aspectRatio: "16/9", background: "linear-gradient(135deg,var(--brand-red) 0%,#3A1010 100%)", borderRadius: 14, marginBottom: 24, position: "relative", overflow: "hidden", boxShadow: "0 8px 40px var(--shadow-brand)", border: "2px solid var(--brand-red-pale)" }}>
                  <div style={{ position: "absolute", inset: 8, border: "1px solid rgba(255,255,255,.15)", borderRadius: 8, pointerEvents: "none" }} />
                  {/* Watermark logo */}
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                    <div style={{ opacity: .15, marginBottom: 16 }}><AVISSLogo size={80} /></div>
                    <button style={{ width: 64, height: 64, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,.3)", margin: "0 auto 12px", transition: "transform .2s" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                      onMouseLeave={e => e.currentTarget.style.transform = ""}>
                      <Icon name="play" size={24} color="var(--brand-red)" strokeWidth={2} />
                    </button>
                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 20, fontWeight: 500, color: "white", lineHeight: 1.3 }}>{cur.title}</div>
                    <div style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "rgba(255,255,255,.5)", marginTop: 4 }}>24 minutes · ATMA-GYAAN®</div>
                  </div>
                  {/* Corner marks */}
                  {[[0, null, 0, null], [0, null, null, 0], [null, 0, 0, null], [null, 0, null, 0]].map(([t, b, l, r], i) => (
                    <svg key={i} width="32" height="32" style={{ position: "absolute", top: t !== null ? 10 : "auto", bottom: b !== null ? 10 : "auto", left: l !== null ? 10 : "auto", right: r !== null ? 10 : "auto", opacity: .4, transform: i === 1 ? "rotate(90deg)" : i === 2 ? "rotate(-90deg)" : i === 3 ? "rotate(180deg)" : "none" }}>
                      <path d="M2 2L2 12M2 2L12 2" stroke="white" strokeWidth="1.5" fill="none" />
                    </svg>
                  ))}
                </div>
              )}
              {cur.type === "audio" && (
                <div style={{ background: "linear-gradient(145deg,var(--brand-red) 0%,var(--maroon-l) 100%)", borderRadius: 14, padding: "36px", marginBottom: 24, textAlign: "center", boxShadow: "0 8px 40px var(--shadow-brand)" }}>
                  <div style={{ opacity: .2, marginBottom: 12 }}><AVISSLogo size={60} /></div>
                  <div style={{ fontFamily: "var(--ff-display)", fontStyle: "italic", fontSize: 24, color: "white", marginBottom: 4 }}>Witness Meditation</div>
                  <div style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 22 }}>17 minutes · Guided · ATMA-GYAAN®</div>
                  <button style={{ width: 72, height: 72, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 4px 24px rgba(0,0,0,.25)" }}>
                    <Icon name="play" size={28} color="var(--brand-red)" strokeWidth={2} />
                  </button>
                </div>
              )}

              <h2 style={{ fontFamily: "var(--ff-display)", fontSize: 25, fontWeight: 500, color: "var(--text-deep)", marginBottom: 8 }}>{cur.title}</h2>
              <p style={{ fontFamily: "var(--ff-body)", fontSize: 15, color: "var(--text-mid)", lineHeight: 1.8, marginBottom: 14 }}>
                In this session we move through direct inquiry — not as intellectual exercise, but as lived experience. The witnessing presence is already here; we simply turn attention toward what has always been aware of our thoughts, feelings, and sensations.
              </p>

              {/* Founder pull quote */}
              <div style={{ borderLeft: "3px solid var(--brand-red)", paddingLeft: 18, fontFamily: "var(--ff-display)", fontStyle: "italic", fontSize: 17, color: "var(--text-mid)", lineHeight: 1.7, marginBottom: 22, background: "linear-gradient(90deg,var(--brand-red-faint),transparent)", borderRadius: "0 8px 8px 0", padding: "14px 18px", borderLeftWidth: 3 }}>
                "Healing does not happen by fixing the human being. It happens by changing the relationship we have with action, identity, and truth."
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, fontStyle: "normal" }}>
                  <AVISSLogo size={22} />
                  <span style={{ fontFamily: "var(--ff-label)", fontSize: 9, letterSpacing: ".1em", color: "var(--brand-red)", opacity: .7 }}>JYOTI · FOUNDER · AJANTA VIHARA</span>
                </div>
              </div>

              <GoldDivider my={20} />

              <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 19, color: "var(--text-deep)", fontWeight: 500, marginBottom: 12 }}>Key Points</h3>
              {[
                "The ego is a necessary construct — not the enemy, but not the self.",
                "Witnessing is a natural capacity, not a skill to be acquired.",
                "Bridge your sūkṣma (subtle) and sthūla (gross) layers through practice.",
                "Our core focus at ajantavihara: transition from fear to love, from compulsion to clarity.",
              ].map((pt, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--brand-red-faint)", border: "1px solid var(--brand-red-pale)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontFamily: "var(--ff-label)", fontSize: 9, color: "var(--brand-red)" }}>{i + 1}</span>
                  </div>
                  <p style={{ fontFamily: "var(--ff-body)", fontSize: 14, color: "var(--text-mid)", lineHeight: 1.65 }}>{pt}</p>
                </div>
              ))}

              {/* Reflection */}
              <div style={{ background: "var(--brand-red-faint)", border: "1px solid var(--brand-red-pale)", borderRadius: 14, padding: "22px", margin: "22px 0" }}>
                <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".15em", color: "var(--brand-red)", marginBottom: 8, opacity: .8 }}>REFLECTION PROMPT</div>
                <p style={{ fontFamily: "var(--ff-display)", fontStyle: "italic", fontSize: 17, color: "var(--text-deep)", marginBottom: 16, lineHeight: 1.65 }}>
                  When did you last experience yourself as a witness — purely aware, without reacting? What inner friction do you meet most often with action, identity, or truth?
                </p>
                <textarea value={reflection} onChange={e => setReflection(e.target.value)}
                  placeholder="Begin writing here... this is a private, sacred space."
                  style={{ width: "100%", minHeight: 100, padding: "12px 14px", background: "rgba(250,247,242,.9)", border: "1px solid var(--brand-red-pale)", borderRadius: 8, fontFamily: "var(--ff-body)", fontSize: 14, color: "var(--text-deep)", lineHeight: 1.65, resize: "vertical", outline: "none" }} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                  <button style={{ padding: "8px 20px", borderRadius: 20, background: "var(--brand-red)", color: "white", fontFamily: "var(--ff-label)", fontSize: 10, letterSpacing: ".1em" }}>SAVE REFLECTION</button>
                </div>
              </div>

              {/* Navigation bar */}
              <div style={{ background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                <button onClick={() => setMarkedComplete(c => !c)} style={{ display: "flex", alignItems: "center", gap: 10, background: markedComplete ? "var(--abhaas-color)" : "var(--ivory)", border: `1.5px solid ${markedComplete ? "var(--abhaas-color)" : "var(--parchment-d)"}`, borderRadius: 8, padding: "10px 18px", color: markedComplete ? "white" : "var(--text-mid)", fontFamily: "var(--ff-body)", fontSize: 14, fontWeight: 600, transition: "all .2s" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: markedComplete ? "rgba(255,255,255,.3)" : "var(--parchment-d)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {markedComplete && <Icon name="check" size={11} color="white" strokeWidth={2.5} />}
                  </div>
                  {markedComplete ? "Lesson Complete ✓" : "Mark as Complete"}
                </button>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 8, background: "var(--ivory)", border: "1px solid var(--parchment-d)", color: "var(--text-mid)", fontFamily: "var(--ff-body)", fontSize: 13, fontWeight: 600 }}>
                    <Icon name="chevronL" size={14} /> Previous
                  </button>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 8, background: "var(--brand-red)", color: "white", fontFamily: "var(--ff-label)", fontSize: 10, letterSpacing: ".1em" }}>
                    NEXT LESSON <Icon name="chevronR" size={14} color="white" />
                  </button>
                </div>
              </div>

              {/* Practice banner */}
              <div style={{ background: "linear-gradient(135deg,var(--gyaan-color) 0%,var(--abhaas-color) 100%)", borderRadius: 14, padding: "18px 22px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 4px 16px rgba(74,106,138,.2)" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="moon" size={22} color="white" strokeWidth={1.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".15em", color: "rgba(255,255,255,.65)", marginBottom: 3 }}>PRACTICE FOR THIS WEEK</div>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: 17, color: "white", fontWeight: 500 }}>10-Minute Morning Witness</div>
                  <div style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 2 }}>Daily for 7 days · Cultivate inner awareness & soul-aligned action</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                  <button style={{ padding: "7px 16px", borderRadius: 20, background: "rgba(255,255,255,.22)", color: "white", fontFamily: "var(--ff-label)", fontSize: 9, letterSpacing: ".08em", border: "1px solid rgba(255,255,255,.35)" }}>ADD REMINDER</button>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, border: "1.5px solid rgba(255,255,255,.55)", background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="check" size={10} color="rgba(255,255,255,.8)" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontFamily: "var(--ff-body)", fontSize: 12, color: "rgba(255,255,255,.8)" }}>Day 3 / 7</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="fade-up">
              <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: "var(--text-deep)", marginBottom: 16, fontWeight: 500 }}>Your Notes</h3>
              <textarea placeholder="Write your notes, insights, questions here..."
                style={{ width: "100%", minHeight: 300, padding: "16px", background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 12, fontFamily: "var(--ff-body)", fontSize: 14, color: "var(--text-deep)", lineHeight: 1.75, resize: "vertical", outline: "none" }} />
            </div>
          )}

          {activeTab === "resources" && (
            <div className="fade-up">
              <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: "var(--text-deep)", marginBottom: 16, fontWeight: 500 }}>Module Resources</h3>
              {["Ego & Witness — Study Guide", "Bhagavad Gita — Commentary by Jyoti (Chapter 3)", "Manana Questions for Module 3"].map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "var(--warm-white)", borderRadius: 10, marginBottom: 10, border: "1px solid var(--parchment-d)" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 8, background: "var(--brand-red-faint)", border: "1px solid var(--brand-red-pale)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="pdf" size={16} color="var(--brand-red)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--ff-body)", fontSize: 14, fontWeight: 600, color: "var(--text-deep)" }}>{r}</div>
                    <div style={{ fontFamily: "var(--ff-body)", fontSize: 12, color: "var(--text-soft)" }}>PDF · ATMA-GYAAN®</div>
                  </div>
                  <button style={{ padding: "6px 14px", borderRadius: 20, background: "var(--parchment-d)", color: "var(--brand-red)", fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".08em" }}>OPEN</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// ─── HEALING SPACE ────────────────────────────────────────────────────────────
const HealingSpaceView = () => {
  const [tab, setTab] = useState("overview");
  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 66px)" }}>
      <SideNav activeItem="prabodh" onSelect={() => {}} />
      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto", background: "var(--ivory)" }}>
        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg,#4A1010 0%,var(--brand-red) 60%,#6A2020 100%)", borderRadius: 16, padding: "28px", marginBottom: 24, position: "relative", overflow: "hidden", boxShadow: "0 8px 40px var(--shadow-brand)" }} className="grain fade-up">
          <CloudRootsBg opacity={0.07} />
          <div style={{ position: "absolute", bottom: -20, right: 20, opacity: .12 }}><AVISSLogo size={140} /></div>
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".2em", color: "rgba(255,255,255,.55)", marginBottom: 8 }}>ATMA-PRABODH® · HEALING SPACE</div>
              <h1 style={{ fontFamily: "var(--ff-display)", fontSize: 28, fontWeight: 500, color: "white", lineHeight: 1.2, marginBottom: 3 }}>Jagriti Pathway</h1>
              <p style={{ fontFamily: "var(--ff-body)", fontSize: 14, color: "rgba(255,255,255,.55)", fontStyle: "italic", marginBottom: 3 }}>Sacred Feminine Reset</p>
              <p style={{ fontFamily: "var(--ff-body)", fontSize: 14, color: "rgba(255,255,255,.55)", marginBottom: 18 }}>Individually curated therapy — awakening your deepest truth through consciousness, somatic practices &amp; sacred sciences.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[["THERAPIST", "Dr. Meera Krishnaswamy"], ["THERAPY TYPE", "Sukshama — Emotional"], ["NEXT SESSION", "Friday, 14 Mar · 4:00 PM"]].map(([k, v], i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,.1)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontFamily: "var(--ff-label)", fontSize: 7.5, letterSpacing: ".15em", color: "rgba(255,255,255,.5)", marginBottom: 3 }}>{k}</div>
                    <div style={{ fontFamily: "var(--ff-body)", fontSize: 13.5, fontWeight: 600, color: "white" }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 22px", borderRadius: 25, background: "white", color: "var(--brand-red)", fontFamily: "var(--ff-label)", fontSize: 10, letterSpacing: ".1em", boxShadow: "0 4px 14px rgba(0,0,0,.2)" }}>
                  <Icon name="video" size={14} color="var(--brand-red)" /> JOIN SESSION
                </button>
                <button style={{ padding: "11px 22px", borderRadius: 25, background: "rgba(255,255,255,.12)", color: "white", fontFamily: "var(--ff-label)", fontSize: 10, letterSpacing: ".1em", border: "1px solid rgba(255,255,255,.3)" }}>RESCHEDULE</button>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <svg width="110" height="110" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="55" cy="55" r="45" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="6" />
                  <circle cx="55" cy="55" r="45" fill="none" stroke="white" strokeWidth="6" strokeDasharray={2 * Math.PI * 45} strokeDashoffset={2 * Math.PI * 45 * (1 - 7 / 12)} strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: 26, color: "white", fontWeight: 500, lineHeight: 1 }}>7</div>
                  <div style={{ fontFamily: "var(--ff-body)", fontSize: 11, color: "rgba(255,255,255,.5)" }}>of 12</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "rgba(255,255,255,.5)", marginTop: 5 }}>Sessions Complete</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 3, marginBottom: 20, background: "var(--parchment)", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {["overview", "practices", "journal", "session-notes"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 17px", borderRadius: 8, fontFamily: "var(--ff-body)", fontSize: 13, background: tab === t ? "var(--warm-white)" : "transparent", color: tab === t ? "var(--brand-red)" : "var(--text-soft)", fontWeight: tab === t ? 600 : 400, boxShadow: tab === t ? "0 1px 4px var(--shadow-warm)" : "none", transition: "all .15s", whiteSpace: "nowrap", textTransform: "capitalize" }}>
              {t.replace("-", " ")}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 14, padding: "22px", boxShadow: "0 2px 16px var(--shadow-warm)" }}>
              <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".15em", color: "var(--brand-red)", marginBottom: 8, opacity: .8 }}>PATHWAY GOALS</div>
              <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 19, color: "var(--text-deep)", fontWeight: 500, marginBottom: 4 }}>Jagriti — Sacred Feminine Reset</h3>
              <GoldDivider my={10} />
              {["Release fear, attachment, and emotional blockages", "Restore inner authority and self-alignment", "Integrate insight into embodied awareness", "Transition from fragmentation to wholeness"].map((g, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 9 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--prabodh-color)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Icon name="check" size={9} color="white" strokeWidth={3} />
                  </div>
                  <span style={{ fontFamily: "var(--ff-body)", fontSize: 14, color: "var(--text-mid)", lineHeight: 1.5 }}>{g}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 14, padding: "18px", boxShadow: "0 2px 16px var(--shadow-warm)" }}>
                <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".15em", color: "var(--brand-red)", marginBottom: 8, opacity: .8 }}>PROGRESS</div>
                {[["Sessions completed", "7 / 12"], ["Therapy", "Sukshama (Emotional)"], ["Current phase", "Emotional Integration"], ["Next milestone", "Karana (Spiritual)"], ["Overall", "58%"]].map(([k, v], i, a) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < a.length - 1 ? "1px solid var(--parchment-d)" : "none" }}>
                    <span style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "var(--text-soft)" }}>{k}</span>
                    <span style={{ fontFamily: "var(--ff-body)", fontSize: 13, fontWeight: 600, color: "var(--text-deep)" }}>{v}</span>
                  </div>
                ))}
              </div>
              {/* All therapy types */}
              <div style={{ background: "var(--brand-red-faint)", border: "1px solid var(--brand-red-pale)", borderRadius: 14, padding: "16px" }}>
                <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".15em", color: "var(--brand-red)", marginBottom: 8, opacity: .8 }}>ATMA-PRABODH® THERAPIES</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
                  {[{ n: "Sthula", s: "Clinical Therapy" }, { n: "Sukshama", s: "Emotional Therapy", active: true }, { n: "Karana", s: "Spiritual Therapy" }, { n: "Ekikaran", s: "Integrated Therapy" }].map((t, i) => (
                    <div key={i} style={{ padding: "8px 10px", background: t.active ? "var(--brand-red)" : "var(--parchment)", borderRadius: 8 }}>
                      <div style={{ fontFamily: "var(--ff-label)", fontSize: 9, color: t.active ? "white" : "var(--brand-red)", lineHeight: 1.2, opacity: t.active ? 1 : .8 }}>{t.n}</div>
                      <div style={{ fontFamily: "var(--ff-body)", fontSize: 11, color: t.active ? "rgba(255,255,255,.7)" : "var(--text-soft)" }}>{t.s}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: "var(--ff-label)", fontSize: 7.5, letterSpacing: ".12em", color: "var(--brand-red)", marginBottom: 5, opacity: .7 }}>THERAPEUTIC COACHING</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {[{ n: "Jagriti", s: "Sacred Feminine Reset", active: true }, { n: "Gautam", s: "Sacred Masculine Reset" }].map((t, i) => (
                    <div key={i} style={{ padding: "8px 10px", background: t.active ? "var(--prabodh-color)" : "var(--parchment)", borderRadius: 8 }}>
                      <div style={{ fontFamily: "var(--ff-label)", fontSize: 9, color: t.active ? "white" : "var(--prabodh-color)", lineHeight: 1.2 }}>{t.n}</div>
                      <div style={{ fontFamily: "var(--ff-body)", fontSize: 11, color: t.active ? "rgba(255,255,255,.7)" : "var(--text-soft)" }}>{t.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "practices" && (
          <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ t: "Somatic Grounding — Energy Body Scan", type: "audio", d: "12 min", tag: "Week 7" }, { t: "Shadow Journalling — Emotional Integration", type: "journal", d: "Open", tag: "Week 6" }, { t: "Pancha Prana Breathing", type: "audio", d: "8 min", tag: "Core" }, { t: "Consciousness Studies — Nervous System", type: "pdf", d: "Read", tag: "Reference" }].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 12, boxShadow: "0 2px 8px var(--shadow-warm)" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--brand-red-faint)", border: "1px solid var(--brand-red-pale)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={p.type} size={18} color="var(--brand-red)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--ff-body)", fontSize: 14.5, fontWeight: 600, color: "var(--text-deep)" }}>{p.t}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
                    <span style={{ fontFamily: "var(--ff-label)", fontSize: 8, background: "var(--parchment-d)", color: "var(--text-soft)", padding: "1px 7px", borderRadius: 10, letterSpacing: ".06em" }}>{p.tag}</span>
                    <span style={{ fontFamily: "var(--ff-body)", fontSize: 12, color: "var(--text-soft)" }}>{p.d}</span>
                  </div>
                </div>
                <button style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--brand-red)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px var(--shadow-brand)" }}>
                  <Icon name="play" size={13} color="white" strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "journal" && (
          <div className="fade-up">
            <div style={{ background: "var(--brand-red-faint)", border: "1px solid var(--brand-red-pale)", borderRadius: 14, padding: "22px", marginBottom: 18 }}>
              <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".15em", color: "var(--brand-red)", marginBottom: 8, opacity: .8 }}>NEW ENTRY — PRIVATE</div>
              <textarea placeholder="This is a private space. Write freely — your therapist will not see this unless you choose to share..."
                style={{ width: "100%", minHeight: 130, padding: "14px", background: "rgba(250,247,242,.9)", border: "1px solid var(--brand-red-pale)", borderRadius: 10, fontFamily: "var(--ff-body)", fontSize: 14, color: "var(--text-deep)", lineHeight: 1.75, resize: "vertical", outline: "none" }} />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                <button style={{ padding: "8px 20px", borderRadius: 20, background: "var(--brand-red)", color: "white", fontFamily: "var(--ff-label)", fontSize: 10, letterSpacing: ".1em" }}>SAVE ENTRY</button>
              </div>
            </div>
            {[{ date: "12 Mar 2025", txt: "Today I noticed the fear arise when I had to speak my truth..." }, { date: "8 Mar 2025", txt: "Something shifted in our session. I felt the inner authority..." }, { date: "1 Mar 2025", txt: "Beginning to see the Jagriti reset pattern more clearly..." }].map((j, i) => (
              <div key={i} style={{ padding: "14px 18px", background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 12, marginBottom: 10, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".1em", color: "var(--brand-red)", opacity: .8 }}>{j.date}</span>
                  <Icon name="journal" size={13} color="var(--smoke)" />
                </div>
                <p style={{ fontFamily: "var(--ff-body)", fontSize: 14, color: "var(--text-mid)", lineHeight: 1.55 }}>{j.txt}<span style={{ color: "var(--smoke)" }}> ...</span></p>
              </div>
            ))}
          </div>
        )}

        {tab === "session-notes" && (
          <div className="fade-up">
            <div style={{ background: "var(--parchment)", border: "1px solid var(--parchment-d)", borderRadius: 12, padding: "13px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="check" size={14} color="var(--abhaas-color)" />
              <span style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "var(--text-soft)" }}>Session notes are prepared by your therapist after each session. Read-only for client.</span>
            </div>
            {[{ n: 7, date: "8 Mar 2025", type: "Sukshama (Emotional)", notes: "Client demonstrated progress in recognising emotional reactivity patterns. Key theme: fear-to-love transition. Core insight: freeze response as learned protection. Homework: daily 5-minute energy body grounding with journal." }, { n: 6, date: "1 Mar 2025", type: "Sukshama (Emotional)", notes: "Session focused on emotional integration and the sacred feminine energy. Client made breakthrough connection to the Jagriti reset process. Energy: reflective, open, ready for Karana (spiritual) tier." }].map((s, i) => (
              <div key={i} style={{ padding: "18px", background: "var(--warm-white)", border: "1px solid var(--parchment-d)", borderRadius: 14, marginBottom: 14, boxShadow: "0 2px 10px var(--shadow-warm)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontFamily: "var(--ff-label)", fontSize: 7.5, letterSpacing: ".15em", color: "var(--prabodh-color)", marginBottom: 3 }}>SESSION {s.n} · ATMA-PRABODH® · {s.type}</div>
                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 17, color: "var(--text-deep)", fontWeight: 500 }}>Session Recap</div>
                  </div>
                  <span style={{ fontFamily: "var(--ff-body)", fontSize: 12, color: "var(--text-soft)", flexShrink: 0 }}>{s.date}</span>
                </div>
                <p style={{ fontFamily: "var(--ff-body)", fontSize: 14, color: "var(--text-mid)", lineHeight: 1.72 }}>{s.notes}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// ─── COMPONENT LIBRARY ────────────────────────────────────────────────────────
const ComponentsView = () => (
  <div style={{ padding: "32px", background: "var(--ivory)", minHeight: "calc(100vh - 66px)" }}>
    <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".22em", color: "var(--brand-red)", marginBottom: 5, opacity: .8 }}>DESIGN SYSTEM</div>
    <h1 style={{ fontFamily: "var(--ff-display)", fontSize: 36, color: "var(--text-deep)", marginBottom: 4, fontWeight: 500 }}>Component Library</h1>
    <p style={{ fontFamily: "var(--ff-body)", fontSize: 15, color: "var(--text-soft)", marginBottom: 4 }}>ajantavihara · Institute of Spiritual Sciences · Atma-Dhaara®</p>
    <GoldDivider my={22} />

    {/* Logo showcase */}
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: "var(--text-deep)", fontWeight: 500, marginBottom: 16 }}>Brand Identity</h2>
      <div style={{ display: "flex", gap: 40, alignItems: "center", background: "var(--warm-white)", padding: "28px 32px", borderRadius: 14, border: "1px solid var(--parchment-d)", flexWrap: "wrap" }}>
        {/* Logo on light */}
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
            <AVISSLogo size={56} />
            <WordmarkFull />
          </div>
          <div style={{ fontFamily: "var(--ff-body)", fontSize: 11, color: "var(--text-soft)" }}>On light background</div>
        </div>
        {/* Logo on dark */}
        <div style={{ background: "var(--text-deep)", padding: "18px 24px", borderRadius: 12, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
            <AVISSLogo size={56} />
            <div>
              <div style={{ fontFamily: "var(--ff-wordmark)", fontSize: 22, color: "white", lineHeight: 1.1 }}>
                <span style={{ fontWeight: 700 }}>ajanta</span><span style={{ fontWeight: 400 }}>vihara</span>
              </div>
              <div style={{ fontFamily: "var(--ff-label)", fontSize: 8, letterSpacing: ".2em", color: "rgba(255,255,255,.45)", marginTop: 2 }}>INSTITUTE OF SPIRITUAL SCIENCES</div>
            </div>
          </div>
          <div style={{ fontFamily: "var(--ff-body)", fontSize: 11, color: "rgba(255,255,255,.4)" }}>On dark background</div>
        </div>
        {/* AVISS standalone */}
        {[44, 56, 72, 96].map(s => (
          <div key={s} style={{ textAlign: "center" }}>
            <AVISSLogo size={s} />
            <div style={{ fontFamily: "var(--ff-body)", fontSize: 10, color: "var(--text-soft)", marginTop: 4 }}>{s}px</div>
          </div>
        ))}
      </div>
    </section>

    {/* Colours */}
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: "var(--text-deep)", fontWeight: 500, marginBottom: 16 }}>Colour Palette</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { n: "Brand Red (aviss)", h: "#8B1A1A", v: "--brand-red", primary: true },
          { n: "Brand Red Light", h: "#F5EAEA", v: "--brand-red-faint" },
          { n: "Ivory", h: "#FAF7F2", v: "--ivory" },
          { n: "Warm White", h: "#FDFAF5", v: "--warm-white" },
          { n: "Parchment", h: "#F2EAD8", v: "--parchment" },
          { n: "Gold", h: "#B8800A", v: "--gold" },
          { n: "Text Deep", h: "#2A1A08", v: "--text-deep" },
          { n: "Gyaan Blue", h: "#4A6A8A", v: "--gyaan-color" },
          { n: "Abhaas Sage", h: "#5A7A5A", v: "--abhaas-color" },
          { n: "Prabodh Plum", h: "#7A4060", v: "--prabodh-color" },
        ].map(c => (
          <div key={c.n} style={{ textAlign: "center", width: 86 }}>
            <div style={{ width: 86, height: 58, borderRadius: 10, background: `var(${c.v})`, border: c.primary ? "2px solid var(--brand-red)" : "1px solid rgba(0,0,0,0.06)", marginBottom: 5, boxShadow: c.primary ? "0 4px 12px var(--shadow-brand)" : "0 2px 6px rgba(0,0,0,.04)" }} />
            <div style={{ fontFamily: "var(--ff-label)", fontSize: 8, letterSpacing: ".08em", color: c.primary ? "var(--brand-red)" : "var(--text-mid)", lineHeight: 1.4, fontWeight: c.primary ? 600 : 400 }}>{c.n}</div>
            <div style={{ fontFamily: "var(--ff-body)", fontSize: 10, color: "var(--text-soft)" }}>{c.h}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Typography */}
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: "var(--text-deep)", fontWeight: 500, marginBottom: 16 }}>Typography</h2>
      <div style={{ background: "var(--warm-white)", borderRadius: 14, padding: "28px", border: "1px solid var(--parchment-d)" }}>
        <div style={{ fontFamily: "var(--ff-label)", fontSize: 9, letterSpacing: ".2em", color: "var(--brand-red)", marginBottom: 10, opacity: .8 }}>CINZEL · Labels, Overlines & CTA Buttons</div>
        <div style={{ fontFamily: "var(--ff-wordmark)", fontSize: 36, color: "var(--text-deep)", marginBottom: 4, lineHeight: 1 }}>
          <span style={{ fontWeight: 700 }}>ajanta</span><span style={{ fontWeight: 400 }}>vihara</span>
        </div>
        <div style={{ fontFamily: "var(--ff-label)", fontSize: 11, letterSpacing: ".22em", color: "var(--text-soft)", marginBottom: 16 }}>INSTITUTE OF SPIRITUAL SCIENCES</div>
        <div style={{ fontFamily: "var(--ff-display)", fontSize: 34, color: "var(--text-deep)", fontWeight: 300, marginBottom: 4, lineHeight: 1.1 }}>Cormorant Garamond</div>
        <div style={{ fontFamily: "var(--ff-display)", fontStyle: "italic", fontSize: 24, color: "var(--text-mid)", marginBottom: 14 }}>Display, Headings & Sacred Pull Quotes</div>
        <p style={{ fontFamily: "var(--ff-body)", fontSize: 16, color: "var(--text-mid)", lineHeight: 1.78, marginBottom: 6 }}>Crimson Pro — Body text, descriptions & flowing prose. Warm, readable, deeply classical.</p>
        <GoldDivider my={14} />
        <p style={{ fontFamily: "var(--ff-display)", fontStyle: "italic", fontSize: 15, color: "var(--text-soft)" }}>"Merging Science & Spirit for a Conscious Future" — Ajanta Vihara</p>
      </div>
    </section>

    {/* Buttons */}
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: "var(--text-deep)", fontWeight: 500, marginBottom: 16 }}>Buttons</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        {[
          { l: "Primary CTA", bg: "var(--brand-red)", c: "white" },
          { l: "Secondary", bg: "var(--parchment)", c: "var(--brand-red)", b: "1px solid var(--brand-red-pale)" },
          { l: "Prabodh Heal", bg: "var(--prabodh-color)", c: "white" },
          { l: "Gyaan Learn", bg: "var(--gyaan-color)", c: "white" },
          { l: "Abhaas Train", bg: "var(--abhaas-color)", c: "white" },
          { l: "Outline", bg: "transparent", c: "var(--brand-red)", b: "1.5px solid var(--brand-red)" },
          { l: "Ghost", bg: "var(--warm-white)", c: "var(--text-mid)", b: "1px solid var(--parchment-d)" },
        ].map((b, i) => (
          <button key={i} style={{ padding: "10px 22px", borderRadius: 25, background: b.bg, color: b.c, border: b.b || "none", fontFamily: "var(--ff-label)", fontSize: 10, letterSpacing: ".1em", boxShadow: "0 2px 8px rgba(42,26,8,.08)" }}>
            {b.l.toUpperCase()}
          </button>
        ))}
      </div>
    </section>

    {/* Pathway tags */}
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: "var(--text-deep)", fontWeight: 500, marginBottom: 14 }}>Pathway Tags</h2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        {[{ l: "ATMA-PRABODH®", c: "var(--prabodh-color)" }, { l: "ATMA-GYAAN®", c: "var(--gyaan-color)" }, { l: "ATMA-ABHAAS®", c: "var(--abhaas-color)" }, { l: "LIVE NOW", c: "var(--brand-red)" }, { l: "EVOLUTION PATHWAYS", c: "var(--gold)" }, { l: "AVISS", c: "var(--brand-red)" }].map((t, i) => (
          <span key={i} style={{ fontFamily: "var(--ff-label)", fontSize: 8, letterSpacing: ".13em", background: `${t.c}15`, color: t.c, padding: "3px 10px", borderRadius: 20, border: `1px solid ${t.c}33` }}>{t.l}</span>
        ))}
      </div>
    </section>

    {/* Rationale */}
    <section style={{ background: "linear-gradient(135deg,var(--warm-white),var(--brand-red-faint))", border: "1px solid var(--brand-red-pale)", borderRadius: 16, padding: "28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <AVISSLogo size={40} />
        <div>
          <div style={{ fontFamily: "var(--ff-label)", fontSize: 8.5, letterSpacing: ".18em", color: "var(--brand-red)", opacity: .8 }}>BRAND ALIGNMENT NOTES</div>
          <h2 style={{ fontFamily: "var(--ff-display)", fontSize: 24, color: "var(--text-deep)", fontWeight: 500 }}>Logo & Colour Corrections Applied</h2>
        </div>
      </div>
      {[
        ["AVISS crimson circle is the primary brand colour", "The deep crimson red (#8B1A1A) of the brushstroke circle is now the primary accent colour replacing generic gold. It drives CTAs, active states, highlights, progress bars, and all key brand touches."],
        ["Wordmark typography matched", "The wordmark uses Libre Baskerville — bold weight for 'ajanta', regular weight for 'vihara', all lowercase. 'INSTITUTE OF SPIRITUAL SCIENCES' in Cinzel small caps below, matching the logo lockup."],
        ["AVISS as avatar & watermark", "The aviss circle appears as: the top-bar logo, the user avatar, a subtle watermark on video players, a footer badge in the sidebar, and a large ghosted watermark on the healing hero card."],
        ["Quote attribution block", "The founder pull quote now features the aviss circle + 'JYOTI · FOUNDER · AJANTA VIHARA' wordmark lockup, tying the brand identity directly to the content."],
        ["Backgrounds shifted warmer", "Backgrounds are now #FAF7F2 (ivory) and #FDFAF5 (warm white) — slightly warmer than before, harmonising with the brand red rather than gold."],
        ["Gold demoted to secondary", "Gold (#B8800A) is retained as a secondary accent for dividers, badges, and progress rings on specific pathway cards, but no longer drives primary interaction states."],
      ].map(([title, body], i) => (
        <div key={i} style={{ marginBottom: 14, paddingLeft: 14, borderLeft: "2px solid var(--brand-red-pale)" }}>
          <div style={{ fontFamily: "var(--ff-body)", fontSize: 15, fontWeight: 600, color: "var(--brand-red)", marginBottom: 3 }}>{title}</div>
          <p style={{ fontFamily: "var(--ff-body)", fontSize: 14, color: "var(--text-mid)", lineHeight: 1.7 }}>{body}</p>
        </div>
      ))}
    </section>
  </div>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function AjantaViharaApp() {
  const [view, setView] = useState("dashboard");
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <FontLoader />
      <TopBar onNav={setView} currentView={view} />
      {view === "dashboard"  && <DashboardView onOpenCourse={() => setView("course")} />}
      {view === "course"     && <CourseView />}
      {view === "healing"    && <HealingSpaceView />}
      {view === "components" && <ComponentsView />}
    </div>
  );
}
