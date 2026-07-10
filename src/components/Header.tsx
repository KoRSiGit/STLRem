import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, HardHat, ShieldAlert, Cpu, FileText, ChevronDown, Award, Sparkles, Sliders, Info, Phone, Flame, Layers, Snowflake, Wrench, Settings, Activity, Camera, Search } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import SearchModal from './SearchModal';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onCategorySelect?: (category: string, query?: string, subId?: string, productId?: string) => void;
  rfqItemsCount: number;
  lang: 'ru' | 'en';
  setLang: (l: 'ru' | 'en') => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  onCategorySelect,
  rfqItemsCount,
  lang,
  setLang,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'catalog' | 'company' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderMegamenuDropdown = () => {
    if (!dropdownOpen || activeDropdown !== 'catalog') return null;
    return (
      <div className="absolute top-full left-0 right-0 mx-auto w-full max-w-7xl bg-[#00242a] text-white rounded-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65)] border-l border-r border-b border-teal-850 p-7 z-[9999] animate-fadeIn border-t-4 border-t-[#e65410] -mt-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5">
          {catalogDropdownCategories.map((cat) => (
            <div key={cat.id} className="space-y-3.5">
              <h5 
                onClick={() => handleCategoryClick(cat.id)}
                className="text-[12px] font-black uppercase text-[#e65410] tracking-wider cursor-pointer hover:underline border-b border-[#003d47] pb-2 flex items-center gap-1.5 transition duration-150 hover:text-white"
              >
                <cat.icon className="h-3.5 w-3.5 shrink-0 text-[#e65410]" />
                <span>{lang === 'en' ? cat.labelEn : cat.labelRu}</span>
              </h5>
              <ul className="space-y-2">
                {cat.items.map((sub, sidx) => (
                  <li key={sidx}>
                    <button
                      onClick={() => handleCategoryClick(cat.id, sub.query, sub.subId, (sub as any).productId)}
                      className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex items-start gap-1 py-0.5 group/sub border-none bg-transparent p-0 cursor-pointer w-full leading-tight"
                    >
                      <span className="text-[#e65410] opacity-50 group-hover/sub:opacity-100 font-mono">›</span>
                      <span className="group-hover/sub:underline">{lang === 'en' ? sub.labelEn : sub.labelRu}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-[#003d47] pt-4.5 mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10.5px] text-gray-300 font-mono">
          <span className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#e65410] animate-pulse" />
            <span>{lang === 'en' ? 'Direct navigation from Siberian Foundry Technologies (Sibtehlit)' : 'Официальный номенклатурный список «Сибтехлит»'}</span>
          </span>
          <button
            onClick={() => handleCategoryClick('all')}
            className="bg-[#00171b] hover:bg-[#e65410] border border-[#003d47] hover:border-[#e65410] text-white px-3.5 py-1.5 rounded-none text-[9.5px] uppercase font-bold transition-all duration-150 cursor-pointer shadow-sm active:scale-95"
          >
            {lang === 'en' ? 'Open Full Catalog' : 'Открыть весь каталог ↗'}
          </button>
        </div>
      </div>
    );
  };

  const handleCompanyClick = (sectionId: string, filter?: string, action?: string) => {
    if (action === 'contacts') {
      setCurrentTab('contacts');
    } else {
      setCurrentTab('about');
      (window as any)._pendingAboutSection = sectionId;
      if (filter) {
        (window as any)._pendingAboutFilter = filter;
      }
      window.dispatchEvent(new CustomEvent('about-nav-sync'));
    }
    setDropdownOpen(false);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const renderCompanyDropdown = () => {
    if (!dropdownOpen || activeDropdown !== 'company') return null;
    return (
      <div className="absolute top-full left-0 right-0 mx-auto w-full max-w-7xl bg-[#00242a] text-white rounded-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65)] border-l border-r border-b border-teal-850 p-7 z-[9999] animate-fadeIn border-t-4 border-t-[#e65410] -mt-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Column 1: О предприятии */}
          <div className="space-y-4">
            <h5 className="text-[12px] font-black uppercase text-[#e65410] tracking-wider border-b border-[#003d47] pb-2 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 shrink-0 text-[#e65410]" />
              <span>{lang === 'en' ? 'About Enterprise' : 'О предприятии'}</span>
            </h5>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleCompanyClick('about-intro')}
                  className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex flex-col gap-0.5 group border-none bg-transparent p-0 cursor-pointer w-full"
                >
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#e65410] group-hover:underline">
                    <span className="text-[#e65410] font-mono">›</span>
                    {lang === 'en' ? 'Our Mission & Siberian Roots' : 'История, миссия и корни'}
                  </span>
                  <span className="text-[9px] text-gray-400 pl-3 leading-tight font-serif italic">
                    {lang === 'en' ? 'Novosibirsk center of metallurgy layouts' : 'Новосибирский центр литейного проектирования'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCompanyClick('about-stats')}
                  className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex flex-col gap-0.5 group border-none bg-transparent p-0 cursor-pointer w-full"
                >
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#e65410] group-hover:underline">
                    <span className="text-[#e65410] font-mono">›</span>
                    {lang === 'en' ? 'Company Key Statistics' : 'Основные показатели'}
                  </span>
                  <span className="text-[9px] text-gray-400 pl-3 leading-tight font-serif italic">
                    {lang === 'en' ? '50+ shops upgraded, 15 years history' : '50+ запущенных цехов, 15 лет экспертизы'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Направления деятельности */}
          <div className="space-y-4">
            <h5 className="text-[12px] font-black uppercase text-[#e65410] tracking-wider border-b border-[#003d47] pb-2 flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5 shrink-0 text-[#e65410]" />
              <span>{lang === 'en' ? 'Engineering & Services' : 'Инжиниринг и Сервис'}</span>
            </h5>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleCompanyClick('about-activities')}
                  className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex flex-col gap-0.5 group border-none bg-transparent p-0 cursor-pointer w-full"
                >
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#e65410] group-hover:underline">
                    <span className="text-[#e65410] font-mono">›</span>
                    {lang === 'en' ? '3D Design & CAD Blueprints' : 'Аудит и Проектирование'}
                  </span>
                  <span className="text-[9px] text-gray-400 pl-3 leading-tight font-serif italic">
                    {lang === 'en' ? 'Schemes according to ISO & GOST standards' : 'Компоновки по ГОСТ и техническому ТЗ'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCompanyClick('about-activities')}
                  className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex flex-col gap-0.5 group border-none bg-transparent p-0 cursor-pointer w-full"
                >
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#e65410] group-hover:underline">
                    <span className="text-[#e65410] font-mono">›</span>
                    {lang === 'en' ? 'Assembly & Chemistry' : 'Шеф-монтаж и Технологии'}
                  </span>
                  <span className="text-[9px] text-gray-400 pl-3 leading-tight font-serif italic">
                    {lang === 'en' ? 'Optimized chemistry & first melt control' : 'Смеси ХТС/ПГС и запуск первой плавки'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCompanyClick('about-activities')}
                  className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex flex-col gap-0.5 group border-none bg-transparent p-0 cursor-pointer w-full"
                >
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#e65410] group-hover:underline">
                    <span className="text-[#e65410] font-mono">›</span>
                    {lang === 'en' ? 'Mobile Brigade Technical Help' : 'Гарантия и ОТК'}
                  </span>
                  <span className="text-[9px] text-gray-400 pl-3 leading-tight font-serif italic">
                    {lang === 'en' ? 'Double inspector quality checks' : 'Двойной контроль качества на заводах'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Референц-лист проектов (Multilevel dropdown trigger) */}
          <div className="space-y-4">
            <h5 className="text-[12px] font-black uppercase text-[#e65410] tracking-wider border-b border-[#003d47] pb-2 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 shrink-0 text-[#e65410]" />
              <span>{lang === 'en' ? 'Verifiable references' : 'Референс-лист объектов'}</span>
            </h5>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleCompanyClick('about-projects', 'all')}
                  className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex flex-col gap-0.5 group border-none bg-transparent p-0 cursor-pointer w-full"
                >
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#e65410] group-hover:underline">
                    <span className="text-[#e65410] font-mono">›</span>
                    {lang === 'en' ? 'All commissioning projects' : 'Все запущенные заводы'}
                  </span>
                  <span className="text-[9px] text-gray-400 pl-3 leading-tight font-serif italic">
                    {lang === 'en' ? 'Check our references portfolio' : 'Полная карта сданных объектов СНГ'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCompanyClick('about-projects', 'molding')}
                  className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex flex-col gap-0.5 group border-none bg-transparent p-0 cursor-pointer w-full"
                >
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#e65410] group-hover:underline">
                    <span className="text-[#e65410] font-mono">›</span>
                    {lang === 'en' ? 'Resin Sand Continuous (No-Bake)' : 'Формовка смесей ХТС'}
                  </span>
                  <span className="text-emerald-400 text-[8px] pl-3 tracking-widest font-mono font-bold block uppercase mt-0.5 text-left">
                    {lang === 'en' ? '[ ACTIVE NO-BAKE FILTER ]' : '[ ФИЛЬТР: ХТС ФОРМОВКА ]'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCompanyClick('about-projects', 'melting')}
                  className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex flex-col gap-0.5 group border-none bg-transparent p-0 cursor-pointer w-full"
                >
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#e65410] group-hover:underline">
                    <span className="text-[#e65410] font-mono">›</span>
                    {lang === 'en' ? 'Induction Melting layouts' : 'Печи плавки индукции'}
                  </span>
                  <span className="text-emerald-400 text-[8px] pl-3 tracking-widest font-mono font-bold block uppercase mt-0.5 text-left">
                    {lang === 'en' ? '[ ACTIVE MELTING FILTER ]' : '[ ФИЛЬТР: ИНДУКЦИЯ ]'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCompanyClick('about-projects', 'cleaning')}
                  className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex flex-col gap-0.5 group border-none bg-transparent p-0 cursor-pointer w-full"
                >
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#e65410] group-hover:underline">
                    <span className="text-[#e65410] font-mono">›</span>
                    {lang === 'en' ? 'Finished shot blast chambers' : 'Дробеметная очистка'}
                  </span>
                  <span className="text-emerald-400 text-[8px] pl-3 tracking-widest font-mono font-bold block uppercase mt-0.5 text-left">
                    {lang === 'en' ? '[ ACTIVE BLASTING FILTER ]' : '[ ФИЛЬТР: ДРОБЕМЕТЫ ]'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Снабжение и Запчасти */}
          <div className="space-y-4">
            <h5 className="text-[12px] font-black uppercase text-[#e65410] tracking-wider border-b border-[#003d47] pb-2 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 shrink-0 text-[#e65410]" />
              <span>{lang === 'en' ? 'Supply & Support' : 'Логистика и Склад'}</span>
            </h5>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleCompanyClick('about-warehouse')}
                  className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex flex-col gap-0.5 group border-none bg-transparent p-0 cursor-pointer w-full"
                >
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#e65410] group-hover:underline">
                    <span className="text-[#e65410] font-mono">›</span>
                    {lang === 'en' ? 'Central Novosibirsk Depots' : 'Склад в г. Новосибирск'}
                  </span>
                  <span className="text-[9px] text-gray-400 pl-3 leading-tight font-serif italic">
                    {lang === 'en' ? 'Blades, linings, seals dispatched fast' : 'Лопатки, Mn13 броня и тигли в наличии'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCompanyClick('about-warehouse', undefined, 'contacts')}
                  className="text-left text-[11px] text-gray-200 hover:text-white transition duration-150 flex flex-col gap-0.5 group border-none bg-transparent p-0 cursor-pointer w-full"
                >
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#e65410] group-hover:underline">
                    <span className="text-[#e65410] font-mono">›</span>
                    {lang === 'en' ? 'Discuss metallurgy audit' : 'Подать запрос условий КП'}
                  </span>
                  <span className="text-[9px] text-gray-400 pl-3 leading-tight font-serif italic">
                    {lang === 'en' ? 'Get immediate quotation sheets' : 'Расчет за 1 час от технологов'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#003d47] pt-4.5 mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10.5px] text-gray-300 font-mono">
          <span className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#e65410] animate-pulse" />
            <span>{lang === 'en' ? 'Siberian Foundry Technologies corporate values' : 'Инженерно-консультационная служба компании ООО «Сибтехлит»'}</span>
          </span>
          <button
            onClick={() => handleCompanyClick('about-intro')}
            className="bg-[#00171b] hover:bg-[#e65410] border border-[#003d47] hover:border-[#e65410] text-white px-3.5 py-1.5 rounded text-[9.5px] uppercase font-bold transition-all duration-150 cursor-pointer shadow-sm active:scale-95"
          >
            {lang === 'en' ? 'View Corporate Intro' : 'Смотреть презентацию компании ↗'}
          </button>
        </div>
      </div>
    );
  };

  const catalogDropdownCategories = [
    {
      id: 'xtc-equipment',
      labelRu: 'Формовка ХТС',
      labelEn: 'No-Bake Molding XTC',
      icon: Layers,
      items: [
        { labelRu: 'Смесители ХТС серии СХ', labelEn: 'Continuous mixers CX', query: 'СХ', subId: 'mixers' },
      ],
    },
    {
      id: 'furnaces',
      labelRu: 'Плавильное оборуд.',
      labelEn: 'Melting Furnaces',
      icon: Flame,
      items: [
        { labelRu: 'Индукционные печи GW', labelEn: 'Induction furnaces GW', query: 'GW', subId: 'induction' },
        { labelRu: 'Чайниковые ковши КЛ', labelEn: 'Teapot pouring ladles KL', query: 'КЛ', subId: 'ladles' },
      ],
    },
    {
      id: 'pgs-equipment',
      labelRu: 'Оборудование ПГС',
      labelEn: 'Green Sand Equipment',
      icon: Sliders,
      items: [
        { labelRu: 'Смесители ПГС серии СТ', labelEn: 'Intensive mixers ST', query: 'СТ', subId: 'mixers' },
      ],
    },
    {
      id: 'core-making',
      labelRu: 'Стержневое оборуд.',
      labelEn: 'Core Making Equipment',
      icon: Cpu,
      items: [
        { labelRu: 'Стержневые автоматы СА', labelEn: 'Core shooters SA', query: 'СА', subId: 'shooters' },
      ],
    },
    {
      id: 'shot-blast',
      labelRu: 'Дробеметная очистка',
      labelEn: 'Shot Blasting',
      icon: HardHat,
      items: [
        { labelRu: 'Ленточные дробеметы Q32', labelEn: 'Tumble belt blasters Q32', query: 'Q32', subId: 'shot-blast-machines' },
        { labelRu: 'Барабанные дробеметы Q31', labelEn: 'Tumble steel drum systems Q31', query: 'Q31', subId: 'shot-blast-machines' },
        { labelRu: 'Подвесные дробеметы Q37', labelEn: 'Overhead hook chambers Q37', query: 'Q37', subId: 'shot-blast-machines' },
      ],
    },
    {
      id: 'sandblast',
      labelRu: 'Пескоструйная очистка',
      labelEn: 'Sandblasting Rooms',
      icon: HardHat,
      items: [
        { labelRu: 'Пескоструйные камеры', labelEn: 'Sandblast rooms', query: '', subId: 'sandblast-cabinets' },
      ],
    },
    {
      id: 'special-casting',
      labelRu: 'Литейные машины',
      labelEn: 'Casting Machinery',
      icon: ShieldAlert,
      items: [
        { labelRu: 'Кокильные и центробежные машины', labelEn: 'Gravity & centrifugal molders', query: 'КМ ЦЛ', subId: 'molders' },
      ],
    },
    {
      id: 'cooling-systems',
      labelRu: 'Системы охлаждения',
      labelEn: 'Water Cooling Systems',
      icon: Snowflake,
      items: [
        { labelRu: 'Испарительные градирни ГЗ', labelEn: 'Closed cooling towers GZ', query: 'ГЗ', subId: 'cooling-towers' },
      ],
    },
    {
      id: 'lgm-equipment',
      labelRu: 'Оборудование ЛГМ',
      labelEn: 'Lost Foam LGM',
      icon: Cpu,
      items: [
        { labelRu: 'Белый цех (модели ЛГМ)', labelEn: 'White shop (LGM models)', query: 'ПВ ФА', subId: 'white-shop' },
        { labelRu: 'Чёрный цех (формовка/заливка)', labelEn: 'Black shop (molding/pouring)', query: 'ВС ВО', subId: 'black-shop' },
      ],
    },
    {
      id: 'lvm-equipment',
      labelRu: 'Оборудование ЛВМ',
      labelEn: 'Investment LVM',
      icon: Settings,
      items: [
        { labelRu: 'Бойлерклавы депарафинизации БК', labelEn: 'Dewaxing Boilerclaves BK', query: 'БК', subId: 'boilers' },
      ],
    },
    {
      id: 'thermal-furnaces',
      labelRu: 'Термические печи',
      labelEn: 'Thermal Furnaces',
      icon: Flame,
      items: [
        { labelRu: 'Камерные печи СДО', labelEn: 'Car-bottom Kilns SDO', query: 'СДО', subId: 'treatment-chambers' },
      ],
    },
    {
      id: 'finishing-cnc',
      labelRu: 'Обрубной клин/прессы',
      labelEn: 'Fettling Jaws',
      icon: Activity,
      items: [
        { labelRu: 'Гидроклинья ГК', labelEn: 'Hydraulic splitting GK', query: 'ГК', subId: 'fettling-tools' },
      ],
    }
  ];

  const navItems = [
    { id: 'catalog', label: lang === 'en' ? 'Catalog' : 'Каталог', icon: FileText, hasDropdown: true, dropdownType: 'catalog' },
    { id: 'in-stock', label: lang === 'en' ? 'In Stock' : 'Наличие', icon: Award },
    { id: 'gallery', label: lang === 'en' ? 'Photo Reports' : 'Фотоотчеты', icon: Camera },
    { id: 'about', label: lang === 'en' ? 'Company' : 'Компания', icon: Info, hasDropdown: true, dropdownType: 'company' },
    { id: 'contacts', label: lang === 'en' ? 'Contacts' : 'Контакты', icon: Phone },
  ];

  const handleCategoryClick = (catId: string, query?: string, subId?: string, productId?: string) => {
    if (onCategorySelect) {
      onCategorySelect(catId, query, subId, productId);
    } else {
      setCurrentTab('catalog');
    }
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 w-full z-50 bg-white border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? 'shadow-md shadow-slate-100/10' : 'shadow-xs'
      }`}>
      {/* Top micro-bar */}
      <div className={`bg-[#00333b] text-white text-[11px] px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'h-0 py-0 overflow-hidden opacity-0 pointer-events-none' 
          : 'h-auto py-2.5 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center font-mono">
          <div className="flex gap-6">
            <span>📍 {t.addressCity}</span>
            <span className="hidden sm:inline">📞 8-800-550-60-54</span>
            <span className="hidden md:inline">📞 +7 (383) 33-54-0-54</span>
            <span className="hidden lg:inline">✉ info@sibtehlit.ru</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setLang('en')}
              className={`transition-all duration-150 cursor-pointer text-xs uppercase ${
                lang === 'en'
                  ? 'font-bold text-[#e65410] border-b border-[#e65410]'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ru')}
              className={`transition-all duration-150 cursor-pointer text-xs uppercase ${
                lang === 'ru'
                  ? 'font-bold text-[#e65410] border-b border-[#e65410]'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              RU
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-14 sm:h-15' : 'h-20'} py-1 sm:py-2`}>
          
          {/* Logo with the beautiful custom official Sibtehlit SVG */}
          <div 
            onClick={() => setCurrentTab('home')} 
            className="flex items-center space-x-2.5 sm:space-x-3.5 cursor-pointer group select-none hover:opacity-95"
          >
            <svg 
              className={`shrink-0 transition-all duration-300 group-hover:scale-105 ${isScrolled ? 'h-8 w-8 sm:h-9 sm:w-9' : 'h-11 w-11 sm:h-13 sm:w-13'}`}
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* The open circle representing the ladle, with professional thick stroke */}
              <path
                d="M 68 25 A 36 36 0 1 1 32 25"
                stroke="#00333b"
                strokeWidth="15"
                strokeLinecap="butt"
                fill="none"
              />
              {/* The energetic crescent flame swooshing out of the top-left */}
              <path
                d="M 50 43 C 54 34, 52 14, 24 4 C 35 12, 45 28, 50 43 Z"
                fill="#e65410"
              />
            </svg>
            <div>
              <div className="flex items-center leading-none">
                <span className={`font-sans font-black tracking-normal text-[#00333b] uppercase transition-all duration-350 ${isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>
                  {lang === 'en' ? 'Sibtehlit' : 'Сибтехлит'}
                </span>
              </div>
              <p className={`text-[9px] sm:text-[10px] text-[#00333b] font-bold tracking-[0.14em] uppercase font-sans mt-0.5 leading-none transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden mt-0' : 'h-auto opacity-100'}`}>
                {lang === 'en' ? 'YOUR FOUNDRY PARTNER' : 'ВАШ ЛИТЕЙНЫЙ ПАРТНЕР'}
              </p>
            </div>
          </div>

          {/* Centered Menu on Scrolled Header */}
          <nav className={`hidden md:flex items-center lg:space-x-5 space-x-2 transition-all duration-300 h-full ${
            isScrolled ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible w-0 overflow-hidden pointer-events-none'
          }`}>
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = currentTab === item.id;

              if (item.hasDropdown) {
                const isThisOpen = dropdownOpen && activeDropdown === item.dropdownType;
                return (
                  <div
                    key={item.id}
                    className="h-full flex items-center"
                    onMouseEnter={() => {
                      setDropdownOpen(true);
                      setActiveDropdown(item.dropdownType || null);
                    }}
                    onMouseLeave={() => {
                      setDropdownOpen(false);
                      setActiveDropdown(null);
                    }}
                  >
                    <button
                      onClick={() => {
                        if (item.dropdownType === 'catalog') {
                          setCurrentTab('catalog');
                          if (onCategorySelect) onCategorySelect('all');
                        } else {
                          setCurrentTab('about');
                        }
                      }}
                      className={`flex items-center space-x-1.5 h-full px-2 lg:px-3 text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all duration-150 border-b-2 cursor-pointer ${
                        isActive || isThisOpen
                          ? 'border-[#e65410] text-[#e65410]'
                          : 'border-transparent text-gray-750 hover:text-[#e65410]'
                      }`}
                    >
                      <IconComp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>{item.label}</span>
                      <ChevronDown className={`h-2.5 w-2.5 sm:h-3 sm:w-3 transition-transform duration-100 ${isThisOpen ? 'rotate-180 text-[#e65410]' : 'text-gray-400'}`} />
                    </button>
                    {item.dropdownType === 'catalog' && renderMegamenuDropdown()}
                    {item.dropdownType === 'company' && renderCompanyDropdown()}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center space-x-1.5 h-full px-2 lg:px-3 text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all duration-150 border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-[#e65410] text-[#e65410]'
                      : 'border-transparent text-gray-750 hover:text-[#e65410]'
                  }`}
                >
                  <IconComp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Calculators, AI-Assistant & RFQ Cart */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Language Switcher for Scrolled Mode */}
            {isScrolled && (
              <div className="hidden sm:flex items-center gap-2 pr-2.5 mr-0.5 border-r border-gray-200 text-[10px] font-mono leading-none">
                <button
                  onClick={() => setLang('en')}
                  className={`cursor-pointer transition-colors duration-150 ${lang === 'en' ? 'font-bold text-[#e65410]' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  EN
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => setLang('ru')}
                  className={`cursor-pointer transition-colors duration-150 ${lang === 'ru' ? 'font-bold text-[#e65410]' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  RU
                </button>
              </div>
            )}

            {/* Search system */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`flex items-center space-x-1.5 font-bold uppercase tracking-wider rounded border transition-all duration-150 cursor-pointer text-gray-700 bg-white border-gray-200 hover:text-[#e65410] hover:border-[#e65410] ${
                isScrolled 
                  ? 'px-2 py-1.5 sm:px-3 sm:py-2 text-[10px]' 
                  : 'px-3 py-2 sm:px-4 sm:py-2.5 text-[11px]'
              }`}
              id="search-trigger-btn"
              title="CMD+K"
            >
              <Search className={isScrolled ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
              <span className="hidden sm:inline">{lang === 'en' ? 'Search' : 'Поиск'}</span>
            </button>

            {/* Foundry Calculator Button */}
            <button 
              onClick={() => setCurrentTab('calc')}
              className={`flex items-center space-x-1.5 font-bold uppercase tracking-wider rounded border transition-all duration-150 cursor-pointer ${
                currentTab === 'calc'
                  ? 'bg-[#e65410] border-[#e65410] text-white shadow-xs'
                  : 'bg-white border-gray-200 text-gray-700 hover:text-[#e65410] hover:border-[#e65410]'
              } ${
                isScrolled 
                  ? 'px-2 py-1.5 sm:px-3 sm:py-2 text-[10px]' 
                  : 'px-3 py-2 sm:px-4 sm:py-2.5 text-[11px]'
              }`}
            >
              <Sliders className={isScrolled ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
              <span className="hidden md:inline">{lang === 'en' ? 'Calculator' : 'Литейный калькулятор'}</span>
              <span className="inline md:hidden">{lang === 'en' ? 'Calc' : 'Калькулятор'}</span>
            </button>

            {/* AI-Assistant Button */}
            <button 
              onClick={() => setCurrentTab('assistant')}
              className={`flex items-center space-x-1.5 font-bold uppercase tracking-wider rounded border transition-all duration-150 cursor-pointer ${
                currentTab === 'assistant'
                  ? 'bg-[#00333b] border-[#00333b] text-white shadow-xs'
                  : 'bg-white border-gray-200 text-gray-700 hover:text-[#00333b] hover:border-[#00333b]'
              } ${
                isScrolled 
                  ? 'px-2 py-1.5 sm:px-3 sm:py-2 text-[10px]' 
                  : 'px-3 py-2 sm:px-4 sm:py-2.5 text-[11px]'
              }`}
            >
              <Sparkles className={`${isScrolled ? 'h-3 w-3' : 'h-3.5 w-3.5'} text-orange-500 animate-pulse`} />
              <span className="hidden md:inline">{lang === 'en' ? 'AI Selection' : 'ИИ-Подбор'}</span>
              <span className="inline md:hidden">{lang === 'en' ? 'AI' : 'ИИ-Подбор'}</span>
            </button>

            {/* RFQ Cart Trigger — hidden, replaced by global vertical RFQ button */}
            <button
              id="rfq-cart-btn"
              onClick={() => setCurrentTab('rfq')}
              className="hidden"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{t.specRequest}</span>
              {rfqItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#e65410] border border-white text-white rounded-full text-[10px] font-black h-5 w-5 flex items-center justify-center animate-bounce">
                  {rfqItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-black rounded-lg focus:outline-none cursor-pointer"
            >
              <span className="sr-only">Открыть меню</span>
              {mobileMenuOpen ? (
                <span className="text-xl font-mono block w-6 text-center">✕</span>
              ) : (
                <span className="text-xl font-mono block w-6 text-center">☰</span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Secondary Row - Main Navigation Menu (like on sltgroup.ru) */}
      <div className={`bg-slate-50 border-t border-b border-gray-200 hidden md:block transition-all duration-300 ease-in-out origin-top ${
        isScrolled 
          ? 'h-0 overflow-hidden border-t-0 border-b-0 opacity-0 pointer-events-none' 
          : 'h-12 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex space-x-2 lg:space-x-8 h-12 items-center justify-center">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = currentTab === item.id;

              if (item.hasDropdown) {
                const isThisOpen = dropdownOpen && activeDropdown === item.dropdownType;
                return (
                  <div
                    key={item.id}
                    className="h-full flex items-center"
                    onMouseEnter={() => {
                      setDropdownOpen(true);
                      setActiveDropdown(item.dropdownType || null);
                    }}
                    onMouseLeave={() => {
                      setDropdownOpen(false);
                      setActiveDropdown(null);
                    }}
                  >
                    <button
                      onClick={() => {
                        if (item.dropdownType === 'catalog') {
                          setCurrentTab('catalog');
                          if (onCategorySelect) onCategorySelect('all');
                        } else {
                          setCurrentTab('about');
                        }
                      }}
                      className={`flex items-center space-x-1.5 h-full px-4 text-[11px] font-black uppercase tracking-wider transition-all duration-150 border-b-2 cursor-pointer ${
                        isActive || isThisOpen
                          ? 'border-[#e65410] text-[#e65410]'
                          : 'border-transparent text-gray-750 hover:text-[#e65410]'
                      }`}
                    >
                      <IconComp className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                      <ChevronDown className={`h-3 w-3 transition-transform duration-100 ${isThisOpen ? 'rotate-180 text-[#e65410]' : 'text-gray-400'}`} />
                    </button>
                    {item.dropdownType === 'catalog' && renderMegamenuDropdown()}
                    {item.dropdownType === 'company' && renderCompanyDropdown()}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center space-x-1.5 h-full px-4 text-[11px] font-black uppercase tracking-wider transition-all duration-150 border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-[#e65410] text-[#e65410]'
                      : 'border-transparent text-gray-750 hover:text-[#e65410]'
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-2 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = currentTab === item.id;

            if (item.hasDropdown) {
              const isCatalog = item.dropdownType === 'catalog';
              const isOpen = isCatalog ? mobileCatalogOpen : mobileCompanyOpen;
              const toggleOpen = () => {
                if (isCatalog) {
                  setMobileCatalogOpen(!mobileCatalogOpen);
                } else {
                  setMobileCompanyOpen(!mobileCompanyOpen);
                }
              };

              return (
                <div key={item.id} className="w-full">
                  <button
                    onClick={toggleOpen}
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm font-bold uppercase tracking-wider text-left border-l-4 cursor-pointer ${
                      isActive
                        ? 'bg-orange-50 text-[#e65410] border-[#e65410]'
                        : 'text-gray-700 hover:bg-gray-50 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComp className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mobil catalogue list */}
                  {isCatalog && mobileCatalogOpen && (
                    <div className="bg-gray-50 pl-8 pr-4 py-2 space-y-3 border-l-4 border-orange-200">
                      {catalogDropdownCategories.map((cat) => (
                        <div key={cat.id} className="space-y-1">
                          <button
                            onClick={() => handleCategoryClick(cat.id)}
                            className="text-left font-black text-[11px] uppercase text-[#e65410] tracking-wider py-1 cursor-pointer border-none bg-transparent w-full"
                          >
                            {lang === 'en' ? cat.labelEn : cat.labelRu}
                          </button>
                          <ul className="pl-2 space-y-1">
                            {cat.items.map((sub, sidx) => (
                              <li key={sidx}>
                                <button
                                  onClick={() => handleCategoryClick(cat.id, sub.query, sub.subId, (sub as any).productId)}
                                  className="text-left text-[11px] text-gray-600 hover:text-[#e65410] block py-1 border-none bg-transparent cursor-pointer w-full"
                                >
                                  • {lang === 'en' ? sub.labelEn : sub.labelRu}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-gray-200">
                        <button
                          onClick={() => handleCategoryClick('all')}
                          className="w-full py-2 bg-[#00333b] text-white rounded text-xs font-bold uppercase tracking-wide cursor-pointer text-center border-none"
                        >
                          {lang === 'en' ? 'All Equipment' : 'Все оборудование'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Mobile company list */}
                  {!isCatalog && mobileCompanyOpen && (
                    <div className="bg-gray-50 pl-8 pr-4 py-3 space-y-4 border-l-4 border-orange-200">
                      
                      {/* Section 1: О предприятии */}
                      <div className="space-y-1.5">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                          {lang === 'en' ? 'ABOUT ENTERPRISE' : 'О ПРЕДПРИЯТИИ'}
                        </span>
                        <ul className="pl-2 space-y-2">
                          <li>
                            <button
                              onClick={() => handleCompanyClick('about-intro')}
                              className="text-left text-xs font-bold text-gray-700 block py-0.5 border-none bg-transparent cursor-pointer w-full"
                            >
                              • {lang === 'en' ? 'Our Mission & Siberian Roots' : 'История, миссия и корни'}
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleCompanyClick('about-stats')}
                              className="text-left text-xs font-bold text-gray-770 block py-0.5 border-none bg-transparent cursor-pointer w-full"
                            >
                              • {lang === 'en' ? 'Company Key Statistics' : 'Основные показатели'}
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Section 2: Инжиниринг и Сервис */}
                      <div className="space-y-1.5 pt-1">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                          {lang === 'en' ? 'ENGINEERING & SERVICES' : 'ИНЖИНИРИНГ И СЕРВИС'}
                        </span>
                        <ul className="pl-2 space-y-2">
                          <li>
                            <button
                              onClick={() => handleCompanyClick('about-activities')}
                              className="text-left text-xs font-bold text-gray-700 block py-0.5 border-none bg-transparent cursor-pointer w-full"
                            >
                              • {lang === 'en' ? 'Auditing & Design' : 'Аудит и Проектирование'}
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleCompanyClick('about-activities')}
                              className="text-left text-xs font-bold text-gray-700 block py-0.5 border-none bg-transparent cursor-pointer w-full"
                            >
                              • {lang === 'en' ? 'Supervision & Commissioning' : 'Шеф-монтаж и Технологии'}
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleCompanyClick('about-activities')}
                              className="text-left text-xs font-bold text-gray-700 block py-0.5 border-none bg-transparent cursor-pointer w-full"
                            >
                              • {lang === 'en' ? 'Service Support & QC' : 'Гарантия и ОТК'}
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Section 3: Референц-лист проектов */}
                      <div className="space-y-1.5 pt-1">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                          {lang === 'en' ? 'VERIFIABLE REFERENCES' : 'РЕФЕРЕНС-ЛИСТ СДАННЫХ ОБЪЕКТОВ'}
                        </span>
                        <ul className="pl-2 space-y-2">
                          <li>
                            <button
                              onClick={() => handleCompanyClick('about-projects', 'all')}
                              className="text-left text-xs font-bold text-gray-700 block py-0.5 border-none bg-transparent cursor-pointer w-full"
                            >
                              • {lang === 'en' ? 'All commissioning projects' : 'Все запущенные заводы'}
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleCompanyClick('about-projects', 'molding')}
                              className="text-left text-xs text-gray-600 block py-0.5 border-none bg-transparent cursor-pointer w-full"
                            >
                              • {lang === 'en' ? 'Resin Sand Continuous (No-Bake)' : 'Формовка смесей ХТС'}
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleCompanyClick('about-projects', 'melting')}
                              className="text-left text-xs text-gray-600 block py-0.5 border-none bg-transparent cursor-pointer w-full"
                            >
                              • {lang === 'en' ? 'Induction Melting layouts' : 'Печи плавки индукции'}
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleCompanyClick('about-projects', 'cleaning')}
                              className="text-left text-xs text-gray-600 block py-0.5 border-none bg-transparent cursor-pointer w-full"
                            >
                              • {lang === 'en' ? 'Finished shot blast chambers' : 'Дробеметная очистка'}
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Section 4: Склад и Связь */}
                      <div className="space-y-1.5 pt-1">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                          {lang === 'en' ? 'SUPPLY & SUPPORT' : 'ЛОГИСТИКА И СКЛАД'}
                        </span>
                        <ul className="pl-2 space-y-2">
                          <li>
                            <button
                              onClick={() => handleCompanyClick('about-warehouse')}
                              className="text-left text-xs font-bold text-gray-700 block py-0.5 border-none bg-transparent cursor-pointer w-full"
                            >
                              • {lang === 'en' ? 'Central Novosibirsk Depots' : 'Склад в г. Новосибирск'}
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleCompanyClick('about-warehouse', undefined, 'contacts')}
                              className="text-left text-xs font-black text-[#e65410] block py-0.5 border-none bg-transparent cursor-pointer w-full uppercase"
                            >
                              • {lang === 'en' ? 'Submit RFQ Inquiry' : 'Подать запрос КП ↗'}
                            </button>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <button
                          onClick={() => handleCompanyClick('about-intro')}
                          className="w-full py-2 bg-[#e65410] text-white rounded text-xs font-bold uppercase tracking-wide cursor-pointer text-center border-none"
                        >
                          {lang === 'en' ? 'Corporate Presentation' : 'Презентация компании'}
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-bold uppercase tracking-wider text-left border-l-4 cursor-pointer ${
                  isActive
                    ? 'bg-orange-50 text-[#e65410] border-[#e65410]'
                    : 'text-gray-700 hover:bg-gray-50 border-transparent'
                }`}
              >
                <IconComp className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
    {/* Stable layout spacer to prevent layout-shift and jittering */}
    <div className="h-[116px] md:h-[164px] w-full shrink-0" />
    
    {/* High-fidelity global search modal */}
    <SearchModal
      isOpen={searchOpen}
      onClose={() => setSearchOpen(false)}
      lang={lang}
      onSelectProduct={(category, query, subId, productId) => {
        if (onCategorySelect) {
          onCategorySelect(category, query, subId, productId);
        } else {
          setCurrentTab('catalog');
        }
      }}
    />
    </>
  );
}
