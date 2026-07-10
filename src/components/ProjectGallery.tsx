import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Calendar, MapPin, Sliders, ChevronLeft, ChevronRight, X, ZoomIn, Info } from 'lucide-react';
import sandMixerXTC from '../assets/images/sand_mixer_xtc_1781504511099.jpg';
import inductionFurnaceImg from '../assets/images/induction_furnace_1781504526346.jpg';
import shotBlasterImg from '../assets/images/shot_blaster_1781504543211.jpg';
import GoogleDriveSync from './GoogleDriveSync';

interface GalleryImage {
  url: string;
  titleRu: string;
  titleEn: string;
}

interface ProjectAlbum {
  id: string;
  year: number;
  titleRu: string;
  titleEn: string;
  locationRu: string;
  locationEn: string;
  category: 'molding' | 'melting' | 'cleaning' | 'lgm' | 'finishing';
  descriptionRu: string;
  descriptionEn: string;
  equipmentRu: string;
  equipmentEn: string;
  images: GalleryImage[];
}

const ALBUMS: ProjectAlbum[] = [
  {
    id: 'alb-2024-kemerovo',
    year: 2024,
    titleRu: 'Поставка и запуск автоматизированной линии ХТС и системы регенерации',
    titleEn: 'Delivery and commissioning of continuous No-Bake molding line',
    locationRu: 'Кемеровская область',
    locationEn: 'Kemerovo Region',
    category: 'molding',
    descriptionRu: 'Комплексный запуск формовочного участка ХТС производительностью 10 тонн/час. Позволил клиенту увеличить выход качественного литья до 98%.',
    descriptionEn: 'Full commissioning of a No-Bake molding section with 10 t/h output capacity. Increased yield of perfect castings to 98%.',
    equipmentRu: 'Высокопроизводительный смеситель ХТС непрерывного действия, вибростол серии ВСФ-12, механическая регенерация песка РП-8',
    equipmentEn: 'High-performance continuous No-Bake mixer, VSF-12 compaction table, RP-8 mechanical sand reclamation system',
    images: [
      {
        url: '/img/foto/Menu/smes-s.jpg',
        titleRu: 'Смеситель ХТС на заливочном участке',
        titleEn: 'No-Bake continuous mixer in operation'
      },
      {
        url: '/img/foto/Menu/regenerazia.jpg',
        titleRu: 'Узел механической регенерации песка СЛТ',
        titleEn: 'Mechanical sand reclamation unit'
      },
      {
        url: '/img/foto/Menu/vibr-z.jpg',
        titleRu: 'Виброуплотнение модельных комплектов',
        titleEn: 'Compaction table for sand packing'
      },
      {
        url: '/img/foto/Menu/KANTOVATEL.jpg',
        titleRu: 'Кантователь литейных форм',
        titleEn: 'Foundry flask roll-over device'
      }
    ]
  },
  {
    id: 'alb-2024-altay',
    year: 2024,
    titleRu: 'Запуск плавильного комплекса индукционных плавильных печей',
    titleEn: 'Commissioning of induction melting furnaces complexes',
    locationRu: 'Алтайский край',
    locationEn: 'Altai Territory',
    category: 'melting',
    descriptionRu: 'Монтаж тяжелых индукционных печей в стальном каркасе с гидравлическим наклоном для плавки высоколегированных сталей.',
    descriptionEn: 'Installation of heavy-duty induction furnaces in steel carcasses featuring hydraulic tilts for high-alloy steel melts.',
    equipmentRu: 'Печи серии GW-1.0-800S повышенной жесткости, теплообменные станции и станция охлаждения FL-350',
    equipmentEn: 'Highly rigid GW-1.0-800S steel shell furnaces, heat exchangers, and FL-350 cooling station',
    images: [
      {
        url: '/assets/gallery/3/_25D0_25A1_25D1_2582_25D0_25B0_25D0_25BD_25D1_2586_25D0_25B8_25D1_258F-FL-350.jpg',
        titleRu: 'Станция водяного охлаждения закрытого типа FL-350',
        titleEn: 'Closed-circuit water cooling system station FL-350'
      },
      {
        url: '/img/foto/Menu/PL-pechi-g.jpg',
        titleRu: 'Плавильная печь в прочной стальной рамной конструкции',
        titleEn: 'Rigid steel carcass induction melting furnace'
      },
      {
        url: '/assets/gallery/3/GWL 0.35.jpg',
        titleRu: 'Среднечастотная индукционная тигельная установка',
        titleEn: 'Medium-frequency coreless induction crucible furnace'
      }
    ]
  },
  {
    id: 'alb-2023-perm',
    year: 2023,
    titleRu: 'Оснащение термического и обрубного цехов крупного арматурного завода',
    titleEn: 'Equipping heat-treatment and fettling compartments',
    locationRu: 'Пермский край',
    locationEn: 'Perm Territory',
    category: 'finishing',
    descriptionRu: 'Модернизация участка нормализации отливок с внедрением автоматизированных закалочных печей с выдвижными подами.',
    descriptionEn: 'Modernization of the castings normalization section featuring automated railway car-bottom quenching kilns.',
    equipmentRu: 'Камерная газовая термическая печь серии RT, манипулятор сборки форм, литейные гидроклинья ГК-25',
    equipmentEn: 'Industrial gas car-bottom furnace series RT, mold compilation manipulator, GK-25 hydraulic fettling wedges',
    images: [
      {
        url: '/img/foto/Menu/Term_pod.jpg',
        titleRu: 'Печь СДО-15 с выдвижным подом перед закалочной садкой',
        titleEn: 'Car-bottom furnace SDO-15 loaded and ready for thermal cycle'
      },
      {
        url: '/img/foto/Menu/manip.jpg',
        titleRu: 'Пневматический манипулятор позиционирования полуформ',
        titleEn: 'Pneumatic manipulator for mold halves alignment'
      },
      {
        url: '/img/foto/Menu/KANTOVATEL.jpg',
        titleRu: 'Кантователь ХТС форм в работе',
        titleEn: 'Foundry mold rollover station in active service'
      }
    ]
  },
  {
    id: 'alb-2023-lnd',
    year: 2023,
    titleRu: 'Автоматизация кокильного литья цветных сплавов (ЛНД)',
    titleEn: 'Automation of non-ferrous casting (Low pressure)',
    locationRu: 'Нижегородская область',
    locationEn: 'Nizhny Novgorod Region',
    category: 'lgm',
    descriptionRu: 'Внедрение высоконадежной автоматической машины литья под низким давлением (ЛНД) для прецизионных отливок.',
    descriptionEn: 'Integration of a highly reliable automatic low-pressure-die-casting machine for high-precision components.',
    equipmentRu: 'Машина литья под низким давлением J453A, автоматический заливочный блок, тигельный миксер сопротивления',
    equipmentEn: 'Low pressure die casting machine J453A, automated casting block, crucible resistance holder',
    images: [
      {
        url: '/img/foto/Menu/LPD.jpg',
        titleRu: 'Литейный комплекс ЛНД J453A',
        titleEn: 'Low pressure die casting installation J453A'
      },
      {
        url: '/img/foto/Menu/Kokil.jpg',
        titleRu: 'Кокильная машина для прецизионных деталей',
        titleEn: 'Gravity die casting machine for precision components'
      }
    ]
  },
  {
    id: 'alb-2022-drob',
    year: 2022,
    titleRu: 'Комплекс очистки чугунного литья от пригара в Кемеровской области',
    titleEn: 'Castings shot-blasting cleaning line project',
    locationRu: 'Кемеровская область',
    locationEn: 'Kemerovo Region',
    category: 'cleaning',
    descriptionRu: 'Установка высокомощных дробеметов проходного и подвесного типа для очистки деталей вагонного литья.',
    descriptionEn: 'Installation of high-power continuous flow and hanger type shot-blasting cabinets for railway cast parts cleaning.',
    equipmentRu: 'Дробеметная установка с поворотным столом Q378, очистной дробемет Q3210',
    equipmentEn: 'Shot-blasting rotating table unit Q378, heavy-duty tumbler shot blaster Q3210',
    images: [
      {
        url: '/assets/gallery/3/_25D0_25B4_25D1_2580_25D0_25BE_25D0_25B1_25D0_25B5_25D0_25BC_25D0_25B5_25D1_2582-Q3210-2.jpg',
        titleRu: 'Дробеметная резиноленточная установка Q3210 барабанного типа',
        titleEn: 'Tumbler belt shot blaster installation Q3210'
      },
      {
        url: '/assets/gallery/3/_25D0_2594_25D1_2580_25D0_25BE_25D0_25B1_25D0_25B5_25D0_25BC_25D0_25B5_25D1_2582-Q378-_25D0_25B7_25D0_25BD_25D0_25B0_25D0_25BA.jpg',
        titleRu: 'Тяжелая дробеметная камера подвесного типа Q378 в сборочном цеху',
        titleEn: 'Hanger type heavy shot blaster Q378 in the assembly factory'
      }
    ]
  },
  {
    id: 'alb-2021-lgm',
    year: 2021,
    titleRu: 'Поставка и запуск оборудования автоматизированного цеха ЛГМ',
    titleEn: 'Lost Foam (LGM) automatic foundry shop commissioning',
    locationRu: 'Омская область',
    locationEn: 'Omsk Region',
    category: 'lgm',
    descriptionRu: 'Комплексный проект «Белого цеха» ЛГМ по производству пенополистирольных моделей сложнейших деталей.',
    descriptionEn: 'Full-scale turn-key installation of a Lost Foam "White shop" producing EPS foam pattern cores.',
    equipmentRu: 'Предвспениватель циклического действия ПВ-1200, формовочный модельный автомат ФА-1080, автоклав и краскомешалка',
    equipmentEn: 'Batch pre-expander PV-1200, automatic pattern sintering machine FA-1080, autoclave, and paint mixer',
    images: [
      {
        url: '/img/foto/Menu/lgm-pred.jpg',
        titleRu: 'Предвспениватель полистирола ПВ-1200',
        titleEn: 'Batch expandable polystyrene pre-expander PV-1200'
      },
      {
        url: '/img/foto/Menu/lgm-avtom.jpg',
        titleRu: 'Автоматический модельный автомат ФА-1080',
        titleEn: 'Automatic lost foam sintering pattern machine FA-1080'
      },
      {
        url: '/img/foto/Menu/lgm-avtoklav.jpg',
        titleRu: 'Автоклав депарафинизации и спекания',
        titleEn: 'Autoclave unit for wax purging and curing'
      },
      {
        url: '/img/foto/Menu/lgm-vibr.jpg',
        titleRu: 'Вибростол уплотнения сухого песка в «черном цеху»',
        titleEn: 'Sand compaction table inside the Lost Foam black section'
      }
    ]
  },
  {
    id: 'alb-2020-ryazan',
    year: 2020,
    titleRu: 'Запуск индукционных тигельных печей с защитным экранированием',
    titleEn: 'Induction crucible furnaces with magnetic yokes',
    locationRu: 'Рязанская область',
    locationEn: 'Ryazan Region',
    category: 'melting',
    descriptionRu: 'Поставка и регулировка индукционных печей для плавки чугуна высокой прочности с минимальными индукционными наводками.',
    descriptionEn: 'Supply and optimization of induction furnaces for ductile iron melting with fully shielded electromagnetic fields.',
    equipmentRu: 'Индукционная плавильная печь GWT-0.45, тиристорный высокочастотный преобразователь питания ТПЧ, компенсационные конденсаторы',
    equipmentEn: 'Induction melting furnace GWT-0.45, thyristor power inverter, capacitor batteries bench',
    images: [
      {
        url: '/assets/gallery/3/_25D0_259F_25D0_25B5_25D1_2587_25D1_258C-GWT-0.45.jpg',
        titleRu: 'Индукционная тигельная плавильная печь GWT-0.45 на стапеле',
        titleEn: 'Coreless induction melting furnace GWT-0.45 mounted'
      },
      {
        url: '/img/foto/Menu/ZIP-tir.jpg',
        titleRu: 'Шкафы тиристорного преобразователя частоты (ТПЧ)',
        titleEn: 'Thyristor static frequency converter panels'
      },
      {
        url: '/img/foto/Menu/ZIP-kondens.jpg',
        titleRu: 'Батарея силовых электротермических конденсаторов СЛТ',
        titleEn: 'Power electrothermal capacitors rack'
      }
    ]
  }
];

