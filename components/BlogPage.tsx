
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BrandText } from './JackfruitLogo';
import SEO from './SEO';

const BlogPage: React.FC = () => {
  const { cmsData, locale, setView, selectedPostId, setSelectedPostId } = useLanguage();
  const content = cmsData[locale];
  const t = content.translations;
  const posts = content.blogPosts;

  const selectedPost = posts.find(p => p.id === selectedPostId);

  // Individual Post View
  if (selectedPost) {
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": selectedPost.title,
      "image": [selectedPost.image],
      "datePublished": selectedPost.date,
      "author": [{
          "@type": "Person",
          "name": selectedPost.author
        }]
    };

    return (
      <article className="bg-white min-h-screen">
        <SEO 
          title={selectedPost.title} 
          description={selectedPost.excerpt} 
          image={selectedPost.image}
          type="article"
          schema={blogSchema}
        />
        <header className="py-20 bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <button 
              onClick={() => setSelectedPostId(null)}
              className="mb-10 text-green-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              <i className="fas fa-arrow-left"></i> {t.blog.backToBlog}
            </button>
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {selectedPost.category}
              </span>
              <time className="text-gray-400 text-sm" dateTime={selectedPost.date}>{selectedPost.date}</time>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-display leading-tight mb-8">
              {selectedPost.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                {selectedPost.author[0]}
              </div>
              <p className="text-gray-900 font-bold">{selectedPost.author}</p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 -mt-10 mb-20">
          <img 
            src={selectedPost.image} 
            alt={selectedPost.title} 
            className="w-full h-[400px] object-cover rounded-[3rem] shadow-2xl mb-16 border-8 border-white"
          />
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-green max-w-none">
              {selectedPost.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-600 leading-relaxed text-lg mb-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Blog List View
  return (
    <div className="bg-white min-h-screen">
      <SEO title={locale === 'id' ? "Blog Kesehatan Glikemik" : "Glycemic Health Blog"} />
      <section className="bg-green-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <button 
            onClick={() => setView('home')}
            className="mb-8 text-green-300 hover:text-white flex items-center gap-2 mx-auto transition font-bold"
          >
            <i className="fas fa-arrow-left"></i> {locale === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
          </button>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 tracking-tight">
            {t.blog.heading} <BrandText light size="text-4xl md:text-6xl" /> {locale === 'en' ? 'Blog' : ''}
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            {t.blog.subheading}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <article 
                key={post.id} 
                onClick={() => setSelectedPostId(post.id)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-green-200 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-green-800">
                    {post.category}
                  </div>
                </div>
                <div className="p-8">
                  <time className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3" dateTime={post.date}>{post.date}</time>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display leading-snug group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 line-clamp-3 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <button className="text-green-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    {t.blog.readMore} <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
