
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
  
  const darkGreen = "#014737";
  const brightGreen = "#16c694";
  const white = "#FFFFFF";

  const primaryFill = light ? white : darkGreen;
  const crossColor = light ? darkGreen : brightGreen;

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <div className="relative flex-shrink-0">
        <svg 
          viewBox="0 0 100 120" 
          className={`${iconSize} drop-shadow-md transition-all duration-500 group-hover:scale-105`}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Teardrop/Leaf Shape matching the branding pouch */}
          <path 
            d="M50 5C30 5 15 30 15 62C15 95 30 115 50 115C70 115 85 95 85 62C85 30 70 5 50 5Z" 
            fill={primaryFill} 
          />
          {/* Central Medical Cross */}
          <rect x="42" y="45" width="16" height="34" rx="4" fill={crossColor} />
          <rect x="33" y="54" width="34" height="16" rx="4" fill={crossColor} />
          
          {/* Subtle jackfruit texture dots */}
          <circle cx="35" cy="40" r="1.5" fill={crossColor} opacity="0.4" />
          <circle cx="65" cy="40" r="1.5" fill={crossColor} opacity="0.4" />
          <circle cx="30" cy="70" r="1.5" fill={crossColor} opacity="0.4" />
          <circle cx="70" cy="70" r="1.5" fill={crossColor} opacity="0.4" />
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
