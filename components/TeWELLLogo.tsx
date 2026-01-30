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

export const LogoSVG: React.FC<{ className?: string, light?: boolean }> = ({ className, light }) => {
  const darkGreen = "#004737";
  const brightGreen = "#16c694";
  const white = "#FFFFFF";

  const primaryFill = light ? white : darkGreen;
  const secondaryColor = light ? darkGreen : brightGreen;

  return (
    <svg 
      viewBox="0 0 100 120" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="12" r="7.5" fill={secondaryColor} />
      <path 
        d="M50 20C32 20 18 40 18 70C18 95 32 115 50 115C68 115 82 95 82 70C82 40 68 20 50 20Z" 
        fill={primaryFill} 
      />
      <path 
        d="M35 38C38 32 45 30 50 30" 
        stroke={secondaryColor} 
        strokeWidth="2.5" 
        strokeLinecap="round"
        opacity="0.3"
      />
      <rect x="44" y="52" width="12" height="36" rx="3" fill={secondaryColor} />
      <rect x="32" y="64" width="36" height="12" rx="3" fill={secondaryColor} />
      <circle cx="34" cy="48" r="1.8" fill={secondaryColor} opacity="0.4" />
      <circle cx="66" cy="48" r="1.8" fill={secondaryColor} opacity="0.4" />
      <circle cx="28" cy="70" r="1.8" fill={secondaryColor} opacity="0.4" />
      <circle cx="72" cy="70" r="1.8" fill={secondaryColor} opacity="0.4" />
      <circle cx="38" cy="94" r="1.8" fill={secondaryColor} opacity="0.4" />
      <circle cx="62" cy="94" r="1.8" fill={secondaryColor} opacity="0.4" />
      <circle cx="50" cy="104" r="1.8" fill={secondaryColor} opacity="0.4" />
    </svg>
  );
};

const TeWELLLogo: React.FC<LogoProps> = ({ 
  className = "", 
  iconOnly = false, 
  light = false,
  iconSize = "w-10 h-12",
  textSize = "text-2xl"
}) => {
  const { setView } = useLanguage();
  
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <div className="relative flex-shrink-0">
        <LogoSVG className={`${iconSize} drop-shadow-md transition-all duration-500 group-hover:scale-105`} light={light} />
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

export default TeWELLLogo;