export default function ProjectGallery({ lang }: { lang: 'ru' | 'en' }) {
  const [activeAlbumId, setActiveAlbumId] = useState<string>(ALBUMS[0].id);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const activeAlbum = ALBUMS.find(a => a.id === activeAlbumId) || ALBUMS[0];

  const filteredAlbums = filterCategory === 'all' 
    ? ALBUMS 
    : ALBUMS.filter(a => a.category === filterCategory);

  const handleNextAlbum = () => {
    const currentIndex = filteredAlbums.findIndex(a => a.id === activeAlbumId);
    if (currentIndex !== -1 && currentIndex < filteredAlbums.length - 1) {
      setActiveAlbumId(filteredAlbums[currentIndex + 1].id);
    } else if (filteredAlbums.length > 0) {
      setActiveAlbumId(filteredAlbums[0].id);
    }
  };

  const handlePrevAlbum = () => {
    const currentIndex = filteredAlbums.findIndex(a => a.id === activeAlbumId);
    if (currentIndex !== -1 && currentIndex > 0) {
      setActiveAlbumId(filteredAlbums[currentIndex - 1].id);
    } else if (filteredAlbums.length > 0) {
      setActiveAlbumId(filteredAlbums[filteredAlbums.length - 1].id);
    }
  };

  return (
    <div id="project-gallery-page" className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Intro section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-orange-500/5 border border-orange-500/10 px-3 py-1 rounded">
          <Camera className="h-4 w-4 text-[#e65410]" />
          <span className="font-mono text-xs text-[#e65410] uppercase tracking-wider font-bold">
            {lang === 'en' ? 'HISTORICAL DEPLOYMENT ARCHIVES' : 'ФОТОАРХИВЫ ЗАПУСКОВ СИБТЕХЛИТ'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-950 uppercase font-sans">
          {lang === 'en' ? 'Commissioned Projects & Photo Reports' : 'Фотоотчеты и запущенные объекты'}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {lang === 'en'
            ? 'Explore actual visual reports from our high-end metallurgy installations, on-site commissioning checks, and client factories across Russia and the CIS.'
            : 'Реальные фотографии сданного оборудования, шеф-монтажных процессов и действующих цехов в регионах РФ. Никакой 3D-графики — только подлинные фотофакты СЛТ.'}
        </p>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 border-b border-gray-200 pb-4">
        {[
          { key: 'all', labelRu: 'Все отчеты', labelEn: 'All Reports' },
          { key: 'melting', labelRu: 'Печи плавильные', labelEn: 'Melting Furnaces' },
          { key: 'molding', labelRu: 'Линии ХТС/ПГС', labelEn: 'No-Bake & Green Sand' },
          { key: 'cleaning', labelRu: 'Дробеметы', labelEn: 'Shot Blasters' },
          { key: 'lgm', labelRu: 'Оборудование ЛГМ/ЛВМ', labelEn: 'Lost Foam & Investment' },
          { key: 'finishing', labelRu: 'Термические печи', labelEn: 'Heat Treatment' }
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => {
              setFilterCategory(btn.key);
              const matched = btn.key === 'all' 
                ? ALBUMS 
                : ALBUMS.filter(a => a.category === btn.key);
              if (matched.length > 0) {
                setActiveAlbumId(matched[0].id);
              }
            }}
            className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded-none border transition cursor-pointer ${
              filterCategory === btn.key
                ? 'border-[#e65410] bg-[#e65410] text-white font-bold'
                : 'border-gray-200 hover:border-gray-400 bg-white text-gray-600'
            }`}
          >
            {lang === 'en' ? btn.labelEn : btn.labelRu}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Albums Sidebar List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
            <h3 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5 text-[#e65410]" />
              {lang === 'en' ? 'Select Active Album' : 'Выбрать фотоальбом'}
            </h3>
            <span className="text-[10px] font-mono text-gray-400 font-bold bg-gray-100 px-2 py-0.5 rounded">
              {filteredAlbums.length}
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredAlbums.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-400 font-mono">
                {lang === 'en' ? 'No albums matched selection' : 'Нет альбомов в данной категории'}
              </div>
            ) : (
              filteredAlbums.map((alb) => (
                <button
                  key={alb.id}
                  onClick={() => setActiveAlbumId(alb.id)}
                  className={`w-full text-left p-4 rounded-none border transition cursor-pointer flex flex-col justify-between space-y-1.5 ${
                    activeAlbumId === alb.id
                      ? 'border-[#e65410] bg-orange-500/5'
                      : 'border-gray-200 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-[#e65410] font-bold uppercase tracking-widest bg-orange-500/10 px-1.5 py-0.5">
                      {alb.category.toUpperCase()}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {alb.year}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-gray-950 font-sans tracking-tight line-clamp-2 leading-snug">
                    {lang === 'en' ? alb.titleEn : alb.titleRu}
                  </h4>
                  <div className="flex items-center space-x-1 text-[10px] text-gray-400 font-mono">
                    <MapPin className="h-3 w-3 text-gray-400 shrink-0" />
                    <span className="truncate">{lang === 'en' ? alb.locationEn : alb.locationRu}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Primary Active Album Viewer */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-none p-5 sm:p-7 shadow-xs space-y-6">
          {/* Header slider navigation */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-[#e65410]">
                <span>{activeAlbum.year} {lang === 'en' ? 'DEPLOYMENT' : 'ПОСТАВКА И ПУСКОНАЛАДКА'}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5 font-bold">
                  <MapPin className="h-3 w-3 text-[#e65410]" />
                  {lang === 'en' ? activeAlbum.locationEn : activeAlbum.locationRu}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-sans text-gray-950 uppercase tracking-tight mt-1 leading-snug">
                {lang === 'en' ? activeAlbum.titleEn : activeAlbum.titleRu}
              </h3>
            </div>

            {/* Slider triggers */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handlePrevAlbum}
                className="p-2 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 rounded-none cursor-pointer transition text-gray-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextAlbum}
                className="p-2 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 rounded-none cursor-pointer transition text-gray-600"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Details callout block */}
          <div className="bg-orange-500/5 border border-orange-500/10 p-4 space-y-2.5">
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans font-medium">
              {lang === 'en' ? activeAlbum.descriptionEn : activeAlbum.descriptionRu}
            </p>
            <div className="text-[11px] font-mono text-gray-500 flex items-start gap-1.5">
              <Info className="h-4 w-4 text-[#e65410] shrink-0 mt-0.5" />
              <span>
                <strong className="text-gray-950">{lang === 'en' ? 'EQUIPMENT CONFIG:' : 'СОСТАВ КОМПЛЕКСА:'}</strong>{' '}
                {lang === 'en' ? activeAlbum.equipmentEn : activeAlbum.equipmentRu}
              </span>
            </div>
          </div>

          {/* Photo report grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeAlbum.images.map((img, i) => (
              <div 
                key={i}
                className="group relative border border-gray-200 bg-gray-50 cursor-pointer overflow-hidden aspect-video shadow-xs hover:border-[#e65410] transition-colors"
                onClick={() => setZoomImage(img.url)}
              >
                <img 
                  src={img.url} 
                  onError={(e) => {
                    const fallbackList = [sandMixerXTC, inductionFurnaceImg, shotBlasterImg];
                    e.currentTarget.src = fallbackList[i % fallbackList.length];
                  }}
                  alt={lang === 'en' ? img.titleEn : img.titleRu}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 space-y-1">
                  <p className="text-white font-sans font-bold text-xs">
                    {lang === 'en' ? img.titleEn : img.titleRu}
                  </p>
                  <p className="text-orange-400 font-mono text-[9px] flex items-center gap-1">
                    <ZoomIn className="h-3 w-3" />
                    {lang === 'en' ? 'Click to magnify' : 'Нажмите для увеличения'}
                  </p>
                </div>
                {/* Fallback label at the bottom of the card */}
                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs p-1.5 text-center sm:hidden">
                  <p className="text-white text-[10px] font-sans truncate px-1">
                    {lang === 'en' ? img.titleEn : img.titleRu}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Drive Photo Synchronizer */}
      <GoogleDriveSync lang={lang} />

      {/* Lightbox photo viewer */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button 
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white cursor-pointer transition border-none"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              src={zoomImage}
              onError={(e) => {
                e.currentTarget.src = sandMixerXTC;
              }}
              alt="High-resolution deployment photo"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain border border-white/10 shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
