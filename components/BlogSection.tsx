
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BrandText } from './JackfruitLogo';

const BlogSection: React.FC = () => {
  const { cmsData, locale, setView, setSelectedPostId } = useLanguage();
  const content = cmsData[locale];
  const t = content.translations;
  const latestPosts = content.blogPosts.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-display leading-tight">
              {t.blog.heading} <BrandText size="text-3xl md:text-5xl" /> {locale === 'en' ? 'Blog' : ''}
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">{t.blog.subheading}</p>
          </div>
          <button 
            onClick={() => { setView('blog'); setSelectedPostId(null); }}
            className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition shadow-xl"
          >
            {locale === 'id' ? 'Lihat Semua Artikel' : 'View All Posts'}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {latestPosts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => { setView('blog'); setSelectedPostId(post.id); }}
              className="group cursor-pointer bg-gray-50 rounded-[3rem] overflow-hidden hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-green-100"
            >
              <div className="relative h-60 overflow-hidden m-4 rounded-[2rem]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-8 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs font-bold text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-display group-hover:text-green-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-green-600 font-black text-sm uppercase tracking-widest">
                  {locale === 'id' ? 'Baca Artikel' : 'Read Article'} <i className="fas fa-chevron-right text-[10px]"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
