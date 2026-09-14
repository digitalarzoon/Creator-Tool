import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  tagline?: string;
}

export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="CreatorGrow Logo"
    >
      <defs>
        <filter id="cyanGlowComponent" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#00f2fe" floodOpacity="0.85"/>
          <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#00c6ff" floodOpacity="0.5"/>
        </filter>
        <linearGradient id="triangleGradComp" x1="100" y1="80" x2="420" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#243348"/>
          <stop offset="100%" stopColor="#111827"/>
        </linearGradient>
        <linearGradient id="cyanLineGradComp" x1="140" y1="340" x2="420" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00f2fe"/>
          <stop offset="100%" stopColor="#38bdf8"/>
        </linearGradient>
      </defs>

      {/* Dark Slate Play Triangle */}
      <path 
        d="M 140 85 C 140 70, 155 60, 170 68 L 415 228 C 432 238, 432 262, 415 272 L 170 432 C 155 440, 140 430, 140 415 Z" 
        fill="url(#triangleGradComp)"
        stroke="#334155"
        strokeWidth="4"
      />

      {/* Glowing Neon Cyan Bar Chart & Trend Arrow */}
      <g filter="url(#cyanGlowComponent)">
        {/* Vertical Chart Bars */}
        <path d="M 175 365 L 175 285" stroke="#00f2fe" strokeWidth="13" strokeLinecap="round"/>
        <path d="M 215 365 L 215 225" stroke="#00f2fe" strokeWidth="13" strokeLinecap="round"/>
        <path d="M 255 365 L 255 270" stroke="#00f2fe" strokeWidth="13" strokeLinecap="round"/>
        <path d="M 295 365 L 295 210" stroke="#00f2fe" strokeWidth="13" strokeLinecap="round"/>

        {/* Dynamic Rising Growth Line */}
        <path 
          d="M 155 320 L 215 205 L 270 265 L 395 135" 
          fill="none" 
          stroke="url(#cyanLineGradComp)" 
          strokeWidth="15" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />

        {/* Ascending Arrowhead (↗) */}
        <path 
          d="M 345 135 L 422 108 L 395 185 L 378 152 Z" 
          fill="#00f2fe" 
          stroke="#00f2fe" 
          strokeWidth="4" 
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 38, 
  showText = true,
  tagline = "Smart AI & SEO Growth Suite"
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon size={size} />
      {showText && (
        <div className="flex flex-col">
          <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5 leading-none">
            Creator<span className="text-cyan-500 dark:text-cyan-400">Grow</span>
          </span>
          {tagline && (
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
