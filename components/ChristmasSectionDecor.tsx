import React from 'react';

/**
 * 🎄 ChristmasSectionDecor
 * 
 * Handcrafted vector design inspired directly by the user's reference:
 * - 4 CORNER ARRANGEMENTS: The handcrafted Christmas Wreath with:
 *    • Evergreen pine wreath ring with frosted pine needles
 *    • Grand red velvet bow with gold-trimmed borders and cascading gold ribbon tails
 *    • Two cute plush skiing Santas (with red suits, fluffy wool beards, skis & ski poles)
 *    • Gold and ruby glitter butterflies/stars around the wreath
 *    • Golden strings with suspended cascading red and gold glitter baubles in the center opening
 * - TOP FESTIVE LIGHTING:
 *    • Electric fairy light cables with warm glowing, twinkling LED bulbs running across the top
 *    • Suspendable 3D golden stars, crystalline snowflakes, and glossy red/gold baubles swaying gently
 * - 100% responsive, zero visual clutter, all headlines and campaign flyers remain crisp and visible.
 */

// ─── Golden Star (Used in HangingStar) ───
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

// ─── Hanging 3D Star Suspended on Gold Cord ───
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

// ─── Hanging 3D Metallic Christmas Bauble (Balloon / Esfera) ───
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
        animation: `sway-ornament ${4.6 + (parseInt(String(id || '1').replace(/\D/g, '') || '1', 10) % 3) * 0.8}s ease-in-out infinite alternate`,
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

// ─── Hanging Crystal Snowflake ───
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

// ─── 1. Cute Plush Skiing Santa Claus (Vector Illustration) ───
export const SkiingSantaFigure: React.FC<{
  facing?: 'left' | 'right';
  className?: string;
  size?: number;
}> = ({ facing = 'right', className = '', size = 52 }) => {
  const isLeft = facing === 'left';

  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 80 92"
      className={`drop-shadow-[0_5px_10px_rgba(0,0,0,0.6)] select-none ${className}`}
      style={{ transform: isLeft ? 'scaleX(-1)' : 'none' }}
    >
      <defs>
        {/* Red Suit Gradient */}
        <linearGradient id="santaRedSuit" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E51926" />
          <stop offset="60%" stopColor="#BA0C17" />
          <stop offset="100%" stopColor="#7A0008" />
        </linearGradient>

        {/* Fluffy Wool / Fur Texture */}
        <linearGradient id="fluffyWool" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#F0F0F0" />
          <stop offset="100%" stopColor="#D9D9D9" />
        </linearGradient>

        {/* Wood Skis */}
        <linearGradient id="skiWood" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DEBA88" />
          <stop offset="50%" stopColor="#C49B66" />
          <stop offset="100%" stopColor="#8C6230" />
        </linearGradient>
      </defs>

      {/* Skis (Angled downhill glide) */}
      <g transform="translate(14, 76) rotate(-14)">
        {/* Left Ski */}
        <rect x="0" y="2" width="56" height="4" rx="2" fill="url(#skiWood)" stroke="#5E3F17" strokeWidth="0.6" />
        <path d="M 52,2 Q 58,0 60,-4" stroke="#5E3F17" strokeWidth="1.2" fill="none" />
        {/* Right Ski */}
        <rect x="6" y="8" width="56" height="4" rx="2" fill="url(#skiWood)" stroke="#5E3F17" strokeWidth="0.6" />
        <path d="M 58,8 Q 64,6 66,2" stroke="#5E3F17" strokeWidth="1.2" fill="none" />
      </g>

      {/* Ski Poles (Metal shaft + gold grip + basket) */}
      <line x1="28" y1="46" x2="18" y2="82" stroke="#C5A059" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="20" cy="76" r="3.5" fill="none" stroke="#FFFFFF" strokeWidth="1" />
      
      <line x1="50" y1="46" x2="62" y2="82" stroke="#C5A059" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="60" cy="76" r="3.5" fill="none" stroke="#FFFFFF" strokeWidth="1" />

      {/* Legs with Red Pants and White Fur Boot Trim */}
      <g>
        {/* Back Leg */}
        <path d="M 28,52 L 24,70 L 32,71 L 36,54 Z" fill="url(#santaRedSuit)" />
        <rect x="21" y="68" width="13" height="4.5" rx="2" fill="url(#fluffyWool)" />
        <ellipse cx="27" cy="73" rx="5" ry="3" fill="#2B2B2B" />

        {/* Front Leg */}
        <path d="M 44,52 L 48,70 L 56,70 L 51,52 Z" fill="url(#santaRedSuit)" />
        <rect x="46" y="68" width="13" height="4.5" rx="2" fill="url(#fluffyWool)" />
        <ellipse cx="53" cy="73" rx="5" ry="3" fill="#2B2B2B" />
      </g>

      {/* Body: Red Coat with White Fur Trim & Black Belt */}
      <path d="M 24,34 Q 38,32 52,34 L 54,54 Q 38,58 22,54 Z" fill="url(#santaRedSuit)" />
      {/* Black Belt + Golden Buckle */}
      <rect x="23" y="44" width="30" height="4.5" rx="1" fill="#1C1C1C" />
      <rect x="35" y="43" width="7" height="6.5" rx="1" fill="none" stroke="#FFD54F" strokeWidth="1.2" />

      {/* Arms holding poles */}
      <path d="M 24,36 Q 18,44 26,48" stroke="#BA0C17" strokeWidth="6.5" strokeLinecap="round" fill="none" />
      <circle cx="26" cy="48" r="3.5" fill="url(#fluffyWool)" />
      
      <path d="M 50,36 Q 58,44 52,48" stroke="#BA0C17" strokeWidth="6.5" strokeLinecap="round" fill="none" />
      <circle cx="52" cy="48" r="3.5" fill="url(#fluffyWool)" />

      {/* Head & Face */}
      <circle cx="38" cy="24" r="11" fill="#FFDFC4" />
      {/* Rosy Cheeks */}
      <circle cx="32" cy="25" r="3" fill="#FF8A80" opacity="0.65" />
      <circle cx="44" cy="25" r="3" fill="#FF8A80" opacity="0.65" />
      {/* Cute Eyes */}
      <circle cx="34" cy="22" r="1.4" fill="#121212" />
      <circle cx="42" cy="22" r="1.4" fill="#121212" />
      <circle cx="33.5" cy="21.5" r="0.5" fill="#FFFFFF" />
      <circle cx="41.5" cy="21.5" r="0.5" fill="#FFFFFF" />
      {/* Nose */}
      <circle cx="38" cy="24" r="2.2" fill="#FFAB91" />

      {/* Fluffy Wool Beard (Layered puffs) */}
      <g fill="url(#fluffyWool)">
        <circle cx="30" cy="30" r="5" />
        <circle cx="38" cy="32" r="6" />
        <circle cx="46" cy="30" r="5" />
        <circle cx="34" cy="37" r="5.5" />
        <circle cx="42" cy="37" r="5.5" />
        <circle cx="38" cy="43" r="5" />
        {/* Soft Mustache */}
        <path d="M 38,26 Q 32,25 28,29 Q 34,31 38,28 Q 42,31 48,29 Q 44,25 38,26 Z" fill="#FFFFFF" />
      </g>

      {/* Santa Hat */}
      <g>
        {/* White Fur Brim */}
        <rect x="25" y="14" width="26" height="5.5" rx="2.5" fill="url(#fluffyWool)" />
        {/* Red Cone pointing backwards */}
        <path d="M 27,15 Q 38,3 54,9 Q 58,16 54,20" fill="url(#santaRedSuit)" />
        {/* White Pom-pom */}
        <circle cx="56" cy="20" r="4" fill="url(#fluffyWool)" />
      </g>
    </svg>
  );
};

