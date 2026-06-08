/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import inforLogo from '@/assets/.aistudio/建資社徽.png';
import zsiscLogo from '@/assets/.aistudio/楓資社徽.jpg';
import ckcscLogo from '@/assets/.aistudio/成電社徽.jpg';
import cgiscLogo from '@/assets/.aistudio/景資社徽.jpg';
import heroLogo from '@/assets/.aistudio/hero-logo.png';

// Common style wrapper for SVGs to handle unified brand neon glow effects
export const SVGGlowFilters: React.FC = () => (
  <svg className="absolute w-0 h-0" aria-hidden="true" width="0" height="0">
    <defs>
      <filter id="glow-brand" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);

interface BadgeProps {
  size?: number | string;
  animate?: boolean;
  className?: string;
  onClick?: () => void;
}

// 1. INFOR Emblem (星光黃 Hexagon)
export const INFORBadge: React.FC<BadgeProps> = ({ size = 120, animate = true, className = '', onClick }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center cursor-pointer select-none ${className} ${animate ? 'transition-all duration-300 hover:scale-105 active:scale-95' : ''}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full"
      >
        {/* Hexagonal Tech Background Grid */}
        <polygon 
          points="50,5 90,28 90,72 50,95 10,72 10,28" 
          fill="rgba(42, 31, 0, 0.9)" 
          stroke="#3A2A00" 
          strokeWidth="3.5"
        />
        <polygon 
          points="50,9 86,30 86,70 50,91 14,70 14,30" 
          fill="none" 
          stroke="#F5C542" 
          strokeWidth="1.5" 
          className="opacity-40"
        />

        {/* Outer tech circles */}
        <circle cx="50" cy="50" r="32" fill="none" stroke="#F5C542" strokeWidth="1" strokeDasharray="3,3" className="opacity-50" />

        {/* Tech decorative cross/plus marks */}
        <path d="M 50 15 L 50 20" stroke="#F5C542" strokeWidth="1.5" />
        <path d="M 50 80 L 50 85" stroke="#F5C542" strokeWidth="1.5" />
      </svg>

      {/* Central Actual Image */}
      <div className="absolute w-[52%] h-[52%] rounded-full overflow-hidden flex items-center justify-center bg-yellow-950/40 p-0.5">
        <img 
          src={inforLogo} 
          alt="INFOR Logo" 
          className="w-full h-full object-contain rounded-full" 
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

// 2. ZSISC Emblem (星光黃 Circle)
export const ZSISCBadge: React.FC<BadgeProps> = ({ size = 120, animate = true, className = '', onClick }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center cursor-pointer select-none ${className} ${animate ? 'transition-all duration-300 hover:scale-105 active:scale-95' : ''}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full"
      >
        <circle cx="50" cy="50" r="45" fill="rgba(42, 31, 0, 0.9)" stroke="#3A2A00" strokeWidth="3.5" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#F5C542" strokeWidth="1.5" strokeDasharray="4,4" className="opacity-40" />
      </svg>

      <div className="absolute w-[60%] h-[60%] rounded-full overflow-hidden flex items-center justify-center bg-yellow-950/40 p-0.5">
        <img 
          src={zsiscLogo} 
          alt="ZSISC Logo" 
          className="w-full h-full object-contain rounded-full" 
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

// 3. CKCSC Emblem (星光黃 Shield)
export const CKCSCBadge: React.FC<BadgeProps> = ({ size = 120, animate = true, className = '', onClick }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center cursor-pointer select-none ${className} ${animate ? 'transition-all duration-300 hover:scale-105 active:scale-95' : ''}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full"
      >
        <path 
          d="M 50 6 L 88 18 L 88 56 C 88 78, 70 91, 50 95 C 30 91, 12 78, 12 56 L 12 18 Z" 
          fill="rgba(42, 31, 0, 0.9)" 
          stroke="#3A2A00" 
          strokeWidth="3.5" 
        />
        <path 
          d="M 50 11 L 83 21 L 83 54 C 83 73, 67 85, 50 89 C 33 85, 17 73, 17 54 L 17 21 Z" 
          fill="none" 
          stroke="#F5C542" 
          strokeWidth="1.5" 
          strokeDasharray="4,2"
          className="opacity-40"
        />

        <line x1="28" y1="50" x2="38" y2="50" stroke="#F5C542" strokeWidth="1.5" />
        <circle cx="38" cy="50" r="2" fill="#ffffff" />
      </svg>

      <div className="absolute w-[52%] h-[52%] rounded-full overflow-hidden flex items-center justify-center bg-yellow-950/40 p-0.5">
        <img 
          src={ckcscLogo} 
          alt="CKCSC Logo" 
          className="w-full h-full object-contain rounded-full" 
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

// 4. CGISC Emblem (星光黃 Cyber-Sun)
export const CGISCBadge: React.FC<BadgeProps> = ({ size = 120, animate = true, className = '', onClick }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center cursor-pointer select-none ${className} ${animate ? 'transition-all duration-300 hover:scale-105 active:scale-95' : ''}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full"
      >
        <circle cx="50" cy="50" r="43" fill="rgba(42, 31, 0, 0.9)" stroke="#3A2A00" strokeWidth="3.5" />
        <circle cx="50" cy="50" r="37" fill="none" stroke="#F5C542" strokeWidth="1" strokeDasharray="6,3" className="opacity-40" />

        <rect x="48" y="12" width="4" height="2" fill="#F5C542" />
        <rect x="48" y="86" width="4" height="2" fill="#F5C542" />
      </svg>

      <div className="absolute w-[58%] h-[58%] rounded-full overflow-hidden flex items-center justify-center bg-yellow-950/40 p-0.5">
        <img 
          src={cgiscLogo} 
          alt="CGISC Logo" 
          className="w-full h-full object-contain rounded-full" 
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

// 5. THE IZCC PORTAL LOGO
export const IZCCLogo: React.FC<{ glow?: boolean; className?: string }> = ({ glow = true, className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center w-full select-none ${className}`}>
      <div className="relative w-full aspect-[350/120] max-h-[160px] flex items-center justify-center rounded-2xl overflow-hidden bg-yellow-950/20 p-1">
        <img 
          src={heroLogo} 
          alt="IZCC Hero Logo" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(245,197,66,0.5)]" 
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};
