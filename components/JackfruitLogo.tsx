
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
  iconSize?: string;
  textSize?: string;
}

export const BrandText: React.FC<{ size?: string; light?: boolean; onClick?: () => void }> = ({ size = "text-2xl", light = false, onClick }) => (
  <span 
    className={`inline-flex items-center leading-none font-sans font-black tracking-tighter ${size} ${onClick ? 'cursor-pointer select-none' : ''}`}
    onClick={onClick}
  >
    <span className={light ? "text-white" : "text-gray-900"}>TeWELL</span>
    <span className="text-[#16c694] ml-0.5 font-sans transition-transform active:scale-90">＋</span>
  </span>
);

const JackfruitLogo: React.FC<LogoProps> = ({ 
  className = "", 
  iconOnly = false, 
  light = false,
  iconSize = "w-10 h-10 md:w-11 md:h-11",
  textSize = "text-2xl"
}) => {
  const { setView } = useLanguage();
  
  // Colors derived from the user's provided logo image
  const darkGreen = "#014737";
  const brightGreen = "#16c694";
  const white = "#FFFFFF";

  const primaryFill = light ? white : darkGreen;
  const accentFill = brightGreen;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0">
        <svg 
          viewBox="0 0 100 120" 
          className={`${iconSize} drop-shadow-md transition-all duration-500 group-hover:scale-105`}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Jackfruit Body */}
          <path 
            d="M50 5C30 5 15 30 15 62C15 95 30 115 50 115C70 115 85 95 85 62C85 30 70 5 50 5Z" 
            fill={primaryFill} 
          />
          
          {/* Stem Circle */}
          <circle cx="50" cy="10" r="8" fill={accentFill} />
          
          {/* Medical Plus Sign */}
          <rect x="42" y="45" width="16" height="34" rx="4" fill={accentFill} />
          <rect x="33" y="54" width="34" height="16" rx="4" fill={accentFill} />
          
          {/* Decorative curve/highlight */}
          <path 
            d="M38 45 C 38 35, 48 30, 58 30" 
            stroke={accentFill} 
            strokeWidth="3" 
            strokeLinecap="round" 
            opacity="0.3"
          />
          
          {/* Decorative dots from the image */}
          <circle cx="35" cy="40" r="1.5" fill={accentFill} opacity="0.6" />
          <circle cx="68" cy="40" r="1.5" fill={accentFill} opacity="0.6" />
          <circle cx="30" cy="70" r="1.5" fill={accentFill} opacity="0.6" />
          <circle cx="72" cy="70" r="1.5" fill={accentFill} opacity="0.6" />
          <circle cx="45" cy="100" r="1.5" fill={accentFill} opacity="0.6" />
          <circle cx="58" cy="105" r="1.5" fill={accentFill} opacity="0.6" />
        </svg>
      </div>
      {!iconOnly && (
        <BrandText 
          size={textSize} 
          light={light} 
          onClick={() => setView('admin')} 
        />
      )}
    </div>
  );
};

export default JackfruitLogo;