// ─── 2. Glitter Filigree Butterfly (Gold or Ruby Red) ───
export const GlitterButterfly: React.FC<{
  color?: 'gold' | 'red';
  size?: number;
  rotation?: number;
}> = ({ color = 'gold', size = 26, rotation = 0 }) => {
  const isGold = color === 'gold';
  const mainColor = isGold ? '#F5D061' : '#FF3847';
  const shadowColor = isGold ? 'rgba(212,175,55,0.7)' : 'rgba(229,57,53,0.7)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] select-none"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <defs>
        <radialGradient id={`bfGlow-${color}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor={mainColor} stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="translate(25, 25)" stroke={mainColor} strokeWidth="1.2" fill={mainColor} fillOpacity="0.2">
        {/* Upper Wings */}
        <path d="M 0,-2 C -10,-18 -22,-14 -18,-2 C -14,2 -4,0 0,-2 Z" />
        <path d="M 0,-2 C 10,-18 22,-14 18,-2 C 14,2 4,0 0,-2 Z" />
        {/* Lower Wings */}
        <path d="M 0,2 C -12,10 -16,18 -8,18 C -2,16 -1,6 0,2 Z" />
        <path d="M 0,2 C 12,10 16,18 8,18 C 2,16 1,6 0,2 Z" />
        {/* Body and Antennae */}
        <line x1="0" y1="-6" x2="0" y2="12" stroke={mainColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M 0,-6 Q -5,-12 -8,-10" stroke={mainColor} strokeWidth="0.8" fill="none" />
        <path d="M 0,-6 Q 5,-12 8,-10" stroke={mainColor} strokeWidth="0.8" fill="none" />
      </g>
    </svg>
  );
};

// ─── 3. Grand Red Velvet & Gold Ribbon Bow ───
export const VelvetGoldBow: React.FC<{ size?: number }> = ({ size = 96 }) => (
  <svg
    width={size}
    height={size * 0.75}
    viewBox="0 0 140 105"
    className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)] select-none"
  >
    <defs>
      {/* Red Velvet Bow Gradient */}
      <linearGradient id="bowVelvet" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D91424" />
        <stop offset="50%" stopColor="#A80D18" />
        <stop offset="100%" stopColor="#5E0008" />
      </linearGradient>

      {/* Gold Trim & Lattice Pattern */}
      <linearGradient id="bowGoldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2A8" />
        <stop offset="40%" stopColor="#E5C158" />
        <stop offset="100%" stopColor="#8C6D15" />
      </linearGradient>
    </defs>

    {/* Back Velvet Loops */}
    <g fill="url(#bowVelvet)" stroke="url(#bowGoldTrim)" strokeWidth="1.6">
      {/* Left Large Loop */}
      <path d="M 70,36 C 42,6 12,24 38,54 C 54,64 66,46 70,36 Z" />
      {/* Right Large Loop */}
      <path d="M 70,36 C 98,6 128,24 102,54 C 86,64 74,46 70,36 Z" />
    </g>

    {/* Gold Lattice Striping on Loops */}
    <g stroke="url(#bowGoldTrim)" strokeWidth="1.2" opacity="0.85">
      <line x1="30" y1="26" x2="52" y2="48" />
      <line x1="42" y1="20" x2="62" y2="42" />
      <line x1="110" y1="26" x2="88" y2="48" />
      <line x1="98" y1="20" x2="78" y2="42" />
    </g>

    {/* Cascading Ribbon Tails with Gold Trim */}
    <g fill="url(#bowVelvet)" stroke="url(#bowGoldTrim)" strokeWidth="1.4">
      {/* Left Tail */}
      <path d="M 64,44 L 40,96 L 50,88 L 60,94 L 68,44 Z" />
      {/* Right Tail */}
      <path d="M 76,44 L 100,96 L 90,88 L 80,94 L 72,44 Z" />
    </g>

    {/* Shimmering Center Gold Streamers */}
    <path
      d="M 67,42 Q 62,68 64,88 L 68,88 Q 69,68 71,42 Z"
      fill="url(#bowGoldTrim)"
      opacity="0.9"
    />
    <path
      d="M 73,42 Q 78,68 76,88 L 72,88 Q 71,68 69,42 Z"
      fill="url(#bowGoldTrim)"
      opacity="0.9"
    />

    {/* Center Knot with Gold Crisscross Band */}
    <ellipse cx="70" cy="38" rx="10" ry="8" fill="url(#bowVelvet)" stroke="url(#bowGoldTrim)" strokeWidth="2" />
    <line x1="64" y1="34" x2="76" y2="42" stroke="url(#bowGoldTrim)" strokeWidth="1.4" />
    <line x1="64" y1="42" x2="76" y2="34" stroke="url(#bowGoldTrim)" strokeWidth="1.4" />
  </svg>
);

// ─── 4. Glitter Texture Sphere (Gold or Red Sequined Bauble) ───
export const GlitterSphere: React.FC<{
  type?: 'gold' | 'red';
  size?: number;
  id: string;
}> = ({ type = 'gold', size = 32, id }) => {
  const isGold = type === 'gold';
  const sphereId = `glitterSph-${id}`;
  const capId = `glitterCap-${id}`;

  return (
    <svg width={size} height={size * 1.22} viewBox="0 0 40 48" className="drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)] select-none">
      <defs>
        <linearGradient id={capId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7A560C" />
          <stop offset="30%" stopColor="#FFF2A8" />
          <stop offset="70%" stopColor="#E5C158" />
          <stop offset="100%" stopColor="#634505" />
        </linearGradient>

        {isGold ? (
          <radialGradient id={sphereId} cx="34%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#FFE066" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#8C6812" />
            <stop offset="100%" stopColor="#4A3403" />
          </radialGradient>
        ) : (
          <radialGradient id={sphereId} cx="34%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#FF9AA2" />
            <stop offset="18%" stopColor="#FF2E3E" />
            <stop offset="52%" stopColor="#C40D1D" />
            <stop offset="85%" stopColor="#7A000A" />
            <stop offset="100%" stopColor="#2E0004" />
          </radialGradient>
        )}

        {/* Sequined / Glitter Texture Pattern */}
        <pattern id={`sequin-${id}`} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill={isGold ? '#FFF9C4' : '#FFCDD2'} opacity="0.65" />
        </pattern>
      </defs>

      {/* Hanging Ring & Cap */}
      <circle cx="20" cy="4.5" r="3" fill="none" stroke={`url(#${capId})`} strokeWidth="1.2" />
      <path d="M 15,6 L 25,6 L 24,10 L 16,10 Z" fill={`url(#${capId})`} />

      {/* Sphere Body with Radial Light */}
      <circle cx="20" cy="27" r="18" fill={`url(#${sphereId})`} />
      {/* Sequined Glitter Overlay */}
      <circle cx="20" cy="27" r="18" fill={`url(#sequin-${id})`} />

      {/* Specular Glint */}
      <ellipse cx="14" cy="19" rx="4" ry="2.2" fill="#FFFFFF" opacity="0.8" transform="rotate(-30 14 19)" />
    </svg>
  );
};

// ─── 5. THE COMPLETE CORNER WREATH (Exact match to Reference Photo) ───
export const SantaSkiingWreath: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = '' }) => {
  const isRight = position.includes('right');
  const isBottom = position.includes('bottom');

  return (
    <div
      className={`absolute z-30 pointer-events-none select-none transition-transform duration-700 ${
        isBottom ? 'bottom-0' : '-top-3'
      } ${
        isRight ? '-right-2 sm:right-2 lg:right-4' : '-left-2 sm:left-2 lg:left-4'
      } ${className}`}
    >
      <div className="relative flex flex-col items-center w-36 sm:w-44 md:w-48">
        
        {/* 1. LUSH EVERGREEN PINE WREATH RING */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 160 160" className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
            <defs>
              <linearGradient id={`wreathPineGrad-${position}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0B2612" />
                <stop offset="45%" stopColor="#1B4D25" />
                <stop offset="80%" stopColor="#2A6635" />
                <stop offset="100%" stopColor="#0D2D15" />
              </linearGradient>
            </defs>

            {/* Dense Pine Ring Arc */}
            <circle
              cx="80"
              cy="80"
              r="52"
              stroke={`url(#wreathPineGrad-${position})`}
              strokeWidth="42"
              fill="none"
              strokeDasharray="8 4"
            />

            {/* Natural Pine Needle Clusters around the ring */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 360) / 36;
              const rad = (angle * Math.PI) / 180;
              const x = 80 + Math.cos(rad) * 52;
              const y = 80 + Math.sin(rad) * 52;
              return (
                <g key={i} transform={`translate(${x}, ${y}) rotate(${angle + 45})`}>
                  {/* Dark pine needles */}
                  <line x1="-8" y1="0" x2="16" y2="0" stroke="#1F4D27" strokeWidth="2.4" strokeLinecap="round" />
                  <line x1="-6" y1="-4" x2="14" y2="4" stroke="#2D6A3B" strokeWidth="2" strokeLinecap="round" />
                  {/* Frosted snowy tips */}
                  <line x1="-3" y1="3" x2="12" y2="-3" stroke="#A7D8B6" strokeWidth="1.2" opacity="0.65" strokeLinecap="round" />
                </g>
              );
            })}
          </svg>

          {/* 2. GRAND RED VELVET BOW AT TOP CENTER */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
            <VelvetGoldBow size={84} />
          </div>

          {/* 3. TWO CUTE SKIING SANTAS ON THE SIDES */}
          {/* Left Skiing Santa */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 z-20">
            <SkiingSantaFigure facing="right" size={44} />
          </div>
          {/* Right Skiing Santa */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 z-20">
            <SkiingSantaFigure facing="left" size={44} />
          </div>

          {/* 4. GLITTER BUTTERFLIES NESTLED ON WREATH */}
          <div className="absolute top-8 left-4 z-15">
            <GlitterButterfly color="gold" size={24} rotation={-20} />
          </div>
          <div className="absolute top-8 right-4 z-15">
            <GlitterButterfly color="red" size={24} rotation={25} />
          </div>
          <div className="absolute bottom-6 left-6 z-15">
            <GlitterButterfly color="red" size={22} rotation={15} />
          </div>
          <div className="absolute bottom-6 right-6 z-15">
            <GlitterButterfly color="gold" size={22} rotation={-15} />
          </div>

          {/* 5. CASCADING GLITTER BAUBLES IN THE CENTER HOLE */}
          {/* Suspended on golden threads cascading downwards */}
          <div className="absolute inset-0 flex justify-center items-start pt-14 pointer-events-none">
            
            {/* Strand 1: Higher Gold Sphere */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 -ml-4 flex flex-col items-center animate-sway-ornament" style={{ animationDuration: '4.8s' }}>
              <div className="w-[1px] h-6 bg-gradient-to-b from-[#FFE066] to-[#D4AF37]" />
              <GlitterSphere type="gold" size={26} id={`${position}-c1`} />
            </div>

            {/* Strand 2: Mid Left Red Sphere */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 -ml-8 flex flex-col items-center animate-sway-ornament" style={{ animationDuration: '5.2s', animationDelay: '0.4s' }}>
              <div className="w-[1px] h-14 bg-gradient-to-b from-[#FFE066] to-[#D4AF37]" />
              <GlitterSphere type="red" size={24} id={`${position}-c2`} />
            </div>

            {/* Strand 3: Mid Right Gold Sphere */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 ml-5 flex flex-col items-center animate-sway-ornament" style={{ animationDuration: '4.4s', animationDelay: '0.8s' }}>
              <div className="w-[1px] h-18 bg-gradient-to-b from-[#FFE066] to-[#D4AF37]" />
              <GlitterSphere type="gold" size={26} id={`${position}-c3`} />
            </div>

            {/* Strand 4: Lower Center Gold Sphere */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 -ml-2 flex flex-col items-center animate-sway-ornament" style={{ animationDuration: '5.6s', animationDelay: '1.2s' }}>
              <div className="w-[1px] h-26 bg-gradient-to-b from-[#FFE066] to-[#D4AF37]" />
              <GlitterSphere type="gold" size={28} id={`${position}-c4`} />
            </div>

            {/* Strand 5: Lower Right Red Sphere */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 ml-7 flex flex-col items-center animate-sway-ornament" style={{ animationDuration: '5s', animationDelay: '0.6s' }}>
              <div className="w-[1px] h-32 bg-gradient-to-b from-[#FFE066] to-[#D4AF37]" />
              <GlitterSphere type="red" size={24} id={`${position}-c5`} />
            </div>

            {/* Strand 6: Lowest Hanging Gold Tip Sphere */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 -ml-7 flex flex-col items-center animate-sway-ornament" style={{ animationDuration: '6s', animationDelay: '1.5s' }}>
              <div className="w-[1px] h-38 bg-gradient-to-b from-[#FFE066] to-[#D4AF37]" />
              <GlitterSphere type="gold" size={26} id={`${position}-c6`} />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

// ─── 6. Electric Fairy Light Cable Across the Top ───
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

// ─── 7. Handcrafted Quilted Poinsettia Flower (For Inferior / Bottom Corners) ───
// Inspired directly by the user's reference image: Quilted artisan Poinsettia with biscuit-quilted padded button,
// layered crimson velvet, emerald green & cream quilted petals with gold piped edge binding and cascading pendant tails.
export const QuiltedPoinsettiaFlower: React.FC<{
  position?: 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position = 'bottom-left', className = '', size = 165 }) => {
  const isRight = position === 'bottom-right';
  const idPrefix = `quiltedPoinsettia-${position}`;

  return (
    <div
      className={`absolute z-20 pointer-events-none select-none transition-transform duration-700 ${
        isRight
          ? '-bottom-2 -right-[82px]'
          : '-bottom-2 -left-[82px]'
      } ${className}`}
      style={{
        transform: isRight ? 'scaleX(-1)' : 'none',
        transformOrigin: isRight ? 'center right' : 'center left'
      }}
    >
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 340 390"
        className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.75)]"
        fill="none"
      >
        <defs>
          {/* Gold Piped Edge Binding Gradient */}
          <linearGradient id={`${idPrefix}-goldPiping`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2A8" />
            <stop offset="35%" stopColor="#E5C158" />
            <stop offset="70%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#7A560C" />
          </linearGradient>

          {/* Crimson Velvet Quilted Gradient */}
          <linearGradient id={`${idPrefix}-quiltRed`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E51B27" />
            <stop offset="30%" stopColor="#BA0D18" />
            <stop offset="75%" stopColor="#80030B" />
            <stop offset="100%" stopColor="#4A0005" />
          </linearGradient>

          {/* Deep Crimson Velvet (Under layer) */}
          <linearGradient id={`${idPrefix}-quiltRedDeep`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BA0D18" />
            <stop offset="60%" stopColor="#6E0008" />
            <stop offset="100%" stopColor="#3B0004" />
          </linearGradient>

          {/* Forest Green Quilted Gradient */}
          <linearGradient id={`${idPrefix}-quiltGreen`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A6635" />
            <stop offset="45%" stopColor="#1B4D25" />
            <stop offset="80%" stopColor="#0E3016" />
            <stop offset="100%" stopColor="#061A0B" />
          </linearGradient>

          {/* Cream / Ivory Quilted Fabric Gradient */}
          <linearGradient id={`${idPrefix}-quiltCream`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFDF2" />
            <stop offset="40%" stopColor="#F7EED8" />
            <stop offset="75%" stopColor="#E4D2B3" />
            <stop offset="100%" stopColor="#C4B08F" />
          </linearGradient>

          {/* Padded Center Button Gradient */}
          <radialGradient id={`${idPrefix}-buttonPuff`} cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#F9F1E2" />
            <stop offset="75%" stopColor="#DFCBB0" />
            <stop offset="100%" stopColor="#8C7350" />
          </radialGradient>

          {/* Drop shadow filter for petals */}
          <filter id={`${idPrefix}-petalShadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        <g transform="translate(170, 160)">
          {/* ─── LAYER 1: CASCADING QUILTED PENDANTS / FAN (Bottom Ribbon Tails) ─── */}
          {[
            { angle: 124, length: 140, type: 'green', width: 26 },
            { angle: 138, length: 165, type: 'cream', width: 28 },
            { angle: 152, length: 185, type: 'green', width: 28 },
            { angle: 166, length: 200, type: 'red', width: 30 },
            { angle: 180, length: 215, type: 'cream', width: 32 }, // Longest center ribbon
            { angle: 194, length: 200, type: 'red', width: 30 },
            { angle: 208, length: 185, type: 'green', width: 28 },
            { angle: 222, length: 165, type: 'cream', width: 28 },
            { angle: 236, length: 140, type: 'green', width: 26 }
          ].map((ribbon, i) => {
            const isCream = ribbon.type === 'cream';
            const isRed = ribbon.type === 'red';
            const isGreen = ribbon.type === 'green';
            const fillUrl = isCream
              ? `url(#${idPrefix}-quiltCream)`
              : isRed
              ? `url(#${idPrefix}-quiltRed)`
              : `url(#${idPrefix}-quiltGreen)`;
            const w = ribbon.width / 2;
            const len = ribbon.length;

            return (
              <g key={`pendant-${i}`} transform={`rotate(${ribbon.angle})`} filter={`url(#${idPrefix}-petalShadow)`}>
                {/* Quilted Pennant Ribbon Body with Pointed Chevron Tip */}
                <path
                  d={`M -${w * 0.7},0 L -${w},${len - 24} L 0,${len} L ${w},${len - 24} L ${w * 0.7},0 Z`}
                  fill={fillUrl}
                  stroke={`url(#${idPrefix}-goldPiping)`}
                  strokeWidth="2.2"
                />
                
                {/* Inner Dashed Quilt Stitching */}
                <path
                  d={`M -${w - 3},${len - 25} L 0,${len - 4} L ${w - 3},${len - 25}`}
                  stroke="#FFF2A8"
                  strokeWidth="1"
                  strokeDasharray="2.5 1.5"
                  fill="none"
                />

                {/* Center Quilted Spine Crease */}
                <line
                  x1="0"
                  y1="10"
                  x2="0"
                  y2={len - 6}
                  stroke={isCream ? '#C5A059' : '#FFE082'}
                  strokeWidth="1.2"
                  strokeDasharray="3 1.5"
                />

                {/* Decorative Quilted Motifs based on type */}
                {isCream && (
                  <g>
                    {/* Quilted Candy Cane */}
                    <path
                      d="M -3,55 C -3,48 5,48 5,55 L 5,85"
                      stroke="#C8102E"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M -3,55 C -3,48 5,48 5,55 L 5,85"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="2 3"
                      fill="none"
                    />
                    {/* Gold Star */}
                    <circle cx="0" cy="115" r="2.2" fill="#E5C158" />
                    <line x1="-5" y1="115" x2="5" y2="115" stroke="#E5C158" strokeWidth="1" />
                    <line x1="0" y1="110" x2="0" y2="120" stroke="#E5C158" strokeWidth="1" />
                  </g>
                )}

                {isGreen && (
                  <g>
                    <circle cx="-3" cy="70" r="2.5" fill="#E51926" />
                    <circle cx="3" cy="72" r="2.2" fill="#FF5252" />
                    <circle cx="0" cy="75" r="2.4" fill="#C40D1D" />
                    <circle cx="-3" cy="120" r="2.5" fill="#E51926" />
                    <circle cx="3" cy="122" r="2.2" fill="#FF5252" />
                    <circle cx="0" cy="125" r="2.4" fill="#C40D1D" />
                  </g>
                )}

                {isRed && (
                  <g>
                    {[65, 110, 150].map((y, sIdx) => (
                      <g key={sIdx} transform={`translate(0, ${y})`}>
                        <circle cx="0" cy="0" r="1.6" fill="#FFF2A8" />
                        <line x1="-5" y1="0" x2="5" y2="0" stroke="#FFE082" strokeWidth="1" />
                        <line x1="0" y1="-5" x2="0" y2="5" stroke="#FFE082" strokeWidth="1" />
                        <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" stroke="#FFE082" strokeWidth="0.8" />
                        <line x1="-3.5" y1="3.5" x2="3.5" y2="-3.5" stroke="#FFE082" strokeWidth="0.8" />
                      </g>
                    ))}
                  </g>
                )}
              </g>
            );
          })}

          {/* ─── LAYER 2: OUTER QUILTED PETALS (Alternating Green & Cream) ─── */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const isCream = i % 2 === 1;
            const fillUrl = isCream ? `url(#${idPrefix}-quiltCream)` : `url(#${idPrefix}-quiltGreen)`;
            const length = 135;
            const width = 36;

            return (
              <g key={`outer-petal-${i}`} transform={`rotate(${angle})`} filter={`url(#${idPrefix}-petalShadow)`}>
                {/* Petal Outer Body */}
                <path
                  d={`M 0,0 C -${width * 0.7},-${length * 0.25} -${width},-${length * 0.65} 0,-${length} C ${width},-${length * 0.65} ${width * 0.7},-${length * 0.25} 0,0 Z`}
                  fill={fillUrl}
                  stroke={`url(#${idPrefix}-goldPiping)`}
                  strokeWidth="2.2"
                />

                {/* Stitched Vein Down Center */}
                <line
                  x1="0"
                  y1="-10"
                  x2="0"
                  y2={-length + 10}
                  stroke={isCream ? '#C5A059' : '#FFE082'}
                  strokeWidth="1.4"
                  strokeDasharray="3 1.5"
                />

                {/* Herringbone Quilt Rib Stitches */}
                {[-30, -55, -80, -105].map((y, idx) => (
                  <g key={idx}>
                    <line x1="0" y1={y} x2={-width * 0.55} y2={y - 12} stroke={isCream ? '#C5A059' : '#FFE082'} strokeWidth="1" strokeDasharray="2 1.2" />
                    <line x1="0" y1={y} x2={width * 0.55} y2={y - 12} stroke={isCream ? '#C5A059' : '#FFE082'} strokeWidth="1" strokeDasharray="2 1.2" />
                  </g>
                ))}

                {/* Holly Leaves on Green Petals */}
                {!isCream && (
                  <g transform={`translate(0, -${length * 0.5})`}>
                    <circle cx="-4" cy="-2" r="2.2" fill="#E51926" />
                    <circle cx="4" cy="-3" r="2" fill="#FF5252" />
                    <circle cx="0" cy="2" r="2.2" fill="#C40D1D" />
                  </g>
                )}
              </g>
            );
          })}

          {/* ─── LAYER 3: MIDDLE QUILTED CRIMSON VELVET PETALS (With Embroidered Stars) ─── */}
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i * 360) / 10 + 18;
            const length = 110;
            const width = 32;

            return (
              <g key={`mid-petal-${i}`} transform={`rotate(${angle})`} filter={`url(#${idPrefix}-petalShadow)`}>
                {/* Velvet Red Petal */}
                <path
                  d={`M 0,0 C -${width * 0.7},-${length * 0.25} -${width},-${length * 0.65} 0,-${length} C ${width},-${length * 0.65} ${width * 0.7},-${length * 0.25} 0,0 Z`}
                  fill={`url(#${idPrefix}-quiltRedDeep)`}
                  stroke={`url(#${idPrefix}-goldPiping)`}
                  strokeWidth="2"
                />

                {/* Center Gold Stitched Spine */}
                <line
                  x1="0"
                  y1="-10"
                  x2="0"
                  y2={-length + 8}
                  stroke="#FFD54F"
                  strokeWidth="1.3"
                  strokeDasharray="3 1.5"
                />

                {/* Gold Embroidered Starburst Stitches */}
                {[-40, -75].map((y, sIdx) => (
                  <g key={sIdx} transform={`translate(0, ${y})`}>
                    <circle cx="0" cy="0" r="1.5" fill="#FFF2A8" />
                    <line x1="-4" y1="0" x2="4" y2="0" stroke="#FFE082" strokeWidth="0.9" />
                    <line x1="0" y1="-4" x2="0" y2="4" stroke="#FFE082" strokeWidth="0.9" />
                    <line x1="-3" y1="-3" x2="3" y2="3" stroke="#FFE082" strokeWidth="0.7" />
                    <line x1="-3" y1="3" x2="3" y2="-3" stroke="#FFE082" strokeWidth="0.7" />
                  </g>
                ))}
              </g>
            );
          })}

          {/* ─── LAYER 4: INNER QUILTED CRIMSON VELVET PETALS (Primary Bloom) ─── */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            const length = 88;
            const width = 28;

            return (
              <g key={`inner-petal-${i}`} transform={`rotate(${angle})`} filter={`url(#${idPrefix}-petalShadow)`}>
                {/* Puffy Red Velvet Petal */}
                <path
                  d={`M 0,0 C -${width * 0.7},-${length * 0.25} -${width},-${length * 0.65} 0,-${length} C ${width},-${length * 0.65} ${width * 0.7},-${length * 0.25} 0,0 Z`}
                  fill={`url(#${idPrefix}-quiltRed)`}
                  stroke={`url(#${idPrefix}-goldPiping)`}
                  strokeWidth="2"
                />

                {/* Prominent Gold Quilted Spine */}
                <line
                  x1="0"
                  y1="-8"
                  x2="0"
                  y2={-length + 6}
                  stroke="#FFF2A8"
                  strokeWidth="1.6"
                  strokeDasharray="3 1.5"
                />

                {/* Herringbone Quilted Veins */}
                {[-22, -42, -62].map((y, vIdx) => (
                  <g key={vIdx}>
                    <line x1="0" y1={y} x2={-width * 0.6} y2={y - 10} stroke="#FFE57F" strokeWidth="1" strokeDasharray="2 1.2" />
                    <line x1="0" y1={y} x2={width * 0.6} y2={y - 10} stroke="#FFE57F" strokeWidth="1" strokeDasharray="2 1.2" />
                  </g>
                ))}
              </g>
            );
          })}

          {/* ─── LAYER 5: CENTER BISCUIT-QUILTED BUTTON (The Padded Tufted Core) ─── */}
          {/* Base Button Shadow */}
          <circle cx="0" cy="0" r="28" fill="rgba(0,0,0,0.5)" />

          {/* 3D Padded Cushion Button */}
          <circle
            cx="0"
            cy="0"
            r="26"
            fill={`url(#${idPrefix}-buttonPuff)`}
            stroke={`url(#${idPrefix}-goldPiping)`}
            strokeWidth="2.2"
          />

          {/* Quilted Diamond Grid Lines */}
          <g stroke="#9C7844" strokeWidth="1" strokeDasharray="2 1.2" opacity="0.85">
            {/* Diagonal Grid / */}
            <line x1="-18" y1="-8" x2="8" y2="18" />
            <line x1="-22" y1="2" x2="2" y2="22" />
            <line x1="-12" y1="-18" x2="18" y2="12" />
            <line x1="-2" y1="-22" x2="22" y2="2" />
            
            {/* Diagonal Grid \ */}
            <line x1="-8" y1="18" x2="18" y2="-8" />
            <line x1="-2" y1="22" x2="22" y2="-2" />
            <line x1="-18" y1="12" x2="12" y2="-18" />
            <line x1="-22" y1="2" x2="2" y2="-22" />
          </g>

          {/* Quilted Tuft Button Stitches at Intersections */}
          {[
            { x: 0, y: 0 },
            { x: -10, y: 0 },
            { x: 10, y: 0 },
            { x: 0, y: -10 },
            { x: 0, y: 10 },
            { x: -7, y: -7 },
            { x: 7, y: -7 },
            { x: -7, y: 7 },
            { x: 7, y: 7 }
          ].map((pt, pIdx) => (
            <g key={pIdx}>
              <circle cx={pt.x} cy={pt.y} r="1.6" fill="#805B27" />
              <circle cx={pt.x - 0.4} cy={pt.y - 0.4} r="1" fill="#FFF9C4" />
            </g>
          ))}

          {/* Central Highlight Glint on Dome */}
          <ellipse cx="-7" cy="-7" rx="5" ry="3" fill="#FFFFFF" opacity="0.65" transform="rotate(-30 -7 -7)" />
        </g>
      </svg>
    </div>
  );
};

// ─── 8. Complete Christmas Section Decor (Master Component) ───
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

      {/* 1. Electric Fairy Light Cable across Top Border */}
      <ElectricFairyLightCable />

      {/* 2. THE 4 CORNERS DECORATION */}
      {/* Top-Left Corner: Handcrafted Santa Skiing Christmas Wreath */}
      <SantaSkiingWreath position="top-left" />

      {/* Top-Right Corner: Handcrafted Santa Skiing Christmas Wreath */}
      <SantaSkiingWreath position="top-right" />

      {/* Bottom-Left Corner: Handcrafted Quilted Poinsettia Flower (deep corner and half) */}
      <QuiltedPoinsettiaFlower position="bottom-left" />

      {/* Bottom-Right Corner: Handcrafted Quilted Poinsettia Flower (deep corner and half) */}
      <QuiltedPoinsettiaFlower position="bottom-right" />

      {/* 3. SUSPENDABLE STARS, BALLOONS & SNOWFLAKES (Hanging from Electric Light Cable) */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none px-28 sm:px-36 lg:px-48 flex justify-between">
        
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
