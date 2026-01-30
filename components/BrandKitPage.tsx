import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TeWELLLogo from './TeWELLLogo';

const BrandKitPage: React.FC = () => {
  const { setView, locale } = useLanguage();
  const logoRef = useRef<HTMLDivElement>(null);
  const logoLightRef = useRef<HTMLDivElement>(null);

  const exportPNG = (ref: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return;
    const svg = ref.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const size = 2048;
    canvas.width = size;
    canvas.height = size;

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, size, size);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <button 
            onClick={() => setView('home')}
            className="mb-8 text-green-400 font-bold hover:text-white transition flex items-center gap-2 mx-auto"
          >
            <i className="fas fa-arrow-left"></i> {locale === 'id' ? 'Kembali' : 'Back to Site'}
          </button>
          <h1 className="text-5xl md:text-7xl font-black font-display mb-6 tracking-tighter">Brand Identity Kit</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">High-resolution assets and logo variants for TeWELL+.</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500 rounded-full blur-[120px]"></div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Primary Logo */}
            <div className="space-y-8">
              <div className="bg-gray-50 border border-gray-100 rounded-[3rem] p-16 flex items-center justify-center aspect-square shadow-inner" ref={logoRef}>
                <TeWELLLogo iconOnly iconSize="w-64 h-64" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Primary Icon</h3>
                <p className="text-gray-500 mb-8 font-medium italic">Standard green variant for light backgrounds.</p>
                <button 
                  onClick={() => exportPNG(logoRef, 'TeWELL_Logo_Primary.png')}
                  className="bg-green-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-200 hover:bg-green-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
                >
                  <i className="fas fa-download"></i> DOWNLOAD PNG (2K)
                </button>
              </div>
            </div>

            {/* Light Logo */}
            <div className="space-y-8">
              <div className="bg-slate-900 border border-gray-800 rounded-[3rem] p-16 flex items-center justify-center aspect-square shadow-2xl" ref={logoLightRef}>
                <TeWELLLogo light iconOnly iconSize="w-64 h-64" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Light Variant</h3>
                <p className="text-gray-500 mb-8 font-medium italic">White variant for dark/green backgrounds.</p>
                <button 
                  onClick={() => exportPNG(logoLightRef, 'TeWELL_Logo_Light.png')}
                  className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
                >
                  <i className="fas fa-download"></i> DOWNLOAD PNG (2K)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandKitPage;