import React from 'react';

/**
 * 🎄 ChristmasSectionDecor
 * 
 * Redesigned per user request:
 * 1. REMOVED the long horizontal green carpet/garland spanning across the top.
 * 2. DECORATES ONLY THE 4 CORNERS:
 *    - Top-Left & Top-Right: Inspired by the reference photo (pine wreath + red poinsettia flower
 *      with golden bell + cascading golden ribbons + cluster of glossy red Christmas baubles).
 *    - Bottom-Left & Bottom-Right: Subtle festive corner brackets with frosted pine sprigs,
 *      red poinsettia petals, and golden ribbons.
 * 3. KEEPS & ELEVATES:
 *    - Electric fairy light cables with glowing twinkling LED bulbs running across the top.
 *    - Suspendable 3D golden stars, crystalline snowflakes, and glossy red/gold balloons (baubles)
 *      suspended at staggered lengths and swaying gently.
 * 4. Zero visual pollution — all center headlines and campaign flyers remain 100% visible and unblocked.
 */

// ─── 1. 3D Bevelled Golden Star ───
export const GoldenStar: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_4px_12px_rgba(255,215,0,0.65)] select-none ${className}`}
  >
    <defs>
      <linearGradient id="starFacetLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#FFE066" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
      <linearGradient id="starFacetDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E5C158" />
        <stop offset="50%" stopColor="#C49A33" />
        <stop offset="100%" stopColor="#7A560C" />
      </linearGradient>
    </defs>
    <g transform="translate(50, 50)">
      {[0, 72, 144, 216, 288].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle})`}>
          <polygon points="0,-48 0,0 -14,-14" fill="url(#starFacetLight)" />
          <polygon points="0,-48 14,-14 0,0" fill="url(#starFacetDark)" />
        </g>
      ))}
      <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" opacity="0.9" />
    </g>
  </svg>
);

// ─── 2. Hanging 3D Star Suspended on Gold Cord ───
export const HangingStar: React.FC<{
  size?: number;
  cordLength?: number;
  className?: string;
  delay?: number;
}> = ({ size = 28, cordLength = 55, className = '', delay = 0 }) => (
  <div
    className={`flex flex-col items-center pointer-events-none ${className}`}
    style={{
      animation: `sway-ornament 5.4s ease-in-out infinite alternate`,
      animationDelay: `${delay}s`,
      transformOrigin: 'top center'
    }}
  >
    <div
      style={{ height: `${cordLength}px`, width: '1px' }}
      className="bg-gradient-to-b from-[#FFF2A8] via-[#D4AF37] to-[#8C6D15]"
    />
    <GoldenStar size={size} className="-mt-1" />
  </div>
);

