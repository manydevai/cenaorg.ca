import React from 'react';

/**
 * 🎄 ChristmasSectionDecor
 * 
 * Inspired by luxury holiday decor:
 * - Frosted evergreen pine garland across the top border with holly berries.
 * - Velvet red poinsettia blossoms nestled in corners.
 * - Suspended 3D red & gold baubles and delicate crystal snowflakes hanging at staggered lengths.
 * - Subtle vertical wooden panel depth lines and warm ambient golden glow.
 * - Minimalist, elegant, and strictly non-intrusive (never overlaps text or flyer).
 */

// ─── 1. Luxury 3D Christmas Bauble (Metallic Red or Warm Gold) ───
export const HangingBauble: React.FC<{
  type?: 'red' | 'gold';
  size?: number;
  cordLength?: number;
  cordType?: 'gold' | 'red';
  className?: string;
  delay?: number;
  id?: string;
}> = ({
  type = 'red',
  size = 32,
  cordLength = 70,
  cordType = 'gold',
  className = '',
  delay = 0,
  id = '1'
}) => {
  const isRed = type === 'red';
  const redSphereId = `redSphereGrad-${id}`;
  const goldSphereId = `goldSphereGrad-${id}`;
  const capId = `capGrad-${id}`;
  const glintId = `glint-${id}`;

  return (
    <div
      className={`flex flex-col items-center pointer-events-none transition-transform duration-700 ${className}`}
      style={{
        animation: `sway-ornament ${4.5 + (parseInt(id, 10) % 3) * 0.8}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
        transformOrigin: 'top center'
      }}
    >
      {/* Delicate Hanging Cord / Satin Ribbon */}
      <div
        style={{ height: `${cordLength}px`, width: cordType === 'red' ? '2px' : '1px' }}
        className={
          cordType === 'red'
            ? 'bg-gradient-to-b from-[#8B0000] via-[#C8102E] to-[#A00014]'
            : 'bg-gradient-to-b from-[#FFF2A8] via-[#D4AF37] to-[#8C6D15]'
        }
      />

      {/* 3D Realistic Bauble SVG */}
      <svg
        width={size}
        height={size * 1.25}
        viewBox="0 0 40 50"
        className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)] -mt-0.5"
      >
        <defs>
          {/* Metallic Gold Cap */}
          <linearGradient id={capId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7A560C" />
            <stop offset="25%" stopColor="#FFF2A8" />
            <stop offset="50%" stopColor="#E5C158" />
            <stop offset="75%" stopColor="#C49A33" />
            <stop offset="100%" stopColor="#634505" />
          </linearGradient>

          {/* Deep Metallic Red Sphere */}
          <radialGradient id={redSphereId} cx="32%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#FFA6AD" />
            <stop offset="12%" stopColor="#FF3847" />
            <stop offset="45%" stopColor="#C8102E" />
            <stop offset="78%" stopColor="#7A000A" />
            <stop offset="100%" stopColor="#2E0004" />
          </radialGradient>

          {/* Warm Champagne Gold Sphere */}
          <radialGradient id={goldSphereId} cx="32%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="15%" stopColor="#FFF2B2" />
            <stop offset="48%" stopColor="#E5C158" />
            <stop offset="80%" stopColor="#9C731A" />
            <stop offset="100%" stopColor="#4A3403" />
          </radialGradient>

          {/* Specular Highlight Glint */}
          <radialGradient id={glintId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hanging Ring */}
        <circle cx="20" cy="4.5" r="3" fill="none" stroke={`url(#${capId})`} strokeWidth="1.2" />

        {/* Ornate Gold Cap */}
        <path d="M 15,6 L 25,6 L 24,11 L 16,11 Z" fill={`url(#${capId})`} />
        <line x1="17.5" y1="6" x2="17.5" y2="11" stroke="#573D05" strokeWidth="0.5" />
        <line x1="20" y1="6" x2="20" y2="11" stroke="#573D05" strokeWidth="0.5" />
        <line x1="22.5" y1="6" x2="22.5" y2="11" stroke="#573D05" strokeWidth="0.5" />

        {/* 3D Sphere */}
        <circle cx="20" cy="29" r="19" fill={isRed ? `url(#${redSphereId})` : `url(#${goldSphereId})`} />

        {/* Specular Light Reflection */}
        <ellipse cx="14" cy="20" rx="4.5" ry="2.5" fill={`url(#${glintId})`} transform="rotate(-30 14 20)" />
      </svg>
    </div>
  );
};

// ─── 2. Delicate Filigree Snowflake Ornament ───
export const HangingSnowflake: React.FC<{
  color?: 'gold' | 'ice';
  size?: number;
  cordLength?: number;
  className?: string;
  delay?: number;
}> = ({
  color = 'gold',
  size = 32,
  cordLength = 80,
  className = '',
  delay = 0
}) => {
  const isGold = color === 'gold';
  return (
    <div
      className={`flex flex-col items-center pointer-events-none ${className}`}
      style={{
        animation: `sway-ornament 5.2s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
        transformOrigin: 'top center'
      }}
    >
      {/* Hanging Cord */}
      <div
        style={{ height: `${cordLength}px`, width: '1px' }}
        className={
          isGold
            ? 'bg-gradient-to-b from-[#FFF2A8] via-[#D4AF37] to-[#8C6D15]'
            : 'bg-gradient-to-b from-white via-sky-100 to-white/60'
        }
      />

      {/* Snowflake SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        className={
          isGold
            ? 'text-[#F3D375] drop-shadow-[0_4px_10px_rgba(212,175,55,0.55)]'
            : 'text-white/95 drop-shadow-[0_4px_10px_rgba(255,255,255,0.6)]'
        }
      >
        <g transform="translate(25, 25)" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          {/* Central Ice Hub */}
          <circle cx="0" cy="0" r="2.2" fill="currentColor" />

          {/* 6 Intricate Arms */}
          {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle})`}>
              <line x1="0" y1="0" x2="0" y2="-22" />
              {/* Lower Branch */}
              <line x1="0" y1="-8" x2="-4" y2="-12" />
              <line x1="0" y1="-8" x2="4" y2="-12" />
              {/* Upper Branch */}
              <line x1="0" y1="-15" x2="-5" y2="-19" />
              <line x1="0" y1="-15" x2="5" y2="-19" />
              {/* Diamond Tip */}
              <polygon points="0,-22 -2.5,-19 0,-16 2.5,-19" fill="currentColor" stroke="none" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

// ─── 3. Velvet Red Poinsettia Blossom (Corner Accents) ───
export const PoinsettiaFlower: React.FC<{ size?: number; className?: string; rotation?: number }> = ({
  size = 60,
  className = '',
  rotation = 0
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)] pointer-events-none select-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <defs>
      <linearGradient id="poinsettiaDark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#B30018" />
        <stop offset="100%" stopColor="#5E000B" />
      </linearGradient>
      <linearGradient id="poinsettiaBright" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E60021" />
        <stop offset="100%" stopColor="#8A0010" />
      </linearGradient>
      <radialGradient id="poinsettiaCenter" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FFF275" />
        <stop offset="60%" stopColor="#E5A600" />
        <stop offset="100%" stopColor="#8C5800" />
      </radialGradient>
    </defs>
    <g transform="translate(50, 50)">
      {/* Outer 8 Velvet Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
        <path
          key={`out-${idx}`}
          d="M 0,0 C -12,-20 -8,-38 0,-46 C 8,-38 12,-20 0,0"
          fill="url(#poinsettiaDark)"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Inner 8 Bright Petals */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, idx) => (
        <path
          key={`in-${idx}`}
          d="M 0,0 C -9,-15 -6,-28 0,-34 C 6,-28 9,-15 0,0"
          fill="url(#poinsettiaBright)"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Center Golden Stamens */}
      <circle cx="0" cy="0" r="3.2" fill="url(#poinsettiaCenter)" />
      <circle cx="-4" cy="-3" r="2.2" fill="url(#poinsettiaCenter)" />
      <circle cx="4" cy="-3" r="2.2" fill="url(#poinsettiaCenter)" />
      <circle cx="-3" cy="4" r="2.2" fill="url(#poinsettiaCenter)" />
      <circle cx="3" cy="4" r="2.2" fill="url(#poinsettiaCenter)" />
    </g>
  </svg>
);

// ─── 4. Frosted Evergreen Pine Garland Top Edge ───
export const PineGarlandHeader: React.FC = () => (
  <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none overflow-hidden h-10 sm:h-14">
    <svg
      className="w-full h-full"
      viewBox="0 0 1200 50"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="garlandDarkPine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B2111" />
          <stop offset="100%" stopColor="#14361C" />
        </linearGradient>
        <linearGradient id="garlandLightPine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14361C" />
          <stop offset="100%" stopColor="#1E4D27" />
        </linearGradient>
      </defs>

      {/* Main Backing Scalloped Garland Silhouette */}
      <path
        d="M 0,0 L 1200,0 L 1200,16 
           Q 1120,38 1050,18 Q 980,40 900,20 Q 820,38 750,18 Q 680,40 600,20 
           Q 520,38 450,18 Q 380,40 300,20 Q 220,38 150,18 Q 80,38 0,16 Z"
        fill="url(#garlandDarkPine)"
        className="filter drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]"
      />
      <path
        d="M 0,0 L 1200,0 L 1200,12 
           Q 1140,28 1080,14 Q 1020,30 940,15 Q 860,28 800,14 Q 720,30 640,15 
           Q 560,28 500,14 Q 420,30 340,15 Q 260,28 200,14 Q 120,28 0,12 Z"
        fill="url(#garlandLightPine)"
        opacity="0.85"
      />

      {/* Pine Needles & Red Berries Spaced Naturally */}
      {Array.from({ length: 28 }).map((_, i) => {
        const x = i * 44 + 14;
        const y = 14 + Math.sin(i * 0.75) * 6;
        return (
          <g key={i}>
            {/* Pine needle sprigs */}
            <path
              d={`M ${x - 10},${y - 10} L ${x - 5},${y} L ${x},${y - 8} L ${x + 5},${y} L ${x + 10},${y - 10}`}
              stroke="#245E31"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Frosted needle tips */}
            <path
              d={`M ${x - 8},${y - 8} L ${x - 4},${y + 1} L ${x},${y - 6} L ${x + 4},${y + 1} L ${x + 8},${y - 8}`}
              stroke="#B3DEC2"
              strokeWidth="0.8"
              opacity="0.55"
              strokeLinecap="round"
            />
            {/* Red Holly Berries */}
            {i % 3 === 1 && (
              <g>
                <circle cx={x - 2} cy={y + 3} r="2.2" fill="#C8102E" />
                <circle cx={x + 2} cy={y + 3.5} r="2.0" fill="#E60021" />
                <circle cx={x} cy={y + 6} r="2.0" fill="#8B0000" />
                <circle cx={x - 1} cy={y + 2.5} r="0.6" fill="#FFA3A8" />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  </div>
);

// ─── 5. Complete Christmas Banner Decor Overlay ───
export const ChristmasSectionDecor: React.FC = () => {
  return (
    <>
      {/* Subtle Vertical Panel Depth Lines (inspired by reference wooden slats) */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_42px,#FFF_42px,#FFF_43px)]" 
      />

      {/* Floating Gentle Snow Dust & Stardust */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:26px_26px]" 
      />

      {/* Warm Ambient Holiday Glow behind top center */}
      <div 
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[720px] h-[260px] bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" 
      />

      {/* Frosted Pine Garland across Top Edge */}
      <PineGarlandHeader />

      {/* Corner Poinsettias nestled into pine garland */}
      <div className="absolute -top-3 -left-3 z-30 pointer-events-none">
        <PoinsettiaFlower size={62} rotation={15} />
      </div>
      <div className="absolute -top-3 -right-3 z-30 pointer-events-none">
        <PoinsettiaFlower size={62} rotation={-25} />
      </div>

      {/* Hanging Ornaments Suspended from Garland (Framed carefully at the top) */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none px-4 sm:px-8 lg:px-14 flex justify-between">
        
        {/* Left Ornaments Group */}
        <div className="flex items-start space-x-4 sm:space-x-8">
          {/* 1. Deep Red Bauble */}
          <HangingBauble type="red" size={32} cordLength={55} cordType="gold" id="1" delay={0} />

          {/* 2. Sparkling Gold Snowflake */}
          <HangingSnowflake color="gold" size={34} cordLength={82} delay={0.6} />

          {/* 3. Gold Glitter Bauble */}
          <HangingBauble type="gold" size={28} cordLength={48} cordType="red" id="2" delay={1.2} className="hidden sm:flex" />

          {/* 4. Frosted Ice Snowflake */}
          <HangingSnowflake color="ice" size={26} cordLength={68} delay={1.8} className="hidden md:flex" />
        </div>

        {/* Center Accent (Discreet, high up, only on wide screens) */}
        <div className="hidden lg:flex items-start space-x-12 pt-0">
          <HangingBauble type="red" size={26} cordLength={60} cordType="gold" id="3" delay={0.9} />
          <HangingSnowflake color="gold" size={28} cordLength={72} delay={1.5} />
        </div>

        {/* Right Ornaments Group */}
        <div className="flex items-start space-x-4 sm:space-x-8 justify-end">
          {/* 5. Frosted Ice Snowflake */}
          <HangingSnowflake color="ice" size={26} cordLength={65} delay={1.1} className="hidden md:flex" />

          {/* 6. Gold Glitter Bauble */}
          <HangingBauble type="gold" size={28} cordLength={52} cordType="red" id="4" delay={0.4} className="hidden sm:flex" />

          {/* 7. Sparkling Gold Snowflake */}
          <HangingSnowflake color="gold" size={34} cordLength={85} delay={1.6} />

          {/* 8. Deep Red Bauble */}
          <HangingBauble type="red" size={32} cordLength={58} cordType="gold" id="5" delay={0.8} />
        </div>

      </div>
    </>
  );
};
