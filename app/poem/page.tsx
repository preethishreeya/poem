"use client";

import { useState } from "react";

const MOODS = ["melancholic", "joyful", "serene", "longing", "electric", "tender"];

// Deterministic star positions — no randomness so it renders consistently
const STARS = [
  [120,45,1.2,0.8],[230,30,0.8,0.6],[340,60,1.0,0.7],[450,25,1.5,0.9],
  [560,75,0.7,0.5],[680,20,1.2,0.8],[790,55,0.9,0.6],[900,35,1.4,0.75],
  [1020,65,0.8,0.55],[1130,30,1.1,0.7],[1250,50,1.3,0.8],[1370,20,0.9,0.65],
  [80,130,0.7,0.5],[200,110,1.0,0.65],[370,150,0.8,0.55],[480,100,1.2,0.75],
  [590,140,0.6,0.45],[700,90,1.0,0.7],[820,120,0.8,0.55],[960,105,1.3,0.8],
  [1080,145,0.7,0.5],[1180,90,1.1,0.7],[1310,125,0.9,0.6],[1410,85,1.0,0.65],
  [160,210,0.6,0.4],[280,195,1.1,0.7],[420,220,0.8,0.5],[520,180,0.7,0.55],
  [640,230,1.0,0.65],[880,215,1.2,0.7],[1000,185,0.9,0.6],[1100,225,0.7,0.5],
  [1220,195,1.0,0.65],[1350,210,0.8,0.55],[100,295,0.7,0.45],[250,310,1.0,0.6],
  [400,275,0.6,0.4],[550,300,0.8,0.55],[870,295,0.7,0.45],[1020,280,0.9,0.6],
  [1150,305,0.6,0.4],[1320,290,1.0,0.6],[180,375,0.5,0.35],[350,358,0.8,0.5],
  [500,392,0.6,0.4],[1050,372,0.6,0.4],[1240,358,0.8,0.5],[1420,385,0.5,0.35],
  [760,170,0.5,0.4],[1430,155,0.7,0.45],[50,340,0.6,0.38],[1390,330,0.6,0.38],
] as const;

function HallBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sky */}
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04060c" />
          <stop offset="40%" stopColor="#08101a" />
          <stop offset="70%" stopColor="#0c1818" />
          <stop offset="100%" stopColor="#091410" />
        </linearGradient>

        {/* Column surface — sage-cream luminous glow */}
        <linearGradient id="colA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8beb4" stopOpacity="0.3" />
          <stop offset="15%" stopColor="#c0d4ca" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#cce0d6" stopOpacity="0.92" />
          <stop offset="85%" stopColor="#b8cec4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#a0b8ae" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="colB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8beb4" stopOpacity="0.2" />
          <stop offset="20%" stopColor="#b8ccC2" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#c4d8ce" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#b0c4ba" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#98b0a6" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="colC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#98b0a6" stopOpacity="0.1" />
          <stop offset="25%" stopColor="#a8bcb2" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#b4c8be" stopOpacity="0.65" />
          <stop offset="75%" stopColor="#a4b8ae" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8ca0a6" stopOpacity="0.1" />
        </linearGradient>

        {/* Lantern glow */}
        <radialGradient id="lg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8ecc0" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#f0d898" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e8c860" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4e8b8" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#ecd490" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e4c058" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lg3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0e4b0" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#e8d088" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#e0bc50" stopOpacity="0" />
        </radialGradient>

        {/* Arch ambient glow */}
        <radialGradient id="archGlow" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#c8b880" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#c0a870" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#b89860" stopOpacity="0" />
        </radialGradient>

        {/* Floor */}
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#182820" stopOpacity="1" />
          <stop offset="100%" stopColor="#080e0a" stopOpacity="1" />
        </linearGradient>

        {/* Floor center reflection pool */}
        <radialGradient id="floorPool" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#2a3e32" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0e1810" stopOpacity="1" />
        </radialGradient>

        {/* Column base glow on floor */}
        <linearGradient id="colReflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8cec4" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#b8cec4" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── BASE SKY ── */}
      <rect width="1440" height="900" fill="url(#sky)" />

      {/* ── STARS ── */}
      <g>
        {STARS.map(([x, y, r, o], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#f0ecd8" fillOpacity={o} />
        ))}
        {/* A handful of larger, softer stars */}
        <circle cx={310} cy={48} r={2} fill="#f8f4e8" fillOpacity={0.5} />
        <circle cx={750} cy={38} r={2.2} fill="#f8f4e8" fillOpacity={0.55} />
        <circle cx={1100} cy={52} r={1.8} fill="#f8f4e8" fillOpacity={0.5} />
        <circle cx={490} cy={160} r={1.8} fill="#f8f4e8" fillOpacity={0.45} />
        <circle cx={950} cy={155} r={2} fill="#f8f4e8" fillOpacity={0.48} />
      </g>

      {/* ── ARCH AMBIENT GLOW ── */}
      <ellipse cx="720" cy="460" rx="380" ry="440" fill="url(#archGlow)" />

      {/* ── FLOOR ── */}
      <rect x="0" y="730" width="1440" height="170" fill="url(#floor)" />
      <rect x="200" y="730" width="1040" height="170" fill="url(#floorPool)" />
      {/* Floor horizon line */}
      <line x1="0" y1="730" x2="1440" y2="730" stroke="#304838" strokeOpacity="0.35" strokeWidth="0.8" />

      {/* ── LEFT COLUMNS ── */}
      {/* Column A — foreground left */}
      <rect x="38" y="68" width="62" height="662" rx="5" fill="url(#colA)" />
      {/* scroll strip on col A */}
      <rect x="50" y="140" width="38" height="480" rx="2" fill="#d4e8dc" fillOpacity="0.12" />
      {/* Column B */}
      <rect x="152" y="100" width="52" height="630" rx="4" fill="url(#colB)" />
      <rect x="162" y="170" width="32" height="430" rx="2" fill="#d0e4d8" fillOpacity="0.1" />
      {/* Column C — receding */}
      <rect x="252" y="135" width="42" height="595" rx="3" fill="url(#colC)" />

      {/* ── RIGHT COLUMNS (mirrored) ── */}
      {/* Column A */}
      <rect x="1340" y="68" width="62" height="662" rx="5" fill="url(#colA)" />
      <rect x="1352" y="140" width="38" height="480" rx="2" fill="#d4e8dc" fillOpacity="0.12" />
      {/* Column B */}
      <rect x="1236" y="100" width="52" height="630" rx="4" fill="url(#colB)" />
      <rect x="1246" y="170" width="32" height="430" rx="2" fill="#d0e4d8" fillOpacity="0.1" />
      {/* Column C */}
      <rect x="1146" y="135" width="42" height="595" rx="3" fill="url(#colC)" />

      {/* ── COLUMN FLOOR REFLECTIONS ── */}
      <rect x="38" y="730" width="62" height="110" rx="3" fill="url(#colReflect)" />
      <rect x="152" y="730" width="52" height="90" rx="3" fill="url(#colReflect)" opacity="0.7" />
      <rect x="1340" y="730" width="62" height="110" rx="3" fill="url(#colReflect)" />
      <rect x="1236" y="730" width="52" height="90" rx="3" fill="url(#colReflect)" opacity="0.7" />

      {/* ── CENTRAL ARCH ── */}
      {/* Arch frame */}
      <path
        d="M 570,730 L 570,340 Q 570,165 720,165 Q 870,165 870,340 L 870,730"
        fill="none"
        stroke="#6a8878"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
      {/* Inner arch glow edge */}
      <path
        d="M 590,730 L 590,348 Q 590,195 720,195 Q 850,195 850,348 L 850,730"
        fill="none"
        stroke="#8aaa98"
        strokeOpacity="0.14"
        strokeWidth="0.8"
      />

      {/* ── LANTERNS ── */}
      {/* Center lantern */}
      <line x1="720" y1="0" x2="720" y2="52" stroke="#a09070" strokeOpacity="0.4" strokeWidth="0.8" />
      <ellipse cx="720" cy="62" rx="72" ry="72" fill="url(#lg1)" />
      <ellipse cx="720" cy="64" rx="14" ry="12" fill="#f8f0d8" fillOpacity="0.92" />

      {/* Left-of-center lantern */}
      <line x1="510" y1="0" x2="510" y2="62" stroke="#a09070" strokeOpacity="0.3" strokeWidth="0.7" />
      <ellipse cx="510" cy="72" rx="56" ry="56" fill="url(#lg2)" />
      <ellipse cx="510" cy="74" rx="11" ry="9" fill="#f5ecd0" fillOpacity="0.88" />

      {/* Right-of-center lantern */}
      <line x1="930" y1="0" x2="930" y2="62" stroke="#a09070" strokeOpacity="0.3" strokeWidth="0.7" />
      <ellipse cx="930" cy="72" rx="56" ry="56" fill="url(#lg2)" />
      <ellipse cx="930" cy="74" rx="11" ry="9" fill="#f5ecd0" fillOpacity="0.88" />

      {/* Outer left lantern */}
      <line x1="330" y1="0" x2="330" y2="75" stroke="#a09070" strokeOpacity="0.2" strokeWidth="0.6" />
      <ellipse cx="330" cy="83" rx="42" ry="42" fill="url(#lg3)" />
      <ellipse cx="330" cy="85" rx="8" ry="7" fill="#f2e8c8" fillOpacity="0.8" />

      {/* Outer right lantern */}
      <line x1="1110" y1="0" x2="1110" y2="75" stroke="#a09070" strokeOpacity="0.2" strokeWidth="0.6" />
      <ellipse cx="1110" cy="83" rx="42" ry="42" fill="url(#lg3)" />
      <ellipse cx="1110" cy="85" rx="8" ry="7" fill="#f2e8c8" fillOpacity="0.8" />

      {/* ── SUBTLE VIGNETTE ── */}
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="50%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
      </radialGradient>
      <rect width="1440" height="900" fill="url(#vignette)" />
    </svg>
  );
}

