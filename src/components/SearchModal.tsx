import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Flame, ChevronRight, FileSearch, HelpCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ru' | 'en';
  onSelectProduct: (category: string, query?: string, subId?: string, productId?: string) => void;
}

export default function SearchModal({ isOpen, onClose, lang, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter products based on search query
  const filteredProducts = query.trim() === '' ? [] : PRODUCTS.filter(product => {
    const q = query.toLowerCase().trim();
    const modelMatch = product.model?.toLowerCase().includes(q);
    const titleRu = product.title?.toLowerCase() || '';
    const titleEn = product.titleEn?.toLowerCase() || '';
    const descRu = product.description?.toLowerCase() || '';
    const descEn = product.descriptionEn?.toLowerCase() || '';
    const subcatRu = product.subcategoryRu?.toLowerCase() || '';
    const subcatEn = product.subcategoryEn?.toLowerCase() || '';
    
    // Check specifications & features as well
    const featuresMatch = (lang === 'en' ? product.featuresEn : product.features)?.some(f => f.toLowerCase().includes(q)) || false;
    const specsMatch = (product.specs || []).some(s => 
      s.name.toLowerCase().includes(q) || 
      s.value.toLowerCase().includes(q) ||
      (s.nameEn && s.nameEn.toLowerCase().includes(q)) ||
      (s.valueEn && s.valueEn.toLowerCase().includes(q))
    );

    return (
      modelMatch || 
      titleRu.includes(q) || 
      titleEn.includes(q) || 
      descRu.includes(q) || 
      descEn.includes(q) ||
      subcatRu.includes(q) ||
      subcatEn.includes(q) ||
      featuresMatch ||
      specsMatch
    );
  }).sort((a, b) => {
    // Rank model matches higher
    const q = query.toLowerCase().trim();
    const aModel = a.model?.toLowerCase() === q;
    const bModel = b.model?.toLowerCase() === q;
    if (aModel && !bModel) return -1;
    if (!aModel && bModel) return 1;

    const aModelPart = a.model?.toLowerCase().includes(q);
    const bModelPart = b.model?.toLowerCase().includes(q);
    if (aModelPart && !bModelPart) return -1;
    if (!aModelPart && bModelPart) return 1;

    return 0; // maintain original order otherwise
  }).slice(0, 8); // Limit to top 8 achievements

  // Focus input on mount / open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle keyboard shortcuts inside input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredProducts.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredProducts.length) % Math.max(1, filteredProducts.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredProducts.length > 0 && selectedIndex < filteredProducts.length) {
          const selected = filteredProducts[selectedIndex];
          onSelectProduct(selected.category, '', 'all', selected.id);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredProducts, selectedIndex, onClose, onSelectProduct]);

  // Handle overlay click to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4 md:px-0 transition-opacity duration-200"
      onClick={handleOverlayClick}
      id="search-overlay"
    >
      <div 
        ref={modalRef}
        id="search-modal-container"
        className="bg-white w-full max-w-2xl rounded-none shadow-2xl border border-gray-200 flex flex-col overflow-hidden max-h-[75vh]"
      >
        {/* Search Input and Top bar */}
        <div className="flex items-center border-b border-gray-100 px-4 py-3.5 bg-gray-50">
          <Search className="h-5 w-5 text-gray-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-sm text-gray-850 placeholder-gray-400 focus:outline-none focus:ring-0 select-text"
            placeholder={lang === 'en' ? "Search by model or equipment name (e.g. CX-10, SDO)..." : "Поиск по модели, названию или характеристике (например: СХ-10, СДО)..."}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition duration-150 cursor-pointer"
            id="close-search-modal-btn"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="grow overflow-y-auto p-4 max-h-[50vh]">
          {query.trim() === '' ? (
            <div className="py-8 text-center" id="search-initial-view">
              <FileSearch className="mx-auto h-11 w-11 text-gray-300 stroke-[1.5] mb-2.5 animate-pulse" />
              <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest font-sans">
                {lang === 'en' ? 'Quick Search System' : 'Система мгновенного поиска'}
              </h4>
              <p className="text-[11px] text-gray-400 max-w-sm mx-auto mt-1 leading-relaxed">
                {lang === 'en' 
                  ? 'Enter equipment code or category. Use Arrow keys to navigate and Enter to select.' 
                  : 'Введите шифр серии, наименование или характеристики. Поддерживается управление стрелками клавиатуры.'}
              </p>
              
              {/* Popular tags/shortcuts */}
              <div className="mt-5 flex flex-wrap gap-1.5 justify-center max-w-md mx-auto">
                <span className="text-[10px] text-gray-400 self-center font-mono uppercase tracking-wider mr-1.5">
                  {lang === 'en' ? 'Suggestions:' : 'Например:'}
                </span>
                {['СХ-10', 'СДО-15', 'РП-8', 'ВСФ-12', 'GW', 'Q32'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag);
                      inputRef.current?.focus();
                    }}
                    className="bg-white border border-gray-250 hover:border-[#e65410] text-[10.5px] px-2.5 py-1 text-gray-600 hover:text-[#e65410] font-mono font-bold transition duration-150 cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-1.5" id="search-results-list">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#e65410] font-mono mb-2">
                {lang === 'en' ? `Matches found: ${filteredProducts.length}` : `Найдено совпадений: ${filteredProducts.length}`}
              </div>
              
              {filteredProducts.map((product, index) => {
                const isSelected = index === selectedIndex;
                const titleText = lang === 'en' ? product.titleEn : product.title;
                const subcatText = lang === 'en' ? product.subcategoryEn : product.subcategoryRu;

                return (
                  <div
                    key={product.id}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => {
                      onSelectProduct(product.category, '', 'all', product.id);
                      onClose();
                    }}
                    className={`p-3 border transition duration-150 cursor-pointer flex items-center gap-3.5 ${
                      isSelected 
                        ? 'bg-slate-50 border-[#e65410] shadow-sm' 
                        : 'bg-white border-gray-150 hover:bg-slate-50'
                    }`}
                    id={`search-result-item-${index}`}
                  >
                    {/* Thumbnail of product */}
                    <div className="h-12 w-16 bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                      <img
                        src={product.imageUrl}
                        alt={product.model}
                        onError={(e) => {
                          e.currentTarget.src = '/img/foto/Menu/smes-s.jpg';
                        }}
                        className="h-full w-full object-cover filter brightness-95"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    {/* Texts */}
                    <div className="grow min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xs font-black text-[#e65410] uppercase shrink-0">
                          {product.model}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider truncate">
                          {subcatText}
                        </span>
                      </div>
                      <h4 className="text-[11.5px] font-black text-gray-800 leading-tight mt-0.5 truncate uppercase">
                        {titleText}
                      </h4>
                      <p className="text-[10px] text-gray-400 truncate leading-normal mt-0.5">
                        {lang === 'en' ? product.descriptionEn : product.description}
                      </p>
                    </div>

                    {/* Chevron pointing right */}
                    <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-[#e65410]' : 'text-gray-300'}`} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center" id="search-empty-view">
              <HelpCircle className="mx-auto h-11 w-11 text-gray-300 stroke-[1.5] mb-2" />
              <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest font-sans">
                {lang === 'en' ? 'Nothing matches' : 'Ничего не найдено'}
              </h4>
              <p className="text-[11px] text-gray-400 max-w-xs mx-auto mt-1 leading-relaxed">
                {lang === 'en' 
                  ? "We couldn't find any products matching your request. Try double checking spelling or search a standard term like 'GW'." 
                  : 'Попробуйте изменить запрос, проверить раскладку клавиатуры или ввести обобщенный термин (например, "печь" или "смеситель").'}
              </p>
            </div>
          )}
        </div>

        {/* Bottom micro-bar with keyboard shortcuts */}
        <div className="border-t border-gray-100 px-4 py-2 bg-gray-50 flex items-center justify-between text-[9px] text-gray-400 uppercase tracking-wider font-mono font-bold">
          <div className="flex gap-4">
            <span>↓↑ - {lang === 'en' ? 'Navigate' : 'перемещение'}</span>
            <span>↵ - {lang === 'en' ? 'Select' : 'выбрать'}</span>
          </div>
          <span>Esc - {lang === 'en' ? 'Close' : 'закрыть'}</span>
        </div>
      </div>
    </div>
  );
}
