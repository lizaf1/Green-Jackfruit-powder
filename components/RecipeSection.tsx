
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const RecipeSection: React.FC = () => {
  const { cmsData, locale } = useLanguage();
  const content = cmsData[locale];
  const t = content.translations;
  const recipes = content.recipes;

  return (
    <section id="recipes" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">{t.recipes.heading}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.recipes.subheading}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recipes.map((recipe, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition flex flex-col group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {locale === 'id' ? 'Ramah Diabetes' : 'Diabetes Friendly'}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{recipe.name}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-1 italic">{recipe.description}</p>
                <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                  <p className="text-xs font-bold text-green-700 uppercase mb-2 tracking-wider">{t.recipes.howLabel}</p>
                  <p className="text-sm text-green-800 leading-snug font-medium">{recipe.howToAdd}</p>
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
