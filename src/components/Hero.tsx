import { useState } from 'react';
import { ArrowRight, Hammer, Settings, Flame, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';
import steelPouringBg from '../assets/images/foundry_hero_bg_1781504494705.jpg';

interface HeroProps {
  onNavigateToCatalog: (category?: string) => void;
  onNavigateToTab?: (tab: string) => void;
  onAddToRFQ: (product: Product) => void;
  lang: 'ru' | 'en';
}

export default function Hero({ onNavigateToCatalog, onNavigateToTab, onAddToRFQ, lang }: HeroProps) {
  // Configurator/Quiz states
  const [step, setStep] = useState(1);
  const [alloyType, setAlloyType] = useState('');
  const [volume, setVolume] = useState('');
  const [technology, setTechnology] = useState('');
  const [calculatedResult, setCalculatedResult] = useState<Product | null>(null);

  const t = TRANSLATIONS[lang];

  const handleResetQuiz = () => {
    setAlloyType('');
    setVolume('');
    setTechnology('');
    setStep(1);
    setCalculatedResult(null);
  };

  const handleProcessSelection = (tech: string) => {
    setTechnology(tech);
    
    // Simple rule-based expert recommendation system for foundry configs
    let recommendation: Product | null = null;
    
    if (tech === 'xtc-equipment') {
      if (volume === 'low') {
        recommendation = PRODUCTS.find(p => p.category === tech) || null;
      } else if (volume === 'medium') {
        recommendation = PRODUCTS.find(p => p.category === tech) || null;
      } else {
        recommendation = PRODUCTS.find(p => p.category === tech) || null;
      }
    } else if (tech === 'furnaces') {
      if (volume === 'low' || volume === 'medium') {
        recommendation = PRODUCTS.find(p => p.category === tech) || null;
      } else {
        recommendation = PRODUCTS.find(p => p.category === tech) || null;
      }
    } else if (tech === 'shot-blast') {
      if (volume === 'low') {
        recommendation = PRODUCTS.find(p => p.category === tech) || null;
      } else if (volume === 'medium') {
        recommendation = PRODUCTS.find(p => p.category === tech) || null;
      } else {
        recommendation = PRODUCTS.find(p => p.category === tech) || null;
      }
    } else if (tech === 'special-casting') {
      if (volume === 'low' || volume === 'medium') {
        recommendation = PRODUCTS.find(p => p.category === tech) || null;
      } else {
        recommendation = PRODUCTS.find(p => p.category === tech) || null;
      }
    } else {
      recommendation = PRODUCTS.find(p => p.category === tech) || null;
    }

    setCalculatedResult(recommendation);
    setStep(4);
  };

  return (
    <div className="bg-[#F4F4F4] text-gray-900">
      
      {/* Industrial Hero Section with Professional Polish high-contrast styling */}
      <section className="relative bg-[#001c20] text-white py-20 sm:py-28 overflow-hidden">
        {/* Photo background of steel pouring process with luxury low opacity */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-[0.14] bg-no-repeat mix-blend-luminosity"
          style={{ backgroundImage: `url(${steelPouringBg})` }}
        />
        {/* Fine engineering grid overlay and orange subtle gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(230,84,16,0.12),transparent_40%)] z-0" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
        
        {/* Solid precision orange line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e65410] z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Main Captions */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2 bg-[#e65410]/10 border border-[#e65410]/30 px-3.5 py-1.5 rounded-none text-xs font-mono font-bold uppercase tracking-widest text-[#e65410]">
                <Flame className="h-4 w-4 animate-pulse" />
                <span>{t.modernFoundry}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight font-black text-white uppercase font-display">
                {t.heroTitle} <br />
                <span className="text-[#e65410]">{lang === 'en' ? 'SIBTEHLIT' : 'СИБТЕХЛИТ'}</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                {t.heroSubtitle}
              </p>

              {/* Action buttons inside the hero */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigateToCatalog()}
                  className="px-8 py-4 bg-[#e65410] hover:bg-[#cc4a0c] font-bold text-xs uppercase tracking-widest rounded-none text-white flex items-center space-x-2 transition duration-150 shadow-sm cursor-pointer border-none"
                >
                  <span>{t.btnCatalog}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('wizard-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-transparent hover:bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-none flex items-center space-x-2 transition cursor-pointer"
                >
                  <span>{t.btnWizard}</span>
                </button>
              </div>

              {/* Brand highlights */}
              <div className="grid grid-cols-3 gap-4 xl:gap-6 pt-6 border-t border-gray-800">
                <div>
                  <h4 className="text-2xl font-black font-mono text-[#e65410]">100%</h4>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">{t.faultTolerance}</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-mono text-[#e65410]">{lang === 'en' ? 'UP TO 90%' : 'до 90%'}</h4>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">{t.sandReclamation}</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-mono text-[#e65410]">24/7</h4>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">{t.monitoring247}</p>
                </div>
              </div>

            </div>

            {/* Industrial illustration graphic / Quick specs side card (5 columns) */}
            <div className="lg:col-span-5">
              <div className="bg-[#111111]/90 border border-gray-800 p-6 sm:p-8 rounded-none border-t-4 border-[#e65410] shadow-2xl relative">
                <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 bg-[#e65410] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1">
                  {t.engineeringService}
                </div>
                
                <h3 className="font-display font-extrabold uppercase text-sm tracking-widest text-[#e65410] border-b border-gray-800 pb-4">
                  {t.sibtehlitFull}
                </h3>

                <ul className="space-y-4 mt-6">
                   <li className="flex items-start space-x-3">
                     <div className="bg-[#e65410]/15 border border-[#e65410]/30 p-1.5 text-[#e65410] shrink-0">
                      <Settings className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide text-white">{t.installTitle}</h4>
                      <p className="text-xs text-gray-400 mt-1">{t.installDesc}</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                     <div className="bg-[#e65410]/15 border border-[#e65410]/30 p-1.5 text-[#e65410] shrink-0">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide text-white">{t.designTitle}</h4>
                      <p className="text-xs text-gray-400 mt-1">{t.designDesc}</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                     <div className="bg-[#e65410]/15 border border-[#e65410]/30 p-1.5 text-[#e65410] shrink-0">
                      <RefreshCw className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide text-white">{t.warehouseTitle}</h4>
                      <p className="text-xs text-gray-400 mt-1">{t.warehouseDesc}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 bg-black/40 p-4 border border-gray-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                     <ShieldCheck className="h-5 w-5 text-[#e65410]" />
                    <span className="text-xs font-mono text-gray-300">{t.guaranteeLabel}</span>
                  </div>
                   <span className="text-[10px] font-mono bg-[#e65410]/10 text-[#e65410] border border-[#e65410]/20 px-2 py-0.5 font-black uppercase">ISO 9001</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Hot Deals & Warehouse Stock Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <span className="text-[11px] font-mono font-black text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full inline-block">
              {lang === 'en' ? 'HOT OFFERS & STOCK AVAILABILITY' : 'ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ И НАЛИЧИЕ'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#00333b] uppercase tracking-tight font-display">
              {lang === 'en' ? 'Liquidation of active casting lines and ready-to-ship inventory' : 'Ликвидация литейных линий и готовое складское наличие оборудования'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: LGM Complex Liquidation */}
            <div className="bg-[#0b1b1d] text-white border border-teal-950 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2.5 py-1 uppercase font-black tracking-wider rounded">
                    {lang === 'en' ? 'PROMO / LIQUIDATION' : 'АКЦИЯ / ЛИКВИДАЦИЯ'}
                  </span>
                  <span className="font-mono text-xs text-orange-400 font-bold">{lang === 'en' ? 'Price: 38,000,000 RUB' : 'Цена: 38 000 000 ₽'}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black font-sans uppercase tracking-tight group-hover:text-orange-400 transition-colors">
                  {lang === 'en' ? 'Full LGM complex with furnace & shot blaster (Used)' : 'Линейный комплекс ЛГМ с печью и дробеметом (Б/У)'}
                </h3>
                <p className="text-xs text-gray-350 leading-relaxed font-sans">
                  {lang === 'en' 
                    ? 'Fully operational Lost Foam LGM casting line. Used for only 1.5 years. Includes: 2 x 490kg melting furnace crucibles, SCR frequency converter 350 kW, shot blaster Q3710, pre-expander, vacuum system.'
                    : 'Полностью исправная литейная линия ЛГМ. Отработала всего 1.5 года. В составе: плавильный узел 2х0.49т, ТПЧ 350 кВт, дробемет Q3710 г/п 1000 кг, автоматический предвспениватель, формовка, вакуумная система.'}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-teal-900 flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-400 uppercase font-bold">{lang === 'en' ? '★ SPECIAL 30%+ DISCOUNT ★' : '★ СКИДКА БОЛЕЕ 30% ★'}</span>
                <button
                  onClick={() => {
                    (window as any)._pendingProductId = 'oborudovaie-lgm-avtoklav';
                    onNavigateToCatalog('lgm-equipment');
                  }}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition border-none cursor-pointer flex items-center gap-1.5"
                >
                  <span>{lang === 'en' ? 'View specification' : 'Смотреть комплектацию'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Warehouse In Stock Inventory */}
            <div className="bg-slate-50 text-gray-900 border border-gray-200 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-1 uppercase font-black tracking-wider rounded">
                    {lang === 'en' ? 'READY TO SHIP' : 'В НАЛИЧИИ НА СКЛАДЕ'}
                  </span>
                  <span className="font-mono text-xs text-emerald-700 font-bold">{lang === 'en' ? 'SHIPPING IN 24 HOURS' : 'ОТГРУЗКА ЗА 1 ДЕНЬ'}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black font-sans uppercase tracking-tight text-gray-950 group-hover:text-emerald-750 transition-colors">
                  {lang === 'en' ? 'Foundry equipment in stock (Novosibirsk)' : 'Литейное оборудование в Новосибирске'}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {lang === 'en'
                    ? 'Ready-to-dispatch machinery and spares. Resin sand continuous mixers S24 (3 t/h, 5 t/h), compaction tables S2312, teapot pouring ladles KL-0.5, tumble belt blasters Q325. Shipped in 24 hours with a 3-year warranty.'
                    : 'Готовое к отгрузке оборудование и запчасти. Смесители ХТС серии S24 (3 т/ч, 5 т/ч), вибростолы уплотнения S2312, чайниковые ковши КЛ-0.5, ленточные дробеметы Q325. Отгрузка за 24 часа с гарантией 3 года.'}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-400 uppercase font-bold">{lang === 'en' ? '★ 3 YEARS WARRANTY ★' : '★ ГАРАНТИЯ 3 ГОДА ★'}</span>
                <button
                  onClick={() => {
                    if (onNavigateToTab) {
                      onNavigateToTab('in-stock');
                    } else {
                      onNavigateToCatalog('in-stock');
                    }
                  }}
                  className="px-5 py-2.5 bg-[#00333b] hover:bg-[#002227] text-white text-xs font-bold uppercase tracking-wider transition border-none cursor-pointer flex items-center gap-1.5"
                >
                  <span>{lang === 'en' ? 'Browse stock inventory' : 'Посмотреть складской каталог'}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main categories Grid section */}
      <section className="py-20 bg-[#F4F4F4] border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#e65410] uppercase tracking-[0.3em] mb-1 block">{t.techChainTitle}</span>
            <h2 className="text-3xl font-black text-[#00333b] tracking-tight uppercase sm:text-4xl font-display">
              {t.techChainHeader}
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed">
              {t.techChainDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            
            {/* Category 1 */}
            <div 
              onClick={() => onNavigateToCatalog('xtc-equipment')}
              className="group bg-white border-t-4 border-[#00333b] hover:border-[#e65410] p-8 rounded-none shadow-xs hover:shadow-md transition duration-150 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="bg-[#e65410]/5 group-hover:bg-[#e65410]/10 p-4 w-14 h-14 rounded-none flex items-center justify-center text-[#e65410] transition-colors">
                  <Settings className="h-7 w-7" />
                </div>
                <h3 className="font-display font-bold uppercase tracking-wide text-lg text-gray-900 mt-6 group-hover:text-[#e65410] transition-colors">
                  {t.catMixersTitle}
                </h3>
                <p className="text-gray-600 text-xs mt-3 leading-relaxed">
                  {t.catMixersDesc}
                </p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#e65410] uppercase mt-6 tracking-wide">
                <span>{t.viewInCatalog}</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Category 2 */}
            <div 
              onClick={() => onNavigateToCatalog('furnaces')}
              className="group bg-white border-t-4 border-[#00333b] hover:border-[#e65410] p-8 rounded-none shadow-xs hover:shadow-md transition duration-150 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="bg-[#e65410]/5 group-hover:bg-[#e65410]/10 p-4 w-14 h-14 rounded-none flex items-center justify-center text-[#e65410] transition-colors">
                  <Flame className="h-7 w-7" />
                </div>
                <h3 className="font-display font-bold uppercase tracking-wide text-lg text-gray-900 mt-6 group-hover:text-[#e65410] transition-colors">
                  {t.catFurnacesTitle}
                </h3>
                <p className="text-gray-600 text-xs mt-3 leading-relaxed">
                  {t.catFurnacesDesc}
                </p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#e65410] uppercase mt-6 tracking-wide">
                <span>{t.viewInCatalog}</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Category 3 */}
            <div 
              onClick={() => onNavigateToCatalog('shot-blast')}
              className="group bg-white border-t-4 border-[#00333b] hover:border-[#e65410] p-8 rounded-none shadow-xs hover:shadow-md transition duration-150 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="bg-[#e65410]/5 group-hover:bg-[#e65410]/10 p-4 w-14 h-14 rounded-none flex items-center justify-center text-[#e65410] transition-colors">
                  <Hammer className="h-7 w-7" />
                </div>
                <h3 className="font-display font-bold uppercase tracking-wide text-lg text-gray-900 mt-6 group-hover:text-[#e65410] transition-colors">
                  {t.catShotBlastTitle}
                </h3>
                <p className="text-gray-600 text-xs mt-3 leading-relaxed">
                  {t.catShotBlastDesc}
                </p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#e65410] uppercase mt-6 tracking-wide">
                <span>{t.viewInCatalog}</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Selector Wizard / Configurator Section */}
      <section id="wizard-section" className="py-20 bg-[#00333b] text-white border-t border-teal-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Explanation card of wizard (5 columns) */}
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#e65410] font-black">{t.wizardTitle}</span>
              <h2 className="text-3xl font-black text-white tracking-tight leading-tight uppercase font-display font-sans">
                {t.wizardHeader}
              </h2>
              <p className="text-gray-200 text-sm leading-relaxed">
                {t.wizardDesc}
              </p>
              <div className="bg-[#00252b] p-5 rounded-none border border-teal-800">
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block font-bold">{t.currentAlg}</span>
                <div className="flex items-center space-x-2 mt-3 font-mono">
                  <div className="h-2 w-2 rounded-full bg-[#e65410] animate-ping" />
                  <span className="text-xs text-gray-300">{t.algorithmActive}</span>
                </div>
              </div>
            </div>

            {/* Multi-step Widget (8 columns) */}
            <div className="lg:col-span-8 font-sans">
              <div className="bg-[#001f24] border-t-4 border-[#e65410] p-6 sm:p-10 shadow-3xl">
                
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-8 border-b border-teal-900 pb-4 font-mono">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs text-gray-400 uppercase">{t.wizardStepIndicator}:</span>
                    <span className="text-sm font-bold text-[#e65410]">{step} {t.wizardStepOf} 3</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className={`h-1.5 w-12 rounded-none transition ${step >= 1 ? 'bg-[#e65410]' : 'bg-teal-950/70'}`} />
                    <div className={`h-1.5 w-12 rounded-none transition ${step >= 2 ? 'bg-[#e65410]' : 'bg-teal-950/70'}`} />
                    <div className={`h-1.5 w-12 rounded-none transition ${step >= 3 ? 'bg-[#e65410]' : 'bg-teal-950/70'}`} />
                  </div>
                </div>

                {/* STEP 1: Alloy Selecting */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-base font-bold uppercase tracking-wider text-white">
                      {t.wizardQ1}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: 'iron', label: t.alloyOption1, icon: Flame },
                        { id: 'grey-iron', label: t.alloyOption2, icon: Hammer },
                        { id: 'alu', label: t.alloyOption3, icon: Settings },
                        { id: 'copper', label: t.alloyOption4, icon: Layers },
                      ].map((alloy) => (
                        <button
                          key={alloy.id}
                          onClick={() => {
                            setAlloyType(alloy.id);
                            setStep(2);
                          }}
                          className={`flex items-center space-x-4 p-4 rounded-none border text-left cursor-pointer transition duration-150 ${
                            alloyType === alloy.id
                              ? 'bg-[#e65410]/10 border-[#e65410] text-[#e65410]'
                              : 'bg-[#00252b] border-[#003c46] hover:border-[#004e5a] text-gray-200'
                          }`}
                        >
                          <div className="bg-black/35 p-2 rounded-none shrink-0">
                            <Zap className="h-5 w-5 text-[#e65410]" />
                          </div>
                          <span className="text-xs font-bold text-white uppercase tracking-wider leading-snug">{alloy.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Volume Selecting */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-base font-bold uppercase tracking-wider text-white">
                      {t.wizardQ2}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: 'low', label: t.volOption1, desc: t.volOption1Desc },
                        { id: 'medium', label: t.volOption2, desc: t.volOption2Desc },
                        { id: 'high', label: t.volOption3, desc: t.volOption3Desc },
                      ].map((vol) => (
                        <button
                          key={vol.id}
                          onClick={() => {
                            setVolume(vol.id);
                            setStep(3);
                          }}
                          className={`flex flex-col p-5 rounded-none border text-left cursor-pointer transition duration-150 ${
                            volume === vol.id
                              ? 'bg-[#e65410]/10 border-[#e65410] text-[#e65410]'
                              : 'bg-[#00252b] border-[#003c46] hover:border-[#004e5a] text-gray-200'
                          }`}
                        >
                          <span className="font-bold text-[#E5E7EB] uppercase tracking-wider text-xs">{vol.label}</span>
                          <span className="text-[11px] text-gray-300 mt-2 leading-snug">{vol.desc}</span>
                        </button>
                      ))}
                    </div>
                    <div className="pt-4 flex justify-start">
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs font-mono text-gray-400 hover:text-white cursor-pointer"
                      >
                        {t.wizardBack}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Technology selection */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-base font-bold uppercase tracking-wider text-white">
                      {t.wizardQ3}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: 'xtc-equipment', label: t.techOption1 },
                        { id: 'furnaces', label: t.techOption2 },
                        { id: 'shot-blast', label: t.techOption3 },
                        { id: 'special-casting', label: t.techOption4 },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleProcessSelection(item.id)}
                          className="flex items-center justify-between p-4 rounded-none border bg-[#00252b] border-[#003c46] hover:border-[#004e5a] text-gray-200 text-left cursor-pointer transition duration-150"
                        >
                          <span className="text-xs font-bold text-white uppercase tracking-wider leading-snug">{item.label}</span>
                          <ArrowRight className="h-4 w-4 text-[#e65410] ml-2 shrink-0" />
                        </button>
                      ))}
                    </div>
                    <div className="pt-4 flex justify-between items-center">
                      <button
                        onClick={() => setStep(2)}
                        className="text-xs font-mono text-gray-400 hover:text-white cursor-pointer"
                      >
                        {t.wizardBack}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Calculated Expert Recommendation */}
                {step === 4 && calculatedResult && (
                  <div className="space-y-6">
                    <div className="bg-[#e65410]/10 border border-[#e65410]/20 p-4 rounded-none flex items-start space-x-3">
                      <ShieldCheck className="h-6 w-6 text-[#e65410] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest leading-none">
                          {t.wizardDoneHeader}
                        </h4>
                        <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                          {t.wizardDoneDesc}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#00252b]/40 border border-teal-850 p-5 rounded-none flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="space-y-2 text-center sm:text-left">
                        <span className="text-[10px] font-mono text-[#e65410] bg-[#e65410]/10 border border-[#e65410]/20 px-2 py-0.5 rounded-none uppercase font-bold">
                          {t.wizardModelLabel} {calculatedResult.model}
                        </span>
                        <h4 className="text-base font-bold text-white">
                          {lang === 'en' && calculatedResult.titleEn ? calculatedResult.titleEn : calculatedResult.title}
                        </h4>
                        <p className="text-xs text-gray-300 line-clamp-2 max-w-lg leading-relaxed">
                          {lang === 'en' && calculatedResult.descriptionEn ? calculatedResult.descriptionEn : calculatedResult.description}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            onAddToRFQ(calculatedResult!);
                          }}
                          className="px-5 py-3 bg-[#e65410] hover:bg-[#cc4a0c] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer border-none"
                        >
                          {t.wizardAddBtn}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-teal-900 justify-between items-center text-center sm:text-left">
                      <p className="text-[11px] text-gray-400 font-mono italic">
                        {t.wizardDiscl}
                      </p>
                      <button
                        onClick={handleResetQuiz}
                        className="text-xs font-mono text-gray-400 hover:text-white border-b border-teal-700 pb-0.5 cursor-pointer bg-transparent border-none outline-none"
                      >
                        {t.wizardReset}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
