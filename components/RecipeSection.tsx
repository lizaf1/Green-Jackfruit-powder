
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const RecipeSection: React.FC = () => {
  const { cmsData, locale } = useLanguage();
  const content = cmsData[locale];
  const t = content.translations;
  const recipes = content.recipes;

  return (
    <section id="recipes" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
             {t.recipes.diabetesFriendly}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display leading-tight">{t.recipes.heading}</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">{t.recipes.subheading}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {recipes.map((recipe, idx) => (
            <div key={idx} className="bg-gray-50 rounded-[3rem] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:bg-white flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white font-display leading-tight">{recipe.name}</h3>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-gray-600 mb-8 leading-relaxed flex-1">{recipe.description}</p>
                <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-sm group-hover:border-green-500 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-[10px]">
                      <i className="fas fa-plus"></i>
                    </div>
                    <p className="text-xs font-black text-green-700 uppercase tracking-widest">{t.recipes.howLabel}</p>
                  </div>
                  <p className="text-sm text-gray-900 leading-snug font-semibold">{recipe.howToAdd}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeSection;
