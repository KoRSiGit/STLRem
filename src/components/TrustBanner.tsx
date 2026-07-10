import { ShieldCheck, CalendarCheck, Settings, CheckCircle } from 'lucide-react';

interface TrustBannerProps {
  lang: 'ru' | 'en';
}

export default function TrustBanner({ lang }: TrustBannerProps) {
  const isRu = lang === 'ru';

  return (
    <section className="bg-[#f0f4f6] py-14 border-t border-b border-gray-200 relative overflow-hidden">
      {/* Structural layout styling details */}
      <div className="absolute inset-0 bg-[radial-gradient(#e65410_0.7px,transparent_0.7px)] [background-size:16px_16px] opacity-[0.05] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="font-mono text-[9px] text-[#e65410] uppercase tracking-[0.2em] font-black block">
            {isRu ? 'СТАНДАРТЫ НАДЕЖНОСТИ СИБТЕХЛИТ' : 'SIBTEHLIT RELIABILITY SYSTEM'}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#00333b] tracking-tight uppercase font-display leading-tight">
            {isRu 
              ? 'Двухэтапный контроль ОТК и Сибирский инжиниринг' 
              : 'Two-Stage Quality Inspection & Siberian Engineering Standards'}
          </h3>
          <p className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isRu 
              ? 'Как мы гарантируем бесперебойную работу плавильных комплексов и смесителей ХТС в суровых температурных условиях эксплуатации.' 
              : 'How we secure continuous, flawless metallurgy and resin-sand reclamation under intense industrial workloads.'}
          </p>
        </div>

        {/* Feature Grid with light card border and shadow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white p-5 border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between transition hover:shadow-md">
            <div className="space-y-3.5">
              <div className="bg-[#e65410]/5 text-[#e65410] p-2.5 w-fit rounded-none border border-[#e65410]/15">
                <Settings className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider">
                {isRu ? '1. Входной контроль КД' : '1. Draft & CAD Verification'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                {isRu
                  ? 'Собственная конструкторская группа проверяет чертежи на соосность силовых шкивов и температурное сопротивление рам.'
                  : 'Siberian engineers verify general mechanical layouts for pulley tolerance and absolute structural thermal resistance.'}
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-gray-100 text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1 leading-none">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>{isRu ? 'Разработка в 3D' : 'CAD Alignment OK'}</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between transition hover:shadow-md">
            <div className="space-y-3.5">
              <div className="bg-[#e65410]/5 text-[#e65410] p-2.5 w-fit rounded-none border border-[#e65410]/15">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider">
                {isRu ? '2. Поэлементный ОТК' : '2. Active Dry-Run FAT'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                {isRu
                  ? 'Перед герметизацией и экспортной затаркой в Новосибирск все смесители проходят сухую обкатку с тензодатчиками вибрации.'
                  : 'Before export packaging, every continuous mixer undergoes dry-run testing with digital strain vibration sensors.'}
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-gray-100 text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1 leading-none">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>{isRu ? 'Проверка Delta PLC' : 'Delta PLC Checked'}</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between transition hover:shadow-md">
            <div className="space-y-3.5">
              <div className="bg-[#e65410]/5 text-[#e65410] p-2.5 w-fit rounded-none border border-[#e65410]/15">
                <Settings className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider">
                {isRu ? '3. Стойкость к абразиву' : '3. High Abrasive Shield'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                {isRu
                  ? 'Все шнековые лопасти комплектуются наплавками карбида вольфрама для долговечной работы с кварцевым песком ХТС.'
                  : 'Screw blades are enhanced with robust tungsten carbide coatings for exceptional wear-resistance against silica sand.'}
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-gray-100 text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1 leading-none">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>{isRu ? 'Защита шнека Mn13' : 'Mn13 Armor Protection'}</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between transition hover:shadow-md">
            <div className="space-y-3.5">
              <div className="bg-[#e65410]/5 text-[#e65410] p-2.5 w-fit rounded-none border border-[#e65410]/15">
                <CalendarCheck className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider">
                {isRu ? '4. Контроль первого съема' : '4. First Melt Sign-Off'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                {isRu
                  ? 'Наши выездные инженеры-металлурги лично дежурят на пусконаладке до первого выпуска жидкого сплава в изложницу.'
                  : 'On-site field metallurgists remain present at your factory to monitor thyristor currents during the first metal pour.'}
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-gray-100 text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1 leading-none">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>{isRu ? 'Гарантия до 36 мес' : 'Warranty 3 Years'}</span>
            </div>
          </div>

        </div>

        {/* Small Trust Info Line */}
        <div className="mt-8 text-center text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none">
          {isRu 
            ? '★ ГОСТ Р ИСО 9001-2015 подтвержденный аудит изготовителя' 
            : '★ GOST R ISO 9001-2015 officially monitored manufacturer audit compliance'}
        </div>

      </div>
    </section>
  );
}
