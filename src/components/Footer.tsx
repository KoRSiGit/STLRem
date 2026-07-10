import { ShieldCheck, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import steelPouringBg from '../assets/images/foundry_hero_bg_1781504494705.jpg';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  lang: 'ru' | 'en';
}

export default function Footer({ setCurrentTab, lang }: FooterProps) {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-[#001418] text-white border-t-4 border-[#e65410] pt-16 pb-12 shadow-[0_-8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden">
      {/* Photo background of steel pouring process with luxury low opacity */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-[0.16] bg-no-repeat mix-blend-luminosity"
        style={{ backgroundImage: `url(${steelPouringBg})` }}
      />
      {/* Warm temperature glow accent */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#e65410]/5 blur-[130px] pointer-events-none z-0 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Desc (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center space-x-3.5 cursor-pointer select-none" onClick={() => setCurrentTab('home')}>
              <svg 
                className="h-11 w-11 sm:h-13 sm:w-13 shrink-0 transition-transform duration-200 hover:scale-105" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* The open circle representing the ladle, with professional thick stroke */}
                <path
                  d="M 68 25 A 36 36 0 1 1 32 25"
                  stroke="#ffffff"
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
                <span className="font-sans font-black text-2xl tracking-normal uppercase text-white block">
                  {lang === 'en' ? 'Sibtehlit' : 'Сибтехлит'}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.15em] uppercase text-teal-200 block leading-none mt-1">
                  {lang === 'en' ? 'YOUR FOUNDRY PARTNER' : 'ВАШ ЛИТЕЙНЫЙ ПАРТНЕР'}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              {lang === 'en'
                ? '"Sibtehlit" ("Siberian Casting Technologies") is a leading supplier and systems integrator of advanced industrial foundry machinery. Full-cycle professional thermodynamic metallurgy design.'
                : '«Сибтехлит» («Сибирские Технологии Литья») — ведущий поставщик и системный интегратор промышленного литейного оборудования. Профессиональный инжиниринг полного цикла.'}
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 p-2 w-fit rounded">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>
                {lang === 'en'
                  ? 'Double quality control check before shipping out from partner manufacturers'
                  : 'Двойной контроль ОТК перед погрузкой на заводе-изготовителе'}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation connections (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#e65410] font-bold">
              {t.catMixersTitle}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400 font-medium">
              <li>
                <button onClick={() => setCurrentTab('catalog')} className="hover:text-[#e65410] transition cursor-pointer text-left">
                  {lang === 'en' ? 'Continuous Mixers CX series' : 'Смесители ХТС серии СХ'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('catalog')} className="hover:text-[#e65410] transition cursor-pointer text-left">
                  {lang === 'en' ? 'Sand Reclamation Machinery' : 'Регенерация формовочного песка'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('catalog')} className="hover:text-[#e65410] transition cursor-pointer text-left">
                  {lang === 'en' ? 'Induction Crucible Furnaces' : 'Индукционные тигельные печи'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('catalog')} className="hover:text-[#e65410] transition cursor-pointer text-left">
                  {lang === 'en' ? 'Overhead Shot Blasting Cabinets' : 'Дробеметные станции очистки'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts information (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#e65410] font-bold">
              {lang === 'en' ? 'Headquarters Contacts' : 'Центральные контакты'}
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-400 font-mono">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-[#e65410] shrink-0 mt-0.5" />
                <span>
                  <strong>{lang === 'en' ? 'Address:' : 'Адрес:'}</strong> {t.addressFull}
                </span>
              </li>
              <li className="ml-6.5 relative leading-relaxed">
                <Phone className="h-4 w-4 text-[#e65410] absolute left-[-26px] top-1 shrink-0" />
                <div className="flex flex-col space-y-0.5">
                  <span>8-800-550-60-54 ({lang === 'en' ? 'Toll-free RF' : 'Бесплатный'})</span>
                  <span>+7 (383) 33-54-0-54 ({lang === 'en' ? 'Novosibirsk' : 'Многоканальный'})</span>
                </div>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-[#e65410] shrink-0" />
                <span>info@sibtehlit.ru ({lang === 'en' ? 'machinery supply' : 'поставка оборудования'})</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <FileText className="h-4 w-4 text-[#e65410] shrink-0" />
                <span>{t.innLabel}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal block */}
        <div className="mt-12 pt-8 border-t border-gray-800/80 text-center md:flex md:justify-between items-center text-xs text-gray-500 font-mono">
          <p>{t.copyright}</p>
          <p className="mt-2 md:mt-0">{t.engineeringPlan}</p>
        </div>

      </div>
    </footer>
  );
}
