import { Product } from '../types';
import { ArrowRight, Layers, Settings, Check, Search, ShieldAlert, HardHat } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { matchSubcategory, renderFormattedText } from './catalogUtils';
import ProductCard from './ProductCard';
import sandMixerXTC from '../assets/images/sand_mixer_xtc_1781504511099.jpg';

export interface SubcategoryDef {
  id: string;
  nameRu: string;
  nameEn: string;
  descRu?: string;
  descEn?: string;
}

interface CatalogContentViewProps {
  lang: 'ru' | 'en';
  activeCategory: string;
  activeSubcategory: string;
  activeSubsubcategory: string;
  availableSubsubcategories: SubcategoryDef[];
  searchQuery: string;
  filteredProducts: Product[];
  rfqItemsKeys: string[];
  subcategoryMap: Record<string, SubcategoryDef[]>;
  setActiveSubcategory: (id: string) => void;
  setActiveSubsubcategory: (id: string) => void;
  setSelectedProductId: (id: string | null) => void;
  setSearchQuery: (q: string) => void;
}

export default function CatalogContent({
  lang,
  activeCategory,
  activeSubcategory,
  activeSubsubcategory,
  availableSubsubcategories,
  searchQuery,
  filteredProducts,
  rfqItemsKeys,
  subcategoryMap,
  setActiveSubcategory,
  setActiveSubsubcategory,
  setSelectedProductId,
  setSearchQuery,
}: CatalogContentViewProps) {
  return (
/* 2. CARD-BASED GRID VIEW OF CATEGORY PRODUCTS - Balanced simplicity matching Level 1 cards! */
<div className="space-y-4">
  {activeCategory !== 'all' && activeSubcategory === 'all' && !searchQuery.trim() ? (
    /* Level 2: Subcategory Cards / Buttons */
    <div className="space-y-6 animate-fade-in animate-duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(subcategoryMap[activeCategory] || []).map((sub) => {
          const count = PRODUCTS.filter(
            (p) => p.category === activeCategory && matchSubcategory(p.subcategory, sub.id)
          ).length;

          return (
            <div
              key={sub.id}
              onClick={() => {
                setActiveSubcategory(sub.id);
                setActiveSubsubcategory('all');
                setSelectedProductId(null);
                setSearchQuery('');
              }}
              className="group bg-white rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer select-none relative shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-0"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden border-b border-gray-150">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <Settings className="h-10 w-10 text-white/30" />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#00333b] group-hover:bg-[#e65410] group-hover:text-white font-extrabold text-[10px] uppercase px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 transition-all duration-300">
                    <span>{lang === 'en' ? 'Open' : 'Открыть'}</span>
                    <ArrowRight className="h-3 w-3 transition-transform duration-250 group-hover:translate-x-1" />
                  </div>
                  <div className="absolute top-3 left-3 bg-slate-900/95 border border-white/10 text-white font-mono text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-none shadow-md">
                    {lang === 'en' ? `${count} items` : `${count} моделей`}
                  </div>
                </div>

                <div className="px-5 pb-6 space-y-2">
                  <h4 className="font-sans font-black text-[#00333b] text-base group-hover:text-[#e65410] leading-tight uppercase transition-colors line-clamp-1">
                    {lang === 'en' ? sub.nameEn : sub.nameRu}
                  </h4>
                  <p className="text-xs text-gray-550 leading-relaxed line-clamp-2">
                    {lang === 'en' ? sub.descEn : sub.descRu}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : activeCategory !== 'all' && activeSubcategory !== 'all' && activeSubcategory !== 'all_direct' && activeSubsubcategory === 'all' && availableSubsubcategories.length > 0 && !searchQuery.trim() ? (
    /* Level 3: Sub-subcategory Cards / Buttons */
    <div className="space-y-6 animate-fade-in animate-duration-300">
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border border-gray-200 flex items-center justify-between flex-col md:flex-row gap-4">
        <div className="space-y-1">
          <h3 className="font-sans font-black text-[#00333b] text-base uppercase tracking-wider">
            {lang === 'en' ? 'Select Equipment Type' : 'Выберите тип оборудования'}
          </h3>
          <p className="text-xs text-gray-500 font-sans">
            {lang === 'en'
              ? 'Filter further by precise configuration standard'
              : 'Отфильтруйте список моделей по точному конструктивному исполнению'}
          </p>
        </div>
        <button
          onClick={() => setActiveSubsubcategory('all_direct')}
          className="px-4 py-2 bg-[#00333b] hover:bg-black text-white font-mono text-[10px] uppercase font-black rounded-none border-none cursor-pointer tracking-wider shrink-0 transition-colors"
        >
          {lang === 'en' ? 'Show All Types' : 'Показать все типы'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {availableSubsubcategories.map((subsub) => {
          const count = PRODUCTS.filter(
            (p) => p.category === activeCategory &&
                  matchSubcategory(p.subcategory, activeSubcategory) &&
                  p.subsubcategory === subsub.id
          ).length;

          return (
            <div
              key={subsub.id}
              onClick={() => {
                setActiveSubsubcategory(subsub.id);
                setSelectedProductId(null);
                setSearchQuery('');
              }}
              className="group bg-white rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer select-none relative shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-0"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden border-b border-gray-150">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <Layers className="h-10 w-10 text-white/30" />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#00333b] group-hover:bg-[#e65410] group-hover:text-white font-extrabold text-[10px] uppercase px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 transition-all duration-300">
                    <span>{lang === 'en' ? 'Select' : 'Выбрать'}</span>
                    <ArrowRight className="h-3 w-3 transition-transform duration-250 group-hover:translate-x-1" />
                  </div>
                  <div className="absolute top-3 left-3 bg-slate-900/95 border border-white/10 text-white font-mono text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-none shadow-md">
                    {lang === 'en' ? `${count} items` : `${count} моделей`}
                  </div>
                </div>

                <div className="px-5 pb-6 space-y-2">
                  <h4 className="font-sans font-black text-[#00333b] text-base group-hover:text-[#e65410] leading-tight uppercase transition-colors line-clamp-1">
                    {lang === 'en' ? subsub.nameEn : subsub.nameRu}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <>
      {searchQuery && (
    <div className="bg-slate-100 border-l-4 border-[#e65410] px-4 py-3 flex items-center justify-between font-mono text-[11px] text-gray-650 animate-fadeIn rounded-none">
      <div className="flex items-center space-x-2">
        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
        <span>
          {lang === 'en' 
            ? `Found ${filteredProducts.length} items matching "${searchQuery}"` 
            : `Найдено позиций: ${filteredProducts.length} по вашему запросу "${searchQuery}"`}
        </span>
      </div>
      <button
        onClick={() => {
          setSearchQuery('');
          setSelectedProductId(null);
        }}
        className="text-xs text-[#e65410] hover:underline hover:text-orange-700 border-none bg-transparent cursor-pointer font-bold uppercase font-mono"
      >
        {lang === 'en' ? 'Reset' : 'Сбросить'}
      </button>
    </div>
  )}

  {filteredProducts.length === 0 ? (
    <div className="bg-white border-2 border-dashed border-gray-200 py-16 px-4 text-center space-y-4 rounded-none animate-fadeIn">
      <div className="inline-flex p-4 bg-orange-50 text-[#e65410] rounded-none">
        <Search className="h-8 w-8" />
      </div>
      <h4 className="text-sm font-extrabold text-gray-900 uppercase font-mono">
        {lang === 'en' ? 'No equipment matched your criteria' : 'Оборудование не найдено'}
      </h4>
      <p className="text-xs text-gray-500 max-w-sm mx-auto">
        {lang === 'en'
          ? `We found no results for "${searchQuery}". Try refining spelling or typing general series indices like "CX" or "GW".`
          : `Ничего не найдено по вашему запросу "${searchQuery}". Попробуйте ввести общие индексы, например "СХ", "GW", "АФЛ" или "КЛ".`}
      </p>
      <button
        type="button"
        onClick={() => {
          setSearchQuery('');
          setActiveSubcategory('all');
          setActiveSubsubcategory('all');
        }}
        className="px-4 py-2 bg-[#e65410] text-white text-xs font-mono font-black uppercase rounded-none border-none hover:bg-orange-700 cursor-pointer text-center text-xs"
      >
        {lang === 'en' ? 'Reset search filters' : 'Сбросить фильтры поиска'}
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in animate-duration-250">
  {filteredProducts.map((p) => {
    const pTitle = lang === 'en' && p.titleEn ? p.titleEn : p.title;
    const pDesc = lang === 'en' && p.descriptionEn ? p.descriptionEn : p.description;
    const pCapacity = lang === 'en' && p.capacityEn ? p.capacityEn : p.capacity;

    const isAnyVariantInRFQ = rfqItemsKeys.some(key => key === p.id || key.startsWith(`${p.id}-`));

    return (
      <div
        key={p.id}
        onClick={() => setSelectedProductId(p.id)}
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
  })}
</div>
)}
    </>
  )}
</div>

  );
}
