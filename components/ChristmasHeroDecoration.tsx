import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * 🎄 ChristmasHeroDecoration
 * 
 * - Suspended fairy light cables with 3D Kraft & Red gift boxes and stars.
 * - Interactive handcrafted Santa Claus in his flying sleigh with Rudolph the reindeer!
 * - When clicked: Santa blasts off flying fast across the screen with magical stardust trail,
 *   disappears into the sky, and smoothly takes the user to the main Christmas section (#christmas-campaign).
 */

// ─── 3D Kraft Gift Box with Satin Red Ribbon ───
const KraftGiftBox: React.FC<{ size?: number; rotation?: number }> = ({ size = 44, rotation = 0 }) => (
  <svg 
    width={size} 
    height={size * 1.15} 
    viewBox="0 0 100 115" 
    className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:scale-110"
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <defs>
      <linearGradient id="kraftTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DEBA88" />
        <stop offset="100%" stopColor="#C49B66" />
      </linearGradient>
      <linearGradient id="kraftLeft" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9C7342" />
        <stop offset="100%" stopColor="#7A562B" />
      </linearGradient>
      <linearGradient id="kraftRight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#BA8F59" />
        <stop offset="100%" stopColor="#9E743F" />
      </linearGradient>
      <linearGradient id="redRibbonTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF3B47" />
        <stop offset="100%" stopColor="#C4151C" />
      </linearGradient>
      <linearGradient id="redRibbonLeft" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A81016" />
        <stop offset="100%" stopColor="#75050A" />
      </linearGradient>
      <linearGradient id="redRibbonRight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D41820" />
        <stop offset="100%" stopColor="#9E0C12" />
      </linearGradient>
      <radialGradient id="ribbonGleam" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFA6AC" />
        <stop offset="50%" stopColor="#D41820" />
        <stop offset="100%" stopColor="#82080D" />
      </radialGradient>
    </defs>
    <polygon points="50,22 88,38 50,54 12,38" fill="url(#kraftTop)" />
    <polygon points="44,24.5 56,29.5 56,46.5 44,41.5" fill="url(#redRibbonTop)" />
    <polygon points="26,32 36,28 74,44 64,48" fill="url(#redRibbonTop)" />
    <polygon points="12,38 50,54 50,96 12,80" fill="url(#kraftLeft)" />
    <polygon points="27,44.5 35,47.8 35,89.5 27,86.2" fill="url(#redRibbonLeft)" />
    <polygon points="50,54 88,38 88,80 50,96" fill="url(#kraftRight)" />
    <polygon points="65,47.8 73,44.5 73,86.2 65,89.5" fill="url(#redRibbonRight)" />
    <g transform="translate(50, 22)">
      <path d="M 0,0 C -14,-14 -22,-3 -10,3 C -4,6 0,0 0,0" fill="url(#ribbonGleam)" stroke="#7A050A" strokeWidth="0.8" />
      <path d="M 0,0 C 14,-14 22,-3 10,3 C 4,6 0,0 0,0" fill="url(#ribbonGleam)" stroke="#7A050A" strokeWidth="0.8" />
      <path d="M -2,2 C -8,9 -12,18 -15,22 C -11,20 -7,19 -5,17 C -3,11 -1,4 -2,2" fill="url(#redRibbonLeft)" />
      <path d="M 2,2 C 8,9 12,18 15,22 C 11,20 7,19 5,17 C 3,11 1,4 2,2" fill="url(#redRibbonRight)" />
      <ellipse cx="0" cy="1" rx="4.5" ry="3.5" fill="url(#ribbonGleam)" stroke="#610206" strokeWidth="0.8" />
    </g>
  </svg>
);

// ─── 3D Ruby Red Gift Box with Satin Gold Ribbon ───
const RedGiftBox: React.FC<{ size?: number; rotation?: number }> = ({ size = 46, rotation = 0 }) => (
  <svg 
    width={size} 
    height={size * 1.15} 
    viewBox="0 0 100 115" 
    className="drop-shadow-[0_10px_20px_rgba(139,0,0,0.65)] transition-transform duration-500 hover:scale-110"
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <defs>
      <linearGradient id="boxRedTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C91823" />
        <stop offset="100%" stopColor="#960E15" />
      </linearGradient>
      <linearGradient id="boxRedLeft" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7A080E" />
        <stop offset="100%" stopColor="#4A0206" />
      </linearGradient>
      <linearGradient id="boxRedRight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A8121A" />
        <stop offset="100%" stopColor="#6E090E" />
      </linearGradient>
      <linearGradient id="goldRibbonTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF3B0" />
        <stop offset="50%" stopColor="#E5C158" />
        <stop offset="100%" stopColor="#B38927" />
      </linearGradient>
      <linearGradient id="goldRibbonLeft" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#C49A33" />
        <stop offset="100%" stopColor="#7E5F18" />
      </linearGradient>
      <linearGradient id="goldRibbonRight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F5D77F" />
        <stop offset="100%" stopColor="#B08625" />
      </linearGradient>
      <radialGradient id="goldKnot" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFADB" />
        <stop offset="55%" stopColor="#E5C158" />
        <stop offset="100%" stopColor="#8A6615" />
      </radialGradient>
    </defs>
    <polygon points="50,22 88,38 50,54 12,38" fill="url(#boxRedTop)" />
    <polygon points="44,24.5 56,29.5 56,46.5 44,41.5" fill="url(#goldRibbonTop)" />
    <polygon points="26,32 36,28 74,44 64,48" fill="url(#goldRibbonTop)" />
    <polygon points="12,38 50,54 50,96 12,80" fill="url(#boxRedLeft)" />
    <polygon points="27,44.5 35,47.8 35,89.5 27,86.2" fill="url(#goldRibbonLeft)" />
    <polygon points="50,54 88,38 88,80 50,96" fill="url(#boxRedRight)" />
    <polygon points="65,47.8 73,44.5 73,86.2 65,89.5" fill="url(#goldRibbonRight)" />
    <g transform="translate(50, 22)">
      <path d="M 0,0 C -15,-15 -23,-3 -11,4 C -4,7 0,0 0,0" fill="url(#goldKnot)" stroke="#664C0F" strokeWidth="0.8" />
      <path d="M 0,0 C 15,-15 23,-3 11,4 C 4,7 0,0 0,0" fill="url(#goldKnot)" stroke="#664C0F" strokeWidth="0.8" />
      <path d="M -2,2 C -7,10 -11,18 -14,23 C -10,21 -6,20 -4,17 C -2,12 -1,5 -2,2" fill="url(#goldRibbonLeft)" />
      <path d="M 2,2 C 7,10 11,18 14,23 C 10,21 6,20 4,17 C 2,12 1,5 2,2" fill="url(#goldRibbonRight)" />
      <ellipse cx="0" cy="1" rx="4.8" ry="3.8" fill="url(#goldKnot)" stroke="#523C0A" strokeWidth="0.8" />
    </g>
  </svg>
);

// ─── 3D Faceted Golden Star ───
const GoldStar: React.FC<{ size?: number; rotation?: number }> = ({ size = 28, rotation = 0 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className="drop-shadow-[0_0_12px_rgba(255,215,0,0.75)] transition-transform duration-500 hover:rotate-12 hover:scale-125"
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <defs>
      <linearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF9D2" />
        <stop offset="100%" stopColor="#F5D061" />
      </linearGradient>
      <linearGradient id="goldDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4A732" />
        <stop offset="100%" stopColor="#8C6611" />
      </linearGradient>
    </defs>
    <polygon points="50,5 50,50 64,38" fill="url(#goldLight)" />
    <polygon points="98,35 50,50 73,63" fill="url(#goldLight)" />
    <polygon points="79,90 50,50 50,75" fill="url(#goldLight)" />
    <polygon points="21,90 50,50 27,63" fill="url(#goldLight)" />
    <polygon points="2,35 50,50 36,38" fill="url(#goldLight)" />
    <polygon points="50,5 50,50 36,38" fill="url(#goldDark)" />
    <polygon points="98,35 50,50 64,38" fill="url(#goldDark)" />
    <polygon points="79,90 50,50 73,63" fill="url(#goldDark)" />
    <polygon points="21,90 50,50 50,75" fill="url(#goldDark)" />
    <polygon points="2,35 50,50 27,63" fill="url(#goldDark)" />
    <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
  </svg>
);

// ─── 3D Frosted Crystal White Star ───
const WhiteStar: React.FC<{ size?: number; rotation?: number }> = ({ size = 26, rotation = 0 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className="drop-shadow-[0_0_14px_rgba(255,255,255,0.95)] transition-transform duration-500 hover:rotate-12 hover:scale-125"
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <defs>
      <linearGradient id="whiteBright" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2F1FF" />
      </linearGradient>
      <linearGradient id="whiteSoft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C4E0FA" />
        <stop offset="100%" stopColor="#8FC0ED" />
      </linearGradient>
    </defs>
    <polygon points="50,5 50,50 64,38" fill="url(#whiteBright)" />
    <polygon points="98,35 50,50 73,63" fill="url(#whiteBright)" />
    <polygon points="79,90 50,50 50,75" fill="url(#whiteBright)" />
    <polygon points="21,90 50,50 27,63" fill="url(#whiteBright)" />
    <polygon points="2,35 50,50 36,38" fill="url(#whiteBright)" />
    <polygon points="50,5 50,50 36,38" fill="url(#whiteSoft)" />
    <polygon points="98,35 50,50 64,38" fill="url(#whiteSoft)" />
    <polygon points="79,90 50,50 73,63" fill="url(#whiteSoft)" />
    <polygon points="21,90 50,50 50,75" fill="url(#whiteSoft)" />
    <polygon points="2,35 50,50 27,63" fill="url(#whiteSoft)" />
    <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />
  </svg>
);

// ─── Shiny Christmas Bauble Ball ───
const Bauble: React.FC<{ size?: number; color?: 'red' | 'gold' }> = ({ size = 20, color = 'red' }) => (
  <svg 
    width={size} 
    height={size * 1.25} 
    viewBox="0 0 100 125" 
    className="drop-shadow-[0_6px_12px_rgba(0,0,0,0.4)]"
  >
    <defs>
      <radialGradient id="redBauble" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FF7079" />
        <stop offset="25%" stopColor="#D91824" />
        <stop offset="70%" stopColor="#7E0810" />
        <stop offset="100%" stopColor="#3B0105" />
      </radialGradient>
      <radialGradient id="goldBauble" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFDE0" />
        <stop offset="30%" stopColor="#F5D061" />
        <stop offset="75%" stopColor="#9C731A" />
        <stop offset="100%" stopColor="#4A3406" />
      </radialGradient>
    </defs>
    <rect x="42" y="10" width="16" height="12" rx="2" fill="#D4AF37" stroke="#8C6611" strokeWidth="1" />
    <ellipse cx="50" cy="8" rx="6" ry="6" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
    <circle cx="50" cy="72" r="48" fill={color === 'red' ? 'url(#redBauble)' : 'url(#goldBauble)'} />
    <ellipse cx="38" cy="50" rx="14" ry="8" fill="white" opacity="0.45" transform="rotate(-30 38 50)" />
  </svg>
);

// ─── Glowing Fairy Light LED Node ───
const FairyLed: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <span 
    className="relative inline-flex items-center justify-center my-1.5"
    style={{ animation: `twinkle 2.4s ease-in-out infinite ${delay}s` }}
  >
    <span className="w-2 h-2 rounded-full bg-[#FFF9D2] shadow-[0_0_8px_#FFE066,0_0_16px_#FFC107,0_0_24px_rgba(255,215,0,0.8)]" />
    <span className="absolute w-4 h-4 rounded-full bg-amber-400/30 animate-ping" style={{ animationDuration: '3s', animationDelay: `${delay}s` }} />
  </span>
);

// ─── 🎅 Santa Claus in Flying Sleigh with Rudolph Reindeer (Handcrafted Vector Illustration) ───
const SantaClausSleighSVG: React.FC = () => (
  <svg 
    viewBox="0 0 320 180" 
    className="w-48 sm:w-56 md:w-64 h-auto select-none overflow-visible filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
  >
    <defs>
      {/* Golden Runner & Trim Gradients */}
      <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF3B0" />
        <stop offset="40%" stopColor="#E5C158" />
        <stop offset="100%" stopColor="#9C731A" />
      </linearGradient>
      {/* Sleigh Body Gradient */}
      <linearGradient id="sleighRed" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#DC141E" />
        <stop offset="60%" stopColor="#A80D14" />
        <stop offset="100%" stopColor="#5E0308" />
      </linearGradient>
      {/* Santa Red Suit */}
      <linearGradient id="santaRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF2E38" />
        <stop offset="100%" stopColor="#B30E16" />
      </linearGradient>
      {/* Reindeer Coat Gradient */}
      <linearGradient id="reindeerFur" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D99B58" />
        <stop offset="60%" stopColor="#B87836" />
        <stop offset="100%" stopColor="#8A511C" />
      </linearGradient>
      <linearGradient id="reindeerBelly" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF5E6" />
        <stop offset="100%" stopColor="#E6C8A8" />
      </linearGradient>
      {/* Stardust Glow */}
      <radialGradient id="magicGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE066" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FFC107" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* ═════════════════════════════════════════════════
        1. SLEIGH (Back Left, Coordinates 30 to 140)
       ═════════════════════════════════════════════════ */}
    <g transform="translate(10, 20)">
      {/* Golden Sleigh Runners */}
      <path 
        d="M 10,120 Q 25,120 40,120 L 105,120 Q 120,120 128,112 Q 135,102 130,90 Q 125,82 118,84 Q 112,86 114,92 Q 116,98 110,105 L 35,105 Q 20,105 12,112 Z" 
        fill="url(#goldTrim)" 
        stroke="#6E4C0A" 
        strokeWidth="1"
      />
      {/* Front Curl of Runner */}
      <path 
        d="M 10,120 C -2,120 -8,110 -6,98 C -4,86 8,82 12,88 C 14,92 10,96 6,94 C 3,92 2,96 4,104 C 6,112 12,114 18,114 Z" 
        fill="url(#goldTrim)" 
      />
      {/* Vertical Runner Struts */}
      <rect x="35" y="98" width="6" height="15" rx="2" fill="url(#goldTrim)" />
      <rect x="85" y="98" width="6" height="15" rx="2" fill="url(#goldTrim)" />

      {/* Gifts Bag in Sleigh Back */}
      <path d="M 22,60 C 15,40 40,30 48,45 C 52,38 68,36 65,58 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1" />
      {/* Gift Box peaking out */}
      <rect x="26" y="42" width="22" height="20" rx="2" fill="#00838F" />
      <line x1="37" y1="42" x2="37" y2="62" stroke="#FFD54F" strokeWidth="3" />
      <line x1="26" y1="52" x2="48" y2="52" stroke="#FFD54F" strokeWidth="3" />
      <rect x="36" y="38" width="8" height="6" rx="1" fill="#FFC107" />

      {/* Red Sleigh Body */}
      <path 
        d="M 22,65 Q 20,95 42,98 L 98,98 Q 115,96 118,78 Q 120,62 108,55 Q 98,50 88,58 L 78,65 Q 45,68 35,62 Z" 
        fill="url(#sleighRed)" 
        stroke="#3E0205" 
        strokeWidth="1"
      />

      {/* Ornate Gold Trim on Sleigh Rim */}
      <path 
        d="M 20,65 Q 28,62 38,62 Q 55,68 85,62 Q 95,58 105,55 Q 118,52 118,70 Q 118,85 105,94 L 45,95 Q 26,92 23,68 Z" 
        fill="none" 
        stroke="url(#goldTrim)" 
        strokeWidth="3.5" 
        strokeLinecap="round"
      />
      <circle cx="108" cy="55" r="4" fill="url(#goldTrim)" />
      <circle cx="21" cy="65" r="3.5" fill="url(#goldTrim)" />

      {/* ── SANTA CLAUS ── */}
      {/* Santa Torso */}
      <ellipse cx="65" cy="58" rx="22" ry="20" fill="url(#santaRed)" />
      {/* Black Belt */}
      <path d="M 45,64 Q 65,68 85,64" stroke="#121212" strokeWidth="7" fill="none" />
      {/* Gold Belt Buckle */}
      <rect x="60" y="60" width="10" height="9" rx="1.5" fill="none" stroke="url(#goldTrim)" strokeWidth="2.5" />
      {/* White Fur Trim on Coat Edge */}
      <path d="M 43,72 Q 65,77 87,72" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* Santa Head & Beard */}
      <circle cx="68" cy="36" r="11" fill="#FFD1B3" />
      <circle cx="64" cy="37" r="3" fill="#FF8A80" opacity="0.6" /> {/* Rosy cheek */}
      <circle cx="73" cy="36" r="1.5" fill="#1A1A1A" /> {/* Eye */}
      {/* White Fluffy Beard */}
      <path 
        d="M 58,35 C 55,48 60,62 70,62 C 80,62 84,48 80,35 C 76,40 70,42 66,41 C 62,42 59,38 58,35 Z" 
        fill="#FFFFFF" 
        stroke="#E2E8F0" 
        strokeWidth="0.8"
      />
      {/* White Mustache */}
      <path d="M 68,39 C 62,37 57,41 58,45 C 64,44 68,41 68,41 C 68,41 72,44 78,45 C 79,41 74,37 68,39 Z" fill="#FFFFFF" />

      {/* Santa Red Hat */}
      <path d="M 57,30 C 58,16 75,14 80,24 C 82,18 70,10 52,18 C 45,22 46,30 52,32 Z" fill="url(#santaRed)" />
      {/* White Fur Hat Band */}
      <ellipse cx="68" cy="28" rx="13" ry="4" fill="#FFFFFF" />
      {/* Hat Pompom */}
      <circle cx="48" cy="30" r="4.5" fill="#FFFFFF" />

      {/* Santa Arm holding reins */}
      <path d="M 74,52 Q 90,52 98,58" stroke="url(#santaRed)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <circle cx="95" cy="56" r="4" fill="#FFFFFF" /> {/* Cuff */}
      <circle cx="98" cy="58" r="4.5" fill="url(#santaRed)" /> {/* Mitten */}

      {/* ── Reins from Santa to Rudolph ── */}
      <path d="M 98,58 Q 140,65 185,62" fill="none" stroke="#D32F2F" strokeWidth="1.8" strokeDasharray="3 1" />
      <path d="M 98,58 Q 145,72 195,68" fill="none" stroke="#D32F2F" strokeWidth="1.8" />
    </g>

    {/* ═════════════════════════════════════════════════
        2. RUDOLPH THE REINDEER (Flying in Front)
       ═════════════════════════════════════════════════ */}
    <g transform="translate(175, 25)">
      {/* Back Legs (Leaping backward in air) */}
      <path d="M 25,60 C 15,70 5,82 -8,86 C -4,80 8,68 18,52" fill="url(#reindeerFur)" />
      <path d="M 32,58 C 24,72 16,86 6,94 C 10,88 20,74 26,52" fill="url(#reindeerFur)" />

      {/* Reindeer Body */}
      <path 
        d="M 20,52 C 16,40 30,30 48,34 C 65,37 72,45 68,60 C 60,68 35,66 20,52 Z" 
        fill="url(#reindeerFur)" 
      />
      {/* White Chest & Belly */}
      <path d="M 42,42 C 55,44 65,52 62,60 C 52,65 40,58 35,52 Z" fill="url(#reindeerBelly)" />

      {/* Cute Little Tail */}
      <path d="M 16,42 Q 10,38 12,46 Z" fill="#FFF5E6" />

      {/* Front Leaping Legs (Tucked & Reaching Forward) */}
      <path d="M 60,56 C 68,66 76,78 88,80 C 82,74 74,62 65,52" fill="url(#reindeerFur)" />
      <path d="M 66,54 C 75,60 84,65 96,66 C 88,60 78,54 68,48" fill="url(#reindeerFur)" />

      {/* Reindeer Neck & Head */}
      <path d="M 52,36 C 56,22 68,14 78,16 C 84,18 88,24 82,32 C 75,40 64,44 52,36 Z" fill="url(#reindeerFur)" />
      {/* Muzzle */}
      <ellipse cx="84" cy="22" rx="7" ry="5.5" fill="#FDF3E3" />
      {/* Shiny Red Nose (Rudolph!) */}
      <circle cx="90" cy="20" r="3.8" fill="#FF1744" className="animate-pulse" />
      <circle cx="89" cy="19" r="1.2" fill="#FFFFFF" /> {/* Nose shine */}

      {/* Big Friendly Eye */}
      <ellipse cx="77" cy="18" rx="2.5" ry="3" fill="#2E1C0C" />
      <circle cx="76.5" cy="17" r="1" fill="#FFFFFF" />

      {/* Ears */}
      <path d="M 68,16 C 62,10 65,6 70,12 Z" fill="url(#reindeerFur)" />

      {/* Magnificent Golden Antlers */}
      <path 
        d="M 72,12 C 72,0 80,-8 86,-12 C 84,-6 80,0 76,8 Z" 
        fill="url(#goldTrim)" 
        stroke="#7A5618" 
        strokeWidth="0.8" 
      />
      <path d="M 77,-2 C 84,-4 88,-2 86,2 Z" fill="url(#goldTrim)" />
      <path d="M 80,-7 C 88,-10 92,-8 89,-4 Z" fill="url(#goldTrim)" />

      <path 
        d="M 68,11 C 65,2 69,-5 74,-8 C 72,-3 70,2 69,8 Z" 
        fill="url(#goldTrim)" 
        stroke="#7A5618" 
        strokeWidth="0.8" 
      />
      <path d="M 68,-1 C 63,-3 61,0 64,3 Z" fill="url(#goldTrim)" />

      {/* Red Jingle Bell Collar */}
      <path d="M 58,28 Q 66,35 70,30" stroke="#C62828" strokeWidth="4" fill="none" />
      <circle cx="61" cy="33" r="2.8" fill="url(#goldTrim)" />
      <circle cx="67" cy="31" r="2.8" fill="url(#goldTrim)" />
    </g>

    {/* ═════════════════════════════════════════════════
        3. MAGIC STARDUST & SPARKLING TRAIL
       ═════════════════════════════════════════════════ */}
    <g className="animate-pulse" style={{ animationDuration: '2s' }}>
      <circle cx="20" cy="110" r="12" fill="url(#magicGlow)" />
      <circle cx="60" cy="122" r="8" fill="url(#magicGlow)" />
      <path d="M 5,105 Q 15,108 8,118 Q 20,112 12,122" stroke="#FFE082" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <polygon points="15,95 17,100 22,100 18,103 20,108 15,105 10,108 12,103 8,100 13,100" fill="#FFF59D" />
      <polygon points="40,115 41,118 45,118 42,120 43,124 40,122 37,124 38,120 35,118 39,118" fill="#FFFFFF" />
      <polygon points="295,45 296,48 300,48 297,50 298,54 295,52 292,54 293,50 290,48 294,48" fill="#FFE082" />
    </g>
  </svg>
);