export default function ConstraintPoemPage() {
  const [mood, setMood] = useState("");
  const [topic, setTopic] = useState("");
  const [syllables, setSyllables] = useState("");
  const [poem, setPoem] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState("");
  const [contentKey, setContentKey] = useState(0);
  const [contentOpacity, setContentOpacity] = useState(1);

  async function generate() {
    // Fade out current content first
    setContentOpacity(0);
    await new Promise((r) => setTimeout(r, 280));

    setLoading(true);
    setPoem("");
    setError("");
    setEmailSent(false);
    setContentKey((k) => k + 1);
    setContentOpacity(1);

    try {
      const res = await fetch("/api/poem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, topic, syllables: syllables ? Number(syllables) : null }),
      });
      const data = await res.json();

      // Fade out loading dots, then reveal poem
      setContentOpacity(0);
      await new Promise((r) => setTimeout(r, 220));
      if (data.error) setError(data.error);
      else setPoem(data.poem);
      setContentKey((k) => k + 1);
      setContentOpacity(1);
    } catch {
      setContentOpacity(0);
      await new Promise((r) => setTimeout(r, 180));
      setError("Something went wrong. Check the terminal for details.");
      setContentKey((k) => k + 1);
      setContentOpacity(1);
    } finally {
      setLoading(false);
    }
  }

  function handleEmail() {
    if (!emailTo || !poem) return;
    const subject = encodeURIComponent("A poem for you");
    const body = encodeURIComponent(poem + "\n\n— generated with Constraint Poem Generator");
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    setEmailSent(true);
    setShowEmail(false);
  }

  const hasConstraints = mood || topic || syllables;

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center">
      <HallBackground />

      {/* Top bar */}
      <header className="relative z-10 w-full flex items-center justify-between px-8 pt-8 pb-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white opacity-60" />
          <span className="text-white/55 text-xs tracking-[0.22em] uppercase font-light">
            Constraint Poem Generator
          </span>
        </div>
        <button
          onClick={() => setShowSettings((s) => !s)}
          className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/30 transition-colors"
          aria-label="Settings"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </header>

      {/* Settings panel */}
      {showSettings && (
        <div
          className="absolute top-20 right-6 z-30 rounded-2xl px-6 py-5 w-72 anim-fade-up"
          style={{ background: "rgba(8,14,12,0.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-white/40 text-xs tracking-widest uppercase mb-3">About</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Set mood, topic, or syllable count to shape your poem. Leave fields blank for an unconstrained poem. Email your poem to anyone directly from the page.
          </p>
        </div>
      )}

      {/* Constraint label */}
      <div className="relative z-10 mt-16 mb-6" style={{ transition: "opacity 0.4s ease" }}>
        <span
          className="text-white/35 text-xs tracking-[0.28em] uppercase"
          style={{ transition: "opacity 0.35s ease" }}
        >
          {hasConstraints
            ? [mood, topic, syllables ? `${syllables} syl` : ""].filter(Boolean).join(" · ")
            : "unconstrained poem"}
        </span>
      </div>

      {/* Poem display */}
      <div className="relative z-10 flex items-center justify-center w-full px-6">
        <div
          className="relative rounded-[36px] px-14 py-12 flex items-center justify-center"
          style={{
            background: "rgba(8,14,10,0.45)",
            backdropFilter: "blur(22px)",
            border: "1px solid rgba(180,210,195,0.1)",
            boxShadow: "0 0 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(200,230,215,0.06)",
            minWidth: "540px",
            maxWidth: "700px",
            minHeight: "210px",
          }}
        >
          <div
            key={contentKey}
            className="anim-fade-up flex items-center justify-center w-full"
            style={{
              opacity: contentOpacity,
              transition: "opacity 0.28s ease",
            }}
          >
            {loading ? (
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            ) : poem ? (
              <p
                className="text-center text-lg leading-[2.1] font-light whitespace-pre-line tracking-wide"
                style={{ color: "rgba(220, 238, 230, 0.92)" }}
              >
                {poem}
              </p>
            ) : error ? (
              <p className="text-red-400/60 text-sm text-center leading-relaxed">{error}</p>
            ) : (
              <p className="text-xs tracking-[0.25em] uppercase text-center" style={{ color: "rgba(160,190,175,0.3)" }}>
                Your poem will appear here
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Generate button */}
      <div className="relative z-10 mt-8">
        <button
          onClick={generate}
          disabled={loading}
          className="rounded-full px-10 py-3 text-sm tracking-[0.22em] uppercase font-light transition-all disabled:opacity-40"
          style={{
            background: "rgba(10,18,14,0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(180,210,195,0.2)",
            color: "rgba(200,228,215,0.85)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(20,35,28,0.75)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(180,210,195,0.35)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,18,14,0.6)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(180,210,195,0.2)";
          }}
        >
          {loading ? "Writing…" : poem ? "Write Another" : "Generate Poem"}
        </button>
      </div>

      {/* Constraints + Email card */}
      <div
        className="relative z-10 mt-8 mb-14 rounded-3xl px-8 py-6 w-full max-w-[640px] mx-6"
        style={{
          background: "rgba(6,12,9,0.62)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(180,210,195,0.09)",
          boxShadow: "0 0 40px rgba(0,0,0,0.35)",
        }}
      >
        <p className="text-xs tracking-[0.22em] uppercase mb-5" style={{ color: "rgba(160,195,178,0.4)" }}>
          Constraints
        </p>

        {/* Mood pills */}
        <div className="mb-5">
          <p className="text-[11px] tracking-widest uppercase mb-2.5" style={{ color: "rgba(150,185,168,0.35)" }}>
            Mood
          </p>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => setMood(mood === m ? "" : m)}
                className="px-3 py-1 rounded-full text-xs transition-all"
                style={{
                  background: mood === m ? "rgba(180,210,195,0.15)" : "rgba(180,210,195,0.04)",
                  border: `1px solid ${mood === m ? "rgba(180,210,195,0.3)" : "rgba(180,210,195,0.1)"}`,
                  color: mood === m ? "rgba(200,230,215,0.9)" : "rgba(160,195,178,0.45)",
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Topic & Syllables */}
        <div className="flex gap-3">
          <div className="flex-1">
            <p className="text-[11px] tracking-widest uppercase mb-2" style={{ color: "rgba(150,185,168,0.35)" }}>
              Topic
            </p>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. rain, memory, distance…"
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{
                background: "rgba(180,210,195,0.05)",
                border: "1px solid rgba(180,210,195,0.1)",
                color: "rgba(200,228,215,0.8)",
              }}
            />
          </div>
          <div className="w-32">
            <p className="text-[11px] tracking-widest uppercase mb-2" style={{ color: "rgba(150,185,168,0.35)" }}>
              Syllables/line
            </p>
            <input
              type="number"
              value={syllables}
              onChange={(e) => setSyllables(e.target.value)}
              placeholder="e.g. 5"
              min={2}
              max={20}
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{
                background: "rgba(180,210,195,0.05)",
                border: "1px solid rgba(180,210,195,0.1)",
                color: "rgba(200,228,215,0.8)",
              }}
            />
          </div>
        </div>

        {/* Email section */}
        {poem && (
          <div className="mt-5 pt-5 anim-fade-in" style={{ borderTop: "1px solid rgba(180,210,195,0.07)" }}>
            {emailSent ? (
              <p className="text-xs tracking-widest uppercase text-center" style={{ color: "rgba(160,195,178,0.4)" }}>
                Opening your mail app…
              </p>
            ) : showEmail ? (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="friend@example.com"
                  className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{
                    background: "rgba(180,210,195,0.05)",
                    border: "1px solid rgba(180,210,195,0.1)",
                    color: "rgba(200,228,215,0.8)",
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleEmail()}
                  autoFocus
                />
                <button
                  onClick={handleEmail}
                  disabled={!emailTo}
                  className="px-4 py-2.5 rounded-xl text-xs tracking-widest uppercase transition-colors disabled:opacity-30"
                  style={{
                    background: "rgba(180,210,195,0.08)",
                    border: "1px solid rgba(180,210,195,0.15)",
                    color: "rgba(200,228,215,0.7)",
                  }}
                >
                  Send
                </button>
                <button
                  onClick={() => setShowEmail(false)}
                  className="px-3 py-2.5 rounded-xl text-xs transition-colors"
                  style={{ color: "rgba(160,195,178,0.35)" }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowEmail(true)}
                className="w-full text-center text-xs tracking-widest uppercase py-1 transition-colors"
                style={{ color: "rgba(160,195,178,0.38)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(190,220,205,0.65)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(160,195,178,0.38)"; }}
              >
                Email this poem to a friend →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
