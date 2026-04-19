import { useState, useEffect, useRef } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    globe: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
    zap: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
    star: (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
    check: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>),
    arrow: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>),
    eye: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>),
    eyeOff: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>),
    map: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>),
    layout: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>),
    download: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>),
    users: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
    close: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
    menu: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>),
    shield: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
    rocket: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>),
    sparkles: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>),
    loader: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{animation:"spin 1s linear infinite"}}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>),
    user: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>),
    mail: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
    lock: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>),
    logout: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>),
    plus: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>),
    trash: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>),
    external: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>),
    settings: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>),
  };
  return icons[name] || null;
};

// ─── STYLES GLOBAUX ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
    
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --blue: #2563eb;
      --blue-light: #3b82f6;
      --blue-dark: #1d4ed8;
      --violet: #7c3aed;
      --violet-light: #8b5cf6;
      --bg: #f9fafb;
      --bg-card: #ffffff;
      --text: #111827;
      --text-secondary: #6b7280;
      --text-tertiary: #9ca3af;
      --border: #e5e7eb;
      --border-focus: #2563eb;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
      --shadow: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
      --shadow-lg: 0 16px 48px rgba(0,0,0,0.1), 0 6px 16px rgba(0,0,0,0.06);
      --radius: 12px;
      --radius-lg: 20px;
      --radius-full: 9999px;
    }
    
    html, body { height: 100%; font-family: 'DM Sans', system-ui, sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
    
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
    @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    @keyframes progressBar { from { width: 0%; } to { width: var(--target-width); } }
    
    .animate-fadeIn { animation: fadeIn 0.4s ease forwards; }
    .animate-fadeInUp { animation: fadeInUp 0.5s ease forwards; }
    .animate-scaleIn { animation: scaleIn 0.3s ease forwards; }
    
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; background: var(--blue); color: white;
      border: none; border-radius: var(--radius-full); cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
      transition: all 0.2s ease; text-decoration: none;
    }
    .btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.35); }
    .btn-primary:active { transform: translateY(0); }
    
    .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; background: transparent; color: var(--text);
      border: 1.5px solid var(--border); border-radius: var(--radius-full); cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
      transition: all 0.2s ease;
    }
    .btn-secondary:hover { border-color: var(--blue); color: var(--blue); background: rgba(37,99,235,0.04); }
    
    .btn-gradient {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px;
      background: linear-gradient(135deg, var(--blue) 0%, var(--violet) 100%);
      background-size: 200% 200%;
      color: white; border: none; border-radius: var(--radius-full); cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-gradient:hover { animation: gradientShift 1.5s ease infinite; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(124,58,237,0.3); }
    
    .card {
      background: var(--bg-card); border-radius: var(--radius-lg);
      border: 1px solid var(--border); box-shadow: var(--shadow-sm);
      transition: all 0.25s ease;
    }
    .card:hover { box-shadow: var(--shadow); border-color: #d1d5db; }
    
    .input-field {
      width: 100%; padding: 13px 16px; background: var(--bg);
      border: 1.5px solid var(--border); border-radius: var(--radius);
      font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--text);
      transition: all 0.2s ease; outline: none;
    }
    .input-field:focus { border-color: var(--border-focus); background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
    .input-field::placeholder { color: var(--text-tertiary); }
    
    .badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 12px; border-radius: var(--radius-full);
      font-size: 12px; font-weight: 600; letter-spacing: 0.03em;
    }
    .badge-blue { background: rgba(37,99,235,0.1); color: var(--blue); }
    .badge-violet { background: rgba(124,58,237,0.1); color: var(--violet); }
    .badge-green { background: rgba(16,185,129,0.1); color: #059669; }
    .badge-gold { background: rgba(245,158,11,0.12); color: #d97706; }

    .nav-link {
      font-size: 14px; font-weight: 500; color: var(--text-secondary);
      cursor: pointer; transition: color 0.15s ease; text-decoration: none;
    }
    .nav-link:hover { color: var(--text); }
    
    .gradient-text {
      background: linear-gradient(135deg, var(--blue) 0%, var(--violet) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    
    .section-label {
      font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
      letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-secondary);
    }
    
    .noise-bg::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      opacity: 0.4; border-radius: inherit;
    }
    
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
  `}</style>
);

// ─── AUTH CONTEXT ──────────────────────────────────────────────────────────────
const useAuth = () => {
  const [user, setUser] = useState(null);
  const login = (email, name) => setUser({ email, name, plan: "free", sites: [] });
  const logout = () => setUser(null);
  return { user, login, logout };
};

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
const Navbar = ({ onNavigate, currentPage, user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 24px",
      background: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(229,231,235,0.8)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <div onClick={() => onNavigate("landing")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{
            width: 34, height: 34,
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="globe" size={16} style={{ color: "white" }} />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text)" }}>
            Map<span className="gradient-text">Site</span>
          </span>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {["Fonctionnalités", "Pricing", "Exemples"].map(item => (
            <span key={item} className="nav-link" onClick={() => onNavigate(item.toLowerCase())}>
              {item}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {user ? (
            <>
              <button className="btn-secondary" style={{ padding: "8px 16px", fontSize: 14 }} onClick={() => onNavigate("dashboard")}>
                Dashboard
              </button>
              <button className="btn-primary" style={{ padding: "8px 16px", fontSize: 14 }} onClick={onLogout}>
                <Icon name="logout" size={15} /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <button className="btn-secondary" style={{ padding: "8px 18px", fontSize: 14 }} onClick={() => onNavigate("login")}>
                Connexion
              </button>
              <button className="btn-primary" style={{ padding: "8px 18px", fontSize: 14 }} onClick={() => onNavigate("register")}>
                Commencer gratuitement
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// ─── LANDING PAGE ──────────────────────────────────────────────────────────────
const LandingPage = ({ onNavigate }) => {
  const [inputUrl, setInputUrl] = useState("");

  const features = [
    { icon: "zap", title: "Génération en 30 sec", desc: "Collez votre lien Google Maps, obtenez un site web professionnel instantanément.", color: "#2563eb" },
    { icon: "layout", title: "Design Premium", desc: "Des templates conçus par des designers UX pour convertir et impressionner.", color: "#7c3aed" },
    { icon: "download", title: "Export & Deploy", desc: "Téléchargez le code source ou déployez en un clic sur votre domaine.", color: "#059669" },
    { icon: "shield", title: "SEO Optimisé", desc: "Balises meta, schema.org et performance pour dominer Google.", color: "#d97706" },
  ];

  const stats = [
    { value: "4 200+", label: "Sites générés" },
    { value: "98%", label: "Satisfaction client" },
    { value: "30 sec", label: "Temps moyen" },
    { value: "150+", label: "Types de business" },
  ];

  const testimonials = [
    { name: "Sophie Martin", role: "Restauratrice, Paris", text: "En 2 minutes j'avais un site pro pour mon restaurant. Mes clients pensaient que j'avais payé une agence !", avatar: "SM", rating: 5 },
    { name: "Thomas Durand", role: "Plombier, Lyon", text: "Je ne connais rien au web. MapSite a créé mon site en quelques secondes. J'ai eu 3 nouveaux clients la première semaine.", avatar: "TD", rating: 5 },
    { name: "Clara Leblanc", role: "Agence digitale, Bordeaux", text: "On utilise MapSite Pro pour nos clients TPE. Le gain de temps est énorme, la qualité est au rendez-vous.", avatar: "CL", rating: 5 },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      {/* HERO */}
      <section style={{
        minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "80px 24px",
        background: "linear-gradient(160deg, #f0f4ff 0%, #faf5ff 50%, #f9fafb 100%)",
      }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{
            position: "absolute", width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
            top: -100, right: -100,
          }} />
          <div style={{
            position: "absolute", width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
            bottom: -80, left: -80,
          }} />
          {/* Grid pattern */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div style={{ maxWidth: 780, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="animate-fadeIn" style={{ animationDelay: "0s" }}>
            <span className="badge badge-blue" style={{ marginBottom: 24, display: "inline-flex" }}>
              <Icon name="sparkles" size={12} /> Nouveau · Génération IA instantanée
            </span>
          </div>

          <h1 className="animate-fadeIn" style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 1.08,
            letterSpacing: "-0.03em", color: "var(--text)",
            marginBottom: 24, animationDelay: "0.1s",
          }}>
            Votre lien Google Maps
            <br />
            <span className="gradient-text">devient un site web</span>
            <br />
            professionnel
          </h1>

          <p className="animate-fadeIn" style={{
            fontSize: 19, color: "var(--text-secondary)", lineHeight: 1.65,
            maxWidth: 560, margin: "0 auto 48px", fontWeight: 400,
            animationDelay: "0.2s",
          }}>
            Collez votre fiche Google Maps. En 30 secondes, générez un site web complet, 
            prêt à convertir vos visiteurs en clients.
          </p>

          {/* Main Input */}
          <div className="animate-fadeInUp" style={{
            background: "white", borderRadius: 20,
            border: "1.5px solid var(--border)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)",
            padding: 8, display: "flex", gap: 8, maxWidth: 620, margin: "0 auto 20px",
            animationDelay: "0.3s",
          }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: "4px 12px" }}>
              <Icon name="map" size={18} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
              <input
                className="input-field"
                placeholder="Collez votre lien Google Maps ici..."
                value={inputUrl}
                onChange={e => setInputUrl(e.target.value)}
                style={{ border: "none", background: "transparent", padding: "8px 0", fontSize: 15, boxShadow: "none" }}
              />
            </div>
            <button
              className="btn-gradient"
              onClick={() => onNavigate("register")}
              style={{ flexShrink: 0, fontSize: 14, padding: "12px 20px" }}
            >
              Générer mon site <Icon name="arrow" size={16} />
            </button>
          </div>

          <p className="animate-fadeIn" style={{ fontSize: 13, color: "var(--text-tertiary)", animationDelay: "0.4s" }}>
            Gratuit · Aucune CB requise · Résultat en 30 secondes
          </p>

          {/* Stats */}
          <div className="animate-fadeIn" style={{
            display: "flex", justifyContent: "center", gap: 48,
            marginTop: 64, paddingTop: 48,
            borderTop: "1px solid var(--border)",
            animationDelay: "0.5s", flexWrap: "wrap",
          }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 12 }}>Fonctionnalités</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text)" }}>
            Tout ce dont vous avez besoin
          </h2>
          <p style={{ fontSize: 17, color: "var(--text-secondary)", marginTop: 16, maxWidth: 480, margin: "16px auto 0" }}>
            De la génération à la mise en ligne, MapSite couvre l'ensemble de votre parcours.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {features.map((f, i) => (
            <div key={f.title} className="card" style={{ padding: 32, cursor: "default", animationDelay: `${i * 0.1}s` }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                <Icon name={f.icon} size={22} style={{ color: f.color }} />
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>{f.title}</h3>
              <p style={{ fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(160deg, #f0f4ff, #faf5ff)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label" style={{ display: "block", marginBottom: 12 }}>Témoignages</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 38, fontWeight: 800, letterSpacing: "-0.025em" }}>
              Ils nous font confiance
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} className="card" style={{ padding: 28 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Icon key={i} name="star" size={14} style={{ color: "#f59e0b" }} />
                  ))}
                </div>
                <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontSize: 13, fontWeight: 700,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <PricingSection onNavigate={onNavigate} />

      {/* CTA */}
      <section style={{
        padding: "100px 24px", textAlign: "center",
        background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E)", opacity: 0.6 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 44, fontWeight: 800, color: "white", letterSpacing: "-0.025em", marginBottom: 20 }}>
            Prêt à lancer votre site ?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginBottom: 40 }}>
            Rejoignez 4 200+ professionnels qui font confiance à MapSite.
          </p>
          <button
            className="btn-primary"
            style={{ background: "white", color: "#1d4ed8", padding: "16px 36px", fontSize: 16 }}
            onClick={() => onNavigate("register")}
          >
            Créer mon site gratuitement <Icon name="arrow" size={18} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f172a", padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="globe" size={14} style={{ color: "white" }} />
              </div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "white", fontSize: 16 }}>MapSite</span>
            </div>
            <div style={{ display: "flex", gap: 32 }}>
              {["Conditions", "Confidentialité", "Contact"].map(link => (
                <span key={link} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>{link}</span>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2025 MapSite. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ─── PRICING SECTION ───────────────────────────────────────────────────────────
const PricingSection = ({ onNavigate }) => {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Gratuit", price: "0", period: "", badge: null,
      color: "#6b7280", gradient: "linear-gradient(135deg, #f9fafb, #f3f4f6)",
      features: ["1 site généré", "Watermark MapSite", "Template de base", "Partage par lien"],
      cta: "Commencer gratuitement", ctaStyle: "secondary", highlight: false,
    },
    {
      name: "Pro", price: annual ? "24" : "29", period: "/mois",
      badge: "⭐ Recommandé",
      color: "#2563eb", gradient: "linear-gradient(135deg, #eff6ff, #eef2ff)",
      features: ["10 sites / mois", "Sans watermark", "Téléchargement HTML", "Édition du contenu", "SEO optimisé", "Support prioritaire"],
      cta: "Démarrer l'essai Pro", ctaStyle: "primary", highlight: true,
    },
    {
      name: "Business", price: annual ? "40" : "49", period: "/mois",
      badge: "🏢 Agences",
      color: "#7c3aed", gradient: "linear-gradient(135deg, #faf5ff, #f5f3ff)",
      features: ["Sites illimités", "Export ZIP complet", "Édition avancée", "White-label", "API Access", "Support dédié 24/7"],
      cta: "Contacter les ventes", ctaStyle: "gradient", highlight: false,
    },
  ];

  return (
    <section style={{ padding: "100px 24px" }} id="pricing">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 12 }}>Tarifs</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 16 }}>
            Simple. Transparent. Abordable.
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32 }}>
            Commencez gratuitement, évoluez selon vos besoins.
          </p>
          {/* Toggle Annual/Monthly */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 100, padding: 4 }}>
            <button onClick={() => setAnnual(false)} style={{ padding: "6px 20px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, background: !annual ? "white" : "transparent", color: !annual ? "var(--text)" : "var(--text-secondary)", boxShadow: !annual ? "var(--shadow-sm)" : "none", transition: "all 0.2s" }}>
              Mensuel
            </button>
            <button onClick={() => setAnnual(true)} style={{ padding: "6px 20px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, background: annual ? "white" : "transparent", color: annual ? "var(--text)" : "var(--text-secondary)", boxShadow: annual ? "var(--shadow-sm)" : "none", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8 }}>
              Annuel <span className="badge badge-green" style={{ padding: "2px 8px", fontSize: 11 }}>-20%</span>
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, alignItems: "start" }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{
              background: plan.highlight ? "white" : "white",
              border: plan.highlight ? `2px solid ${plan.color}` : "1.5px solid var(--border)",
              borderRadius: 24,
              padding: plan.highlight ? 36 : 28,
              position: "relative",
              transform: plan.highlight ? "scale(1.04)" : "scale(1)",
              boxShadow: plan.highlight ? `0 20px 60px rgba(37,99,235,0.15), 0 4px 12px rgba(37,99,235,0.08)` : "var(--shadow-sm)",
              transition: "all 0.25s ease",
            }}>
              {/* Background gradient */}
              <div style={{ position: "absolute", inset: 0, borderRadius: 22, background: plan.gradient, opacity: 0.5 }} />
              
              <div style={{ position: "relative", zIndex: 1 }}>
                {plan.badge && (
                  <div style={{ marginBottom: 16 }}>
                    <span style={{
                      display: "inline-block", padding: "5px 14px", borderRadius: 100,
                      background: plan.highlight ? plan.color : "rgba(124,58,237,0.1)",
                      color: plan.highlight ? "white" : plan.color,
                      fontSize: 12, fontWeight: 700,
                    }}>{plan.badge}</span>
                  </div>
                )}

                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>
                  {plan.name}
                </h3>

                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 44, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>
                    {plan.price === "0" ? "Gratuit" : `${plan.price}€`}
                  </span>
                  {plan.period && <span style={{ color: "var(--text-secondary)", fontSize: 15 }}>{plan.period}</span>}
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, marginBottom: 24 }}>
                  {plan.features.map(feature => (
                    <div key={feature} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%",
                        background: `${plan.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <Icon name="check" size={10} style={{ color: plan.color }} />
                      </div>
                      <span style={{ fontSize: 14, color: "var(--text)", fontWeight: 400 }}>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate("register")}
                  style={{
                    width: "100%", padding: "13px", borderRadius: 100,
                    border: plan.ctaStyle === "secondary" ? "1.5px solid var(--border)" : "none",
                    background: plan.ctaStyle === "primary" ? plan.color : plan.ctaStyle === "gradient" ? `linear-gradient(135deg, #2563eb, #7c3aed)` : "transparent",
                    color: plan.ctaStyle === "secondary" ? "var(--text)" : "white",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── LOGIN PAGE ────────────────────────────────────────────────────────────────
const LoginPage = ({ onNavigate, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) { setError("Veuillez remplir tous les champs."); return; }
    if (!email.includes("@")) { setError("Adresse email invalide."); return; }
    setError(""); setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onLogin(email, email.split("@")[0]);
    onNavigate("dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      {/* Left panel - visual */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: 48, background: "linear-gradient(145deg, #1e1b4b 0%, #1d4ed8 50%, #4f46e5 100%)",
        position: "relative", overflow: "hidden", minWidth: 0,
      }} className="auth-left-panel">
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 30% 40%, rgba(124,58,237,0.4) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(37,99,235,0.3) 0%, transparent 50%)` }} />
        
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => onNavigate("landing")}>
            <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
              <Icon name="globe" size={18} style={{ color: "white" }} />
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "white" }}>MapSite</span>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 28, marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
              {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={14} style={{ color: "#fbbf24" }} />)}
            </div>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              "MapSite a transformé mon activité. En moins d'une minute, j'avais un site professionnel qui a multiplié mes appels par 3."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #f59e0b, #ef4444)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700 }}>JM</div>
              <div>
                <div style={{ color: "white", fontSize: 14, fontWeight: 600 }}>Jean-Michel Rousseau</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Électricien, Toulouse</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            {[{ n: "4 200+", l: "Sites créés" }, { n: "30s", l: "Génération" }, { n: "98%", l: "Satisfaits" }].map(s => (
              <div key={s.l} style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>{s.n}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{
        width: 480, flexShrink: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "48px 56px", background: "white", overflowY: "auto",
      }}>
        <div className="animate-fadeIn">
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.02em" }}>
            Bon retour ! 👋
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 36 }}>
            Connectez-vous à votre compte MapSite.
          </p>

          {error && (
            <div className="animate-scaleIn" style={{
              background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12,
              padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#dc2626",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>⚠</span> {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6, display: "block" }}>Email</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <Icon name="mail" size={16} style={{ color: "var(--text-tertiary)" }} />
                </div>
                <input
                  className="input-field"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ paddingLeft: 42 }}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
                Mot de passe
                <span style={{ color: "var(--blue)", fontWeight: 500, cursor: "pointer", fontSize: 12 }}>Mot de passe oublié ?</span>
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <Icon name="lock" size={16} style={{ color: "var(--text-tertiary)" }} />
                </div>
                <input
                  className="input-field"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingLeft: 42, paddingRight: 46 }}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                />
                <button
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", display: "flex" }}
                >
                  <Icon name={showPw ? "eyeOff" : "eye"} size={16} />
                </button>
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={loading}
              style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 15, marginTop: 4 }}
            >
              {loading ? <><Icon name="loader" size={16} /> Connexion en cours...</> : <>Se connecter <Icon name="arrow" size={16} /></>}
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>ou</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          <button style={{
            width: "100%", padding: "12px", borderRadius: 12, border: "1.5px solid var(--border)",
            background: "white", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "var(--text)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continuer avec Google
          </button>

          <p style={{ textAlign: "center", fontSize: 14, color: "var(--text-secondary)", marginTop: 28 }}>
            Pas encore de compte ?{" "}
            <span onClick={() => onNavigate("register")} style={{ color: "var(--blue)", fontWeight: 600, cursor: "pointer" }}>
              S'inscrire gratuitement
            </span>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .auth-left-panel { display: none !important; } }
      `}</style>
    </div>
  );
};

// ─── REGISTER PAGE ─────────────────────────────────────────────────────────────
const RegisterPage = ({ onNavigate, onLogin }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.name.trim()) e.name = "Nom requis";
      if (!form.email.includes("@")) e.email = "Email invalide";
    }
    if (step === 2) {
      if (form.password.length < 8) e.password = "Minimum 8 caractères";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    if (step < 2) { setStep(2); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    onLogin(form.email, form.name);
    onNavigate("dashboard");
  };

  const pwStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const pwColors = ["#e5e7eb", "#ef4444", "#f59e0b", "#10b981"];
  const pwLabels = ["", "Faible", "Moyen", "Fort"];

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: 48, background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
        position: "relative", overflow: "hidden",
      }} className="auth-left-panel">
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 70% 20%, rgba(124,58,237,0.35) 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => onNavigate("landing")}>
            <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="globe" size={18} style={{ color: "white" }} />
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "white" }}>MapSite</span>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Votre présence en ligne commence ici.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
            Rejoignez des milliers de professionnels qui génèrent des sites web professionnels en quelques secondes.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: "zap", text: "Génération en 30 secondes chrono" },
              { icon: "shield", text: "Hébergement inclus et sécurisé" },
              { icon: "rocket", text: "Prêt à vendre dès le premier jour" },
            ].map(f => (
              <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 34, height: 34, background: "rgba(255,255,255,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={f.icon} size={16} style={{ color: "white" }} />
                </div>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: 480, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 56px", background: "white", overflowY: "auto" }}>
        <div className="animate-fadeIn">
          {/* Progress */}
          <div style={{ display: "flex", gap: 6, marginBottom: 36 }}>
            {[1, 2].map(s => (
              <div key={s} style={{ flex: 1, height: 3, borderRadius: 100, background: s <= step ? "var(--blue)" : "var(--border)", transition: "background 0.3s ease" }} />
            ))}
          </div>

          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.02em" }}>
              {step === 1 ? "Créer votre compte" : "Sécurisez votre compte"}
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
              {step === 1 ? "C'est rapide et c'est gratuit." : "Choisissez un mot de passe fort."}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {step === 1 ? (
              <>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", display: "block", marginBottom: 6 }}>Nom complet</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                      <Icon name="user" size={16} style={{ color: "var(--text-tertiary)" }} />
                    </div>
                    <input className="input-field" placeholder="Marie Dupont" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ paddingLeft: 42 }} />
                  </div>
                  {errors.name && <p style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>⚠ {errors.name}</p>}
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", display: "block", marginBottom: 6 }}>Email</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                      <Icon name="mail" size={16} style={{ color: "var(--text-tertiary)" }} />
                    </div>
                    <input className="input-field" type="email" placeholder="vous@exemple.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ paddingLeft: 42 }} />
                  </div>
                  {errors.email && <p style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>⚠ {errors.email}</p>}
                </div>
              </>
            ) : (
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", display: "block", marginBottom: 6 }}>Mot de passe</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                    <Icon name="lock" size={16} style={{ color: "var(--text-tertiary)" }} />
                  </div>
                  <input className="input-field" type={showPw ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={{ paddingLeft: 42, paddingRight: 46 }} onKeyDown={e => e.key === "Enter" && handleNext()} />
                  <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", display: "flex" }}>
                    <Icon name={showPw ? "eyeOff" : "eye"} size={16} />
                  </button>
                </div>
                {form.password.length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                      {[1, 2, 3].map(l => (
                        <div key={l} style={{ flex: 1, height: 3, borderRadius: 100, background: l <= pwStrength ? pwColors[pwStrength] : "var(--border)", transition: "all 0.3s" }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 12, color: pwColors[pwStrength] }}>{pwLabels[pwStrength]}</span>
                  </div>
                )}
                {errors.password && <p style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>⚠ {errors.password}</p>}
              </div>
            )}

            <button className="btn-primary" onClick={handleNext} disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 15 }}>
              {loading ? <><Icon name="loader" size={16} /> Création du compte...</> : step === 1 ? <>Continuer <Icon name="arrow" size={16} /></> : <>Créer mon compte <Icon name="rocket" size={16} /></>}
            </button>
          </div>

          {step === 2 && (
            <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", gap: 4, marginTop: 16 }}>
              ← Retour
            </button>
          )}

          <p style={{ fontSize: 12, color: "var(--text-tertiary)", textAlign: "center", marginTop: 20, lineHeight: 1.6 }}>
            En vous inscrivant, vous acceptez nos{" "}
            <span style={{ color: "var(--blue)", cursor: "pointer" }}>Conditions d'utilisation</span> et notre{" "}
            <span style={{ color: "var(--blue)", cursor: "pointer" }}>Politique de confidentialité</span>.
          </p>

          <p style={{ textAlign: "center", fontSize: 14, color: "var(--text-secondary)", marginTop: 16 }}>
            Déjà un compte ?{" "}
            <span onClick={() => onNavigate("login")} style={{ color: "var(--blue)", fontWeight: 600, cursor: "pointer" }}>Se connecter</span>
          </p>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .auth-left-panel { display: none !important; } }`}</style>
    </div>
  );
};

// ─── DASHBOARD ─────────────────────────────────────────────────────────────────
const Dashboard = ({ user, onNavigate, onLogout }) => {
  const [mapsUrl, setMapsUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [generatedSite, setGeneratedSite] = useState(null);
  const [savedSites] = useState([
    { id: 1, name: "Le Bistrot Parisien", type: "Restaurant", created: "12 Jan", status: "live" },
    { id: 2, name: "Plomberie Durand", type: "Artisan", created: "8 Jan", status: "live" },
  ]);

  const genSteps = [
    "Analyse du lien Google Maps...",
    "Extraction des données business...",
    "Génération du contenu IA...",
    "Application du design premium...",
    "Optimisation SEO...",
    "Site prêt ! 🎉",
  ];

  const handleGenerate = async () => {
    if (!mapsUrl.trim()) return;
    setGenerating(true);
    setGenStep(0);
    for (let i = 0; i < genSteps.length; i++) {
      setGenStep(i);
      await new Promise(r => setTimeout(r, 650));
    }
    setGenerating(false);
    setGeneratedSite({
      name: "La Belle Époque",
      type: "Restaurant français",
      address: "15 Rue de la Paix, Paris 75001",
      phone: "+33 1 42 60 30 00",
      rating: 4.7,
      reviews: 284,
    });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0, background: "white",
        borderRight: "1px solid var(--border)", padding: "24px 16px",
        display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px", marginBottom: 32, cursor: "pointer" }} onClick={() => onNavigate("landing")}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="globe" size={15} style={{ color: "white" }} />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: "var(--text)" }}>MapSite</span>
        </div>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { icon: "layout", label: "Dashboard", active: true },
            { icon: "globe", label: "Mes sites" },
            { icon: "settings", label: "Paramètres" },
          ].map(item => (
            <button key={item.label} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              borderRadius: 10, border: "none", cursor: "pointer", width: "100%",
              background: item.active ? "rgba(37,99,235,0.08)" : "transparent",
              color: item.active ? "var(--blue)" : "var(--text-secondary)",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: item.active ? 600 : 400,
              transition: "all 0.15s",
            }}>
              <Icon name={item.icon} size={17} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User + plan */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
              <span className="badge badge-blue" style={{ fontSize: 10, padding: "2px 8px" }}>Gratuit</span>
            </div>
          </div>
          <button onClick={onLogout} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", width: "100%",
            borderRadius: 10, border: "none", background: "none", cursor: "pointer",
            color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          }}>
            <Icon name="logout" size={15} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: 40, overflowY: "auto" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 6 }}>
              Bonjour, {user.name?.split(" ")[0]} 👋
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
              Générez un site professionnel depuis votre fiche Google Maps.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
            {[
              { label: "Sites créés", value: savedSites.length, icon: "globe", color: "#2563eb" },
              { label: "Sites restants", value: "1/1", icon: "zap", color: "#7c3aed" },
              { label: "Vues totales", value: "1 280", icon: "users", color: "#059669" },
            ].map(s => (
              <div key={s.label} className="card" style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6, fontWeight: 500 }}>{s.label}</p>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>{s.value}</p>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={s.icon} size={18} style={{ color: s.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Generator */}
          <div style={{
            background: "white", borderRadius: 24, border: "1.5px solid var(--border)",
            padding: 36, marginBottom: 32,
            boxShadow: "0 4px 24px rgba(37,99,235,0.06), 0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
                Générer un nouveau site
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                Collez votre lien Google Maps pour démarrer la génération.
              </p>
            </div>

            <div style={{
              display: "flex", gap: 12, padding: 8,
              background: "var(--bg)", border: "1.5px solid var(--border)",
              borderRadius: 16, transition: "all 0.2s",
              boxShadow: mapsUrl ? "0 0 0 3px rgba(37,99,235,0.1)" : "none",
              borderColor: mapsUrl ? "var(--blue)" : "var(--border)",
            }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: "6px 12px", background: "white", borderRadius: 10 }}>
                <Icon name="map" size={20} style={{ color: generating ? "var(--blue)" : "var(--text-tertiary)", flexShrink: 0, transition: "color 0.3s" }} />
                <input
                  className="input-field"
                  placeholder="https://maps.google.com/maps?..."
                  value={mapsUrl}
                  onChange={e => setMapsUrl(e.target.value)}
                  disabled={generating}
                  style={{ border: "none", background: "transparent", padding: "10px 0", fontSize: 15, boxShadow: "none", fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
              <button
                className="btn-gradient"
                onClick={handleGenerate}
                disabled={!mapsUrl.trim() || generating}
                style={{ flexShrink: 0, opacity: !mapsUrl.trim() ? 0.5 : 1, padding: "12px 24px" }}
              >
                {generating ? <><Icon name="loader" size={16} /> Génération...</> : <><Icon name="sparkles" size={16} /> Générer mon site</>}
              </button>
            </div>

            {/* Generation Progress */}
            {generating && (
              <div className="animate-fadeIn" style={{ marginTop: 24 }}>
                <div style={{ height: 3, background: "var(--border)", borderRadius: 100, overflow: "hidden", marginBottom: 16 }}>
                  <div style={{
                    height: "100%", borderRadius: 100,
                    background: "linear-gradient(90deg, var(--blue), var(--violet))",
                    width: `${((genStep + 1) / genSteps.length) * 100}%`,
                    transition: "width 0.6s ease",
                  }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {genSteps.map((step, i) => (
                    <div key={step} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      opacity: i <= genStep ? 1 : 0.3, transition: "opacity 0.3s",
                      animation: i === genStep ? "slideIn 0.3s ease" : "none",
                    }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                        background: i < genStep ? "#10b981" : i === genStep ? "var(--blue)" : "var(--border)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.3s",
                      }}>
                        {i < genStep ? <Icon name="check" size={10} style={{ color: "white" }} /> : i === genStep ? <Icon name="loader" size={10} style={{ color: "white" }} /> : null}
                      </div>
                      <span style={{ fontSize: 13, color: i === genStep ? "var(--text)" : "var(--text-secondary)", fontWeight: i === genStep ? 500 : 400 }}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Generated Result */}
            {generatedSite && !generating && (
              <div className="animate-scaleIn" style={{
                marginTop: 24, padding: 24,
                background: "linear-gradient(135deg, #f0f9ff, #f5f3ff)",
                border: "1.5px solid #c7d2fe", borderRadius: 16,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)" }}>{generatedSite.name}</h3>
                      <span className="badge badge-green">✓ Généré</span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>{generatedSite.type} · {generatedSite.address}</p>
                  </div>
                  <div style={{ display: "flex", gap: 3 }}>
                    {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={14} style={{ color: i < Math.floor(generatedSite.rating) ? "#f59e0b" : "#e5e7eb" }} />)}
                    <span style={{ fontSize: 12, color: "var(--text-secondary)", marginLeft: 4 }}>{generatedSite.rating} ({generatedSite.reviews} avis)</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn-primary" style={{ fontSize: 13, padding: "10px 18px" }} onClick={() => onNavigate("preview")}>
                    <Icon name="external" size={15} /> Voir le site
                  </button>
                  <button className="btn-secondary" style={{ fontSize: 13, padding: "10px 18px" }}>
                    <Icon name="download" size={15} /> Télécharger
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Saved Sites */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text)" }}>Mes sites</h2>
              <button className="btn-primary" style={{ fontSize: 13, padding: "8px 16px" }}>
                <Icon name="plus" size={15} /> Nouveau site
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {savedSites.map(site => (
                <div key={site.id} className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #eff6ff, #eef2ff)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="globe" size={20} style={{ color: "var(--blue)" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{site.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{site.type} · Créé le {site.created}</div>
                  </div>
                  <span className="badge badge-green" style={{ flexShrink: 0 }}>● En ligne</span>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button className="btn-secondary" style={{ fontSize: 12, padding: "6px 14px" }}>Éditer</button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", display: "flex", alignItems: "center", padding: 8, borderRadius: 8, transition: "all 0.15s" }}>
                      <Icon name="trash" size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade Banner */}
          <div style={{
            marginTop: 32, padding: 28, borderRadius: 20,
            background: "linear-gradient(135deg, #1e1b4b, #2563eb)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 20,
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Icon name="rocket" size={18} style={{ color: "#fbbf24" }} />
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "white" }}>Passez à MapSite Pro</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>10 sites/mois, sans watermark, téléchargement HTML, édition avancée.</p>
            </div>
            <button style={{
              background: "white", color: "#1d4ed8", border: "none", borderRadius: 100,
              padding: "11px 24px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer",
              transition: "all 0.2s", flexShrink: 0,
            }}>
              Passer à Pro — 29,99€/mois
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const { user, login, logout } = useAuth();

  const navigate = (dest) => {
    if ((dest === "dashboard") && !user) { setPage("login"); return; }
    setPage(dest);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => { logout(); setPage("landing"); };

  const showNav = !["login", "register"].includes(page);

  return (
    <>
      <GlobalStyles />
      {showNav && (
        <Navbar onNavigate={navigate} currentPage={page} user={user} onLogout={handleLogout} />
      )}
      {page === "landing" && <LandingPage onNavigate={navigate} />}
      {page === "login" && <LoginPage onNavigate={navigate} onLogin={login} />}
      {page === "register" && <RegisterPage onNavigate={navigate} onLogin={login} />}
      {page === "dashboard" && user && <Dashboard user={user} onNavigate={navigate} onLogout={handleLogout} />}
      {page === "pricing" && (
        <div style={{ paddingTop: 64 }}>
          <PricingSection onNavigate={navigate} />
        </div>
      )}
    </>
  );
}
