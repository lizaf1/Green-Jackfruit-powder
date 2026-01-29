
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
    <span className="text-green-500 ml-0.5 relative top-[-1px]">＋</span>
  </span>
);

const JackfruitLogo: React.FC<LogoProps> = ({ 
  className = "", 
  iconOnly = false, 
  light = false,
  iconSize = "w-10 h-10 md:w-11 md:h-11",
  textSize = "text-2xl"
}) => {
  const mainColor = light ? "#FFFFFF" : "#14532D";
  const accentColor = "#22C55E";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0">
        <svg 
          viewBox="0 0 100 100" 
          className={`${iconSize} drop-shadow-sm transition-transform duration-500`}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bespoke Medical-Nature Brand Mark */}
          <path 
            d="M50 6C32 6 20 25 20 48C20 75 35 90 50 90C65 90 80 75 80 48C80 25 68 6 50 6Z" 
            fill={mainColor} 
          />
          {/* Subtle Organic Leaf / Stem */}
          <path 
            d="M52 2C52 2 48 2 48 4V12C48 14 52 14 52 12V2Z" 
            fill={accentColor}
            stroke={accentColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          {/* Scientific Core (Plus Sign as a geometric focal point) */}
          <path 
            d="M50 35V61M37 48H63" 
            stroke={accentColor} 
            strokeWidth="8" 
            strokeLinecap="round" 
          />
          
          {/* Cellular Integrity Arc - Representing the Cold-Process protection */}
          <path 
            d="M85 48C85 30 70 15 50 15" 
            stroke={accentColor} 
            strokeWidth="1.5" 
            strokeDasharray="4 4" 
            opacity="0.5"
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