// ─── 3. Hanging 3D Metallic Christmas Bauble (Balloon / Esfera) ───
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
  size = 30,
  cordLength = 65,
  cordType = 'gold',
  className = '',
  delay = 0,
  id = '1'
}) => {
  const isRed = type === 'red';
  const redSphereId = `redSphere-${id}`;
  const goldSphereId = `goldSphere-${id}`;
  const capId = `baubleCap-${id}`;
  const glintId = `baubleGlint-${id}`;

  return (
    <div
      className={`flex flex-col items-center pointer-events-none transition-transform duration-700 ${className}`}
      style={{
        animation: `sway-ornament ${4.6 + (parseInt(id.replace(/\D/g, '') || '1', 10) % 3) * 0.8}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
        transformOrigin: 'top center'
      }}
    >
      {/* Hanging Cord */}
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
          <linearGradient id={capId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7A560C" />
            <stop offset="25%" stopColor="#FFF2A8" />
            <stop offset="50%" stopColor="#E5C158" />
            <stop offset="75%" stopColor="#C49A33" />
            <stop offset="100%" stopColor="#634505" />
          </linearGradient>

          <radialGradient id={redSphereId} cx="32%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#FFA6AD" />
            <stop offset="14%" stopColor="#FF3847" />
            <stop offset="46%" stopColor="#C8102E" />
            <stop offset="78%" stopColor="#7A000A" />
            <stop offset="100%" stopColor="#2E0004" />
          </radialGradient>

          <radialGradient id={goldSphereId} cx="32%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="15%" stopColor="#FFF2B2" />
            <stop offset="48%" stopColor="#E5C158" />
            <stop offset="80%" stopColor="#9C731A" />
            <stop offset="100%" stopColor="#4A3403" />
          </radialGradient>

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

        {/* Specular Glint */}
        <ellipse cx="14" cy="20" rx="4.5" ry="2.5" fill={`url(#${glintId})`} transform="rotate(-30 14 20)" />
      </svg>
    </div>
  );
};

// ─── 4. Hanging Crystal Snowflake ───
export const HangingSnowflake: React.FC<{
  size?: number;
  cordLength?: number;
  className?: string;
  delay?: number;
}> = ({ size = 30, cordLength = 65, className = '', delay = 0 }) => (
  <div
    className={`flex flex-col items-center pointer-events-none ${className}`}
    style={{
      animation: `sway-ornament 5.2s ease-in-out infinite alternate`,
      animationDelay: `${delay}s`,
      transformOrigin: 'top center'
    }}
  >
    <div
      style={{ height: `${cordLength}px`, width: '1px' }}
      className="bg-gradient-to-b from-[#FFF2A8] via-[#D4AF37] to-[#8C6D15]"
    />
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      className="text-[#F3D375] drop-shadow-[0_4px_10px_rgba(212,175,55,0.65)] -mt-1"
    >
      <g transform="translate(25, 25)" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="0" cy="0" r="2.2" fill="currentColor" />
        {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
          <g key={idx} transform={`rotate(${angle})`}>
            <line x1="0" y1="0" x2="0" y2="-22" />
            <line x1="0" y1="-8" x2="-4" y2="-12" />
            <line x1="0" y1="-8" x2="4" y2="-12" />
            <line x1="0" y1="-15" x2="-5" y2="-19" />
            <line x1="0" y1="-15" x2="5" y2="-19" />
            <polygon points="0,-22 -2.5,-19 0,-16 2.5,-19" fill="currentColor" stroke="none" />
          </g>
        ))}
      </g>
    </svg>
  </div>
);

// ─── 5. Velvet Red Poinsettia Blossom (Used on Corner Arrangements) ───
export const PoinsettiaFlower: React.FC<{ size?: number; className?: string; rotation?: number }> = ({
  size = 56,
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
      <linearGradient id="poinsettiaDarkGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#B30018" />
        <stop offset="100%" stopColor="#5E000B" />
      </linearGradient>
      <linearGradient id="poinsettiaBrightGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E60021" />
        <stop offset="100%" stopColor="#8A0010" />
      </linearGradient>
      <radialGradient id="poinsettiaCenterGrad" cx="40%" cy="40%" r="60%">
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
          fill="url(#poinsettiaDarkGrad)"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Inner 8 Bright Petals */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, idx) => (
        <path
          key={`in-${idx}`}
          d="M 0,0 C -9,-15 -6,-28 0,-34 C 6,-28 9,-15 0,0"
          fill="url(#poinsettiaBrightGrad)"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Center Golden Stamens */}
      <circle cx="0" cy="0" r="3.2" fill="url(#poinsettiaCenterGrad)" />
      <circle cx="-4" cy="-3" r="2.2" fill="url(#poinsettiaCenterGrad)" />
      <circle cx="4" cy="-3" r="2.2" fill="url(#poinsettiaCenterGrad)" />
      <circle cx="-3" cy="4" r="2.2" fill="url(#poinsettiaCenterGrad)" />
      <circle cx="3" cy="4" r="2.2" fill="url(#poinsettiaCenterGrad)" />
    </g>
  </svg>
);

// ─── 6. Realistic Red Bauble for the Corner Cluster (from Reference Image) ───
const ClusterBauble: React.FC<{ size?: number; id: string }> = ({ size = 32, id }) => {
  const sphereId = `clusterSphere-${id}`;
  const capId = `clusterCap-${id}`;
  const glintId = `clusterGlint-${id}`;

  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 40 48" className="drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)] select-none">
      <defs>
        <linearGradient id={capId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7A560C" />
          <stop offset="35%" stopColor="#FFF2A8" />
          <stop offset="70%" stopColor="#E5C158" />
          <stop offset="100%" stopColor="#634505" />
        </linearGradient>
        <radialGradient id={sphereId} cx="34%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#FF9EA5" />
          <stop offset="16%" stopColor="#FF2E3E" />
          <stop offset="48%" stopColor="#C40D1D" />
          <stop offset="82%" stopColor="#7A000A" />
          <stop offset="100%" stopColor="#2E0004" />
        </radialGradient>
        <radialGradient id={glintId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="4.5" r="3" fill="none" stroke={`url(#${capId})`} strokeWidth="1.2" />
      <path d="M 15,6 L 25,6 L 24,10 L 16,10 Z" fill={`url(#${capId})`} />
      <circle cx="20" cy="27" r="18" fill={`url(#${sphereId})`} />
      <ellipse cx="14" cy="19" rx="4" ry="2.2" fill={`url(#${glintId})`} transform="rotate(-30 14 19)" />
    </svg>
  );
};

