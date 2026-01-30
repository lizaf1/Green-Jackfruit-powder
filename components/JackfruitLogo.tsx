
import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
  iconSize?: string;
  textSize?: string;
}

export const BrandText: React.FC<{ size?: string; light?: boolean }> = ({ size = "text-2xl", light = false }) => (
  <span className={`inline-flex items-center leading-none font-sans font-black tracking-tighter ${size}`}>
    <span className={light ? "text-white" : "text-gray-900"}>TeWELL</span>
    <span className="text-green-500 ml-0.5 font-sans">＋</span>
  </span>
);

const JackfruitLogo: React.FC<LogoProps> = ({ 
  className = "", 
  iconOnly = false, 
  light = false,
  iconSize = "w-10 h-10 md:w-11 md:h-11",
  textSize = "text-2xl"
}) => {
  const primaryColor = light ? "#FFFFFF" : "#064E3B"; // emerald-950
  const accentColor = "#10B981"; // emerald-500
  const glowColor = "#34D399"; // emerald-400

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0">
        <svg 
          viewBox="0 0 100 100" 
          className={`${iconSize} drop-shadow-md transition-all duration-500 group-hover:scale-105`}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Jackfruit "Pod" Shape - Abstract & Modern */}
          <path 
            d="M50 8C35 8 22 24 22 45C22 68 36 92 50 92C64 92 78 68 78 45C78 24 65 8 50 8Z" 
            fill={primaryColor} 
          />
          
          {/* Top Stem/Leaf Detail - Elegant & Medical feel */}
          <path 
            d="M50 2C50 2 54 2 56 6C58 10 54 14 50 14C46 14 42 10 44 6C46 2 50 2 50 2Z" 
            fill={accentColor}
          />

          {/* Glowing Medical Cross - Symbolizing Clinical Efficacy */}
          <rect x="46" y="32" width="8" height="26" rx="2" fill={glowColor} />
          <rect x="37" y="41" width="26" height="8" rx="2" fill={glowColor} />

          {/* Organic Texture Accents (Representing Green Jackfruit Skin) */}
          <circle cx="34" cy="30" r="1.5" fill={accentColor} opacity="0.4" />
          <circle cx="66" cy="30" r="1.5" fill={accentColor} opacity="0.4" />
          <circle cx="30" cy="50" r="1.5" fill={accentColor} opacity="0.4" />
          <circle cx="70" cy="50" r="1.5" fill={accentColor} opacity="0.4" />
          <circle cx="38" cy="75" r="1.5" fill={accentColor} opacity="0.4" />
          <circle cx="62" cy="75" r="1.5" fill={accentColor} opacity="0.4" />
          <circle cx="50" cy="82" r="1.5" fill={accentColor} opacity="0.4" />

          {/* Cellular Integrity Inner Arc */}
          <path 
            d="M32 45C32 34 40 25 50 25" 
            stroke={accentColor} 
            strokeWidth="2" 
            strokeLinecap="round"
            opacity="0.3"
          />
        </svg>
      </div>

      {!iconOnly && (
        <BrandText size={textSize} light={light} />
      )}
    </div>
  );
};

export default JackfruitLogo;
