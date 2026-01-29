
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const EvidenceChart: React.FC = () => {
  const { cmsData, locale } = useLanguage();
  const content = cmsData[locale];
  const data = content.studyData;
  const t = content.translations;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-green-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{t.evidence.chartTitle}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={36}/>
            <Bar name={t.evidence.labels.baseline} dataKey="before" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar name={t.evidence.labels.result} dataKey="after" fill="#166534" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-xs text-center text-gray-500 italic">
        {t.evidence.chartDisclaimer}
      </p>
    </div>
  );
};

export default EvidenceChart;
