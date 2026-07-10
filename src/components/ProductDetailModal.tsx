import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Product, EquipmentVariant } from '../types';
import { Check, Plus, Settings, Sliders, Table, ChevronDown, Layers, Cpu, HardHat, Ruler, Zap, Gauge, Package2, Box, Wrench, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { MaterialItem, renderFormattedText, parseSpecsToTable, groupSpecs, SpecGroup } from './catalogUtils';
import sandMixerXTC from '../assets/images/sand_mixer_xtc_1781504511099.jpg';

interface Tab {
  id: 'specs' | 'composition' | 'materials';
  labelRu: string;
  labelEn: string;
}

interface ProductDetailModalProps {
  product: Product;
  lang: 'ru' | 'en';
  t: typeof TRANSLATIONS['ru'];
  galleryImages: string[];
  galleryIndex: number;
  setGalleryIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsLightboxOpen: (b: boolean) => void;
  rfqItemsKeys: string[];
  onAddToRFQ: (p: Product) => void;
  expandedProductSpecs: Record<string, boolean>;
  toggleSpecs: (id: string) => void;
  isSelectedVariantInSpecs: (baseProductId: string, variantModel: string) => boolean;
  handleAddCustomModel: (baseProduct: Product, variantModel: string) => void;
  materialsMap: Record<string, MaterialItem[]>;
  generalMaterials: MaterialItem[];
  relatedEquipmentMap: Record<string, string[]>;
  relatedCategoryFallbackMap: Record<string, string[]>;
  onSelectRelated: (id: string) => void;
  composition?: string[];
  additionalMaterials?: string[];
}

export default function ProductDetailModal({
  product,
  lang,
  t,
  galleryImages,
  galleryIndex,
  setGalleryIndex,
  setIsLightboxOpen,
  rfqItemsKeys,
  onAddToRFQ,
  expandedProductSpecs,
  toggleSpecs,
  isSelectedVariantInSpecs,
  handleAddCustomModel,
  materialsMap,
  generalMaterials,
  relatedEquipmentMap,
  relatedCategoryFallbackMap,
  onSelectRelated,
  composition = [],
  additionalMaterials = [],
}: ProductDetailModalProps) {
  const p = product;
  const isSpecsExpanded = !!expandedProductSpecs[p.id];
  const isAdded = rfqItemsKeys.includes(p.id);
  const [activeTab, setActiveTab] = useState<'specs' | 'composition' | 'materials'>('specs');
  const specsRef = useRef<HTMLElement>(null);
  const compositionRef = useRef<HTMLElement>(null);
  const materialsRef = useRef<HTMLElement>(null);

  // Build a lookup map from PRODUCTS array
  const productsMap = useMemo(() => {
    const map: Record<string, Product> = {};
    PRODUCTS.forEach((prod) => {
      map[prod.id] = prod;
    });
    return map;
  }, []);

  // Find related products from same category, excluding current product
  const relatedProducts = useMemo(() => {
    // First try explicit maps
    const explicitIds = relatedEquipmentMap[p.id] || relatedCategoryFallbackMap[p.category] || [];
    if (explicitIds.length > 0) {
      return explicitIds
        .map((id) => productsMap[id])
        .filter((prod): prod is Product => !!prod && prod.id !== p.id);
    }

    // Fallback: same category
    return PRODUCTS
      .filter((prod) => prod.category === p.category && prod.id !== p.id)
      .slice(0, 6);
  }, [p.id, p.category, relatedEquipmentMap, relatedCategoryFallbackMap, productsMap]);

  useEffect(() => {
    if (activeTab === 'specs' && specsRef.current) {
      specsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (activeTab === 'composition' && compositionRef.current) {
      compositionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (activeTab === 'materials' && materialsRef.current) {
      materialsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeTab]);

  const pTitle = lang === 'en' && p.titleEn ? p.titleEn : p.title;
  const pDesc = lang === 'en' && p.descriptionEn ? p.descriptionEn : p.description;
  const pFeatures = lang === 'en' && p.featuresEn ? p.featuresEn : p.features;
  const pCapacity = lang === 'en' && p.capacityEn ? p.capacityEn : p.capacity;
  const pPower = lang === 'en' && p.powerEn ? p.powerEn : p.power;

  const handleTabClick = (tabId: 'specs' | 'composition' | 'materials') => {
    setActiveTab(tabId);
  };

  const renderSpecsContent = () => {
    const specTable = parseSpecsToTable(p.specs);
    if (!specTable) return null;

    const groupMeta: Record<string, { icon: any; color: string; bg: string }> = {
      dimensions: { icon: Ruler, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
      electrical: { icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
      performance: { icon: Gauge, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
      other: { icon: Settings, color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200' },
    };

    if (specTable.type === 'single') {
      const groups = groupSpecs(specTable.rows);
      if (groups.length <= 1) {
        return (
          <table className="min-w-full divide-y divide-gray-100 text-[11px]">
            <tbody className="divide-y divide-gray-100">
              {specTable.rows.map((s, idx) => {
                const sName = lang === 'en' && s.nameEn ? s.nameEn : s.name;
                const sVal = lang === 'en' && s.valueEn ? s.valueEn : s.value;
                return (
                  <tr key={idx} className={`transition hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-gray-50/25' : ''}`}>
                    <td className="py-2.5 px-4 text-gray-650 font-semibold leading-tight border-none">{sName}</td>
                    <td className="py-2.5 px-4 font-mono font-extrabold text-[#00333b] text-right leading-tight border-none">{sVal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      }
      return (
        <div className="p-3 space-y-3">
          {groups.map((g) => {
            const meta = groupMeta[g.key];
            const Icon = meta.icon;
            return (
              <div key={g.key} className={`rounded-none border overflow-hidden ${meta.bg}`}>
                <div className={`px-3 py-2 flex items-center gap-2 border-b border-current/10 ${meta.color}`}>
                  <Icon className="h-4 w-4" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider">
                    {lang === 'en' ? g.titleEn : g.titleRu}
                  </span>
                </div>
                <table className="min-w-full divide-y divide-gray-100 text-[11px] bg-white">
                  <tbody className="divide-y divide-gray-100">
                    {g.specs.map((s, idx) => {
                      const sName = lang === 'en' && s.nameEn ? s.nameEn : s.name;
                      const sVal = lang === 'en' && s.valueEn ? s.valueEn : s.value;
                      return (
                        <tr key={idx} className={`transition hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-gray-50/25' : ''}`}>
                          <td className="py-2 px-3 text-gray-650 font-semibold leading-tight border-none">{sName}</td>
                          <td className="py-2 px-3 font-mono font-extrabold text-[#00333b] text-right leading-tight border-none">{sVal}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      );
    }

    const isModelKey = (name: string, nameEn?: string) => {
      const n = name.toLowerCase();
      const ne = (nameEn || '').toLowerCase();
      return n === 'модель' || n === 'model' || n === 'model name' || ne === 'model' || ne === 'model name';
    };

    const modelParam = specTable.params.find((param) => isModelKey(param.nameRu, param.nameEn));
    const bodyParams = specTable.params.filter((param) => !isModelKey(param.nameRu, param.nameEn));

    const groupedSingle = specTable.columns.length > 1
      ? groupSpecs(
          specTable.columns.flatMap((col) =>
            bodyParams.map((param) => ({
              name: param.nameRu,
              value: col[param.nameRu] || '-',
              nameEn: param.nameEn,
              valueEn: specTable.columnsEn[specTable.columns.indexOf(col)]?.[param.nameEn] || '-',
            })),
          ),
        )
      : [];

    return (
      <div className="p-3 space-y-3">
        {groupedSingle.length > 0 &&
          groupedSingle.map((g) => {
            const meta = groupMeta[g.key];
            const Icon = meta.icon;
            return (
              <div key={g.key} className={`rounded-none border overflow-hidden ${meta.bg}`}>
                <div className={`px-3 py-2 flex items-center gap-2 border-b border-current/10 ${meta.color}`}>
                  <Icon className="h-4 w-4" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider">
                    {lang === 'en' ? g.titleEn : g.titleRu}
                  </span>
                </div>
                <table className="min-w-full divide-y divide-gray-100 text-[11px] bg-white">
                  <tbody className="divide-y divide-gray-100">
                    {g.specs.map((s, idx) => (
                      <tr key={idx} className={`transition hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-gray-50/25' : ''}`}>
                        <td className="py-2 px-3 text-gray-650 font-semibold leading-tight border-none">{s.name}</td>
                        <td className="py-2 px-3 font-mono font-extrabold text-[#00333b] text-right leading-tight border-none">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}

        <div className="overflow-x-auto w-full border border-gray-150">
          <table className="min-w-full divide-y divide-gray-200 text-[11px] text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-150">
                <th className="py-3 px-4 text-left text-[#00333b] font-black uppercase tracking-wider border-none font-sans">
                  {lang === 'en' ? 'Model Parameter' : 'Параметр'}
                </th>
                {specTable.columns.map((col, idx) => {
                  const modelVal = modelParam
                    ? (col[modelParam.nameRu] || col[modelParam.nameEn || ''] || '-')
                    : `M${idx + 1}`;
                  return (
                    <th
                      key={idx}
                      className="py-3 px-4 text-center text-[#e65410] font-mono font-black border-none bg-orange-50/20"
                    >
                      {modelVal}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bodyParams.map((param, rowIdx) => {
                const pName = lang === 'en' ? param.nameEn : param.nameRu;
                return (
                  <tr key={rowIdx} className={`transition hover:bg-slate-50 ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/25'}`}>
                    <td className="py-2.5 px-4 text-gray-650 font-semibold leading-tight border-none">{pName}</td>
                    {specTable.columns.map((col, colIdx) => {
                      const val = lang === 'en'
                        ? (specTable.columnsEn[colIdx][param.nameEn] || '-')
                        : (col[param.nameRu] || '-');
                      return (
                        <td
                          key={colIdx}
                          className="py-2.5 px-4 font-mono font-extrabold text-[#00333b] text-center leading-tight border-none"
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Render related equipment section
  const renderRelatedEquipment = () => {
    if (relatedProducts.length === 0) return null;

    return (
      <div className="mt-10 mb-4">
        <div className="border border-gray-150 rounded-none overflow-hidden bg-white">
          <div className="bg-gray-100 px-4 py-2.5 border-b border-gray-150 flex items-center justify-between">
            <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-gray-750 flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5 text-[#e65410]" />
              <span>{lang === 'en' ? 'Related Equipment and Products' : 'Связанное оборудование и товары'}</span>
            </h4>
            <span className="text-[8px] font-mono font-bold bg-gray-200 text-gray-650 px-2 py-0.5 rounded-none uppercase">
              {relatedProducts.length} {lang === 'en' ? 'items' : 'позиции'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-150">
            {relatedProducts.slice(0, 8).map((rp) => (
              <button
                key={rp.id}
                onClick={() => onSelectRelated(rp.id)}
                className="bg-white hover:bg-slate-50 transition p-3 text-left flex flex-col gap-2 group cursor-pointer border-none"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-100 overflow-hidden border border-gray-100">
                  <img
                    src={rp.imageUrl || sandMixerXTC}
                    onError={(e) => { e.currentTarget.src = sandMixerXTC; }}
                    alt={rp.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition"
                  />
                </div>
                {/* Title */}
                <div className="text-[11px] font-bold text-gray-800 leading-tight line-clamp-2 font-sans">
                  {rp.title}
                </div>
                {/* Model */}
                {rp.model && (
                  <div className="text-[9px] font-mono font-semibold text-gray-500 uppercase tracking-wider">
                    {rp.model}
                  </div>
                )}
                {/* Arrow hint */}
                <div className="text-[10px] font-mono font-black uppercase text-[#e65410] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <span>{lang === 'en' ? 'View' : 'Подробнее'}</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Compute key highlights from variantModels
  const keyHighlights = useMemo(() => {
    if (!p.variantModels || p.variantModels.length === 0) return [];
    const models = p.variantModels.map(v => v.model);
    const capacities = p.variantModels.map(v => v.capacity).filter(Boolean);
    const powers = p.variantModels.map(v => v.power).filter(Boolean);
    const extraVals = p.variantModels.map(v => v.extraFieldVal).filter(Boolean);
    const items: { labelRu: string; labelEn: string; value: string }[] = [];
    if (models.length > 0) items.push({ labelRu: 'Модели', labelEn: 'Models', value: `${models[0]} … ${models[models.length - 1]}` });
    if (capacities.length > 0) items.push({ labelRu: 'Ёмкость', labelEn: 'Capacity', value: [...new Set(capacities)].join(', ') });
    if (powers.length > 0) items.push({ labelRu: 'Мощность', labelEn: 'Power', value: [...new Set(powers)].join(', ') });
    if (extraVals.length > 0) items.push({ labelRu: p.variantModels[0]?.extraField || 'Параметр', labelEn: 'Param', value: [...new Set(extraVals)].join(', ') });
    return items.slice(0, 4);
  }, [p.variantModels]);
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ROW 1: Photo + Info */}
      <div className="bg-white border border-gray-200 rounded-none overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-none">
        {/* Column Left (4 units): Image, gallery, buttons */}
        <div className="lg:col-span-4 bg-white lg:border-r lg:border-gray-150 flex flex-col">
          <div className="relative aspect-video w-full bg-slate-950 overflow-hidden rounded-none border-b border-gray-100 group">
            <img
              src={galleryImages[galleryIndex] || p.imageUrl}
              onError={(e) => {
                e.currentTarget.src = sandMixerXTC;
              }}
              alt={pTitle}
              onClick={() => setIsLightboxOpen(true)}
              className="w-full h-full object-cover filter brightness-95 hover:brightness-100 transition duration-300 cursor-zoom-in"
              referrerPolicy="no-referrer"
            />

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-[#e65410] text-white transition rounded-none border border-white/10 hidden group-hover:flex items-center justify-center cursor-pointer font-black z-10"
                  id="gallery-prev-btn"
                >
                  {/* ◀ */}
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryIndex((prev) => (prev + 1) % galleryImages.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-[#e65410] text-white transition rounded-none border border-white/10 hidden group-hover:flex items-center justify-center cursor-pointer font-black z-10"
                  id="gallery-next-btn"
                >
                  ▶
                </button>
              </>
            )}

            <div className="absolute top-2 left-2 bg-[#00333b]/90 border border-teal-850 text-[#e65410] font-mono text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-none">
              {lang === 'en' ? 'Base Model:' : 'Базовая модель:'} {p.model}
            </div>

            <div className="absolute bottom-2 right-2 bg-black/80 text-[9px] font-mono font-bold text-white px-2 py-0.5 rounded-none border border-white/10 select-none">
              {galleryIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (() => {
            const PREVIEW = 6;
            const preview = galleryImages.slice(0, PREVIEW);
            const restCount = galleryImages.length - PREVIEW;
            return (
              <div className="grid grid-cols-3 gap-2 p-2">
                {preview.map((imgUrl, i) => {
                  const idx = i;
                  const prod = product;
                  const caption = idx === 0 ? '' : (prod?.galleryImages?.[idx - 1]?.caption || '');
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setGalleryIndex(idx)}
                      className={`relative aspect-video bg-gray-100 border transition overflow-hidden rounded-none p-0 cursor-pointer group/thumb ${
                        galleryIndex === idx
                          ? 'border-[#e65410] ring-1 ring-[#e65410]'
                          : 'border-transparent hover:border-gray-400'
                      }`}
                      title={caption}
                    >
                      <img
                        src={imgUrl}
                        onError={(e) => {
                          e.currentTarget.src = sandMixerXTC;
                        }}
                        alt={caption || `${pTitle} gallery ${idx + 1}`}
                        className="w-full h-full object-cover filter brightness-90 hover:brightness-100"
                        referrerPolicy="no-referrer"
                      />
                      {caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] px-1 py-0.5 opacity-0 group-hover/thumb:opacity-100 transition-opacity truncate">
                          {caption}
                        </div>
                      )}
                    </button>
                  );
                })}
                {restCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setGalleryIndex(PREVIEW)}
                    className="relative aspect-video bg-[#00333b] border border-transparent hover:border-[#e65410] transition overflow-hidden rounded-none p-0 cursor-pointer flex items-center justify-center"
                    title="Показать все фотографии"
                  >
                    <span className="text-white text-[10px] font-bold">+{restCount}</span>
                  </button>
                )}
              </div>
            );
          })()}

          {/* Action buttons */}
          <div className="p-3 space-y-2">
            <button
              onClick={() => {
                onAddToRFQ(p);
                window.dispatchEvent(new CustomEvent('rfq-items-updated'));
              }}
              className={`w-full py-2 px-3 font-mono font-black text-[10px] uppercase tracking-wider rounded-none flex items-center justify-center space-x-2 transition cursor-pointer outline-none ${
                isAdded
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-[#e65410] hover:bg-orange-700 text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-3 w-3 shrink-0" />
                  <span>{t.inSpecsBtn} ({p.model})</span>
                </>
              ) : (
                <>
                  <Plus className="h-3 w-3 shrink-0 text-white" />
                  <span>{lang === 'en' ? 'Add to RFQ' : 'Выбрать базовую Спец'}</span>
                </>
              )}
            </button>
            <p className="text-[7px] text-gray-500 text-center font-mono">
              *Разработка КД по ТЗ заказчика включена в стоимость.
            </p>
          </div>
        </div>

        {/* Column Right (8 units): Title, description, key highlights */}
        <div className="lg:col-span-8 p-4 sm:p-5 flex flex-col justify-center">
          <div className="space-y-3">
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1.5">
              <span className="px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-widest border border-orange-500/20 text-[#e65410] bg-[#e65410]/5 rounded-none">
                {p.category === 'xtc-equipment' && (lang === 'en' ? 'No-Bake System' : 'Система ХТС')}
                {p.category === 'furnaces' && (lang === 'en' ? 'Melting Complex' : 'Плавильный комплекс')}
                {p.category === 'pgs-equipment' && (lang === 'en' ? 'Green Sand System' : 'Система ПГС')}
                {p.category === 'core-making' && (lang === 'en' ? 'Sand Core Production' : 'Стержневое производство')}
                {p.category === 'shot-blast' && (lang === 'en' ? 'Shot Blasting' : 'Дробемётное очистное')}
                {p.category === 'special-casting' && (lang === 'en' ? 'Casting / Molding' : 'Формовка / Литье')}
                {p.category === 'cooling-systems' && (lang === 'en' ? 'Cooling Infrastructure' : 'Охлаждение')}
              </span>
              {p.subcategory && (
                <>
                  <span className="text-gray-300 text-[10px] font-mono select-none">/</span>
                  <span className="px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 bg-slate-100 rounded-none">
                    {lang === 'en' ? p.subcategoryEn || p.subcategory : p.subcategoryRu || p.subcategory}
                  </span>
                </>
              )}
              {p.subsubcategory && (
                <>
                  <span className="text-gray-300 text-[10px] font-mono select-none">/</span>
                  <span className="px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-widest text-[#e65410] border border-orange-400/30 bg-orange-500/5 rounded-none">
                    {lang === 'en' ? p.subsubcategoryEn || p.subsubcategory : p.subsubcategoryRu || p.subsubcategory}
                  </span>
                </>
              )}
              <div className="h-px bg-gray-150 grow min-w-[20px]" />
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight font-sans uppercase">
              {pTitle}
            </h2>

            {/* Description — clipped to match photo height */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium line-clamp-4 lg:line-clamp-3">
              {renderFormattedText(pDesc)}
            </p>

            {/* Key highlights — mini spec cards */}
            {keyHighlights.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {keyHighlights.map((h, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-150 px-3 py-2">
                    <div className="text-[8px] font-mono font-black uppercase text-gray-400 tracking-wider">
                      {lang === 'en' ? h.labelEn : h.labelRu}
                    </div>
                    <div className="text-[11px] font-bold text-[#00333b] mt-0.5 leading-tight truncate">
                      {h.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tech benefits — full width, outside grid */}
      <div className="bg-[#00333b]/5 border-y border-[#00333b]/10 p-5 rounded-none">
        <h4 className="text-[9px] font-mono font-black uppercase text-gray-550 tracking-widest flex items-center space-x-1.5 mb-3">
          <Settings className="h-3.5 w-3.5 text-[#e65410]" />
          <span>
            {lang === 'en'
              ? `Technical benefits of series ${p.model}:`
              : `Технологические преимущества серии ${p.model}:`}
          </span>
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-gray-700">
          {pFeatures.map((feat, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-[#e65410] mr-2 font-bold text-xs">✓</span>
              <span className="leading-tight font-medium">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tabs — full width, outside grid */}
      <div className="border border-gray-150 rounded-none overflow-hidden bg-white">
        <div className="bg-gray-100 border-b border-gray-150 flex">
          <button
            onClick={() => handleTabClick('specs')}
            className={`flex-1 px-4 py-2.5 text-[10px] font-mono font-black uppercase tracking-wider border-b-2 transition ${
              activeTab === 'specs'
                ? 'border-[#e65410] text-[#e65410] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-750 hover:bg-gray-150'
            }`}
          >
            {lang === 'en' ? 'Technical specifications' : 'Технические характеристики'}
          </button>
          <button
            onClick={() => handleTabClick('composition')}
            className={`flex-1 px-4 py-2.5 text-[10px] font-mono font-black uppercase tracking-wider border-b-2 transition ${
              activeTab === 'composition'
                ? 'border-[#e65410] text-[#e65410] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-750 hover:bg-gray-150'
            }`}
          >
            {lang === 'en' ? 'Equipment composition' : 'Комплектация'}
          </button>
          <button
            onClick={() => handleTabClick('materials')}
            className={`flex-1 px-4 py-2.5 text-[10px] font-mono font-black uppercase tracking-wider border-b-2 transition ${
              activeTab === 'materials'
                ? 'border-[#e65410] text-[#e65410] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-750 hover:bg-gray-150'
            }`}
          >
            {lang === 'en' ? 'Additional materials' : 'Дополнительные материалы'}
          </button>
        </div>
        <div ref={activeTab === 'specs' ? specsRef : activeTab === 'composition' ? compositionRef : materialsRef} className="p-4">
          {activeTab === 'specs' && (
            <>
              {/* MD таблица характеристик */}
              {p.specTableHtml && (
                <div className="border border-gray-150 rounded-none overflow-hidden bg-white shadow-none mb-4">
                  <div className="bg-gray-100 px-4 py-2.5 border-b border-gray-150">
                    <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-gray-750 flex items-center gap-1.5">
                      <Table className="h-3.5 w-3.5 text-[#e65410]" />
                      <span>Таблица характеристик</span>
                    </h4>
                  </div>
                  <div className="overflow-x-auto p-2">
                    <div
                      dangerouslySetInnerHTML={{ __html: p.specTableHtml }}
                      className="[&_table]:min-w-full [&_table]:text-[11px] [&_table]:font-sans [&_th]:bg-[#00333b] [&_th]:text-white [&_th]:px-3 [&_th]:py-2 [&_th]:font-mono [&_th]:font-black [&_th]:uppercase [&_th]:text-gray-300 [&_th]:text-left [&_td]:px-3 [&_td]:py-2 [&_td]:border-b [&_td]:border-gray-100 [&_tr:nth-child(even)]:bg-gray-50/50"
                    />
                  </div>
                </div>
              )}
              {p.variantModels && p.variantModels.length > 0 && (
                <div className="border border-gray-150 rounded-none overflow-hidden bg-white shadow-none">
                  <div className="bg-gray-100 px-4 py-2.5 border-b border-gray-150 flex items-center justify-between">
                    <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-gray-750 flex items-center gap-1.5">
                      <Sliders className="h-3.5 w-3.5 text-[#e65410]" />
                      <span>
                        {lang === 'en'
                          ? `Models inside the line ${p.model}:`
                          : `Линейка модификаций серии ${p.model}:`}
                      </span>
                    </h4>
                    <span className="text-[8px] font-mono font-bold bg-gray-200 text-gray-650 px-2 py-0.5 rounded-none uppercase">
                      Сибтехлит оригинал
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-150 text-[11px] font-sans">
                      <thead className="bg-[#00333b] text-white">
                        <tr>
                          <th scope="col" className="px-4 py-2.5 text-left font-mono font-black uppercase text-gray-300">Марка</th>
                          <th scope="col" className="px-4 py-2.5 text-left font-mono font-black uppercase text-gray-300">Пр-сть / Емкость</th>
                          <th scope="col" className="px-4 py-2.5 text-left font-mono font-black uppercase text-gray-300">Мощность</th>
                          {p.variantModels[0]?.extraField && (
                            <th scope="col" className="px-4 py-2.5 text-left font-mono font-black uppercase text-gray-300">{p.variantModels[0].extraField}</th>
                          )}
                          <th scope="col" className="px-4 py-2.5 text-right font-mono font-black uppercase text-[#e65410]">Выбор</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {p.variantModels.map((variant, vidx) => {
                          const isVariantSelectedInCart = isSelectedVariantInSpecs(p.id, variant.model);
                          return (
                            <tr key={vidx} className={`transition hover:bg-slate-55 ${vidx % 2 === 0 ? 'bg-gray-50/20' : ''}`}>
                              <td className="px-4 py-2.5 font-mono font-extrabold text-gray-900 border-none">{variant.model}</td>
                              <td className="px-4 py-2.5 text-gray-650 font-bold border-none">
                                {lang === 'en' && variant.capacityEn ? variant.capacityEn : variant.capacity}
                              </td>
                              <td className="px-4 py-2.5 text-gray-650 font-semibold border-none">{variant.power}</td>
                              {variant.extraField && (
                                <td className="px-4 py-2.5 text-gray-500 font-mono border-none font-semibold">
                                  {lang === 'en' && variant.extraFieldValEn ? variant.extraFieldValEn : variant.extraFieldVal}
                                </td>
                              )}
                              <td className="px-4 py-2.5 text-right border-none">
                                <button
                                  onClick={() => {
                                    handleAddCustomModel(p, variant.model);
                                    window.dispatchEvent(new CustomEvent('rfq-items-updated'));
                                  }}
                                  className={`px-3 py-1 text-[9px] font-mono font-black uppercase tracking-wider rounded-none transition duration-150 cursor-pointer ${
                                    isVariantSelectedInCart
                                      ? 'bg-emerald-55 text-emerald-700 font-extrabold border-emerald-350'
                                      : 'bg-orange-50 hover:bg-[#e65410] hover:text-white border-transparent text-[#e65410] font-black'
                                  }`}
                                >
                                  {isVariantSelectedInCart ? 'В КП ✓' : '+ Выбрать'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div className="rounded-none overflow-hidden mt-2 border border-gray-150">
                <button
                  onClick={() => toggleSpecs(p.id)}
                  className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-150 transition border-none flex items-center justify-between text-[11px] font-mono uppercase font-black text-gray-750 cursor-pointer select-none outline-none"
                >
                  <span className="flex items-center space-x-1.5">
                    <Table className="h-4 w-4 text-[#e65410] shrink-0" />
                    <span>
                      {lang === 'en'
                        ? `Technical specification constant attributes of series ${p.model}`
                        : `Массогабаритные характеристики серии ${p.model}`}
                    </span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transform transition-transform text-[#e65410] duration-250 ${isSpecsExpanded ? 'rotate-180' : ''}`} />
                </button>
                {isSpecsExpanded && (
                  <div className="bg-white animate-slideDown overflow-hidden border-t border-gray-150">
                    {renderSpecsContent()}
                  </div>
                )}
              </div>
            </>
          )}
          {activeTab === 'composition' && (
            <div ref={compositionRef} className="border border-gray-150 rounded-none overflow-hidden bg-white shadow-none mt-4">
              <div className="bg-gray-100 px-4 py-2.5 border-b border-gray-150">
                <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-gray-750 flex items-center gap-1.5">
                  <Package2 className="h-3.5 w-3.5 text-[#e65410]" />
                  <span>Комплект входит</span>
                </h4>
              </div>
              <ul className="divide-y divide-gray-100 bg-white">
                {(composition.length > 0 ? composition : p.features).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 px-4 py-3 text-xs text-gray-700">
                    <span className="text-[#e65410] font-bold text-xs mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'materials' && (
            <div ref={materialsRef} className="border border-gray-150 rounded-none overflow-hidden bg-white shadow-none mt-4">
              <div className="bg-gray-100 px-4 py-2.5 border-b border-gray-150">
                <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-gray-750 flex items-center gap-1.5">
                  <Box className="h-3.5 w-3.5 text-[#e65410]" />
                  <span>{lang === 'en' ? 'Additional Materials' : 'Связанные материалы'}</span>
                </h4>
              </div>
              <div className="divide-y divide-gray-100 bg-white">
                {(relatedEquipmentMap[p.id] || relatedCategoryFallbackMap[p.category] || []).length > 0 ? (
                  (relatedEquipmentMap[p.id] || relatedCategoryFallbackMap[p.category] || []).map((id) => {
                    const mat = materialsMap[id]?.[0];
                    if (!mat) return null;
                    return (
                      <button key={id} onClick={() => onSelectRelated(id)} className="w-full flex items-start gap-3 px-4 py-3 text-xs text-left hover:bg-slate-50 transition">
                        <span className="text-[#e65410] font-bold text-xs mt-0.5">+</span>
                        <span className="text-gray-700 font-medium">{mat.titleRu}</span>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-3 text-xs text-gray-500">
                    {lang === 'en' ? 'No additional materials specified' : 'Дополнительные материалы не указаны'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Equipment Section */}
      {renderRelatedEquipment()}
    </div>
  );
}
