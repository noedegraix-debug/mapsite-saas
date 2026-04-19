import { useState, useEffect } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --c1:#0a0a0f;--c2:#111118;--c3:#1a1a2e;
      --blue:#4f8eff;--violet:#a855f7;--cyan:#06d6a0;
      --text:#f0f0ff;--text2:#8888aa;--text3:#444466;
      --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.12);
      --glass:rgba(255,255,255,0.04);--glass2:rgba(255,255,255,0.08);
      --r:14px;--r2:20px;--r3:9999px;
    }
    html,body{min-height:100%;font-family:'Inter',sans-serif;background:var(--c1);color:var(--text);-webkit-font-smoothing:antialiased;overflow-x:hidden}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fade{from{opacity:0}to{opacity:1}}
    .up{animation:up .5s ease both}
    .fade{animation:fade .4s ease both}
    .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}.d4{animation-delay:.4s}.d5{animation-delay:.5s}
    .btn{display:inline-flex;align-items:center;gap:8px;padding:11px 22px;border-radius:var(--r3);border:none;cursor:pointer;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;transition:all .2s ease;white-space:nowrap}
    .btn-p{background:linear-gradient(135deg,#4f8eff,#a855f7);color:#fff}
    .btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(79,142,255,.4)}
    .btn-g{background:var(--glass);color:var(--text);border:1px solid var(--border2)}
    .btn-g:hover{background:var(--glass2);border-color:rgba(255,255,255,.2)}
    .btn-lg{padding:15px 32px;font-size:15px;font-weight:600}
    .card{background:var(--glass);border:1px solid var(--border);border-radius:var(--r2);transition:all .25s ease}
    .card:hover{background:var(--glass2);border-color:var(--border2);transform:translateY(-2px)}
    .inp{width:100%;padding:13px 16px;background:rgba(255,255,255,.05);border:1px solid var(--border2);border-radius:var(--r);font-family:'Inter',sans-serif;font-size:14px;color:var(--text);outline:none;transition:all .2s}
    .inp:focus{border-color:var(--blue);background:rgba(79,142,255,.08);box-shadow:0 0 0 3px rgba(79,142,255,.15)}
    .inp::placeholder{color:var(--text3)}
    .tag{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:var(--r3);font-size:12px;font-weight:600;letter-spacing:.04em}
    .tag-b{background:rgba(79,142,255,.15);color:var(--blue);border:1px solid rgba(79,142,255,.25)}
    .tag-v{background:rgba(168,85,247,.15);color:var(--violet);border:1px solid rgba(168,85,247,.25)}
    .tag-c{background:rgba(6,214,160,.15);color:var(--cyan);border:1px solid rgba(6,214,160,.25)}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
    .grad-text{background:linear-gradient(135deg,var(--blue),var(--violet));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .nav-link{font-size:13px;font-weight:500;color:var(--text2);cursor:pointer;transition:color .15s;padding:6px 0}
    .nav-link:hover{color:var(--text)}
  `}</style>
);

const Ic = ({ n, s = 18, c = "currentColor" }) => {
  const paths = {
    globe:"M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 0c-1.66 2.5-2.5 5-2.5 10s.84 7.5 2.5 10m0-20c1.66 2.5 2.5 5 2.5 10s-.84 7.5-2.5 10M2 12h20",
    zap:"M13 2L3 14h9l-1 8 10-12h-9l1-8z",check:"M20 6L9 17l-5-5",arrow:"M5 12h14M12 5l7 7-7 7",
    eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    eyeOff:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",
    map:"M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16",
    star:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    layout:"M3 3h18v18H3zM3 9h18M9 21V9",download:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
    users:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    mail:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
    lock:"M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
    logout:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
    plus:"M12 5v14M5 12h14",trash:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
    external:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",
    settings:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    sparkles:"M12 3l1.88 5.76a2 2 0 0 0 1.27 1.27L21 12l-5.85 1.97a2 2 0 0 0-1.27 1.27L12 21l-1.88-5.76a2 2 0 0 0-1.27-1.27L3 12l5.85-1.97a2 2 0 0 0 1.27-1.27L12 3z",
    loader:"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
    shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    rocket:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
    user:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  };
  return (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[n]}/></svg>);
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const login = (email, name) => setUser({ email, name, plan: "free" });
  const logout = () => setUser(null);
  return { user, login, logout };
};

const Nav = ({ nav, user, logout }) => {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 30); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:200,padding:"0 32px",background:sc?"rgba(10,10,15,.9)":"transparent",backdropFilter:sc?"blur(24px)":"none",borderBottom:sc?"1px solid var(--border)":"1px solid transparent",transition:"all .3s ease" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64 }}>
        <div onClick={() => nav("landing")} style={{ display:"flex",alignItems:"center",gap:10,cursor:"pointer" }}>
          <div style={{ width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#4f8eff,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center" }}><Ic n="globe" s={15} c="white"/></div>
          <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:17 }}>Map<span className="grad-text">Site</span></span>
        </div>
        <div style={{ display:"flex",gap:32 }}>
          {["Fonctionnalités","Pricing","Exemples"].map(l => <span key={l} className="nav-link" onClick={() => nav(l.toLowerCase())}>{l}</span>)}
        </div>
        <div style={{ display:"flex",gap:10 }}>
          {user ? (<><button className="btn btn-g" onClick={() => nav("dashboard")}>Dashboard</button><button className="btn btn-p" onClick={logout}><Ic n="logout" s={14} c="white"/> Déconnexion</button></>) : (<><button className="btn btn-g" onClick={() => nav("login")}>Connexion</button><button className="btn btn-p" onClick={() => nav("register")}>Commencer gratuitement</button></>)}
        </div>
      </div>
    </nav>
  );
};

const Pricing = ({ nav }) => {
  const [annual, setAnnual] = useState(false);
  const plans = [
    { name:"Gratuit",price:0,period:"",feats:["1 site généré","Watermark MapSite","Template standard","Partage par lien"],cta:"Commencer gratuitement",hot:false,col:"#666" },
    { name:"Pro",price:annual?24:29,period:"/mois",badge:"⭐ Recommandé",feats:["10 sites / mois","Sans watermark","Téléchargement HTML","Édition du contenu","SEO optimisé","Support prioritaire"],cta:"Démarrer Pro",hot:true,col:"#4f8eff" },
    { name:"Business",price:annual?40:49,period:"/mois",badge:"🏢 Agences",feats:["Sites illimités","Export ZIP","Édition avancée","White-label","API Access","Support 24/7"],cta:"Contacter les ventes",hot:false,col:"#a855f7" },
  ];
  return (
    <section style={{ padding:"100px 24px",position:"relative",zIndex:1 }} id="pricing">
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <span className="tag tag-c" style={{ marginBottom:20,display:"inline-flex" }}>Tarifs</span>
          <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:44,fontWeight:800,letterSpacing:"-0.035em",marginBottom:16 }}>Simple. Transparent.</h2>
          <div style={{ display:"inline-flex",background:"var(--glass)",border:"1px solid var(--border)",borderRadius:99,padding:4,marginTop:8 }}>
            {["Mensuel","Annuel −20%"].map((t,i) => (
              <button key={t} onClick={() => setAnnual(i===1)} style={{ padding:"7px 22px",borderRadius:99,border:"none",cursor:"pointer",background:annual===(i===1)?"rgba(79,142,255,.2)":"transparent",color:annual===(i===1)?"var(--blue)":"var(--text2)",fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,transition:"all .2s" }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20,alignItems:"start" }}>
          {plans.map(p => (
            <div key={p.name} style={{ padding:p.hot?36:28,borderRadius:24,background:p.hot?"linear-gradient(135deg,rgba(79,142,255,.1),rgba(168,85,247,.08))":"var(--glass)",border:p.hot?"1px solid rgba(79,142,255,.3)":"1px solid var(--border)",transform:p.hot?"scale(1.03)":"scale(1)",boxShadow:p.hot?"0 0 60px rgba(79,142,255,.1)":"none",position:"relative" }}>
              {p.badge && <div style={{ marginBottom:16 }}><span style={{ padding:"5px 14px",borderRadius:99,fontSize:12,fontWeight:700,background:p.hot?"linear-gradient(135deg,#4f8eff,#a855f7)":"rgba(168,85,247,.2)",color:p.hot?"white":p.col }}>{p.badge}</span></div>}
              <h3 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:20,fontWeight:800,marginBottom:8,color:p.col }}>{p.name}</h3>
              <div style={{ display:"flex",alignItems:"baseline",gap:4,marginBottom:28 }}>
                <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:48,fontWeight:800,letterSpacing:"-0.05em" }}>{p.price===0?"Gratuit":`${p.price}€`}</span>
                {p.period && <span style={{ color:"var(--text2)",fontSize:14 }}>{p.period}</span>}
              </div>
              <div style={{ borderTop:"1px solid var(--border)",paddingTop:20,marginBottom:24 }}>
                {p.feats.map(f => (
                  <div key={f} style={{ display:"flex",gap:10,alignItems:"center",marginBottom:11 }}>
                    <div style={{ width:18,height:18,borderRadius:"50%",background:`${p.col}20`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Ic n="check" s={10} c={p.col}/></div>
                    <span style={{ fontSize:13,color:"var(--text2)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => nav("register")} style={{ width:"100%",padding:"13px",borderRadius:99,border:"none",cursor:"pointer",background:p.hot?"linear-gradient(135deg,#4f8eff,#a855f7)":"var(--glass2)",color:"var(--text)",fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:600,transition:"all .2s" }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Landing = ({ nav }) => {
  const [url, setUrl] = useState("");
  const feats = [
    { icon:"zap",title:"30 secondes",desc:"De votre lien Google Maps à un site complet, en moins d'une minute.",col:"#4f8eff" },
    { icon:"layout",title:"Design Premium",desc:"Des templates conçus par des designers senior pour convertir.",col:"#a855f7" },
    { icon:"download",title:"Export & Deploy",desc:"Téléchargez le code ou déployez en un clic sur votre domaine.",col:"#06d6a0" },
    { icon:"shield",title:"SEO Natif",desc:"Schema.org, meta tags et Core Web Vitals optimisés dès la génération.",col:"#f59e0b" },
  ];
  const reviews = [
    { name:"Sophie M.",role:"Restauratrice · Paris",text:"Mon site a été fait en 2 minutes. Mes clients pensaient que j'avais payé une agence.",av:"SM" },
    { name:"Thomas D.",role:"Plombier · Lyon",text:"Je ne connais rien au web. 3 nouveaux clients la première semaine grâce à mon site.",av:"TD" },
    { name:"Clara L.",role:"Agence · Bordeaux",text:"On l'utilise pour nos clients TPE. Gain de temps énorme, qualité au rendez-vous.",av:"CL" },
  ];
  return (
    <div style={{ paddingTop:64,background:"var(--c1)" }}>
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden" }}>
        <div style={{ position:"absolute",width:800,height:800,borderRadius:"50%",background:"radial-gradient(circle,rgba(79,142,255,.06) 0%,transparent 70%)",top:-200,right:-200 }}/>
        <div style={{ position:"absolute",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,.05) 0%,transparent 70%)",bottom:100,left:-100 }}/>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)",backgroundSize:"80px 80px" }}/>
      </div>

      <section style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 24px",position:"relative",zIndex:1 }}>
        <div style={{ maxWidth:760,width:"100%",textAlign:"center" }}>
          <div className="up" style={{ marginBottom:28 }}><span className="tag tag-b"><Ic n="sparkles" s={11} c="#4f8eff"/> Nouveau · Génération IA en temps réel</span></div>
          <h1 className="up d1" style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"clamp(44px,8vw,82px)",lineHeight:1.05,letterSpacing:"-0.04em",marginBottom:28 }}>
            Votre Google Maps<br/><span className="grad-text">devient un site</span><br/>en 30 secondes
          </h1>
          <p className="up d2" style={{ fontSize:18,color:"var(--text2)",lineHeight:1.7,maxWidth:520,margin:"0 auto 52px",fontWeight:400 }}>
            Collez votre fiche Google Maps. Notre IA génère un site web professionnel complet, prêt à convertir vos visiteurs.
          </p>
          <div className="up d3" style={{ display:"flex",gap:10,maxWidth:600,margin:"0 auto 16px",background:"rgba(255,255,255,.05)",border:"1px solid var(--border2)",borderRadius:16,padding:8,boxShadow:"0 0 0 1px rgba(79,142,255,.1),0 32px 64px rgba(0,0,0,.4)" }}>
            <div style={{ flex:1,display:"flex",alignItems:"center",gap:10,padding:"4px 12px" }}>
              <Ic n="map" s={18} c="#4444aa"/>
              <input className="inp" placeholder="Collez votre lien Google Maps..." value={url} onChange={e => setUrl(e.target.value)} style={{ background:"transparent",border:"none",boxShadow:"none",fontSize:14,padding:"8px 0" }}/>
            </div>
            <button className="btn btn-p btn-lg" onClick={() => nav("register")} style={{ borderRadius:10 }}>Générer mon site <Ic n="arrow" s={16} c="white"/></button>
          </div>
          <p className="up d4" style={{ fontSize:12,color:"var(--text3)" }}>Gratuit · Aucune CB · 30 secondes</p>
          <div className="up d5" style={{ display:"flex",justifyContent:"center",gap:56,marginTop:72,paddingTop:56,borderTop:"1px solid var(--border)",flexWrap:"wrap" }}>
            {[["4 200+","Sites générés"],["98%","Satisfaction"],["30s","Temps moyen"],["150+","Secteurs"]].map(([v,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:32,fontWeight:800,letterSpacing:"-0.04em" }} className="grad-text">{v}</div>
                <div style={{ fontSize:13,color:"var(--text3)",marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:"120px 24px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div style={{ textAlign:"center",marginBottom:72 }}>
          <span className="tag tag-v" style={{ marginBottom:20,display:"inline-flex" }}>Fonctionnalités</span>
          <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:44,fontWeight:800,letterSpacing:"-0.035em",marginBottom:16 }}>Tout ce dont vous avez besoin</h2>
          <p style={{ fontSize:16,color:"var(--text2)",maxWidth:440,margin:"0 auto" }}>De la génération à la mise en ligne, MapSite gère tout.</p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20 }}>
          {feats.map(f => (
            <div key={f.title} className="card" style={{ padding:32 }}>
              <div style={{ width:46,height:46,borderRadius:12,background:`${f.col}18`,border:`1px solid ${f.col}30`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20 }}><Ic n={f.icon} s={20} c={f.col}/></div>
              <h3 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:18,fontWeight:700,marginBottom:10 }}>{f.title}</h3>
              <p style={{ fontSize:14,color:"var(--text2)",lineHeight:1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:"100px 24px",position:"relative",zIndex:1 }}>
        <div style={{ maxWidth:900,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:64 }}>
            <span className="tag tag-c" style={{ marginBottom:20,display:"inline-flex" }}>Comment ça marche</span>
            <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:44,fontWeight:800,letterSpacing:"-0.035em" }}>3 étapes, c'est tout</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }}>
            {[{n:"01",t:"Collez votre lien",d:"Copiez l'URL de votre fiche Google Maps et collez-la dans MapSite.",col:"#4f8eff"},{n:"02",t:"L'IA génère",d:"Notre IA analyse vos données et crée un site complet en quelques secondes.",col:"#a855f7"},{n:"03",t:"Publiez",d:"Téléchargez ou déployez en un clic. Votre site est en ligne.",col:"#06d6a0"}].map(s => (
              <div key={s.n} style={{ padding:32,borderRadius:20,background:`linear-gradient(135deg,${s.col}08,${s.col}04)`,border:`1px solid ${s.col}20`,textAlign:"center" }}>
                <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:48,fontWeight:800,color:s.col,opacity:.3,letterSpacing:"-0.06em",marginBottom:16 }}>{s.n}</div>
                <h3 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:18,fontWeight:700,marginBottom:10,color:s.col }}>{s.t}</h3>
                <p style={{ fontSize:14,color:"var(--text2)",lineHeight:1.7 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:"100px 24px",position:"relative",zIndex:1 }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:64 }}>
            <span className="tag tag-b" style={{ marginBottom:20,display:"inline-flex" }}>Témoignages</span>
            <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:44,fontWeight:800,letterSpacing:"-0.035em" }}>Ils nous font confiance</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20 }}>
            {reviews.map(r => (
              <div key={r.name} className="card" style={{ padding:28 }}>
                <div style={{ display:"flex",gap:3,marginBottom:16 }}>{[...Array(5)].map((_,i) => <Ic key={i} n="star" s={13} c="#f59e0b"/>)}</div>
                <p style={{ fontSize:15,color:"var(--text)",lineHeight:1.75,marginBottom:20,fontStyle:"italic",opacity:.85 }}>"{r.text}"</p>
                <div style={{ display:"flex",alignItems:"center",gap:12,borderTop:"1px solid var(--border)",paddingTop:16 }}>
                  <div style={{ width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,#4f8eff,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:12,fontWeight:700 }}>{r.av}</div>
                  <div><div style={{ fontSize:14,fontWeight:600 }}>{r.name}</div><div style={{ fontSize:12,color:"var(--text3)" }}>{r.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pricing nav={nav}/>

      <section style={{ margin:"0 24px 80px",borderRadius:28,padding:"100px 40px",textAlign:"center",background:"linear-gradient(135deg,#0d1b3e,#1a0a2e)",border:"1px solid rgba(79,142,255,.2)",position:"relative",overflow:"hidden",zIndex:1 }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(79,142,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(79,142,255,.03) 1px,transparent 1px)",backgroundSize:"40px 40px" }}/>
        <div style={{ position:"absolute",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(79,142,255,.15) 0%,transparent 70%)",top:-100,left:"50%",transform:"translateX(-50%)" }}/>
        <div style={{ position:"relative",zIndex:1 }}>
          <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:52,fontWeight:800,letterSpacing:"-0.04em",marginBottom:20 }}>Prêt à lancer<br/><span className="grad-text">votre site ?</span></h2>
          <p style={{ fontSize:18,color:"var(--text2)",marginBottom:48 }}>Rejoignez 4 200+ professionnels qui font confiance à MapSite.</p>
          <button className="btn btn-p btn-lg" onClick={() => nav("register")} style={{ fontSize:16,padding:"16px 40px" }}>Créer mon site gratuitement <Ic n="arrow" s={18} c="white"/></button>
        </div>
      </section>

      <footer style={{ borderTop:"1px solid var(--border)",padding:"40px 32px",position:"relative",zIndex:1 }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#4f8eff,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center" }}><Ic n="globe" s={13} c="white"/></div>
            <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:15 }}>MapSite</span>
          </div>
          <div style={{ display:"flex",gap:28 }}>{["Conditions","Confidentialité","Contact"].map(l => <span key={l} style={{ fontSize:13,color:"var(--text3)",cursor:"pointer" }}>{l}</span>)}</div>
          <p style={{ fontSize:12,color:"var(--text3)" }}>© 2025 MapSite. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

const Login = ({ nav, login }) => {
  const [email,setEmail]=useState(""); const [pw,setPw]=useState(""); const [show,setShow]=useState(false); const [loading,setLoading]=useState(false); const [err,setErr]=useState("");
  const submit = async () => {
    if (!email||!pw){setErr("Remplissez tous les champs.");return;} if (!email.includes("@")){setErr("Email invalide.");return;}
    setErr("");setLoading(true); await new Promise(r=>setTimeout(r,1100)); setLoading(false); login(email,email.split("@")[0]); nav("dashboard");
  };
  return (
    <div style={{ minHeight:"100vh",display:"flex",background:"var(--c1)" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"space-between",padding:56,position:"relative",overflow:"hidden",background:"linear-gradient(145deg,#060612,#0d1a3a,#1a0a2e)" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(79,142,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(79,142,255,.04) 1px,transparent 1px)",backgroundSize:"50px 50px" }}/>
        <div style={{ position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(79,142,255,.12) 0%,transparent 70%)",top:-100,right:-100 }}/>
        <div style={{ position:"relative",zIndex:1,display:"flex",alignItems:"center",gap:10,cursor:"pointer" }} onClick={() => nav("landing")}>
          <div style={{ width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#4f8eff,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center" }}><Ic n="globe" s={15} c="white"/></div>
          <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:17 }}>MapSite</span>
        </div>
        <div style={{ position:"relative",zIndex:1 }}>
          <div style={{ background:"rgba(255,255,255,.04)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:28,marginBottom:24 }}>
            <div style={{ display:"flex",gap:3,marginBottom:14 }}>{[...Array(5)].map((_,i) => <Ic key={i} n="star" s={13} c="#f59e0b"/>)}</div>
            <p style={{ color:"rgba(255,255,255,.8)",fontSize:15,lineHeight:1.75,marginBottom:18 }}>"En 2 minutes j'avais un site professionnel. Mes appels ont triplé en une semaine."</p>
            <div style={{ display:"flex",alignItems:"center",gap:12 }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#f59e0b,#ef4444)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:12,fontWeight:700 }}>JM</div>
              <div><div style={{ color:"white",fontSize:13,fontWeight:600 }}>Jean-Michel R.</div><div style={{ color:"rgba(255,255,255,.4)",fontSize:12 }}>Électricien · Toulouse</div></div>
            </div>
          </div>
          <div style={{ display:"flex",gap:12 }}>
            {[["4 200+","Sites"],["30s","Génération"],["98%","Satisfaits"]].map(([v,l]) => (
              <div key={l} style={{ flex:1,background:"rgba(255,255,255,.04)",borderRadius:12,padding:14,border:"1px solid rgba(255,255,255,.06)",textAlign:"center" }}>
                <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:22,fontWeight:800,color:"var(--blue)" }}>{v}</div>
                <div style={{ fontSize:11,color:"var(--text3)",marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width:480,flexShrink:0,display:"flex",flexDirection:"column",justifyContent:"center",padding:56,background:"var(--c2)",borderLeft:"1px solid var(--border)" }}>
        <div className="fade">
          <h1 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:32,fontWeight:800,letterSpacing:"-0.03em",marginBottom:8 }}>Bon retour 👋</h1>
          <p style={{ color:"var(--text2)",fontSize:14,marginBottom:36 }}>Connectez-vous à votre compte MapSite.</p>
          {err && <div style={{ background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.25)",borderRadius:10,padding:"11px 14px",marginBottom:20,fontSize:13,color:"#f87171" }}>⚠ {err}</div>}
          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
            <div>
              <label style={{ fontSize:12,fontWeight:600,color:"var(--text2)",display:"block",marginBottom:8,letterSpacing:".04em",textTransform:"uppercase" }}>Email</label>
              <div style={{ position:"relative" }}><div style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)" }}><Ic n="mail" s={15} c="#4444aa"/></div><input className="inp" type="email" placeholder="vous@exemple.com" value={email} onChange={e=>setEmail(e.target.value)} style={{ paddingLeft:42 }} onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
            </div>
            <div>
              <label style={{ fontSize:12,fontWeight:600,color:"var(--text2)",display:"flex",justifyContent:"space-between",marginBottom:8,letterSpacing:".04em",textTransform:"uppercase" }}>Mot de passe <span style={{ color:"var(--blue)",cursor:"pointer",fontWeight:500,textTransform:"none",letterSpacing:0 }}>Oublié ?</span></label>
              <div style={{ position:"relative" }}><div style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)" }}><Ic n="lock" s={15} c="#4444aa"/></div><input className="inp" type={show?"text":"password"} placeholder="••••••••" value={pw} onChange={e=>setPw(e.target.value)} style={{ paddingLeft:42,paddingRight:46 }} onKeyDown={e=>e.key==="Enter"&&submit()}/><button onClick={() => setShow(!show)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer" }}><Ic n={show?"eyeOff":"eye"} s={15} c="#4444aa"/></button></div>
            </div>
            <button className="btn btn-p" onClick={submit} disabled={loading} style={{ width:"100%",justifyContent:"center",padding:"14px",fontSize:15,borderRadius:12,marginTop:4 }}>
              {loading?<><Ic n="loader" s={16} c="white"/> Connexion...</>:<>Se connecter <Ic n="arrow" s={16} c="white"/></>}
            </button>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:12,margin:"24px 0" }}><div style={{ flex:1,height:1,background:"var(--border)" }}/><span style={{ fontSize:12,color:"var(--text3)" }}>ou</span><div style={{ flex:1,height:1,background:"var(--border)" }}/></div>
          <button style={{ width:"100%",padding:"12px",borderRadius:12,border:"1px solid var(--border2)",background:"var(--glass)",cursor:"pointer",fontSize:14,fontWeight:500,color:"var(--text)",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontFamily:"'Inter',sans-serif",transition:"all .2s" }}>
            <svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continuer avec Google
          </button>
          <p style={{ textAlign:"center",fontSize:13,color:"var(--text2)",marginTop:28 }}>Pas de compte ? <span onClick={() => nav("register")} style={{ color:"var(--blue)",fontWeight:600,cursor:"pointer" }}>S'inscrire gratuitement</span></p>
        </div>
      </div>
    </div>
  );
};

const Register = ({ nav, login }) => {
  const [step,setStep]=useState(1); const [form,setForm]=useState({name:"",email:"",pw:""}); const [show,setShow]=useState(false); const [loading,setLoading]=useState(false); const [errs,setErrs]=useState({});
  const validate = () => { const e={}; if(step===1){if(!form.name.trim())e.name="Requis";if(!form.email.includes("@"))e.email="Email invalide";} if(step===2&&form.pw.length<8)e.pw="8 caractères minimum"; setErrs(e); return !Object.keys(e).length; };
  const next = async () => { if(!validate())return; if(step<2){setStep(2);return;} setLoading(true); await new Promise(r=>setTimeout(r,1300)); setLoading(false); login(form.email,form.name); nav("dashboard"); };
  const str = form.pw.length===0?0:form.pw.length<6?1:form.pw.length<10?2:3;
  const strCol=["var(--border)","#ef4444","#f59e0b","#06d6a0"][str];
  return (
    <div style={{ minHeight:"100vh",display:"flex",background:"var(--c1)" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"space-between",padding:56,position:"relative",overflow:"hidden",background:"linear-gradient(145deg,#060612,#0a1628,#1a0a2e)" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(168,85,247,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,.04) 1px,transparent 1px)",backgroundSize:"50px 50px" }}/>
        <div style={{ position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,.12) 0%,transparent 70%)",top:-100,left:"50%",transform:"translateX(-50%)" }}/>
        <div style={{ position:"relative",zIndex:1,display:"flex",alignItems:"center",gap:10,cursor:"pointer" }} onClick={() => nav("landing")}>
          <div style={{ width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#4f8eff,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center" }}><Ic n="globe" s={15} c="white"/></div>
          <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:17 }}>MapSite</span>
        </div>
        <div style={{ position:"relative",zIndex:1 }}>
          <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:36,fontWeight:800,letterSpacing:"-0.03em",marginBottom:16 }}>Votre présence en ligne<br/><span className="grad-text">commence ici.</span></h2>
          <p style={{ color:"var(--text2)",fontSize:15,lineHeight:1.7,marginBottom:40 }}>Rejoignez des milliers de professionnels qui génèrent des sites en quelques secondes.</p>
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            {[["zap","Génération en 30 secondes"],["shield","Hébergement sécurisé inclus"],["rocket","Prêt à vendre immédiatement"]].map(([ic,t]) => (
              <div key={t} style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div style={{ width:32,height:32,borderRadius:9,background:"rgba(168,85,247,.15)",border:"1px solid rgba(168,85,247,.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Ic n={ic} s={15} c="#a855f7"/></div>
                <span style={{ fontSize:14,color:"var(--text2)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width:480,flexShrink:0,display:"flex",flexDirection:"column",justifyContent:"center",padding:56,background:"var(--c2)",borderLeft:"1px solid var(--border)" }}>
        <div className="fade">
          <div style={{ display:"flex",gap:6,marginBottom:40 }}>{[1,2].map(s => <div key={s} style={{ flex:1,height:2,borderRadius:99,background:s<=step?"linear-gradient(90deg,#4f8eff,#a855f7)":"var(--border)",transition:"background .3s" }}/>)}</div>
          <h1 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:28,fontWeight:800,letterSpacing:"-0.03em",marginBottom:8 }}>{step===1?"Créer votre compte":"Sécurisez votre compte"}</h1>
          <p style={{ color:"var(--text2)",fontSize:14,marginBottom:32 }}>{step===1?"Rapide et gratuit.":"Choisissez un mot de passe fort."}</p>
          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
            {step===1?(<>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:"var(--text2)",display:"block",marginBottom:8,letterSpacing:".04em",textTransform:"uppercase" }}>Nom complet</label>
                <div style={{ position:"relative" }}><div style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)" }}><Ic n="user" s={15} c="#4444aa"/></div><input className="inp" placeholder="Marie Dupont" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{ paddingLeft:42 }}/></div>
                {errs.name&&<p style={{ fontSize:12,color:"#f87171",marginTop:5 }}>⚠ {errs.name}</p>}
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:"var(--text2)",display:"block",marginBottom:8,letterSpacing:".04em",textTransform:"uppercase" }}>Email</label>
                <div style={{ position:"relative" }}><div style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)" }}><Ic n="mail" s={15} c="#4444aa"/></div><input className="inp" type="email" placeholder="vous@exemple.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{ paddingLeft:42 }}/></div>
                {errs.email&&<p style={{ fontSize:12,color:"#f87171",marginTop:5 }}>⚠ {errs.email}</p>}
              </div>
            </>):(<div>
              <label style={{ fontSize:12,fontWeight:600,color:"var(--text2)",display:"block",marginBottom:8,letterSpacing:".04em",textTransform:"uppercase" }}>Mot de passe</label>
              <div style={{ position:"relative" }}><div style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)" }}><Ic n="lock" s={15} c="#4444aa"/></div><input className="inp" type={show?"text":"password"} placeholder="••••••••" value={form.pw} onChange={e=>setForm({...form,pw:e.target.value})} style={{ paddingLeft:42,paddingRight:46 }} onKeyDown={e=>e.key==="Enter"&&next()}/><button onClick={()=>setShow(!show)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer" }}><Ic n={show?"eyeOff":"eye"} s={15} c="#4444aa"/></button></div>
              {form.pw.length>0&&(<div style={{ marginTop:10 }}><div style={{ display:"flex",gap:4,marginBottom:5 }}>{[1,2,3].map(l=><div key={l} style={{ flex:1,height:2,borderRadius:99,background:l<=str?strCol:"var(--border)",transition:"all .3s" }}/>)}</div><span style={{ fontSize:11,color:strCol }}>{["","Faible","Moyen","Fort"][str]}</span></div>)}
              {errs.pw&&<p style={{ fontSize:12,color:"#f87171",marginTop:5 }}>⚠ {errs.pw}</p>}
            </div>)}
            <button className="btn btn-p" onClick={next} disabled={loading} style={{ width:"100%",justifyContent:"center",padding:"14px",fontSize:15,borderRadius:12,marginTop:4 }}>
              {loading?<><Ic n="loader" s={16} c="white"/> Création...</>:step===1?<>Continuer <Ic n="arrow" s={16} c="white"/></>:<>Créer mon compte <Ic n="rocket" s={16} c="white"/></>}
            </button>
          </div>
          {step===2&&<button onClick={()=>setStep(1)} style={{ background:"none",border:"none",color:"var(--text2)",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:4,marginTop:14 }}>← Retour</button>}
          <p style={{ textAlign:"center",fontSize:13,color:"var(--text2)",marginTop:28 }}>Déjà un compte ? <span onClick={()=>nav("login")} style={{ color:"var(--blue)",fontWeight:600,cursor:"pointer" }}>Se connecter</span></p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ user, nav, logout }) => {
  const [url,setUrl]=useState(""); const [gen,setGen]=useState(false); const [step,setStep]=useState(0); const [result,setResult]=useState(null);
  const [sites]=useState([{id:1,name:"Le Bistrot Parisien",type:"Restaurant",date:"12 Jan",views:342},{id:2,name:"Plomberie Durand",type:"Artisan",date:"8 Jan",views:189}]);
  const steps=["Analyse du lien Maps...","Extraction des données...","Génération IA...","Application du design...","Optimisation SEO...","Site prêt ! 🎉"];
  const generate = async () => { if(!url.trim())return; setGen(true);setStep(0);setResult(null); for(let i=0;i<steps.length;i++){setStep(i);await new Promise(r=>setTimeout(r,600));} setGen(false); setResult({name:"La Belle Époque",type:"Restaurant français",address:"15 Rue de la Paix, Paris 75001",rating:4.7,reviews:284}); };
  return (
    <div style={{ display:"flex",minHeight:"100vh",background:"var(--c1)" }}>
      <aside style={{ width:220,flexShrink:0,background:"var(--c2)",borderRight:"1px solid var(--border)",padding:"24px 14px",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh" }}>
        <div style={{ display:"flex",alignItems:"center",gap:9,padding:"0 8px",marginBottom:32,cursor:"pointer" }} onClick={() => nav("landing")}>
          <div style={{ width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#4f8eff,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center" }}><Ic n="globe" s={14} c="white"/></div>
          <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:16 }}>MapSite</span>
        </div>
        <nav style={{ flex:1,display:"flex",flexDirection:"column",gap:3 }}>
          {[["layout","Dashboard",true],["globe","Mes sites",false],["settings","Paramètres",false]].map(([ic,lb,active]) => (
            <button key={lb} style={{ display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:10,border:"none",cursor:"pointer",width:"100%",background:active?"rgba(79,142,255,.12)":"transparent",color:active?"var(--blue)":"var(--text2)",fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:active?600:400,transition:"all .15s" }}>
              <Ic n={ic} s={16} c={active?"#4f8eff":"#4444aa"}/> {lb}
            </button>
          ))}
        </nav>
        <div style={{ borderTop:"1px solid var(--border)",paddingTop:16 }}>
          <div style={{ display:"flex",alignItems:"center",gap:9,padding:"8px 12px",marginBottom:6 }}>
            <div style={{ width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#4f8eff,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:11,fontWeight:700,flexShrink:0 }}>{user.name?.[0]?.toUpperCase()||"U"}</div>
            <div style={{ minWidth:0 }}><div style={{ fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{user.name}</div><span className="tag tag-b" style={{ fontSize:10,padding:"2px 8px" }}>Gratuit</span></div>
          </div>
          <button onClick={logout} style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 12px",width:"100%",borderRadius:9,border:"none",background:"none",cursor:"pointer",color:"var(--text2)",fontFamily:"'Inter',sans-serif",fontSize:12 }}><Ic n="logout" s={14} c="#4444aa"/> Déconnexion</button>
        </div>
      </aside>
      <main style={{ flex:1,padding:"40px 48px",overflowY:"auto" }}>
        <div style={{ maxWidth:860,margin:"0 auto" }}>
          <div style={{ marginBottom:40 }}>
            <h1 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:28,fontWeight:800,letterSpacing:"-0.03em",marginBottom:6 }}>Bonjour, {user.name?.split(" ")[0]} 👋</h1>
            <p style={{ color:"var(--text2)",fontSize:14 }}>Générez un site professionnel depuis votre fiche Google Maps.</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:32 }}>
            {[["Sites créés",sites.length,"globe","#4f8eff"],["Restants","0/1","zap","#a855f7"],["Vues totales","531","users","#06d6a0"]].map(([l,v,ic,col]) => (
              <div key={l} className="card" style={{ padding:20 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div><p style={{ fontSize:11,color:"var(--text3)",marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:".04em" }}>{l}</p><p style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:28,fontWeight:800,letterSpacing:"-0.04em" }}>{v}</p></div>
                  <div style={{ width:38,height:38,borderRadius:10,background:`${col}18`,border:`1px solid ${col}25`,display:"flex",alignItems:"center",justifyContent:"center" }}><Ic n={ic} s={17} c={col}/></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"var(--c2)",borderRadius:20,border:"1px solid var(--border)",padding:32,marginBottom:28 }}>
            <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:18,fontWeight:700,marginBottom:6 }}>Générer un nouveau site</h2>
            <p style={{ fontSize:13,color:"var(--text2)",marginBottom:24 }}>Collez votre lien Google Maps pour démarrer.</p>
            <div style={{ display:"flex",gap:10,padding:8,background:"var(--c1)",border:`1px solid ${url?"var(--blue)":"var(--border)"}`,borderRadius:14,transition:"all .2s",boxShadow:url?"0 0 0 3px rgba(79,142,255,.1)":"none" }}>
              <div style={{ flex:1,display:"flex",alignItems:"center",gap:10,padding:"4px 12px",background:"rgba(255,255,255,.03)",borderRadius:9 }}>
                <Ic n="map" s={18} c={gen?"#4f8eff":"#4444aa"}/>
                <input className="inp" placeholder="https://maps.google.com/maps?..." value={url} onChange={e=>setUrl(e.target.value)} disabled={gen} style={{ background:"transparent",border:"none",boxShadow:"none",padding:"10px 0",fontSize:14 }}/>
              </div>
              <button className="btn btn-p" onClick={generate} disabled={!url.trim()||gen} style={{ opacity:!url.trim()?.4:1,borderRadius:9,padding:"12px 20px" }}>
                {gen?<><Ic n="loader" s={15} c="white"/> Génération...</>:<><Ic n="sparkles" s={15} c="white"/> Générer</>}
              </button>
            </div>
            {gen&&(<div style={{ marginTop:24 }}>
              <div style={{ height:2,background:"var(--border)",borderRadius:99,overflow:"hidden",marginBottom:16 }}><div style={{ height:"100%",borderRadius:99,background:"linear-gradient(90deg,#4f8eff,#a855f7)",width:`${((step+1)/steps.length)*100}%`,transition:"width .6s ease" }}/></div>
              {steps.map((s,i) => (<div key={s} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8,opacity:i<=step?1:.25,transition:"opacity .3s" }}><div style={{ width:16,height:16,borderRadius:"50%",flexShrink:0,background:i<step?"#06d6a0":i===step?"var(--blue)":"var(--border)",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .3s" }}>{i<step&&<Ic n="check" s={9} c="white"/>}</div><span style={{ fontSize:12,color:i===step?"var(--text)":"var(--text2)",fontWeight:i===step?500:400 }}>{s}</span></div>))}
            </div>)}
            {result&&!gen&&(<div style={{ marginTop:24,padding:20,background:"rgba(6,214,160,.06)",border:"1px solid rgba(6,214,160,.2)",borderRadius:14 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16 }}>
                <div><div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}><h3 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:18,fontWeight:800 }}>{result.name}</h3><span className="tag tag-c" style={{ fontSize:11 }}>✓ Généré</span></div><p style={{ fontSize:12,color:"var(--text2)" }}>{result.type} · {result.address}</p></div>
                <div style={{ display:"flex",gap:2 }}>{[...Array(5)].map((_,i)=><Ic key={i} n="star" s={13} c={i<4?"#f59e0b":"#333"}/>)}<span style={{ fontSize:11,color:"var(--text3)",marginLeft:4 }}>{result.rating}</span></div>
              </div>
              <div style={{ display:"flex",gap:10 }}>
                <button className="btn btn-p" style={{ fontSize:13,padding:"9px 18px" }}><Ic n="external" s={14} c="white"/> Voir le site</button>
                <button className="btn btn-g" style={{ fontSize:13,padding:"9px 18px" }}><Ic n="download" s={14} c="var(--text)"/> Télécharger</button>
              </div>
            </div>)}
          </div>
          <div style={{ marginBottom:28 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
              <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:17,fontWeight:700 }}>Mes sites</h2>
              <button className="btn btn-p" style={{ fontSize:12,padding:"7px 14px" }}><Ic n="plus" s={14} c="white"/> Nouveau</button>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {sites.map(s => (<div key={s.id} className="card" style={{ padding:18,display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ width:40,height:40,borderRadius:10,background:"rgba(79,142,255,.1)",border:"1px solid rgba(79,142,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Ic n="globe" s={18} c="#4f8eff"/></div>
                <div style={{ flex:1,minWidth:0 }}><div style={{ fontSize:14,fontWeight:600,marginBottom:2 }}>{s.name}</div><div style={{ fontSize:12,color:"var(--text3)" }}>{s.type} · {s.date} · {s.views} vues</div></div>
                <span className="tag tag-c" style={{ fontSize:11 }}>● En ligne</span>
                <div style={{ display:"flex",gap:8 }}><button className="btn btn-g" style={{ fontSize:12,padding:"6px 12px" }}>Éditer</button><button style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text3)",padding:"6px 8px",borderRadius:8 }}><Ic n="trash" s={14} c="#4444aa"/></button></div>
              </div>))}
            </div>
          </div>
          <div style={{ padding:28,borderRadius:20,background:"linear-gradient(135deg,#0d1b3e,#1a0a2e)",border:"1px solid rgba(79,142,255,.2)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20 }}>
            <div><div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}><Ic n="rocket" s={16} c="#f59e0b"/><span style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:16,fontWeight:700 }}>Passez à MapSite Pro</span></div><p style={{ fontSize:13,color:"var(--text2)" }}>10 sites/mois · Sans watermark · Export HTML</p></div>
            <button className="btn btn-p" style={{ padding:"12px 24px",fontSize:14 }}>Passer à Pro — 29,99€/mois</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  const [page,setPage]=useState("landing");
  const {user,login,logout}=useAuth();
  const nav=(dest)=>{ if(dest==="dashboard"&&!user){setPage("login");return;} setPage(dest); window.scrollTo({top:0,behavior:"smooth"}); };
  const handleLogout=()=>{ logout(); setPage("landing"); };
  const showNav=!["login","register"].includes(page);
  return (<><G/>{showNav&&<Nav nav={nav} user={user} logout={handleLogout}/>}{page==="landing"&&<Landing nav={nav}/>}{page==="login"&&<Login nav={nav} login={login}/>}{page==="register"&&<Register nav={nav} login={login}/>}{page==="dashboard"&&user&&<Dashboard user={user} nav={nav} logout={handleLogout}/>}{page==="pricing"&&<div style={{paddingTop:64}}><Pricing nav={nav}/></div>}</>);
}
