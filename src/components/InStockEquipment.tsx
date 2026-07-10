import { ShoppingCart, CheckCircle2, Snowflake, ShieldCheck, ArrowRight, Table } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import steelPouringBg from '../assets/images/foundry_hero_bg_1781504494705.jpg';
import sandMixerXTC from '../assets/images/sand_mixer_xtc_1781504511099.jpg';
import inductionFurnaceImg from '../assets/images/induction_furnace_1781504526346.jpg';
import shotBlasterImg from '../assets/images/shot_blaster_1781504543211.jpg';

interface InStockEquipmentProps {
  lang: 'ru' | 'en';
  onAddToRFQ: (product: Product) => void;
  rfqItemsKeys?: string[];
}

export default function InStockEquipment({ 
  lang, 
  onAddToRFQ,
  rfqItemsKeys = []
}: InStockEquipmentProps) {

  // Custom list of high demand products / spare parts currently sitting physically in Novosibirsk warehouse
  const IN_STOCK_PRODUCTS = [
    {
      id: 'xtc-mixer-cx3-stock',
      category: 'xtc-equipment',
      model: 'S2403',
      title: 'Смеситель ХТС непрерывного действия (В наличии)',
      titleEn: 'No-Bake Continuous Mixer S2403 (In Stock)',
      description: 'Однорукавный лопастной смеситель ХТС серии S24 производительностью 3 т/ч. Оборудован частотным приводом и программируемым реле Delta. Находится в заводской консервационной упаковке на складе.',
      descriptionEn: 'Single-arm high-precision resin-sand continuous mixer S2403. Capacity 3 t/h. Complete with brand-new Delta PLC system. Physically stored in original packaging in Novosibirsk.',
      imageUrl: sandMixerXTC,
      specsList: lang === 'en' ? [
        { name: 'Capacity', value: '3.0 tons/hour' },
        { name: 'Arm Operating Radius', value: '1800 mm' },
        { name: 'Pumps Unit', value: 'KHM adjustable design' },
        { name: 'Discharge Height', value: '1150 mm' }
      ] : [
        { name: 'Производительность', value: '3.0 тонны/час' },
        { name: 'Рабочий радиус рукава', value: '1800 мм' },
        { name: 'Насосная станция', value: 'Шестеренный дозатор КХМ' },
        { name: 'Высота выгрузки смеси', value: '1150 мм' }
      ],
      priceAsk: lang === 'en' ? 'Request In-Stock Quote' : 'Узнать цену со склада',
      dispatchTime: lang === 'en' ? 'Within 24 Hours' : 'Отгрузка за 1 день'
    },
    {
      id: 'xtc-mixer-cx5-stock',
      category: 'xtc-equipment',
      model: 'S2405',
      title: 'Смеситель ХТС непрерывного действия (В наличии)',
      titleEn: 'No-Bake Continuous Mixer S2405 (In Stock)',
      description: 'Высокопроизводительный однорукавный смеситель серии S24 производительностью 5 т/ч. В комплекте идет современный выносной пульт управления.',
      descriptionEn: 'Single-arm continuous resin-sand mixer S2405. Throughput 5 tons/hour. Outer chemical pump board with digital control. High wear-resistant mixing chamber.',
      imageUrl: sandMixerXTC,
      specsList: lang === 'en' ? [
        { name: 'Capacity', value: '5.0 tons/hour' },
        { name: 'Operating Radius', value: '2200 mm' },
        { name: 'Automation Level', value: 'PLC Delta Series Touch' },
        { name: 'Installed Power', value: '5.5 kW' }
      ] : [
        { name: 'Производительность', value: '5.0 тонн/час' },
        { name: 'Рабочий радиус рукава', value: '2200 мм' },
        { name: 'Система ЧПУ', value: 'ПЛК Delta сенсорный дисплей' },
        { name: 'Установленная мощность', value: '5.5 кВт' }
      ],
      priceAsk: lang === 'en' ? 'Request In-Stock Quote' : 'Узнать цену со склада',
      dispatchTime: lang === 'en' ? 'Within 24 Hours' : 'Отгрузка за 1 день'
    },
    {
      id: 'xtc-vibro-table1500-stock',
      category: 'xtc-equipment',
      model: 'S2312 (ВСФ-12)',
      title: 'Вибростол уплотнения ХТС маятниковый (В наличии)',
      titleEn: 'XTC Vibration Compaction Table S2312 (In Stock)',
      description: 'Предназначен для высокочастотного маятникового уплотнения жидкоподвижного формовочного песка в опоке. Гарантирует превосходную проработку сложных граней отливки.',
      descriptionEn: 'Designed for high frequency pneumatic pendulum vibration compaction of resin sand in casting flasks. Prevents voids and micro-pockets in complex geometries.',
      imageUrl: sandMixerXTC,
      specsList: lang === 'en' ? [
        { name: 'Max Flask Load Size', value: '1200 x 1200 mm' },
        { name: 'Maximum Load', value: '1500 kg' },
        { name: 'Excitation Force', value: '22 kN variable' },
        { name: 'Table Height', value: '550 mm' }
      ] : [
        { name: 'Размер стола под формы', value: '1200 х 1200 мм' },
        { name: 'Максимальная нагрузка', value: '1500 кг' },
        { name: 'Вынуждающая сила', value: '22 кН с регулировкой' },
        { name: 'Высота верхней плиты', value: '550 мм' }
      ],
      priceAsk: lang === 'en' ? 'Request In-Stock Quote' : 'Узнать цену со склада',
      dispatchTime: lang === 'en' ? 'Within 24 Hours' : 'Отгрузка за 1 день'
    },
    {
      id: 'ladle-kl-teapot-stock',
      category: 'furnaces',
      model: 'КЛ-0.5',
      title: 'Литейный ковш чайниковый с редуктором (В наличии)',
      titleEn: 'Teapot Pouring Ladle with Gearbox KL-0.5 (In Stock)',
      description: 'Чайниковый заливочный ковш конической формы емкостью 500 кг по жидкому металлу. Обеспечивает забор чистого расплава снизу слоя флюса, снижая количество шлаковых включений.',
      descriptionEn: 'Teapot shape pouring ladle with premium self-locking gear system. Capacity 500 kg. Extracts clean molten metal from below the active slag layer to minimize impurities.',
      imageUrl: inductionFurnaceImg,
      specsList: lang === 'en' ? [
        { name: 'Liquid Metal Capacity', value: '500 kg (Steel / Iron)' },
        { name: 'Pouring Mechanism', value: 'Self-locking warm reducer' },
        { name: 'Refractory Lining', value: 'Manual rammed refractory' },
        { name: 'Weight empty', value: '280 kg' }
      ] : [
        { name: 'Емкость по расплаву', value: '500 кг (Чугун, Сталь)' },
        { name: 'Механизм поворота', value: 'Самоблокирующийся червячный редуктор' },
        { name: 'Тип футеровки', value: 'Под набивку огнеупором' },
        { name: 'Масса нетто', value: '280 кг' }
      ],
      priceAsk: lang === 'en' ? 'Request In-Stock Quote' : 'Узнать цену со склада',
      dispatchTime: lang === 'en' ? 'Within 24 Hours' : 'Отгрузка за 1 день'
    },
    {
      id: 'shot-blast-q325-stock',
      category: 'shot-blast',
      model: 'Q325',
      title: 'Ленточная дробеметная камера с резиновым транспортером (В наличии)',
      titleEn: 'Tumble Belt Shot Blaster with Rubber Apron Q325 (In Stock)',
      description: 'Компактная автоматическая дробеметная установка барабанного типа с износостойким резиновым кольцевым ремнем. Идеально очищает детали от пригара песчаной смеси.',
      descriptionEn: 'Heavy duty modular tumbling belt shot blaster with premium rubber apron and integrated dust-collector. Perfect for clearing sand residue from batch cast items.',
      imageUrl: shotBlasterImg,
      specsList: lang === 'en' ? [
        { name: 'Max Single Load Weight', value: '150 kg' },
        { name: 'Total Batch Basket Capacity', value: '0.15 cubic meters' },
        { name: 'Blast Turbine Power', value: '7.5 kW direct drive' },
        { name: 'Exhaust Air Speed', value: '2200 cubic m/h' }
      ] : [
        { name: 'Макс. загрузка одной детали', value: '150 кг' },
        { name: 'Общий объем загрузки барабана', value: '0.15 куб.м.' },
        { name: 'Мощность турбины', value: '7.5 кВт прямоприводная' },
        { name: 'Производительность вытяжки', value: '2200 куб.м/час' }
      ],
      priceAsk: lang === 'en' ? 'Request In-Stock Quote' : 'Узнать цену со склада',
      dispatchTime: lang === 'en' ? 'Within 24 Hours' : 'Отгрузка за 1 день'
    }
  ];

  // Helper to trigger RFQ Cart registration using a dynamically assembled mock Product
  const handleAddClick = (p: typeof IN_STOCK_PRODUCTS[0]) => {
    const mockProduct: Product = {
      id: p.id,
      category: p.category as ProductCategory,
      subcategory: 'in-stock',
      subcategoryRu: 'Оборудование в наличии',
      subcategoryEn: 'In Stock Equipment',
      title: p.title,
      titleEn: p.titleEn,
      model: p.model,
      description: p.description,
      descriptionEn: p.descriptionEn,
      imageUrl: p.imageUrl,
      capacity: p.specsList[0].value,
      capacityEn: p.specsList[0].value,
      features: [],
      featuresEn: [],
      specs: p.specsList.map(s => ({
        name: s.name,
        value: s.value,
        nameEn: s.name,
        valueEn: s.value
      }))
    };
    onAddToRFQ(mockProduct);
  };

  const t = {
    ru: {
      header: 'Складское наличие оборудования «Сибтехлит»',
      desc: 'Позиции готового тяжелого литейного оборудования и важнейших быстроизнашивающихся запасных частей, находящихся физически на нашем складе в г. Новосибирск. Готовы к оперативной запаковке и отгрузке в РФ и страны СНГ.',
      sparesHeader: 'Оригинальные дефицитные запчасти на складе',
      sparesDesc: 'Постоянно поддерживаем пул быстроизнашивающихся материалов для бесперебойной работы ваших формовочных линий:',
      spare1: 'Твердосплавные лопатки смесителя (карбид вольфрама)',
      spare2: 'Турбины дробеметные прямоприводные в сборе 7.5 кВт / 11 кВт',
      spare3: 'Высокоточные дозирующие химические насосы КХМ шестеренного типа',
      spare4: 'Бронеплиты внутренней защиты камер из легированной стали Mn13',
      spare5: 'Датчики мгновенного расхода смолы и кислых катализаторов',
      inSpecs: 'Уже добавлено в запрос КП',
      addToSpecs: 'Заказать с склада в КП',
      warehouseCheck: 'Аудит качества ОТК Сибтехлит',
      guaranteeFull: '3 года официальной гарантии литейного металлургического концерна Сибтехлит на все складские комплектации.'
    },
    en: {
      header: 'In Stock Foundry Inventory',
      desc: 'Standard casting machinery, continuous mixers, and vital service spares sitting physically in our Новосибирск distribution depot. Ready for immediate packing, loading, and transit dispatch across customs lanes.',
      sparesHeader: 'Original Replacement Spare Parts Available',
      sparesDesc: 'We permanently support a generous stash of wear parts ensuring continuous uptime of your moulding facilities:',
      spare1: 'Tungsten carbide continuous mixer paddles / mixing blades',
      spare2: 'Direct drive shotblast turbines assembly (7.5 kW / 11 kW models)',
      spare3: 'KHM High-accuracy chemical resin and acid dosing gear pumps',
      spare4: 'Manganese steel Mn13 wear-protective internal chamber liners',
      spare5: 'Instant chemical reactant flowmeters and flow feedback sensors',
      inSpecs: 'Added to RFQ',
      addToSpecs: 'Request Quote from Stock',
      warehouseCheck: 'QC approved by Sibtehlit',
      guaranteeFull: '3 years official brand guarantee on all warehouse equipment assemblies.'
    }
  }[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-mono text-[10px] text-emerald-600 bg-emerald-100/70 border border-emerald-300 px-3 py-1 rounded-full uppercase font-black inline-flex items-center gap-1.5 animate-pulse">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {lang === 'en' ? 'STOCK WAREHOUSE NOVOSIBIRSK' : 'РЕАЛЬНЫЙ СКЛАД Г. НОВОСИБИРСК'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-950 uppercase font-sans tracking-tight">
          {t.header}
        </h1>
        <p className="text-sm sm:text-base text-gray-650 leading-relaxed font-sans">
          {t.desc}
        </p>
      </div>

      {/* Main Stock Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {IN_STOCK_PRODUCTS.map((p) => {
          const isAdded = rfqItemsKeys.includes(p.id);
          const titleText = lang === 'en' ? p.titleEn : p.title;
          const descText = lang === 'en' ? p.descriptionEn : p.description;

          return (
            <div 
              key={p.id}
              className="bg-white border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Header Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img 
                    src={p.imageUrl} 
                    alt={titleText}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white font-mono text-[10px] uppercase font-bold py-1 px-2.5 rounded-md shadow-sm">
                    {lang === 'en' ? 'In Stock' : 'В наличии'}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#00333b]/90 text-white font-mono text-[9px] py-0.5 px-2 rounded">
                    {p.model}
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-sans font-black text-base text-gray-950 uppercase tracking-tight leading-snug">
                      {titleText}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {descText}
                    </p>
                  </div>

                  {/* Micro specs table */}
                  <div className="bg-slate-50 border border-gray-100 rounded-lg p-3 space-y-1.5 text-xs">
                    {p.specsList.map((spec, sidx) => (
                      <div key={sidx} className="flex justify-between font-sans">
                        <span className="text-gray-400 font-mono text-[10px] uppercase">{spec.name}:</span>
                        <span className="text-gray-900 font-bold font-sans text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom buttons strip */}
              <div className="p-5 pt-0 border-t border-gray-50 bg-slate-50/50 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono pt-3">
                  <span className="text-gray-400 uppercase">{lang === 'en' ? 'SHIPPING TIME:' : 'ТЕРМИН ОТГРУЗКИ:'}</span>
                  <span className="text-emerald-600 font-black flex items-center gap-1">
                    <Snowflake className="h-3 w-3 animate-spin duration-1000" />
                    {p.dispatchTime}
                  </span>
                </div>

                <button
                  onClick={() => handleAddClick(p)}
                  className={`w-full py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 border-none cursor-pointer flex items-center justify-center space-x-1.5 ${
                    isAdded 
                      ? 'bg-emerald-600 text-white font-black'
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-2xs'
                  }`}
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span>{isAdded ? t.inSpecs : t.addToSpecs}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spares and Consumables Banner */}
      <div className="bg-[#00171b] text-white rounded-xl border border-teal-850 p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between relative overflow-hidden">
        {/* Photo background of steel pouring process with luxury low opacity */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-[0.14] bg-no-repeat mix-blend-luminosity"
          style={{ backgroundImage: `url(${steelPouringBg})` }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none z-0" />
        
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-xs text-emerald-500 uppercase font-black tracking-widest">{t.warehouseCheck}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black font-sans uppercase">
            {t.sparesHeader}
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            {t.sparesDesc}
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-gray-300 font-medium">
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500 text-xs select-none">✔</span> {t.spare1}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500 text-xs select-none">✔</span> {t.spare2}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500 text-xs select-none">✔</span> {t.spare3}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500 text-xs select-none">✔</span> {t.spare4}
            </li>
            <li className="flex items-center gap-1.5 col-span-1 sm:col-span-2">
              <span className="text-emerald-500 text-xs select-none">✔</span> {t.spare5}
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-none p-5 flex flex-col justify-between max-w-sm space-y-4 relative z-10">
          <div className="flex gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
              {t.guaranteeFull}
            </p>
          </div>
          <a
            href="mailto:info@sibtehlit.ru"
            className="text-[10px] uppercase font-bold font-mono tracking-wider bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 py-2 rounded-none text-center transition"
          >
            {lang === 'en' ? 'Email Spare Dept info@sibtehlit.ru' : 'Запрос запчастей: info@sibtehlit.ru'}
          </a>
        </div>
      </div>

    </div>
  );
}
