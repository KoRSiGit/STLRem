import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Cpu, Sliders, HardHat, ShieldCheck, History, 
  Users2, Globe, Wrench, CheckCircle2, MapPin, TrendingUp, 
  BarChart3, Sparkles, ChevronRight, PhoneCall, Info, Camera
} from 'lucide-react';

interface AboutCompanyProps {
  lang: 'ru' | 'en';
  onContactRequest?: () => void;
  onViewGallery?: () => void;
}

interface ProjectItem {
  id: string;
  category: 'molding' | 'melting' | 'cleaning' | 'all';
  titleRu: string;
  titleEn: string;
  clientRu: string;
  clientEn: string;
  year: string;
  locationRu: string;
  locationEn: string;
  equipmentRu: string;
  equipmentEn: string;
  resultRu: string;
  resultEn: string;
  badgeRu: string;
  badgeEn: string;
}

export default function AboutCompany({ lang, onContactRequest, onViewGallery }: AboutCompanyProps) {
  const [projectFilter, setProjectFilter] = useState<'all' | 'molding' | 'melting' | 'cleaning'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useEffect(() => {
    const handleNavSync = () => {
      const pendingFilter = (window as any)._pendingAboutFilter;
      const pendingSection = (window as any)._pendingAboutSection;
      
      if (pendingFilter !== undefined) {
        setProjectFilter(pendingFilter);
        (window as any)._pendingAboutFilter = undefined;
      }
      
      if (pendingSection) {
        setTimeout(() => {
          const el = document.getElementById(pendingSection);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Add a brief subtle visual highlight outline or flash for visual cue
            el.classList.add('ring-2', 'ring-[#e65410]', 'ring-offset-2', 'duration-500');
            setTimeout(() => {
              el.classList.remove('ring-2', 'ring-[#e65410]', 'ring-offset-2');
            }, 2500);
          }
        }, 150);
        (window as any)._pendingAboutSection = undefined;
      }
    };

    window.addEventListener('about-nav-sync', handleNavSync);
    
    // Check initially on mount (in case it was set before component was active)
    handleNavSync();

    return () => {
      window.removeEventListener('about-nav-sync', handleNavSync);
    };
  }, []);

  const PROJECTS: ProjectItem[] = [
    {
      id: 'proj-1',
      category: 'melting',
      titleRu: 'Плавильный комплекс индукционных печей GW-1.0',
      titleEn: 'Induction Melting Complex GW-1.0',
      clientRu: 'ООО «Завод запорной арматуры и литья»',
      clientEn: 'Valves & Fittings Casting Plant LLC',
      year: '2025',
      locationRu: 'г. Курган, РФ',
      locationEn: 'Kurgan, Russian Federation',
      equipmentRu: 'Плавильная двухтигельная индукционная печь GW-1.0 (емкость 1 тонна, мощность инвертора 800 кВт), закрытая двухконтурная испарительная градирня сухого типа ГЗ-60.',
      equipmentEn: 'Two-crucible coreless induction furnace GW-1.0 (capacity 1 ton, 800 kW power supply), closed dry loop water evaporative cooling tower GZ-60.',
      resultRu: 'Снижен расход электроэнергии на плавку на 18.5%, достигнут объем выплавки качественной легированной стали до 12 тонн за рабочую смену. Полностью решена проблема известковых отложений в водных контурах индуктора.',
      resultEn: 'Reduced melting power consumption by 18.5%, outputting up to 12 tons of premium alloy steel per duty. Limestone scaling in furnace cooling water circuits resolved permanently.',
      badgeRu: 'ПЛАВКА СТАЛИ И ЧУГУНА',
      badgeEn: 'MELTING LOGISTICS'
    },
    {
      id: 'proj-2',
      category: 'molding',
      titleRu: 'Смесительная формовочная линия ХТС СХ-15 непрерывного действия',
      titleEn: 'Continuous No-Bake Molding Line CX-15',
      clientRu: 'АО «Алтайский завод тяжелого машиностроения»',
      clientEn: 'Altai Heavy Machinery plant JSC',
      year: '2024',
      locationRu: 'г. Барнаул, РФ',
      locationEn: 'Barnaul, Russian Federation',
      equipmentRu: 'Высокопроизводительный двухрукавный смеситель ХТС непрерывного действия серии СХ-15 (15 т/ч) с автоматическим тензометрическим дозатором связующего Binder-Smart и программируемым шкафом управления Delta, вибростол маятникового уплотнения ВСФ-12.',
      equipmentEn: 'Dual-arm high productivity continuous resin sand mixer CX-15 (15 t/h) equipped with Binder-Smart automated chemical feeding scales, Delta PLC panel, and VSF-12 vibration compaction unit.',
      resultRu: 'Полная замена устаревшего ПГС-участка на экологичную и точную фурановую ХТС-технологию формовки. Доля технологического брака отливок по газовым раковинам снизилась с 8% до минимальных 0.35%.',
      resultEn: 'Complete replacement of obsolete green sand foundry division with a modular green furan-based No-Bake molder. Gaseous porosity scrap lowered from 8% down to 0.35%.',
      badgeRu: 'ФОРМОВКА ХТС',
      badgeEn: 'NO-BAKE MOLDING'
    },
    {
      id: 'proj-3',
      category: 'molding',
      titleRu: 'Технологический комплекс механической регенерации песка РП-10',
      titleEn: 'Resin Sand Mechanical Reclamation Complex RP-10',
      clientRu: 'АО «СибЛитМаш»',
      clientEn: 'SibLitMash Foundry Engine Works JSC',
      year: '2024',
      locationRu: 'г. Новосибирск, РФ',
      locationEn: 'Novosibirsk, Russian Federation',
      equipmentRu: 'Установка регенерации РП-10 (производительность до 10 т/ч по регенерату), включающая вибрационный оттирочный сито-кипящий классификатор, охладитель кипящего слоя, магнитный сепаратор высокого напряжения, систему пневматического нагнетания сухого песка.',
      equipmentEn: 'Mechanical reclamation unit RP-10 (capacity up to 10 t/h), featuring heavy shaker shakeout grid, fluid bed cooling unit with sand separator, high sensitivity magnets, and pressure vessel matrix.',
      resultRu: 'Достигнут стабильный коэффициент повторного использования отработанного песка на уровне 93.5% во вторичный цикл. Снижение закупок свежего кварцевого песка сократило операционный бюджет литейного цеха на 1.4 млн рублей ежемесячно.',
      resultEn: 'Achieved a steady used sand recycling recovery factor of 93.5%. Elimination of new silica sand purchasing reduced active factory operations budget by 1.4 million rubles per month.',
      badgeRu: 'РЕГЕНЕРАЦИЯ ПЕСКА',
      badgeEn: 'SAND RECLAMATION'
    },
    {
      id: 'proj-4',
      category: 'cleaning',
      titleRu: 'Дробеметная камера подвесного крюкового типа Q378',
      titleEn: 'Overhead Hook-type Shot Blasting Chamber Q378',
      clientRu: 'ООО «Челябинский тракторно-литейный завод»',
      clientEn: 'Chelyabinsk Tractor Foundry LLC',
      year: '2023',
      locationRu: 'г. Челябинск, РФ',
      locationEn: 'Chelyabinsk, Russian Federation',
      equipmentRu: 'Камера с поворотным подвесным крюком Q378 (грузоподъемность 800 кг), оснащенная двумя мощными прямоприводными турбинами по 11 кВт, воздушным сепаратором дроби, сменными внутренними защитными бронеплитами из марганцовистой стали Mn13.',
      equipmentEn: 'Dual hook-type overhead blaster Q378 (load capacity 800kg per hanger), utilizing two direct-drive 11kW blast turbines, dust cartridge filter baghouse, and Mn13 high manganese protective steel liners.',
      resultRu: 'Время финишной очистки партий стальных корпусных деталей от пригоревшей формовочной смеси сократилось в 7.5 раз (с 45 мин ручной зачистки до 6 минут очистки в камере). Достигнута чистота поверхности по ГОСТ — Sa 2.5.',
      resultEn: 'Scale of finishing treatment cycle shortened 7.5 times (from 45 minutes of manual grinding of sand residues down to 6 minutes in the blaster). Achieved international quality surface preparation rating Sa 2.5.',
      badgeRu: 'ДРОБЕМЕТНАЯ ОЧИСТКА',
      badgeEn: 'SHOT BLASTING'
    },
    {
      id: 'proj-5',
      category: 'molding',
      titleRu: 'Автоматическая безопочная формовочная линия АФЛ-6080',
      titleEn: 'Automatic Green Sand Flaskless Molding Line AFL-6080',
      clientRu: 'Уральский завод сельхозмашиностроения',
      clientEn: 'Urals Agricultural Machinery Holdings',
      year: '2025',
      locationRu: 'Свердловская область, РФ',
      locationEn: 'Sverdlovsk Region, Russian Federation',
      equipmentRu: 'Высокоточная автоматическая линия формовки ПГС горизонтальной прессовки АФЛ-6080 (размер опок/форм 600x800 мм, вертикальная плитовая подпрессовка), автоматический конвейер охлаждения отливок, пульты ЧПУ на процессорах Siemens.',
      equipmentEn: 'High reliability automated flaskless green sand molding line AFL-6080 (mold size 600x800 mm, high density hydraulic squeeze), mechanical cooling conveyor layout, Siemens PLC master modules.',
      resultRu: 'Производительность литейного формовочного участка возросла на 150%, обеспечивается стабильная геометрия чугунных отливок (износостойкие диски, кронштейны) без смещения корпусов полуформ.',
      resultEn: 'Increased molding department output by 150%, ensuring perfectly reproducible dimensional tolerances of ductile iron agro-parts without any flash defects or mold shifts.',
      badgeRu: 'БЕЗОПОЧНАЯ ФОРМОВКА',
      badgeEn: 'AUTOMATED GREEN SAND'
    },
    {
      id: 'proj-6',
      category: 'molding',
      titleRu: 'Роботизированный пескострельный стержневой комплекс СА-400',
      titleEn: 'Precision Automated Core Shooter SA-400',
      clientRu: 'УП «Гидромаш-Металлургия»',
      clientEn: 'Hydromash-Metallurgy Dev Corp',
      year: '2025',
      locationRu: 'г. Минск, Республика Беларусь',
      locationEn: 'Minsk, Republic of Belarus',
      equipmentRu: 'Автоматический пескострельный автомат СА-400 (емкость стержневого ящика 40 литров, рабочий цикл Cold-Box-Amin), встроенный генератор амина нового поколения, газопоршневой зажимной механизм, автоматическая выгрузка готового стержня.',
      equipmentEn: 'Heavy duty core shooting automation SA-400 (core box volume 40L, optimized for Cold-Box-Amine gas curing profiles), state-of-the-art amine vaporizing generator, pneumatic toggle molds and automatic ejectors.',
      resultRu: 'Налажен массовый выпуск внутренних стержней высшей категории точности для гидравлических распределителей тракторной техники. Шероховатость внутренних каналов снижена на 40%, сократив объем гидравлических тестов на пропускную способность.',
      resultEn: 'Established high run manufacturing of complex core matrices for heavy hydraulic spool valves. Surface roughness of internal fluid tunnels reduced by 40%, accelerating flow trial stages.',
      badgeRu: 'СТЕРЖНЕВОЕ ПРОИЗВОДСТВО',
      badgeEn: 'CORE MAKING SYSTEMS'
    }
  ];

  const ACTIVITIES = [
    {
      icon: Building2,
      titleRu: '1. Аудит и Проектирование литейных цехов',
      titleEn: '1. Engineering, Consulting & CAD layouts',
      descRu: 'Проводим глубинный технологический аудит существующих литейных мощностей. Создаем комплексные 3D-планы цехов, рассчитываем баланс металлов, энергоэффективность и схемы регенерации смеси.',
      descEn: 'We run deep technical audits of thermal setups. We draft 2D/3D component layouts in AutoCAD/KOMPAS, balance scrap cycles, evaluate furan/spent sand flow charts and energy grids.',
      specRu: 'Решения под ГОСТ и ТУ с учетом логистики шихты и стержней',
      specEn: 'Compliant with safety rules, optimizing internal scrap and sand logistics'
    },
    {
      icon: Cpu,
      titleRu: '2. Поставка комплексных линий оборудования',
      titleEn: '2. Direct Equipment Procurement & Custom Setup',
      descRu: 'Официальные прямые контракты с крупнейшими машиностроительными холдингами Азии. Подбираем смесители ХТС СХ, регенерацию РП, индукционные печи GW, автоматические линии АФЛ и дробеметы Q37.',
      descEn: 'Direct official distribution contracts with heavy Asian machinery giants. We configure CX continuous furan mixers, mechanical RP lines, core shooters, and hook overhead blasters.',
      specRu: 'Индивидуальные модификации узлов и брони по ТЗ инженеров',
      specEn: 'Custom heavy manganese steel armors and PLC options according to request'
    },
    {
      icon: Wrench,
      titleRu: '3. Шеф-монтаж и запуск по технологии «под ключ»',
      titleEn: '3. Turnkey Installation, Commissioning & Chemistry',
      descRu: 'Наши шеф-монтажники физически присутствуют на вашем объекте. Проводим сборку узлов, нивелировку вибростолов, электроподключение шкафов, калибровку дозирования связующего и тест первой плавки.',
      descEn: 'Our experienced metallurgy engineers supervise assembly on site. We set up level vibro-compactors, wire electrical panels, program binder weight ratios, and execute first test casting.',
      specRu: 'Своя инжиниринговая рецептура бентонитовых и фурановых смесей',
      specEn: 'In-house chemistry formulation for binders, catalysts, and bentonite ratios'
    },
    {
      icon: ShieldCheck,
      titleRu: '4. Гарантия, Сервисная техническая поддержка и ОТК',
      titleEn: '4. Advanced Quality Control, Warranty & Spare Parts',
      descRu: 'Двойной строгий контроль ОТК на заводе-изготовителе перед отгрузкой. Оперативный склад запасных частей в г. Новосибирск (лопатки смесителей, бронеплиты Mn13, резиновые уплотнители, датчики).',
      descEn: 'Double strict quality controller checks at vendor facilities before shipping. Warehouse in Novosibirsk guarantees swift delivery of blades, wear-resistant linings, seals, and sensors.',
      specRu: 'Собственная выездная мобильная бригада технических специалистов',
      specEn: 'Dedicated engineering crew deployed to your site for emergencies'
    }
  ];

  const STATS = [
    { num: '50+', textRu: 'модернизированных литейных цехов', textEn: 'commissioned foundry shops' },
    { num: '350+', textRu: 'работающих единиц литейных машин', textEn: 'active industrial machinery units' },
    { num: '15 лет', textRu: 'средний опыт инженеров-технологов', textEn: 'average engineers metallurgy history' },
    { num: '93.5%', textRu: 'показатель возврата песка в регенерации', textEn: 'sand recycling factor achieved' },
  ];

  const filteredProjects = projectFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === projectFilter);

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* TOP INTRO CARD: Styled professionally with Siberian accents */}
        <div id="about-intro" className="bg-white border border-gray-200 rounded-none p-6 sm:p-10 shadow-xs relative overflow-hidden transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="font-mono text-[10px] text-[#e65410] font-bold tracking-widest uppercase bg-orange-500/5 px-3 py-1.5 rounded border border-orange-500/10 inline-block">
                {lang === 'en' ? 'Siberian Foundry Technologies' : 'Сибирские Технологии Литья — Сибтехлит'}
              </span>
              
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
                {lang === 'en' 
                  ? 'Complete cycle of foundry engineering and metallurgy equipment integrated' 
                  : 'Полный комплекс инжиниринга литейных производств'}
              </h2>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {lang === 'en'
                  ? 'We don\'t just supply standalone machinery; we integrate fully operating technology. Headquartered in Novosibirsk, Sibtehlit leverages strong partnerships with major casting manufacturing designers. We take direct responsibility for product quality checkpoints, layout CAD blueprints, and the final mechanical behavior of cast components.'
                  : 'Мы не просто привозим отдельные станки — мы внедряем готовую литейную технологию. Расположенный в Новосибирске инженерно-технический центр компании «Сибтехлит» проектирует комплексные компоновки плавильных, стержневых, смесеприготовительных и очистных подразделений заводов РФ и СНГ с учетом лучших практик СЛТ.'}
              </p>

              <div className="flex flex-wrap gap-4 pt-3">
                <div className="flex items-center space-x-2.5 text-xs text-gray-500 font-mono">
                  <Globe className="h-4 w-4 text-[#e65410]" />
                  <span>{lang === 'en' ? 'Operations: Russia, Belarus, Kazakhstan' : 'География: вся РФ, Казахстан, Беларусь'}</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-gray-500 font-mono">
                  <History className="h-4 w-4 text-[#e65410]" />
                  <span>{lang === 'en' ? 'Full CAD blueprints according to ISO/GOST' : 'Проекты по ГОСТ, СНиП и стандартам СПО'}</span>
                </div>
              </div>
            </div>

            {/* Grid display image mockup placeholder */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#00333b] text-white rounded-none p-6 border border-teal-800 font-mono shadow-md overflow-hidden relative">
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="text-[10px] text-gray-500 uppercase block tracking-wider mb-2">// METALLURGY TELEMETRY v12</span>
                <div className="space-y-1.5 text-xs text-orange-400">
                  <p className="text-gray-400"># COMPANY NAME ID:</p>
                  <p className="font-bold text-white uppercase text-sm">ООО «Сибирские Технологии Литья»</p>
                  <p className="text-gray-400 mt-2"># CORE CAPABILITY:</p>
                  <p className="font-bold text-white">Full-cycle Engineering (Проектирование ХТС/ПГС)</p>
                  <p className="text-gray-400 mt-2"># METRICS CONTROL:</p>
                  <p className="font-bold text-emerald-400">✔ Double OTK QC protocol active</p>
                  <p className="text-gray-400 mt-2"># REGION LOGISTICS:</p>
                  <p className="font-bold text-white">Novosibirsk Central Depots / г. Новосибирск</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-500">
                  <span>SYSTEM_LIVE: 100%</span>
                  <span>EST. 2014 / NOVOSIBIRSK</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: METRICS IN NUMBERS */}
        <div id="about-stats" className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-500">
          {STATS.map((stat, i) => (
            <div 
              key={i} 
              className="bg-white border border-gray-200 rounded-none p-5 text-center shadow-xs hover:border-[#e65410] transition-colors"
            >
              <div className="text-2xl sm:text-4xl font-extrabold text-[#e65410] font-mono tracking-tight">
                {stat.num}
              </div>
              <div className="text-xs text-gray-500 font-medium font-sans mt-2 leading-snug">
                {lang === 'en' ? stat.textEn : stat.textRu}
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 3: CORE DIVISIONS & WHAT WE DO (SLT copied structure) */}
        <div id="about-activities" className="space-y-6 transition-all duration-500">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#e65410] font-black">
              {lang === 'en' ? 'METALLURGY INTEGRATION STEPS' : 'ОСНОВНЫЕ НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ'}
            </h3>
            <p className="text-xl sm:text-2xl font-bold font-sans text-gray-950">
              {lang === 'en' 
                ? 'Complex technology orchestration — from 3D design to the first molten metal casting' 
                : 'Инжиниринговая стратегия — от первого чертежа до серийной отливки'}
            </p>
            <p className="text-xs text-gray-400 font-mono">
              {lang === 'en'
                ? '*Consistent quality checks matching strict Siberian winter thermal constraints'
                : '*Разработано с учетом тяжелых сибирских производственных условий и российских ОСТ'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {ACTIVITIES.map((act, index) => {
              const IconComp = act.icon;
              return (
                <div 
                  key={index}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`bg-white border rounded-none p-6 transition-all duration-300 relative ${
                    hoveredSkill === index 
                      ? 'border-[#e65410] shadow-md -translate-y-1' 
                      : 'border-gray-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-none transition-colors ${
                      hoveredSkill === index ? 'bg-orange-500/10 text-[#e65410]' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComp className="h-6 w-6 shrink-0" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm sm:text-base font-black text-gray-950 font-sans uppercase tracking-tight">
                        {lang === 'en' ? act.titleEn : act.titleRu}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {lang === 'en' ? act.descEn : act.descRu}
                      </p>
                      
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-[#e65410]" />
                        <span className="text-[10px] sm:text-xs font-mono font-medium text-gray-400">
                          {lang === 'en' ? act.specEn : act.specRu}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: INTERACTIVE PROJECTS BROWSER */}
        <div id="about-projects" className="bg-white border border-gray-200 rounded-none p-6 sm:p-8 shadow-xs space-y-6 transition-all duration-500">
          <div className="md:flex md:items-end md:justify-between space-y-4 md:space-y-0 border-b border-gray-100 pb-5">
            <div>
              <span className="font-mono text-[9px] text-[#e65410] uppercase tracking-widest font-bold">
                {lang === 'en' ? 'VERIFIABLE SIBTEHLIT PORTFOLIO' : 'РЕАЛИЗОВАННЫЕ ТЕХНОЛОГИЧЕСКИЕ ПРОЕКТЫ'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-950 uppercase mt-1">
                {lang === 'en' ? 'References & Commissioned Units' : 'Референс-лист запущенных объектов в СНГ'}
              </h3>
            </div>

            {/* Interactive Category filter pills */}
            <div className="flex flex-wrap gap-1.5">
              {(['all', 'molding', 'melting', 'cleaning'] as const).map((filter) => {
                const isSelected = projectFilter === filter;
                let filterLabel = '';
                if (filter === 'all') filterLabel = lang === 'en' ? 'All projects' : 'Все заводы';
                if (filter === 'molding') filterLabel = lang === 'en' ? 'Sand & Molding' : 'ХТС и ПГС Формовка';
                if (filter === 'melting') filterLabel = lang === 'en' ? 'Melting complexes' : 'Индукционная плавка';
                if (filter === 'cleaning') filterLabel = lang === 'en' ? 'Shot Blasting' : 'Дробеметная очистка';

                return (
                  <button
                    key={filter}
                    onClick={() => setProjectFilter(filter)}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded border cursor-pointer transition ${
                      isSelected 
                        ? 'border-[#e65410] bg-[#e65410] text-white font-bold'
                        : 'border-gray-200 hover:border-gray-400 bg-gray-50 text-gray-600'
                    }`}
                  >
                    {filterLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reference products grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id}
                className="bg-gray-50/55 rounded-xl border border-gray-200/85 p-5 flex flex-col justify-between hover:border-gray-300 transition shadow-xs"
              >
                <div className="space-y-3">
                  {/* Top line with Year & Badge */}
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#e65410] uppercase font-bold tracking-widest bg-orange-500/5 px-2 py-1 rounded">
                      {lang === 'en' ? proj.badgeEn : proj.badgeRu}
                    </span>
                    <span className="text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded font-bold">
                      {proj.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm sm:text-base font-extrabold text-gray-950 font-sans tracking-tight leading-tight">
                    {lang === 'en' ? proj.titleEn : proj.titleRu}
                  </h4>

                  {/* Subtitle Client details */}
                  <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-mono">
                    <MapPin className="h-3 w-3 shrink-0 text-[#e65410]" />
                    <span>{lang === 'en' ? proj.clientEn : proj.clientRu} ({lang === 'en' ? proj.locationEn : proj.locationRu})</span>
                  </div>

                  {/* Machinery Specifications */}
                  <div className="space-y-1.5 bg-white border border-gray-200/60 rounded-none p-3 text-xs mt-2">
                    <p className="font-bold text-[10px] text-gray-400 font-mono tracking-wider uppercase">
                      {lang === 'en' ? '[ EQUIPMENT INSTALLED ]' : '[ СОСТАВ ОПИСУЕМОГО КОМПЛЕКСА ]'}
                    </p>
                    <p className="text-gray-600 leading-relaxed font-sans">
                      {lang === 'en' ? proj.equipmentEn : proj.equipmentRu}
                    </p>
                  </div>

                  {/* Operational Results Achievements */}
                  <div className="space-y-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-none p-3 text-xs">
                    <p className="font-bold text-[10px] text-emerald-600 font-mono tracking-wider uppercase flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {lang === 'en' ? '[ OPERATIONAL RESULT / EFFICIENCY ]' : '[ ДОСТИГНУТЫЙ КД ЭФФЕКТ ]'}
                    </p>
                    <p className="text-gray-700 leading-relaxed font-sans font-medium">
                      {lang === 'en' ? proj.resultEn : proj.resultRu}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200/60 flex items-center justify-between text-[10px] font-mono text-gray-400">
                  {onViewGallery ? (
                    <button
                      onClick={() => onViewGallery()}
                      className="text-[#e65410] hover:text-orange-600 font-extrabold uppercase tracking-wider text-[10px] bg-transparent border-none p-0 cursor-pointer flex items-center gap-1 transition"
                    >
                      <Camera className="h-3 w-3" />
                      <span>{lang === 'en' ? 'View Photos' : 'Смотреть фотоотчёт ↗'}</span>
                    </button>
                  ) : (
                    <span>ID: {proj.id.toUpperCase()}</span>
                  )}
                  <span className="text-emerald-500 font-bold flex items-center gap-1 font-mono">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    {lang === 'en' ? 'Commissioned' : 'Сдан в эксплуатацию'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 rounded-none p-4 text-center">
            <p className="text-xs text-gray-500 font-mono">
              {lang === 'en' 
                ? 'Looking for historical installation details in your specific town/state? Contact our Новосибирск office for exact reference list sheets.' 
                : 'Хотите получить полный референс-лист по вашему региону (включая подробные отзывы главных металлургов)? Обратитесь к инженерам ТСО.'}
            </p>
          </div>
        </div>

        {/* SECTION 5: GEOGRAPHY & TECHNICAL VALUES CARD (Copied from SLT) */}
        <div id="about-warehouse" className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-500">
          <div className="lg:col-span-2 bg-[#0B0F19] text-white border border-gray-850 rounded-none p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#e65410]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-[#e65410] uppercase tracking-widest font-bold">
                {lang === 'en' ? 'SIBERIAN METALLURGICAL ROOTS' : 'ГЕОГРАФИЧЕСКАЯ И ДИЛЕРСКАЯ СТРУКТУРА'}
              </span>
              <h4 className="text-lg sm:text-2xl font-black font-sans uppercase leading-tight">
                {lang === 'en' 
                  ? 'Strong supply network and warehouse resources in Novosibirsk' 
                  : 'Запасные части и выездной сервис из сердца Сибири'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {lang === 'en'
                  ? 'We maintain an extensive, immediately accessible stock of standard high-wear alloys in Novosibirsk. Our technical brigade travels directly to the client\'s factories for quick response. All critical spares — such as mixing blades, Mn13 protective armor tiles, electric heating loops, sensors, and scraper kits — are dispatched within 24 hours of notification.'
                  : 'Наша фирма обеспечивает оперативную логистику. Все важнейшие расходные узлы: твердосплавные лопатки ХТС-смесителей, бронеплиты Mn13 очистных камер, индукторы, уплотнители и нагревательные элементы, всегда в наличии на складе в г. Новосибирск. Выезд гарантийных специалистов на заводы Кузбасса, Урала и Поволжья осуществляется в сжатые сроки.'}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-3 gap-3 text-center">
              <div className="space-y-1">
                <span className="text-lg font-black font-mono text-white block">24ч</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-mono">
                  {lang === 'en' ? 'Shipment spares' : 'Отгрузка ЗиП'}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-lg font-black font-mono text-[#e65410] block">100%</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-mono">
                  {lang === 'en' ? 'In Novosibirsk' : 'В наличии'}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-lg font-black font-mono text-white block">12 мес</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-mono">
                  {lang === 'en' ? 'Base warranty' : 'Гарантия ОТК'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-none p-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="p-3 bg-orange-500/5 text-[#e65410] rounded-none w-fit">
                <PhoneCall className="h-6 w-6 shrink-0" />
              </div>
              <h4 className="text-base sm:text-lg font-bold font-sans text-gray-950 uppercase tracking-tight">
                {lang === 'en' ? 'Discuss your foundry project' : 'Планируете модернизацию или новый литейный цех?'}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {lang === 'en'
                  ? 'Connect with our Novosibirsk Chief Metallurgist to design individual 3D schemas, select continuous mixer throughputs, or calculate induction melt capacities according to your annual cast requirements.'
                  : 'Наш генеральный проектировщик и инженеры-металлурги готовы выполнить экспресс-расчет плавильного комплекса по ПГС/ХТС формовке. Напишите нам прямо сейчас.'}
              </p>
            </div>

            <div className="mt-5 space-y-2">
              <button
                onClick={onContactRequest}
                className="w-full bg-[#e65410] hover:bg-[#c24209] text-white py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-none flex items-center justify-center space-x-1.5"
              >
                <span>{lang === 'en' ? 'Submit RFQ query' : 'Сформировать запрос КП'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="text-center text-[10px] text-gray-400 font-mono mt-2">
                info@sibtehlit.ru / 8-800-550-60-54 / (383) 33-54-0-54
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