export const ChristmasHeroDecoration: React.FC = () => {
  const { t } = useLanguage();
  const [isFlying, setIsFlying] = useState(false);

  const handleSantaLaunch = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFlying) return;

    // Trigger Santa flight launch!
    setIsFlying(true);

    // Smoothly scroll down to the Christmas section as Santa flies across the sky
    setTimeout(() => {
      const section = document.getElementById('christmas-campaign');
      if (section) {
        const isMobile = window.innerWidth < 640;
        const headerHeight = isMobile ? 64 : 70;
        const targetY = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth'
        });
      }
    }, 450);

    // Reset Santa's position gracefully after flight completes
    setTimeout(() => {
      setIsFlying(false);
    }, 3200);
  };

  return (
    <>
      {/* ─── 1. UPPER HANGING STRANDS (4 lines on mobile, 5 lines on desktop) ─── */}
      <div 
        id="christmas-hero-strands"
        className="absolute top-0 right-1 sm:right-3 md:right-6 lg:right-8 xl:right-10 z-20 pointer-events-none select-none flex items-start space-x-1 sm:space-x-3 md:space-x-4 lg:space-x-5 xl:space-x-6 px-1 overflow-visible scale-x-[0.65] scale-y-[0.78] sm:scale-75 md:scale-90 lg:scale-100 origin-top-right"
      >
        {/* ═════════════════════════════════════════════════════
            STRAND 1 — Left strand of cluster
           ═════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ y: -800, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 36, damping: 12, delay: 0.1 }}
          className="flex flex-col items-center origin-top animate-subtle-sway-1"
          style={{ width: '42px' }}
        >
          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-amber-300 to-[#C5A059] h-12 sm:h-16 lg:h-24 flex flex-col items-center justify-around">
            <FairyLed delay={0.2} />
          </div>
          <WhiteStar size={20} rotation={-8} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-[#8B0000] to-[#C5A059] h-16 sm:h-20 lg:h-28 flex flex-col items-center justify-around">
            <FairyLed delay={0.7} />
          </div>
          <KraftGiftBox size={36} rotation={-6} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-amber-200 to-[#C5A059] h-16 sm:h-20 lg:h-28 flex flex-col items-center justify-around">
            <FairyLed delay={1.9} />
          </div>
          <GoldStar size={22} rotation={12} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] to-amber-300 h-12 sm:h-16 lg:h-24 flex flex-col items-center justify-center">
            <FairyLed delay={2.2} />
          </div>
          <Bauble size={16} color="gold" />
        </motion.div>


        {/* ═════════════════════════════════════════════════════
            STRAND 2 — Center-Left Strand
           ═════════════════════════════════════════════════ */}
        <motion.div
          initial={{ y: -900, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 32, damping: 11, delay: 0.25 }}
          className="flex flex-col items-center origin-top animate-subtle-sway-2"
          style={{ width: '46px' }}
        >
          <div className="w-[1.5px] bg-gradient-to-b from-[#8B0000] via-[#C5A059] to-[#8B0000] h-12 sm:h-16 lg:h-24 flex flex-col items-center justify-center">
            <FairyLed delay={0.4} />
          </div>
          <GoldStar size={26} rotation={6} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#8B0000] via-amber-400 to-[#8B0000] h-16 sm:h-24 lg:h-32 flex flex-col items-center justify-around">
            <FairyLed delay={1.1} />
          </div>
          <RedGiftBox size={40} rotation={8} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-white to-[#C5A059] h-16 sm:h-24 lg:h-32 flex flex-col items-center justify-around">
            <FairyLed delay={0.9} />
          </div>
          <WhiteStar size={24} rotation={-14} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#8B0000] via-[#C5A059] to-[#8B0000] h-16 sm:h-24 lg:h-32 flex flex-col items-center justify-around">
            <FairyLed delay={1.5} />
          </div>
          <KraftGiftBox size={38} rotation={-10} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] to-red-400 h-14 sm:h-20 lg:h-28 flex flex-col items-center justify-center">
            <FairyLed delay={2.4} />
          </div>
          <Bauble size={18} color="red" />
        </motion.div>


        {/* ═════════════════════════════════════════════════════
            STRAND 3 — Center Balance Strand (Extended a little bit)
           ═════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ y: -850, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 38, damping: 12, delay: 0.18 }}
          className="flex flex-col items-center origin-top animate-subtle-sway-3"
          style={{ width: '44px' }}
        >
          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-amber-300 to-[#C5A059] h-16 sm:h-22 lg:h-30 flex flex-col items-center justify-around">
            <FairyLed delay={0.6} />
          </div>
          <KraftGiftBox size={36} rotation={7} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-white to-[#C5A059] h-18 sm:h-26 lg:h-34 flex flex-col items-center justify-around">
            <FairyLed delay={1.7} />
          </div>
          <GoldStar size={24} rotation={-5} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-[#8B0000] to-[#C5A059] h-20 sm:h-26 lg:h-34 flex flex-col items-center justify-around">
            <FairyLed delay={1.0} />
          </div>
          <RedGiftBox size={38} rotation={-9} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-white to-[#C5A059] h-20 sm:h-26 lg:h-34 flex flex-col items-center justify-around">
            <FairyLed delay={1.8} />
          </div>
          <WhiteStar size={20} rotation={10} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] to-amber-300 h-18 sm:h-24 lg:h-30 flex flex-col items-center justify-center">
            <FairyLed delay={2.5} />
          </div>
          <Bauble size={16} color="gold" />
        </motion.div>


        {/* ═════════════════════════════════════════════════════
            STRAND 4 — Deepest Strand (Hidden on mobile for 4-strand layout, desktop only)
           ═════════════════════════════════════════════════ */}
        <motion.div
          initial={{ y: -950, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 30, damping: 10, delay: 0.35 }}
          className="hidden sm:flex flex-col items-center origin-top animate-subtle-sway-1"
          style={{ width: '48px' }}
        >
          <div className="w-[1.5px] bg-gradient-to-b from-amber-400 via-[#C5A059] to-amber-200 h-14 sm:h-20 lg:h-28 flex flex-col items-center justify-around">
            <FairyLed delay={0.5} />
          </div>
          <WhiteStar size={22} rotation={9} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-[#8B0000] to-[#C5A059] h-16 sm:h-24 lg:h-36 flex flex-col items-center justify-around">
            <FairyLed delay={1.2} />
          </div>
          <RedGiftBox size={40} rotation={-8} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-amber-200 to-[#C5A059] h-20 sm:h-28 lg:h-36 flex flex-col items-center justify-around">
            <FairyLed delay={0.9} />
          </div>
          <GoldStar size={26} rotation={-11} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-[#8B0000] to-[#C5A059] h-20 sm:h-28 lg:h-40 flex flex-col items-center justify-around">
            <FairyLed delay={1.4} />
          </div>
          <KraftGiftBox size={40} rotation={11} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] to-red-400 h-16 sm:h-24 lg:h-32 flex flex-col items-center justify-center">
            <FairyLed delay={2.8} />
          </div>
          <Bauble size={18} color="red" />
        </motion.div>


        {/* ═════════════════════════════════════════════════════
            STRAND 5 — Outer Right Edge Strand (Last cable, extended more to be longer than all others)
           ═════════════════════════════════════════════════ */}
        <motion.div
          initial={{ y: -950, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 40, damping: 12, delay: 0.28 }}
          className="flex flex-col items-center origin-top animate-subtle-sway-3"
          style={{ width: '40px' }}
        >
          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-amber-300 to-[#C5A059] h-16 sm:h-24 lg:h-32 flex flex-col items-center justify-around">
            <FairyLed delay={0.3} />
          </div>
          <GoldStar size={20} rotation={8} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-[#8B0000] to-[#C5A059] h-20 sm:h-28 lg:h-36 flex flex-col items-center justify-around">
            <FairyLed delay={1.6} />
          </div>
          <KraftGiftBox size={34} rotation={-5} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-white to-[#C5A059] h-22 sm:h-30 lg:h-38 flex flex-col items-center justify-around">
            <FairyLed delay={0.9} />
          </div>
          <WhiteStar size={20} rotation={-14} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-[#8B0000] to-[#C5A059] h-24 sm:h-32 lg:h-42 flex flex-col items-center justify-around">
            <FairyLed delay={1.8} />
          </div>
          <RedGiftBox size={36} rotation={7} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] via-amber-200 to-[#C5A059] h-24 sm:h-32 lg:h-42 flex flex-col items-center justify-around">
            <FairyLed delay={1.2} />
          </div>
          <GoldStar size={22} rotation={10} />

          <div className="w-[1.5px] bg-gradient-to-b from-[#C5A059] to-amber-300 h-22 sm:h-28 lg:h-36 flex flex-col items-center justify-center">
            <FairyLed delay={2.5} />
          </div>
          <Bauble size={18} color="gold" />
        </motion.div>
      </div>


      {/* ─── 2. SANTA CLAUS & FREE-FLOATING TYPOGRAPHIC CTA (Inferior zone without crossing hero boundary) ─── */}
      <div 
        className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 right-1 sm:right-3 md:right-6 lg:right-8 xl:right-10 z-30 pointer-events-auto flex flex-col items-center select-none scale-[0.62] sm:scale-75 md:scale-90 lg:scale-100 origin-bottom-right"
      >
        {/* Floating Festive Free-Form Typography CTA (No card, no box) */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={
            isFlying 
              ? { opacity: 0, y: -16, scale: 0.9, transition: { duration: 0.2 } }
              : { opacity: 1, y: 0, scale: 1, transition: { delay: 0.4, duration: 0.5 } }
          }
          className="mb-0.5 pointer-events-auto cursor-pointer group flex flex-col items-center text-center select-none px-2 transition-transform duration-300 hover:scale-105 active:scale-95"
          onClick={handleSantaLaunch}
          role="button"
          tabIndex={0}
          aria-label="Campagne Solidarité de Noël"
        >
          {/* Top Line: Noel in gold luxury serif style */}
          <span className="text-[#C5A059] font-serif text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.32em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] transition-all duration-300 group-hover:text-amber-300 group-hover:tracking-[0.38em]">
            {t('christmas_campaign.pop_badge')}
          </span>

          {/* Center Line: SOLIDARITE below in prominent crisp white serif */}
          <span className="text-white font-serif text-lg sm:text-xl md:text-2xl font-extrabold tracking-[0.18em] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.98)] leading-tight my-0.5 transition-colors duration-300 group-hover:text-amber-100">
            {t('christmas_campaign.pop_title')}
          </span>

          {/* Bottom Line: CLICK text cta in discret and compact but visible */}
          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.22em] text-[#FFE082] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] transition-all duration-300 group-hover:text-white group-hover:tracking-[0.28em]">
            <Sparkles className="w-2.5 h-2.5 text-[#C5A059] group-hover:text-amber-200 animate-pulse" />
            <span>{t('christmas_campaign.pop_click')}</span>
            <span className="text-[10px] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </motion.div>

        {/* Santa & Sleigh Container with interactive flight launcher to the RIGHT */}
        <motion.div
          animate={
            isFlying
              ? {
                  // Rocket Flight fast to the RIGHT side and disappear into the night sky!
                  x: [0, 90, 450, 1100, 1900],
                  y: [0, -15, -60, -160, -320],
                  rotate: [0, -3, -8, -14, -20],
                  scale: [1, 1.12, 1.05, 0.85, 0.25],
                  opacity: [1, 1, 1, 0.8, 0],
                  transition: {
                    duration: 0.95,
                    ease: [0.25, 0.1, 0.25, 1],
                  }
                }
              : {
                  // Idle Gentle Floating Hover Animation
                  x: [0, 4, 0, -4, 0],
                  y: [0, -6, 0, -3, 0],
                  rotate: [0, 1.5, 0, -1, 0],
                  scale: 1,
                  opacity: 1,
                  transition: {
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
          }
          onClick={handleSantaLaunch}
          role="button"
          tabIndex={0}
          aria-label="Santa Claus flying to Christmas Campaign"
          className="cursor-pointer group relative origin-center"
          whileHover={!isFlying ? { scale: 1.08, filter: "drop-shadow(0 0 16px rgba(255, 215, 0, 0.8))" } : {}}
          whileTap={!isFlying ? { scale: 0.95 } : {}}
        >
          {/* Subtle Golden Glow behind Sleigh on hover */}
          <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Handcrafted Santa Claus in Sleigh */}
          <SantaClausSleighSVG />

          {/* Stardust particles trailing behind when flying fast to the RIGHT */}
          {isFlying && (
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
              <span className="text-xl animate-ping text-amber-300">✨</span>
              <span className="text-sm animate-pulse text-white">⭐</span>
              <span className="text-lg animate-ping text-[#FFE082]">❄️</span>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};
