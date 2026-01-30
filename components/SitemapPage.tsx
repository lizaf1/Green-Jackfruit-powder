
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const SitemapPage: React.FC = () => {
  const { cmsData, locale, setView, setSelectedPostId } = useLanguage();
  const content = cmsData[locale];
  const t = content.translations;

  const sections = [
    {
      title: locale === 'id' ? 'Halaman Utama' : 'Main Pages',
      links: [
        { label: t.nav.home, action: () => setView('home') },
        { label: t.nav.evidence, action: () => setView('evidence') },
        { label: t.nav.blog, action: () => { setView('blog'); setSelectedPostId(null); } },
        { label: t.nav.investment, action: () => setView('investment') },
      ]
    },
    {
      title: locale === 'id' ? 'Edukasi & Artikel' : 'Education & Articles',
      links: content.blogPosts.map(post => ({
        label: post.title,
        action: () => { setView('blog'); setSelectedPostId(post.id); }
      }))
    },
    {
      title: locale === 'id' ? 'Bukti Ilmiah' : 'Scientific Evidence',
      links: content.articles.map(article => ({
        label: article.title,
        action: () => setView('evidence')
      }))
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 font-display tracking-tight">
          {locale === 'id' ? 'Peta Situs' : 'Site Map'}
        </h1>
        <p className="text-gray-500 mb-16 text-lg">
          {locale === 'id' ? 'Indeks lengkap konten TeWELL+ untuk navigasi cepat.' : 'Complete index of TeWELL+ content for quick navigation.'}
        </p>

        <div className="space-y-16">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600 mb-6 pb-2 border-b border-gray-100">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <button 
                      onClick={link.action}
                      className="text-xl font-bold text-gray-800 hover:text-green-600 transition-colors text-left leading-tight"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
