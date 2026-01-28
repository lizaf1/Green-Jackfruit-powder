
import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
  iconSize?: string;
  textSize?: string;
}

export const BrandText: React.FC<{ size?: string; light?: boolean }> = ({ size = "text-2xl", light = false }) => (
  <span className={`inline-flex items-center leading-none font-sans font-black uppercase tracking-tighter ${size}`}>
    <span className={light ? "text-white" : "text-gray-900"}>TeWELL</span>
    <span className="text-green-500 ml-0.5">＋</span>
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
  const stemColor = light ? "#BBF7D0" : "#064E3B";
  const plusColor = light ? "#14532D" : "#FFFFFF";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0 group">
        <svg 
          viewBox="0 0 100 100" 
          className={`${iconSize} drop-shadow-sm group-hover:scale-105 transition-transform duration-500`}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Jackfruit Body */}
          <path 
            d="M50 12C32 12 22 25 22 48C22 75 35 88 50 88C65 88 78 75 78 48C78 25 68 12 50 12Z" 
            fill={mainColor} 
          />
          
          {/* Accent Glow/Gradient Overlay */}
          {!light && (
            <path 
              d="M50 18C38 18 28 28 28 48C28 68 38 82 50 82C62 82 72 68 72 48C72 28 62 18 50 18Z" 
              fill="url(#iconGradient)" 
              fillOpacity="0.15"
            />
          )}

          {/* Plus Icon inside the fruit */}
          <rect x="46" y="38" width="8" height="24" rx="2" fill={plusColor} />
          <rect x="38" y="46" width="24" height="8" rx="2" fill={plusColor} />
          
          {/* Stem */}
          <rect x="48" y="5" width="4" height="8" rx="2" fill={stemColor} />

          <defs>
            <linearGradient id="iconGradient" x1="50" y1="12" x2="50" y2="88" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22C55E" />
              <stop offset="1" stopColor="#166534" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {!iconOnly && <BrandText size={textSize} light={light} />}
    </div>
  );
};

export default JackfruitLogo;