// ─── 7. Corner Cascading Ornament Cluster (Directly inspired by Reference Photo 1) ───
export const CornerOrnamentCluster: React.FC<{
  position?: 'top-left' | 'top-right';
  className?: string;
}> = ({ position = 'top-left', className = '' }) => {
  const isRight = position === 'top-right';

  return (
    <div
      className={`absolute z-30 pointer-events-none select-none ${
        isRight ? '-top-2 -right-1 sm:right-2' : '-top-2 -left-1 sm:left-2'
      } ${className}`}
    >
      <div className="relative flex flex-col items-center">
        {/* Pine Wreath / Ring with Needles & Frost */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]">
            <defs>
              <linearGradient id={`wreathGrad-${position}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0B2412" />
                <stop offset="50%" stopColor="#1B4D25" />
                <stop offset="100%" stopColor="#2D6B3C" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="30" stroke={`url(#wreathGrad-${position})`} strokeWidth="22" fill="none" strokeDasharray="6 3" />
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i * 360) / 20;
              const rad = (angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * 30;
              const y = 50 + Math.sin(rad) * 30;
              return (
                <g key={i} transform={`translate(${x}, ${y}) rotate(${angle + 40})`}>
                  <line x1="-5" y1="0" x2="11" y2="0" stroke="#2D6A3B" strokeWidth="2" strokeLinecap="round" />
                  <line x1="-3" y1="2" x2="8" y2="2" stroke="#A3D9B1" strokeWidth="0.9" opacity="0.6" strokeLinecap="round" />
                </g>
              );
            })}
          </svg>

          {/* Velvet Red Poinsettia Flower crowned on top of wreath with small gold bell */}
          <div className="absolute inset-0 flex items-center justify-center">
            <PoinsettiaFlower size={52} rotation={isRight ? -12 : 12} />
            <div className="absolute w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#FFF59D] via-[#D4AF37] to-[#8C6D15] shadow-md border border-amber-200 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#573D05]" />
            </div>
          </div>
        </div>

        {/* Shimmering Golden Ribbon Bow */}
        <div className="relative -mt-2 w-full flex justify-center">
          <svg width="60" height="22" viewBox="0 0 100 35" className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            <defs>
              <linearGradient id={`goldBowGrad-${position}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C49A33" />
                <stop offset="30%" stopColor="#FFE066" />
                <stop offset="70%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8C6D15" />
              </linearGradient>
            </defs>
            <path d="M 50,15 C 28,4 18,25 45,20 Z" fill={`url(#goldBowGrad-${position})`} stroke="#7A560C" strokeWidth="0.8" />
            <path d="M 50,15 C 72,4 82,25 55,20 Z" fill={`url(#goldBowGrad-${position})`} stroke="#7A560C" strokeWidth="0.8" />
            <circle cx="50" cy="16" r="4.2" fill="#FFE066" stroke="#7A560C" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Cascading Cluster of Glossy Red Baubles (Directly matching Image 1) */}
        <div className="relative -mt-1 w-20 flex flex-col items-center">
          {/* Shimmering Gold Ribbon Tails */}
          <div className="absolute top-0 left-4 w-[2px] h-32 bg-gradient-to-b from-[#FFE066] via-[#D4AF37] to-transparent opacity-85" />
          <div className="absolute top-0 right-4 w-[2px] h-36 bg-gradient-to-b from-[#FFE066] via-[#D4AF37] to-transparent opacity-85" />
          <div className="absolute top-0 left-9 w-[2px] h-44 bg-gradient-to-b from-[#FFE066] via-[#D4AF37] to-transparent opacity-85" />

          {/* Tier 1: Two upper baubles */}
          <div className="flex justify-between w-full px-1">
            <div className="animate-sway-ornament" style={{ animationDuration: '4.8s' }}>
              <ClusterBauble size={26} id={`${position}-1`} />
            </div>
            <div className="animate-sway-ornament" style={{ animationDuration: '5.2s', animationDelay: '0.4s' }}>
              <ClusterBauble size={28} id={`${position}-2`} />
            </div>
          </div>

          {/* Tier 2: Two mid baubles */}
          <div className="flex justify-around w-full -mt-2 px-1">
            <div className="animate-sway-ornament" style={{ animationDuration: '4.4s', animationDelay: '0.8s' }}>
              <ClusterBauble size={30} id={`${position}-3`} />
            </div>
            <div className="animate-sway-ornament" style={{ animationDuration: '5.6s', animationDelay: '0.2s' }}>
              <ClusterBauble size={28} id={`${position}-4`} />
            </div>
          </div>

          {/* Tier 3: Center lower bauble */}
          <div className="-mt-2 animate-sway-ornament" style={{ animationDuration: '5s', animationDelay: '0.6s' }}>
            <ClusterBauble size={32} id={`${position}-5`} />
          </div>

          {/* Tier 4: Bottom hanging tip bauble */}
          <div className="-mt-1.5 animate-sway-ornament" style={{ animationDuration: '6s', animationDelay: '1s' }}>
            <ClusterBauble size={28} id={`${position}-6`} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── 8. Bottom Corner Festive Sprigs (Bottom-Left & Bottom-Right) ───
export const BottomCornerAccent: React.FC<{ position?: 'left' | 'right' }> = ({ position = 'left' }) => {
  const isRight = position === 'right';

  return (
    <div
      className={`absolute bottom-0 z-20 pointer-events-none select-none ${
        isRight ? 'right-0' : 'left-0'
      }`}
    >
      <svg
        width="110"
        height="85"
        viewBox="0 0 110 85"
        className={`filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] ${isRight ? '-scale-x-100' : ''}`}
        fill="none"
      >
        <defs>
          <radialGradient id={`bottomBaubleRed-${position}`} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FF7A85" />
            <stop offset="35%" stopColor="#C8102E" />
            <stop offset="85%" stopColor="#7A000A" />
            <stop offset="100%" stopColor="#2E0004" />
          </radialGradient>
          <radialGradient id={`bottomBaubleGold-${position}`} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FFE066" />
            <stop offset="75%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#634505" />
          </radialGradient>
        </defs>

        {/* Pine needles spreading from corner */}
        <g stroke="#1F4D2B" strokeWidth="2.2" strokeLinecap="round">
          <line x1="0" y1="85" x2="35" y2="45" />
          <line x1="0" y1="85" x2="55" y2="58" />
          <line x1="0" y1="85" x2="70" y2="75" />
          <line x1="15" y1="65" x2="25" y2="48" />
          <line x1="28" y1="72" x2="42" y2="52" />
        </g>
        <g stroke="#A3D9B1" strokeWidth="1" strokeLinecap="round" opacity="0.65">
          <line x1="3" y1="83" x2="33" y2="47" />
          <line x1="3" y1="83" x2="52" y2="60" />
        </g>

        {/* Small Red Poinsettia Leaf Cluster in corner */}
        <path d="M 0,85 C 15,70 12,50 30,55 C 20,72 10,80 0,85 Z" fill="#B30018" />
        <path d="M 0,85 C 8,62 25,60 22,78 Z" fill="#E60021" />

        {/* Golden Ribbon Loop */}
        <path d="M 22,65 Q 32,58 38,68 Q 30,76 22,65" fill="#E5C158" stroke="#7A560C" strokeWidth="0.8" />

        {/* Two Glossy Ornaments Nestled in the foliage */}
        {/* Gold Bauble */}
        <circle cx="36" cy="62" r="11" fill={`url(#bottomBaubleGold-${position})`} />
        <ellipse cx="33" cy="58" rx="2.5" ry="1.4" fill="white" opacity="0.75" />

        {/* Red Bauble in front */}
        <circle cx="24" cy="70" r="13" fill={`url(#bottomBaubleRed-${position})`} />
        <ellipse cx="20" cy="65" rx="3" ry="1.6" fill="white" opacity="0.8" />
      </svg>
    </div>
  );
};

// ─── 9. Electric Fairy Light Cable Across the Top ───
export const ElectricFairyLightCable: React.FC = () => (
  <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none overflow-hidden h-14">
    <svg className="w-full h-full" viewBox="0 0 1200 48" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="electricCableGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E3823" />
          <stop offset="50%" stopColor="#0E1E12" />
          <stop offset="100%" stopColor="#1E3823" />
        </linearGradient>
      </defs>

      {/* Gentle Scalloped Wire Path */}
      <path
        d="M 0,6 Q 100,20 200,8 Q 300,22 400,9 Q 500,24 600,10 Q 700,24 800,10 Q 900,22 1000,9 Q 1100,20 1200,6"
        stroke="url(#electricCableGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Light Bulbs along the cable */}
      {Array.from({ length: 26 }).map((_, i) => {
        const x = i * 46 + 22;
        const y = 8 + Math.sin((i % 4) * (Math.PI / 3)) * 12;
        const colorTypes = ['amber', 'white', 'red', 'green', 'gold'];
        const color = colorTypes[i % colorTypes.length];

        const bulbColors: Record<string, { body: string; drop: string }> = {
          amber: { body: '#FFD54F', drop: 'rgba(255,193,7,0.85)' },
          white: { body: '#FFFDE7', drop: 'rgba(255,253,231,0.9)' },
          red: { body: '#FF5252', drop: 'rgba(229,57,53,0.85)' },
          green: { body: '#69F0AE', drop: 'rgba(0,230,118,0.85)' },
          gold: { body: '#FFE082', drop: 'rgba(255,224,130,0.85)' }
        };

        const config = bulbColors[color];

        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            {/* Socket */}
            <rect x="-1.5" y="-1" width="3" height="3" rx="0.5" fill="#0A180E" stroke="#1F4226" strokeWidth="0.5" />
            {/* Glowing Teardrop Bulb */}
            <path
              d="M 0,2 C -2.2,3.8 -2.8,7.5 0,10.5 C 2.8,7.5 2.2,3.8 0,2 Z"
              fill={config.body}
              className="animate-pulse"
              style={{
                animationDuration: `${1.8 + (i % 5) * 0.4}s`,
                animationDelay: `${(i % 7) * 0.25}s`,
                filter: `drop-shadow(0 0 5px ${config.drop})`
              }}
            />
          </g>
        );
      })}
    </svg>
  </div>
);

// ─── 10. Complete Christmas Section Decor (Master Component) ───
export const ChristmasSectionDecor: React.FC = () => {
  return (
    <>
      {/* Subtle Vertical Panel Depth Lines */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_42px,#FFF_42px,#FFF_43px)]" 
      />

      {/* Floating Gentle Snow Dust & Stardust */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:26px_26px]" 
      />

      {/* Warm Ambient Holiday Glow behind top center */}
      <div 
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[720px] h-[260px] bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" 
      />

      {/* 1. Electric Fairy Light Cable across Top Border (No Green Carpet!) */}
      <ElectricFairyLightCable />

      {/* 2. THE 4 CORNERS DECORATION */}
      {/* Top-Left Corner Cluster (Pine Wreath + Poinsettia with Bell + Gold Bow + Cascading Baubles) */}
      <CornerOrnamentCluster position="top-left" />

      {/* Top-Right Corner Cluster (Pine Wreath + Poinsettia with Bell + Gold Bow + Cascading Baubles) */}
      <CornerOrnamentCluster position="top-right" />

      {/* Bottom-Left Corner Accent */}
      <BottomCornerAccent position="left" />

      {/* Bottom-Right Corner Accent */}
      <BottomCornerAccent position="right" />

      {/* 3. SUSPENDABLE STARS, BALLONS & SNOWFLAKES (Hanging from Electric Light Cable) */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none px-20 sm:px-28 lg:px-36 flex justify-between">
        
        {/* Left Side Strands */}
        <div className="flex items-start space-x-6 sm:space-x-10">
          {/* Suspended 3D Gold Star */}
          <HangingStar size={26} cordLength={46} delay={0.2} />

          {/* Suspended Glossy Red Bauble (Balloon) */}
          <HangingBauble type="red" size={28} cordLength={64} cordType="gold" id="susp-1" delay={0.8} />

          {/* Suspended Crystal Snowflake */}
          <HangingSnowflake size={26} cordLength={48} delay={1.4} className="hidden sm:flex" />
        </div>

        {/* Center Accent Strands (Visible on wider screens) */}
        <div className="hidden lg:flex items-start space-x-12">
          {/* Suspended Champagne Gold Bauble */}
          <HangingBauble type="gold" size={26} cordLength={52} cordType="red" id="susp-2" delay={0.5} />

          {/* Suspended 3D Gold Star */}
          <HangingStar size={28} cordLength={66} delay={1.1} />

          {/* Suspended Metallic Red Bauble */}
          <HangingBauble type="red" size={26} cordLength={54} cordType="gold" id="susp-3" delay={1.7} />
        </div>

        {/* Right Side Strands */}
        <div className="flex items-start space-x-6 sm:space-x-10 justify-end">
          {/* Suspended Crystal Snowflake */}
          <HangingSnowflake size={26} cordLength={48} delay={0.7} className="hidden sm:flex" />

          {/* Suspended Glossy Red Bauble (Balloon) */}
          <HangingBauble type="red" size={28} cordLength={65} cordType="gold" id="susp-4" delay={1.3} />

          {/* Suspended 3D Gold Star */}
          <HangingStar size={26} cordLength={48} delay={0.3} />
        </div>

      </div>
    </>
  );
};
