import { Product } from '../types';
import { ArrowRight, Check } from 'lucide-react';
import { renderFormattedText } from './catalogUtils';
import sandMixerXTC from '../assets/images/sand_mixer_xtc_1781504511099.jpg';

interface ProductCardProps {
  product: Product;
  lang: 'ru' | 'en';
  rfqItemsKeys: string[];
  onSelect: (id: string) => void;
}

export default function ProductCard({ product: p, lang, rfqItemsKeys, onSelect }: ProductCardProps) {
  const pTitle = lang === 'en' && p.titleEn ? p.titleEn : p.title;
  const pDesc = lang === 'en' && p.descriptionEn ? p.descriptionEn : p.description;
  const pCapacity = lang === 'en' && p.capacityEn ? p.capacityEn : p.capacity;

  const isAnyVariantInRFQ = rfqItemsKeys.some((key) => key === p.id || key.startsWith(`${p.id}-`));

  return (
    <div
      key={p.id}
      onClick={() => onSelect(p.id)}
      className="group bg-white rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer select-none relative shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-0"
    >
      {/* Upper part - photo + link overlay styled natively in Level 1 spirit */}
      <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden border-b border-gray-150">
        <img
          src={p.imageUrl}
          onError={(e) => {
            e.currentTarget.src = sandMixerXTC;
          }}
          alt={pTitle}
          className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-all duration-500 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 bg-slate-900/95 border border-white/10 text-white font-mono text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-none shadow-md">
          {lang === 'en' ? 'Series' : 'Серия'}: {p.model}
        </div>

        {/* Elegant first-level style link overlay button */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#00333b] group-hover:bg-[#e65410] group-hover:text-white font-extrabold text-[10px] uppercase px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 transition-all duration-300">
          <span>{lang === 'en' ? 'Learn More' : 'Подробнее'}</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-250 group-hover:translate-x-1" />
        </div>

        {isAnyVariantInRFQ && (
          <div className="absolute top-3 right-3 bg-emerald-600 text-white font-mono text-[9px] uppercase font-black px-2.5 py-1 rounded-none shadow-md flex items-center gap-1">
            <Check className="h-3 w-3 inline text-white" />
            <span>{lang === 'en' ? 'Added' : 'Выбрано'}</span>
          </div>
        )}
      </div>

      {/* Next - text and tags */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-sans font-black text-[#00333b] text-base group-hover:text-[#e65410] leading-tight uppercase transition-colors line-clamp-1">
            {pTitle}
          </h3>
          <p className="text-xs text-gray-550 leading-relaxed line-clamp-2">
            {renderFormattedText(pDesc)}
          </p>
        </div>

        <div className="space-y-3">
          {/* Available mini parameters lists on Level 2 cards */}
          {p.variantModels && p.variantModels.length > 0 && (
            <div>
              <span className="text-[9px] font-mono text-gray-400 font-extrabold uppercase block mb-1">
                {lang === 'en' ? 'Models lineup' : 'Модификации в серии'}:
              </span>
              <div className="flex flex-wrap gap-1">
                {p.variantModels.slice(0, 4).map((v, sIdx) => (
                  <span key={sIdx} className="bg-slate-55 border border-slate-200 text-slate-700 font-mono text-[9px] px-1.5 py-0.5 rounded-none font-bold">
                    {v.model}
                  </span>
                ))}
                {p.variantModels.length > 4 && (
                  <span className="bg-slate-55 border border-slate-200 text-slate-500 font-mono text-[9px] px-1.5 py-0.5 rounded-none font-bold">
                    +{p.variantModels.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Tags outside of text blocks - 0 rounded and extremely technical */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-widest border border-orange-200 text-[#e65410] bg-[#e65410]/5 rounded-none">
              {p.category === 'xtc-equipment' && (lang === 'en' ? 'No-Bake' : 'ХТС')}
              {p.category === 'furnaces' && (lang === 'en' ? 'Melting' : 'Плавка')}
              {p.category === 'pgs-equipment' && (lang === 'en' ? 'Green Sand' : 'ПГС')}
              {p.category === 'core-making' && (lang === 'en' ? 'Sand Core' : 'Стержни')}
              {p.category === 'shot-blast' && (lang === 'en' ? 'Shot Blasting' : 'Дробемёт')}
              {p.category === 'special-casting' && (lang === 'en' ? 'Casting' : 'Литье')}
              {p.category === 'cooling-systems' && (lang === 'en' ? 'Cooling' : 'Охлаждение')}
            </span>

            {p.subsubcategory && (
              <span className="px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-widest text-[#00333b] border border-teal-900/10 bg-teal-500/5 rounded-none">
                {lang === 'en' ? p.subsubcategoryEn || p.subsubcategory : p.subsubcategoryRu || p.subsubcategory}
              </span>
            )}

            {pCapacity && (
              <span className="px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-gray-500 bg-gray-100 border border-gray-200 rounded-none">
                {pCapacity}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
