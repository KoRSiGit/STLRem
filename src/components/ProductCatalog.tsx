import { useState, useRef, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { 
  Search, 
  ChevronDown, 
  Check, 
  Plus, 
  AlertCircle, 
  Flame, 
  Layers, 
  Zap, 
  Cpu, 
  Wind, 
  ArrowRight, 
  HardHat, 
  FileText, 
  ShieldAlert, 
  Compass, 
  Activity, 
  Settings,
  Table,
  Sliders,
  ChevronRight,
  Home,
  X
} from 'lucide-react';
import { MaterialItem, matchSubcategory, renderFormattedText, parseSpecsToTable } from './catalogUtils';
import ProductCard from './ProductCard';
import GalleryLightbox from './GalleryLightbox';
import ProductDetailModal from './ProductDetailModal';
import CatalogContent from './CatalogContent';
import { TRANSLATIONS } from '../data/translations';
import steelPouringBg from '../assets/images/foundry_hero_bg_1781504494705.jpg';
import sandMixerXTC from '../assets/images/sand_mixer_xtc_1781504511099.jpg';
import inductionFurnaceImg from '../assets/images/induction_furnace_1781504526346.jpg';
import shotBlasterImg from '../assets/images/shot_blaster_1781504543211.jpg';


const RELATED_EQUIPMENT_MAP: Record<string, string[]> = {};

const RELATED_CATEGORY_FALLBACK_MAP: Record<string, string[]> = {};

const MATERIALS_MAP: Record<string, MaterialItem[]> = {
  'furnaces': [
    {
      id: 'quartzite',
      titleRu: 'Кварцит футеровочный кислый',
      titleEn: 'Acidic lining quartzite',
      model: 'Q-98',
      descRu: 'Высокочистый кристаллический кварцит для футеровки тиглей плавки чугуна и стали в индукционных печах.',
      descEn: 'High-purity crystalline quartzite for lining induction furnace crucibles during iron and steel melting.',
      packRu: 'МКР по 1000 кг',
      packEn: '1000 kg big bags'
    },
    {
      id: 'recarburizer',
      titleRu: 'Науглероживатель (синтетический графит)',
      titleEn: 'Recarburizer (synthetic graphite)',
      model: 'УП-99',
      descRu: 'Используется для корректировки содержания углерода в расплаве. Низкое содержание серы и азота.',
      descEn: 'Used to adjust carbon content in the melt. Features ultra-low sulfur and nitrogen content.',
      packRu: 'Бумажные мешки по 25 кг',
      packEn: '25 kg paper bags'
    },
    {
      id: 'modificator',
      titleRu: 'Модификатор ФС65Ба4 (ФСП-Барий)',
      titleEn: 'FS65Ba4 inoculant (FeSiBa)',
      model: 'ФС65Ба4',
      descRu: 'Для графитизирующего модифицирования серого и высокопрочного чугуна перед заливкой.',
      descEn: 'For inoculating treatment of gray and ductile iron to prevent chill and improve graphite structure.',
      packRu: 'Мешки по 25 кг',
      packEn: '25 kg bags'
    }
  ],
  'shot-blast': [
    {
      id: 'steel-shot-cast',
      titleRu: 'Дробь стальная литая улучшенная',
      titleEn: 'Steel shot cast improved',
      model: 'ДСЛ (0.8 - 1.2 мм)',
      descRu: 'Для высокоэффективной очистки отливок от пригара, окалины и ржавчины в дробеметных камерах.',
      descEn: 'For highly efficient removal of burn-on sand, oxide scale, and rust in shot blasting chambers.',
      packRu: 'ПЭ мешки по 25 кг на паллете',
      packEn: '25 kg bags on pallets'
    },
    {
      id: 'steel-shot-grit',
      titleRu: 'Дробь стальная колотая',
      titleEn: 'Steel grit angular',
      model: 'ДСК (1.0 - 1.6 мм)',
      descRu: 'Обеспечивает высокую шероховатость поверхности для подготовки под покраску и металлизацию.',
      descEn: 'Provides optimal surface roughness for post-treatment painting, coating, and metallization.',
      packRu: 'ПЭ мешки по 25 кг',
      packEn: '25 kg bags'
    },
    {
      id: 'blade-high-mn',
      titleRu: 'Комплект лопаток дробеметного колеса',
      titleEn: 'Shot blast wheel blade kit',
      model: 'КЛ-Q37',
      descRu: 'Запасные быстроизнашиваемые лопатки из высокохромистого чугуна Cr20-Cr26 для высокой стойкости.',
      descEn: 'Replacement wear-resistant blades made of high-chromium cast iron Cr20-Cr26 for extreme lifecycle.',
      packRu: 'Комплект 8 шт.',
      packEn: 'Set of 8 pcs'
    }
  ],
  'xtc-equipment': [
    {
      id: 'furan-resin',
      titleRu: 'Смола фурановая связующая для ХТС',
      titleEn: 'Furan resin binder for no-bake process',
      model: 'FuraBind-120',
      descRu: 'Высококачественное органическое связующее для приготовления ХТС смесей. Обладает малой токсичностью.',
      descEn: 'Premium organic binder for preparing no-bake resin-sand mixes. Features low gas emission and smell.',
      packRu: 'Бочки 220 кг / IBC куб 1000 кг',
      packEn: '220 kg drums / 1000 kg IBC'
    },
    {
      id: 'acid-catalyst',
      titleRu: 'Катализатор кислотный (отвердитель)',
      titleEn: 'Acid catalyst (hardener)',
      model: 'Cat-Active-P',
      descRu: 'Раствор сульфокислот разной концентрации для регулирования времени затвердевания смеси.',
      descEn: 'Sulfonic acid solution of varied activity to adjust and control resin-sand mixture cure time.',
      packRu: 'Канистры 30 кг / IBC куб 1100 кг',
      packEn: '30 kg canisters / 1100 kg IBC'
    },
    {
      id: 'refractory-coating',
      titleRu: 'Противопригарная циркониевая краска',
      titleEn: 'Refractory zirconium alcohol-based coating',
      model: 'ZircoPaint-S',
      descRu: 'Спиртовая циркониевая краска для защиты песчаных форм и стержней от теплового воздействия металла.',
      descEn: 'Alcohol-based high-purity zirconium wash to safeguard moulds and cores against thermal shock.',
      packRu: 'Ведра металлические по 40 кг',
      packEn: '40 kg metallic buckets'
    }
  ],
  'pgs-equipment': [
    {
      id: 'bentonite',
      titleRu: 'Бентонит порошкообразный формовочный',
      titleEn: 'Powdered molding bentonite',
      model: 'Б-ПБ',
      descRu: 'Связующая глина высокой термостойкости для приготовления песчано-глинистых формовочных смесей ПГС.',
      descEn: 'High thermal durability binding clay for preparing classic green sand molding mixtures.',
      packRu: 'МКР по 1000 кг',
      packEn: '1000 kg big bags'
    },
    {
      id: 'coal-dust',
      titleRu: 'Уголь каменный пылевидный формовочный',
      titleEn: 'Powdered coal dust additive',
      model: 'УК-Ф',
      descRu: 'Противопригарная добавка в ПГС смесь для получения гладкой поверхности чугунных отливок.',
      descEn: 'Anti-burnout carbonaceous additive to green sand to ensure smooth surfaces on cast iron parts.',
      packRu: 'Мешки по 40 кг / МКР 800 кг',
      packEn: '40 kg bags / 800 kg big bags'
    },
    {
      id: 'release-agent',
      titleRu: 'Смазка разделительная модельная ПГС',
      titleEn: 'Molding model release agent',
      model: 'Mould-Release-GS',
      descRu: 'Препятствует прилипанию сырой песчано-глинистой смеси к металлическим и деревянным моделям.',
      descEn: 'Prevents damp green sand mixture from adhering to metal and wood patterns/flasks.',
      packRu: 'Канистры по 20 литров',
      packEn: '20L canisters'
    }
  ],
  'core-making': [
    {
      id: 'coldbox-resin-a',
      titleRu: 'Смола Cold-Box-Amine Часть 1',
      titleEn: 'Cold-Box-Amine Resin Part 1',
      model: 'CB-PartA',
      descRu: 'Фенолоформальдегидная основа двухкомпонентной системы связующего для стержневых автоматов.',
      descEn: 'Phenol-formaldehyde component of the two-part binder system for high-speed core shooters.',
      packRu: 'Бочки 220 кг / IBC куб 1000 кг',
      packEn: '220 kg drums / 1000 kg IBC'
    },
    {
      id: 'coldbox-resin-b',
      titleRu: 'Смола Cold-Box-Amine Часть 2',
      titleEn: 'Cold-Box-Amine Resin Part 2',
      model: 'CB-PartB',
      descRu: 'Полиизоцианатный компонент двухкомпонентного связующего холодного отверждения.',
      descEn: 'Polyisocyanate component of the dual cold-setting resin core binder system.',
      packRu: 'Бочки 220 кг / IBC куб 1000 кг',
      packEn: '220 kg drums / 1000 kg IBC'
    },
    {
      id: 'core-vents',
      titleRu: 'Венты латунные сетчатые для стержней',
      titleEn: 'Brass mesh core box air vents',
      model: 'ВЛ-08 (Ø8 мм)',
      descRu: 'Сетчатые венты для отвода воздуха из стержневого ящика в процессе надува песка.',
      descEn: 'Slotted or mesh type vents to evacuate excess air from core boxes during sand blowing.',
      packRu: 'Упаковки по 100 шт.',
      packEn: 'Packages of 100 pcs'
    }
  ],
  'lgm-equipment': [
    {
      id: 'eps-raw-material',
      titleRu: 'Полистирол вспенивающийся суспензионный',
      titleEn: 'Expandable Polystyrene (EPS) beads',
      model: 'EPS-F-0.5',
      descRu: 'Специальное сырье с узким фракционным составом (0.4-0.6 мм) для производства качественных пеномоделей.',
      descEn: 'Special graded raw material with narrow beads size (0.4-0.6 mm) for thin-wall high density lost foam patterns.',
      packRu: 'Мешки по 25 кг с влагозащитой',
      packEn: '25 kg airtight bags'
    },
    {
      id: 'lgm-coating',
      titleRu: 'Покрытие противопригарное для ЛГМ моделей',
      titleEn: 'Lost foam pattern special water coating',
      model: 'LGM-Paint-W',
      descRu: 'Сухая смесь или паста на водной основе с высокой газопроницаемостью для окраски моделей.',
      descEn: 'High-permeability water-based refractory slurry to coat assembled Lost Foam polystyrene block patterns.',
      packRu: 'Мешки по 25 кг / Ведра 40 кг',
      packEn: '25 kg paper bags / 40 kg buckets'
    },
    {
      id: 'block-glue',
      titleRu: 'Клей для сборки и склеивания моделей',
      titleEn: 'Polystyrene blocks hot-melt glue',
      model: 'GlueStick-LGM',
      descRu: 'Низкозольный термоплавкий клей в стержнях, не оставляющий кокса и дефектов при выжигании модели.',
      descEn: 'Low-ash hot melt sticks leaving zero carbon residues or defects during casting vaporisation.',
      packRu: 'Коробка 10 кг',
      packEn: '10 kg box'
    }
  ],
  'lvm-equipment': [
    {
      id: 'model-wax',
      titleRu: 'Модельный состав для ЛВМ (воск)',
      titleEn: 'Investment casting model pattern wax',
      model: 'МВ-Р-3',
      descRu: 'Высокоточный восковый модельный состав с минимальной усадкой и чистой поверхностью выплавления.',
      descEn: 'High dimensional precision pattern wax compound featuring low shrink rate and ultra-clean burnout.',
      packRu: 'Чешуйки в мешках по 20 кг',
      packEn: 'Flakes in 20 kg bags'
    },
    {
      id: 'refractory-flour',
      titleRu: 'Огнеупорная мука (дистен-силлиманит)',
      titleEn: 'Disthene-Sillimanite refractory flour',
      model: 'КДСП',
      descRu: 'Огнеупорная составляющая для приготовления суспензии первого и последующих слоев керамической оболочки.',
      descEn: 'Refractory dusting flour for preparing investment casting ceramic shell slurry coats.',
      packRu: 'МКР по 1000 кг',
      packEn: '1000 kg big bags'
    },
    {
      id: 'colloidal-silica',
      titleRu: 'Золь кремниевой кислоты (связующее)',
      titleEn: 'Colloidal silica binder (Silbond)',
      model: 'Col-Sil-30',
      descRu: 'Стабильный водный раствор нанокремнезема для формирования прочной керамической корки.',
      descEn: 'Stable nano-silicon aqueous binder used to form highly structural investment casting shells.',
      packRu: 'IBC пластиковый куб 1100 кг',
      packEn: '1100 kg plastic IBC'
    }
  ],
  'thermal-furnaces': [
    {
      id: 'fiber-insulation',
      titleRu: 'Огнеупорное муллитокремнеземистое волокно',
      titleEn: 'Mullite-silica refractory wool roll',
      model: 'МКРР-130',
      descRu: 'Теплоизоляционный рулонный материал для футеровки стен и сводов термических печей до 1250 °C.',
      descEn: 'High temperature insulation wool blanket to line furnace walls up to 1250 °C.',
      packRu: 'Рулоны по 15 кг в коробке',
      packEn: '15 kg rolls inside cardboard box'
    },
    {
      id: 'heating-elements',
      titleRu: 'Спиральные нагреватели из супер-фехраля',
      titleEn: 'Super-fechral helical heater elements',
      model: 'Х23Ю5Т (Ø 4-6 мм)',
      descRu: 'Высокотемпературный нагревательный провод в спиралях для электрических печей сопротивления.',
      descEn: 'Alloy resistance heating coils wound from premium fechral wires for electric chamber furnaces.',
      packRu: 'По ТЗ согласно раскладке фаз печи',
      packEn: 'Tailored phase matching wire kits'
    }
  ],
  'finishing-cnc': [
    {
      id: 'hydraulic-oil',
      titleRu: 'Масло гидравлическое всесезонное',
      titleEn: 'All-season premium hydraulic oil',
      model: 'HVLP-46',
      descRu: 'Высокоиндексное гидравлическое масло для стабильной работы обрубных клиньев при давлении до 70 МПа.',
      descEn: 'High-viscosity index mineral fluid for reliable fettling wedge operation at pressures up to 70 MPa.',
      packRu: 'Бочка металл 205 литров',
      packEn: '205L steel drum'
    },
    {
      id: 'wedge-blade',
      titleRu: 'Сменные разжимные щеки для клина',
      titleEn: 'Spare expandable splitting insert cheeks',
      model: 'ЩК-25',
      descRu: 'Запасные твердосплавные щеки из высокоуглеродистой стали для гидроклина ГК-25.',
      descEn: 'Highly tempered spare wedge splitting cheeks matching standard GK-25 fettling units.',
      packRu: 'Комплект из 2 шт.',
      packEn: 'Set of 2 pcs'
    }
  ]
};

const GENERAL_MATERIALS: MaterialItem[] = [
  {
    id: 'casting-gloves',
    titleRu: 'Краги литейщика кожаные термостойкие',
    titleEn: 'Heavy duty leather heat resistant casting gloves',
    model: 'Краги-Литейщик-350',
    descRu: 'Удлиненные спилковые перчатки с подкладкой из кевлара для защиты рук от брызг металла и искр до 500 °C.',
    descEn: 'Extended leather split-cowhide gloves with Kevlar inner weave to protect against metal spatters up to 500 °C.',
    packRu: 'Пара перчаток',
    packEn: '1 pair pack'
  },
  {
    id: 'high-temp-suit',
    titleRu: 'Костюм литейщика металлизированный суконный',
    titleEn: 'Aluminised heat reflective foundry protection suit',
    model: 'Костюм-AL-1000',
    descRu: 'Профессиональный защитный костюм с металлизированным алюминизированным слоем для работы вблизи плавильных печей.',
    descEn: 'Aluminised glass-fibre coat and pants reflecting up to 95% of radiant hot melt wave heats.',
    packRu: 'Комплект (куртка, полукомбинезон)',
    packEn: 'Set of jacket and trousers'
  },
  {
    id: 'ceramic-filter',
    titleRu: 'Фильтры пенокерамические литейные',
    titleEn: 'Foundry foam ceramic molten metal filters',
    model: 'ФПК-10 (10 ppi)',
    descRu: 'Пенокерамические фильтры для тонкой фильтрации чугуна, стали и цветных металлов от неметаллических включений.',
    descEn: 'Foam ceramic high temp structures to filter out non-metallic sand and slag impurities from liquid alloys.',
    packRu: 'Коробка 50 шт.',
    packEn: 'Cardboard box of 50 pcs'
  }
];

const SUBCATEGORY_MAPPINGS: Record<string, string[]> = {};
// (Вариант Б: subcategory в данных = subcategory-id, фильтрация идёт по прямому совпадению в matchSubcategory)

interface ProductCatalogProps {
  onAddToRFQ: (product: Product) => void;
  selectedCategory?: string;
  rfqItemsKeys: string[];
  lang: 'ru' | 'en';
}

export default function ProductCatalog({ onAddToRFQ, selectedCategory, rfqItemsKeys, lang }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string | 'all'>('all');
  const [activeSubsubcategory, setActiveSubsubcategory] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProductSpecs, setExpandedProductSpecs] = useState<Record<string, boolean>>({});
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  // Photo Gallery State
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  

  
  const catalogListSectionRef = useRef<HTMLDivElement>(null);

  const SUBCATEGORIES_MAP: Record<string, { id: string; nameRu: string; nameEn: string; descRu: string; descEn: string }[]> = {
    'xtc-equipment': [
      { id: 'mixers', nameRu: 'Смесители ХТС', nameEn: 'No-Bake Mixers', descRu: 'Смесители ХТС серии СХ непрерывного действия', descEn: 'Continuous mixers CX series' },
      { id: 'reclamation', nameRu: 'Регенерация песка ХТС', nameEn: 'Resin Sand Reclamation', descRu: 'Установки и линии механической регенерации РП', descEn: 'Reclamation lines RP series' },
      { id: 'compaction', nameRu: 'Вибростолы и формовка', nameEn: 'Compaction & Molding', descRu: 'Уплотнительные линии и вибростолы ВСФ', descEn: 'Compaction tables VSF series' },
    ],
    'furnaces': [
      { id: 'induction', nameRu: 'Индукционные плавильные печи', nameEn: 'Induction Melting Furnaces', descRu: 'Электропечи GW-A и GW-S для чугуна, стали и цветных металлов', descEn: 'Coreless induction furnaces GW-A & GW-S' },
      { id: 'special-furnaces', nameRu: 'Специальные плавильные печи', nameEn: 'Special Melting Furnaces', descRu: 'Вакуумные, дуговые и малогабаритные тигельные печи сопротивления', descEn: 'Vacuum, arc and small crucible furnaces' },
      { id: 'mixers-furnaces', nameRu: 'Литейные миксеры', nameEn: 'Foundry Mixers', descRu: 'Индукционные миксеры выравнивания температуры', descEn: 'Induction holding and mixing furnaces' },
      { id: 'ladles', nameRu: 'Литейные ковши', nameEn: 'Pouring Ladles', descRu: 'Чайниковые, барабанные и стопорные заливочные ковши КЛ/КБ', descEn: 'Teapot and drum pouring ladles' },
      { id: 'auxiliary', nameRu: 'Вспомогательное оборудование', nameEn: 'Auxiliary Equipment', descRu: 'Стенды разогрева ковшей и вспомогательные системы плавки', descEn: 'Ladle preheaters and dosing systems' },
    ],
    'pgs-equipment': [
      { id: 'mixers', nameRu: 'Смесеприготовление', nameEn: 'Green Sand Preparation', descRu: 'Интенсивные вертикально-роторные смесители серии СТ', descEn: 'Intensive vertical rotor pan mixers ST series' },
      { id: 'molding-lines', nameRu: 'Формовочные комплексы', nameEn: 'Molding Complexes', descRu: 'Безопочные формовочные линии высокого давления АФЛ', descEn: 'Flaskless green sand molding lines AFL series' },
      { id: 'molding-machines', nameRu: 'Формовочные машины', nameEn: 'Molding Machines', descRu: 'Встряхивающие формовочные машины с допрессовкой ФМ', descEn: 'Jolt squeeze molding machines FM series' },
      { id: 'green-coolers', nameRu: 'Обработка отработанной смеси', nameEn: 'Spent Sand Treatment', descRu: 'Установки охлаждения кипящего слоя песка ОС и вибросита', descEn: 'Spent sand coolers and vibrating screeners' },
    ],
    'core-making': [
      { id: 'shooters', nameRu: 'Стержневое производство', nameEn: 'Core Making Equipment', descRu: 'Пескострельные полуавтоматы СА и газогенераторы', descEn: 'Amine gas shooters SA series and catalysts' },
    ],
    'shot-blast': [
      { id: 'shot-blast-machines', nameRu: 'Дробемётное оборудование', nameEn: 'Shot Blasting Machinery', descRu: 'Дробемёты: барабанного, подвесного и проходного типов', descEn: 'Tumble rubber, tumble steel, overhead hook blasters' },
      { id: 'sandblast-cabinets', nameRu: 'Пескоструйное оборудование', nameEn: 'Sandblasting Equipment', descRu: 'Пескоструйные камеры с поворотным столом и эжекторы', descEn: 'Sandblast cabinets and portable chambers' }
    ],
    'special-casting': [
      { id: 'molders', nameRu: 'Специальные литейные машины', nameEn: 'Special Casting Machinery', descRu: 'Кокильные станки КМ-Г/КМ-В и центробежные машины ЦЛ', descEn: 'Hydraulic die molding and centrifugal casters' }
    ],
    'cooling-systems': [
      { id: 'cooling-towers', nameRu: 'Станции охлаждения закрытого типа', nameEn: 'Cooling Towers', descRu: 'Закрытые кулеры и испарительные градирни серии ГЗ', descEn: 'Closed evaporative water cooling towers GZ' }
    ],
    'lgm-equipment': [
      { id: 'white-shop', nameRu: 'Белый цех', nameEn: 'White Shop', descRu: 'Оборудование для изготовления пенополистирольных моделей: предвспениватели, модельные автоматы, автоклавы, краскомешалки', descEn: 'Equipment for polystyrene model production: pre-expanders, model molders, autoclaves, paint mixers' },
      { id: 'black-shop', nameRu: 'Чёрный цех', nameEn: 'Black Shop', descRu: 'Оборудование для формовки и заливки: вакуумные опоки, вибростолы, вакуумные системы, пескооборот', descEn: 'Equipment for molding and pouring: vacuum mold boxes, vibrating tables, vacuum systems, sand circulation' },
    ],
    'lvm-equipment': [
      { id: 'boilers', nameRu: 'Оборудование ЛВМ', nameEn: 'Investment Casting (LVM)', descRu: 'Бойлерклавы БК, шприц-машины и роботы нанесения керамики', descEn: 'Steam dewaxing autocontrol and wax injectors' }
    ],
    'thermal-furnaces': [
      { id: 'treatment-chambers', nameRu: 'Термическая обработка', nameEn: 'Heat Treatment', descRu: 'Камерные печи с выдвижным подом СДО', descEn: 'Car-bottom heat treatment series' }
    ],
    'finishing-cnc': [
      { id: 'fettling-tools', nameRu: 'Обрубной инструмент и обработка', nameEn: 'Fettling & Finishing (CNC)', descRu: 'Гидроклинья ГК удаления литников и обрабатывающие ЧПУ центры', descEn: 'Hydraulic fettling lifters GK and CNC centers' }
    ],
    'foundry-materials': [
      { id: 'refractory-materials', nameRu: 'Футеровочные материалы', nameEn: 'Refractory Materials', descRu: 'Кварцит, магнезит, циркон и прочие материалы для футеровки плавильных агрегатов', descEn: 'Quartzite, magnesite, zircon and other lining materials' }
    ],
    'spare-parts': [
      { id: 'spare-parts-list', nameRu: 'Запасные части', nameEn: 'Spare Parts', descRu: 'Запасные части и комплектующие для литейного оборудования', descEn: 'Spare parts and components for foundry equipment' }
    ],
    'tooling': [
      { id: 'tooling-list', nameRu: 'Оснастка и пресс-формы', nameEn: 'Tooling & Molds', descRu: 'Пресс-формы, опоки и оснастка для литья', descEn: 'Molds, flasks and casting tooling' }
    ],
    'hpdc': [
      { id: 'hpdc-machines', nameRu: 'Машины литья под давлением', nameEn: 'HPDC Machines', descRu: 'Машины литья под высоким и низким давлением', descEn: 'High and low pressure die casting machines' }
    ]
  };

  // Automatically reset sub-subcategory selection when active category or subcategory updates
  useEffect(() => {
    setActiveSubsubcategory('all');
  }, [activeCategory, activeSubcategory]);

  // Reset selected product when category or subcategory changes manually
  useEffect(() => {
    setSelectedProductId(null);
  }, [activeCategory, activeSubcategory]);

  // Reset gallery when active product changes
  useEffect(() => {
    setGalleryIndex(0);
    setIsLightboxOpen(false);
  }, [selectedProductId]);

  // Compute subcategories for the active category
  const subcategories = useMemo(() => {
    return activeCategory !== 'all' ? SUBCATEGORIES_MAP[activeCategory] || [] : [];
  }, [activeCategory]);

  // Compute sub-subcategories available dynamically from physical products data for active choice
  const availableSubsubcategories = useMemo(() => {
    if (activeCategory === 'all' || activeSubcategory === 'all') return [];
    
    const items = PRODUCTS.filter(
      (p) => p.category === activeCategory && matchSubcategory(p.subcategory, activeSubcategory)
    );
    
    const seen = new Set<string>();
    const list: { id: string; nameRu: string; nameEn: string }[] = [];
    
    items.forEach((p) => {
      if (p.subsubcategory && !seen.has(p.subsubcategory)) {
        seen.add(p.subsubcategory);
        list.push({
          id: p.subsubcategory,
          nameRu: p.subsubcategoryRu || p.subsubcategory,
          nameEn: p.subsubcategoryEn || p.subsubcategory
        });
      }
    });
    
    return list;
  }, [activeCategory, activeSubcategory]);

  // Compute photo gallery images depending on the selected product
  const galleryImages = useMemo(() => {
    if (!selectedProductId) return [];
    const p = PRODUCTS.find(prod => prod.id === selectedProductId);
    if (!p) return [];
    
    // Если есть galleryImages в продукте, используем их
    if (p.galleryImages && p.galleryImages.length > 0) {
      const list = [p.imageUrl];
      p.galleryImages.forEach(img => {
        const imgPath = img.path.startsWith('/') ? img.path : '/' + img.path;
        if (!list.includes(imgPath)) {
          list.push(imgPath);
        }
      });
      return list;
    }
    
    const list = [p.imageUrl];
    const fallbackImagesByCat: Record<string, string[]> = {
      'xtc-equipment': [
        sandMixerXTC,
        sandMixerXTC,
        sandMixerXTC
      ],
      'furnaces': [
        inductionFurnaceImg,
        inductionFurnaceImg,
        inductionFurnaceImg
      ],
      'pgs-equipment': [
        sandMixerXTC,
        sandMixerXTC,
        sandMixerXTC
      ],
      'core-making': [
        sandMixerXTC,
        sandMixerXTC,
        sandMixerXTC
      ],
      'shot-blast': [
        shotBlasterImg,
        shotBlasterImg,
        shotBlasterImg
      ],
      'special-casting': [
        inductionFurnaceImg,
        inductionFurnaceImg,
        inductionFurnaceImg
      ],
      'cooling-systems': [
        inductionFurnaceImg,
        inductionFurnaceImg,
        inductionFurnaceImg
      ],
      'lgm-equipment': [
        sandMixerXTC,
        inductionFurnaceImg,
        shotBlasterImg
      ],
      'lvm-equipment': [
        inductionFurnaceImg,
        sandMixerXTC
      ],
      'thermal-furnaces': [
        inductionFurnaceImg,
        shotBlasterImg
      ],
      'finishing-cnc': [
        sandMixerXTC,
        shotBlasterImg
      ]
    };
    
    const catExtras = fallbackImagesByCat[p.category] || [];
    catExtras.forEach(img => {
      if (!list.includes(img) && list.length < 4) {
        list.push(img);
      }
    });
    return list;
  }, [selectedProductId]);

  // Handle keyboard listener for Lightbox navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen || galleryImages.length === 0) return;
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
      } else if (e.key === 'ArrowLeft') {
        setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, galleryImages]);

  // Sync selectedCategory from parent component and handle custom event triggers
  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory as ProductCategory | 'all');
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleSync = () => {
      const q = (window as any)._pendingCatalogQuery || '';
      setSearchQuery(q);
      const sub = (window as any)._pendingCatalogSubId || 'all';
      setActiveSubcategory(sub);
      if (selectedCategory) {
        setActiveCategory(selectedCategory as ProductCategory | 'all');
      }
      const prodId = (window as any)._pendingProductId || '';
      if (prodId) {
        setSelectedProductId(prodId);
        // Clear to avoid double trigger
        (window as any)._pendingProductId = '';
      } else {
        setSelectedProductId(null);
      }
    };
    window.addEventListener('catalog-query-sync', handleSync);
    
    // Initial check on mount
    if ((window as any)._pendingCatalogQuery !== undefined) {
      setSearchQuery((window as any)._pendingCatalogQuery);
    }
    if ((window as any)._pendingCatalogSubId !== undefined) {
      setActiveSubcategory((window as any)._pendingCatalogSubId);
    }
    if ((window as any)._pendingProductId) {
      setSelectedProductId((window as any)._pendingProductId);
      (window as any)._pendingProductId = '';
    }
    
    return () => {
      window.removeEventListener('catalog-query-sync', handleSync);
    };
  }, [selectedCategory]);

  const t = TRANSLATIONS[lang];

  const categories: { id: ProductCategory | 'all'; label: string; descRu: string; descEn: string }[] = [
    { id: 'all', label: t.catAll, descRu: 'Общий обзор всех производственных направлений', descEn: 'Overview of all foundry supply lines' },
    { id: 'furnaces', label: t.catFurnaces, descRu: 'Индукционные тигельные печи высокой мощности и ковши', descEn: 'High capacity coreless induction systems & pouring bails' },
    { id: 'cooling-systems', label: t.catCooling, descRu: 'Закрытые герметичные градирни испарительного класса', descEn: 'Closed loop clean copper evaporative cool towers' },
    { id: 'shot-blast', label: t.catShotBlast, descRu: 'Установки подвесного, барабанного и рольгангового типов', descEn: 'Hanger, rubber tumble belt and conveyor blast systems' },
    { id: 'sandblast', label: lang === 'en' ? 'Sandblasting Rooms' : 'Пескоструйные камеры', descRu: 'Обитаемые камеры пескоструйной обработки и абразивоструйные аппараты', descEn: 'Sandblasting rooms, cabinets, and abrasive blasters' },
    { id: 'xtc-equipment', label: t.catXtc, descRu: 'Смесители непрерывного действия, регенерация и вибростолы', descEn: 'Continuous mixers, dry reclamation and compaction' },
    { id: 'pgs-equipment', label: t.catGreenSand, descRu: 'Вертикально-роторные смесители песка, охладители оборотной смеси ПГС', descEn: 'Vertical rotor sand mixers, spent sand fluid bed coolers' },
    { id: 'core-making', label: t.catCoreMaking, descRu: 'Пескострельные стержневые полуавтоматы по Cold-Box-Amine процессу', descEn: 'Pneumatic core blowing shooters based on Cold-Box-Amine technology' },
    { id: 'lgm-equipment', label: t.catLgm, descRu: 'Производство отливок методом литья по газифицируемым моделям (ЛГМ)', descEn: 'Lost Foam Casting lines and expandable polystyrene processing machinery' },
    { id: 'lvm-equipment', label: t.catLvm, descRu: 'Литье по выплавляемым моделям (ЛВМ) и бойлерклавы высокой точности', descEn: 'Investment casting and high precision automated steam dewaxing' },
    { id: 'special-casting', label: t.catCasting, descRu: 'Полуавтоматы кокильного литья и центробежная формовка', descEn: 'Tilting gravity die systems and centrifugal molding' },
    { id: 'thermal-furnaces', label: t.catThermal, descRu: 'Промышленные термические печи с выдвижным подом, шахтные печи СШЗ', descEn: 'Industrial car-bottom and shaft furnaces for heat treatment' },
    { id: 'finishing-cnc', label: t.catObrubka, descRu: 'Гидравлические литейные клинья для отделения литниковых систем', descEn: 'Hydraulic fettling and riser splitting machinery' },
    { id: 'tooling', label: 'Оснастка', descRu: 'Пресс-формы, оснастка для центробежного литья, жеребейки', descEn: 'Molds, centrifugal tooling, chills' },
    { id: 'foundry-materials', label: 'Литейные материалы', descRu: 'Футеровочные массы и обмазки для индукционных печей', descEn: 'Refractory masses and coatings for induction furnaces' },
  ];

  const breadcrumbItems = useMemo(() => {
    const isEn = lang === 'en';
    const items: { label: string; active: boolean; onClick?: () => void }[] = [];

    // Level 0: Главная
    items.push({
      label: isEn ? 'Home' : 'Главная',
      active: activeCategory === 'all' && activeSubcategory === 'all' && activeSubsubcategory === 'all' && !selectedProductId,
      onClick: () => {
        setActiveCategory('all');
        setActiveSubcategory('all');
        setActiveSubsubcategory('all');
        setSelectedProductId(null);
        setSearchQuery('');
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    });

    // Level 1: Каталог оборудования
    items.push({
      label: isEn ? 'Equipment Catalog' : 'Каталог оборудования',
      active: activeCategory === 'all' && activeSubcategory === 'all' && activeSubsubcategory === 'all' && !selectedProductId,
      onClick: () => {
        setActiveCategory('all');
        setActiveSubcategory('all');
        setActiveSubsubcategory('all');
        setSelectedProductId(null);
        setSearchQuery('');
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    });

    // Level 2: Category
    if (activeCategory !== 'all') {
      const catObj = categories.find(c => c.id === activeCategory);
      let catLabel = '';
      if (activeCategory === 'furnaces') {
        catLabel = isEn ? 'Melting Furnaces' : 'Плавильные печи';
      } else {
        catLabel = catObj ? catObj.label : activeCategory;
      }

      items.push({
        label: catLabel,
        active: activeSubcategory === 'all' && !selectedProductId,
        onClick: () => {
          setActiveSubcategory('all');
          setActiveSubsubcategory('all');
          setSelectedProductId(null);
          setSearchQuery('');
        }
      });
    }

    // Level 3: Subcategory
    if (activeCategory !== 'all' && activeSubcategory !== 'all') {
      let subLabel = '';
      if (activeCategory === 'furnaces' && activeSubcategory === 'induction') {
        subLabel = isEn 
          ? 'Induction melting furnaces for ferrous & non-ferrous alloys' 
          : 'Индукционные плавильные печи для плавки черных и цветных металлов';
      } else {
        const subList = SUBCATEGORIES_MAP[activeCategory] || [];
        const subObj = subList.find(s => s.id === activeSubcategory);
        subLabel = subObj ? (isEn ? subObj.nameEn : subObj.nameRu) : activeSubcategory;
      }

      items.push({
        label: subLabel,
        active: activeSubsubcategory === 'all' && !selectedProductId,
        onClick: () => {
          setActiveSubsubcategory('all');
          setSelectedProductId(null);
          setSearchQuery('');
        }
      });
    }

    // Level 4: Sub-subcategory
    if (activeCategory !== 'all' && activeSubcategory !== 'all' && activeSubsubcategory !== 'all') {
      let subsubLabel = '';
      if (activeCategory === 'furnaces' && activeSubcategory === 'induction' && activeSubsubcategory === 'aluminum-frame') {
        subsubLabel = isEn 
          ? 'Melting furnaces in aluminum casing on gear' 
          : 'Плавильные печи в алюминиевом корпусе на редукторе';
      } else if (activeCategory === 'furnaces' && activeSubcategory === 'induction' && activeSubsubcategory === 'steel-frame') {
        subsubLabel = isEn 
          ? 'Melting furnaces in strong steel shell frame on hydraulics' 
          : 'Плавильные печи в стальном каркасе на гидравлике';
      } else {
        const p = PRODUCTS.find(
          (prod) => prod.category === activeCategory && 
                    matchSubcategory(prod.subcategory, activeSubcategory) && 
                    prod.subsubcategory === activeSubsubcategory
        );
        if (p) {
          subsubLabel = isEn ? p.subsubcategoryEn || activeSubsubcategory : p.subsubcategoryRu || activeSubsubcategory;
        } else {
          subsubLabel = activeSubsubcategory;
        }
      }

      items.push({
        label: subsubLabel,
        active: !selectedProductId,
        onClick: () => {
          setSelectedProductId(null);
          setSearchQuery('');
        }
      });
    }

    // Level 5: Product Model (Selected Product)
    if (selectedProductId) {
      const p = PRODUCTS.find((prod) => prod.id === selectedProductId);
      if (p) {
        items.push({
          label: isEn ? `Model ${p.model}` : `Модель ${p.model}`,
          active: true
        });
      }
    }

    return items;
  }, [lang, activeCategory, activeSubcategory, activeSubsubcategory, selectedProductId, categories]);

  // Information details corresponding exactly to https://www.sltgroup.ru/catalog/ divisions
  const sltDivisions = [
    {
      id: 'xtc-equipment' as ProductCategory,
      titleRu: 'Оборудование для формовки ХТС',
      titleEn: 'No-Bake Molding & Sand Processing',
      descRu: 'Автоматические лопастные смесители непрерывного действия СХ и высокоэффективные линии регенерации песка РП. Снижают закупку свежего песка до 90%.',
      descEn: 'Automatic continuous sand mixers CX and high performance dry mechanical sand reclamation RP. Minimize costs of raw silica sand by up to 90%.',
      icon: Layers,
      color: 'border-orange-500/20 hover:border-orange-500',
      tagRu: 'ХТС ФОРМОВКА',
      tagEn: 'NO-BAKE MOLDING',
      statsRu: 'Производительность: 3 — 30 т/ч',
      statsEn: 'Throughput capacity: 3 — 30 t/h',
      subcategoriesRu: [
        { label: 'Смесители ХТС серии СХ', query: 'СХ', subId: 'mixers' },
        { label: 'Линии регенерации РП-8', query: 'РП', subId: 'reclamation' },
        { label: 'Вибростолы ВСФ-12', query: 'ВСФ', subId: 'compaction' }
      ],
      subcategoriesEn: [
        { label: 'CX Series continuous mixers', query: 'CX', subId: 'mixers' },
        { label: 'RP No-bake reclamation', query: 'RP', subId: 'reclamation' },
        { label: 'VSF Compaction tables', query: 'VSF', subId: 'compaction' }
      ]
    },
    {
      id: 'furnaces' as ProductCategory,
      titleRu: 'Индукционные плавильные комплексы',
      titleEn: 'Induction Melting & Pouring Complexes',
      descRu: 'Сверхмощные тигельные индукционные электропечи со стальным каркасом для литейного чугуна, углеродистой стали и бронзы.',
      descEn: 'High capacity coreless induction melting furnaces equipped with robust steel structures and thyristor converters.',
      icon: Flame,
      color: 'border-[#e65410]/20 hover:border-[#e65410]',
      tagRu: 'ПЛАВКА МЕТАЛЛА',
      tagEn: 'MELTING METALLURGY',
      statsRu: 'Емкость тигля: 0.25 — 5 тонн',
      statsEn: 'Crucible size: 0.25 — 5 tons',
      subcategoriesRu: [
        { label: 'Тигельные печи GW', query: 'GW', subId: 'induction' },
        { label: 'Ковши чайниковые/барабанные КЛ/КБ', query: 'К', subId: 'ladles' }
      ],
      subcategoriesEn: [
        { label: 'Crucible furnaces GW', query: 'GW', subId: 'induction' },
        { label: 'Teapot / Drum ladles KL/KB', query: 'K', subId: 'ladles' }
      ]
    },
    {
      id: 'pgs-equipment' as ProductCategory,
      titleRu: 'Оборудование ПГС',
      titleEn: 'Green Sand Equipment',
      descRu: 'Интенсивные вертикально-роторные чашечные смесители СТ, автоматические безопочные формовочные линии АФЛ, машины ФМ и сита ВС.',
      descEn: 'High efficiency intensive pan mixers ST, automated flaskless molding lines AFL, jolt squeeze machines FM, spent sand coolers OS and screeners VS.',
      icon: Sliders,
      color: 'border-emerald-500/20 hover:border-emerald-500',
      tagRu: 'ПГС СМЕСЕПРИГОТОВЛЕНИЕ',
      tagEn: 'GREEN SAND PREPARATION',
      statsRu: 'Производительность: до 30 т/ч',
      statsEn: 'Mix output limits: 30 t/h',
      subcategoriesRu: [
        { label: 'Интенсивные смесители СТ-1500', query: 'СТ', subId: 'mixers' },
        { label: 'Автоматические линии АФЛ-6080', query: 'АФЛ', subId: 'molding-lines' },
        { label: 'Формовочные машины ФМ-20', query: 'ФМ', subId: 'molding-machines' },
        { label: 'Охладители ОС и Вибросита ВС', query: 'ОС', subId: 'green-coolers' }
      ],
      subcategoriesEn: [
        { label: 'Intensive pan mixers ST', query: 'ST', subId: 'mixers' },
        { label: 'Automated molding lines AFL', query: 'AFL', subId: 'molding-lines' },
        { label: 'Molding machines FM', query: 'FM', subId: 'molding-machines' },
        { label: 'Fluid bed spend coolers OS & screens VS', query: 'OS', subId: 'green-coolers' }
      ]
    },
    {
      id: 'core-making' as ProductCategory,
      titleRu: 'Стержневое оборудование',
      titleEn: 'Core Blowing & Shooter Machinery',
      descRu: 'Автоматические пескострельные заливочные машины СА по технологии Cold-Box-Amine для прецизионных заготовок стержней.',
      descEn: 'High speed automated sand core blowing shooter machines CA with gaseous amine curing cabinets designed for bulk setups.',
      icon: Compass,
      color: 'border-purple-500/20 hover:border-purple-500',
      tagRu: 'СТЕРЖНЕВОЕ ПРОИЗВОДСТВО',
      tagEn: 'SAND CORE SHOOTING',
      statsRu: 'Объемы стержня: до 80 литров',
      statsEn: 'Core box volumes: up to 80L',
      subcategoriesRu: [
        { label: 'Пескострельные автоматы СА-400', query: 'СА', subId: 'shooters' }
      ],
      subcategoriesEn: [
        { label: 'Amine shooters SA-400', query: 'SA', subId: 'shooters' }
      ]
    },
    {
      id: 'shot-blast' as ProductCategory,
      titleRu: 'Дробеметное оборудование очистки',
      titleEn: 'Shot Blasting & Decoring Cabinets',
      descRu: 'Промышленные дробеметные установки очистки отливок барабанного, подвесного, столового и рольгангового типов.',
      descEn: 'Industrial shot blasting systems and decoring cabinets of tumble, hanger, rotary table and conveyor types designed for heavy cast parts.',
      icon: HardHat,
      color: 'border-yellow-500/20 hover:border-yellow-500',
      tagRu: 'ДРОБЕМЕТНАЯ ОЧИСТКА',
      tagEn: 'SHOT BLASTING',
      statsRu: 'Производительность: до 15 т/ч',
      statsEn: 'Blast throughput: up to 15 t/h',
      subcategoriesRu: [
        { label: 'Дробеметы Q32 / Q31 / Q37 / Q35 / Q69', query: 'Q', subId: 'shot-blast-machines' }
      ],
      subcategoriesEn: [
        { label: 'Blasters Q32 / Q31 / Q37 / Q35 / Q69', query: 'Q', subId: 'shot-blast-machines' }
      ]
    },
    {
      id: 'special-casting' as ProductCategory,
      titleRu: 'Литейные машины формовки',
      titleEn: 'Casting & Die Molding Machinery',
      descRu: 'Высокоточные гидравлические кокильные станки КМ-Г/КМ-В и центробежные литейные установки ЦЛ для отливок со сложной геометрией.',
      descEn: 'Precision hydraulic gravity die casting machines KM-G/KM-V and centrifugal casting machines CL for defect-free complex geometry parts.',
      icon: ShieldAlert,
      color: 'border-blue-500/20 hover:border-blue-500',
      tagRu: 'ЛИТЕЙНЫЕ СТАНКИ',
      tagEn: 'GRAVITY CASTING & CENTRIFUGAL',
      statsRu: 'Масса отливки: до 500 кг',
      statsEn: 'Max cast weight: up to 500 kg',
      subcategoriesRu: [
        { label: 'Кокильные станки КМ-Г / КМ-В', query: 'КМ', subId: 'molders' },
        { label: 'Центробежные машины ЦЛ', query: 'ЦЛ', subId: 'molders' }
      ],
      subcategoriesEn: [
        { label: 'Gravity molders KM-G / KM-V', query: 'KM', subId: 'molders' },
        { label: 'Centrifugal stations CL', query: 'CL', subId: 'molders' }
      ]
    },
    {
      id: 'cooling-systems' as ProductCategory,
      titleRu: 'Промышленные градирни и охлаждение',
      titleEn: 'Industrial Cooling & Environment',
      descRu: 'Замкнутые испарительные градирни ГЗ с чистым водоблоком для стабильной плавки индукционных комплексов.',
      descEn: 'Closed evaporative water cooling towers GZ with high density clean loops for induction power stability.',
      icon: Wind,
      color: 'border-teal-500/20 hover:border-teal-500',
      tagRu: 'ОХЛАЖДЕНИЕ ЦЕХА',
      tagEn: 'INDUSTRIAL COOLING',
      statsRu: 'Расход воды: до 150 м³/ч',
      statsEn: 'Water flow: up to 150 m³/h',
      subcategoriesRu: [
        { label: 'Градирни закрытые ГЗ', query: 'ГЗ', subId: 'cooling-towers' }
      ],
      subcategoriesEn: [
        { label: 'Cooling towers GZ', query: 'GZ', subId: 'cooling-towers' }
      ]
    },
    {
      id: 'lgm-equipment' as ProductCategory,
      titleRu: 'Оборудование ЛГМ (Литье по газифицируемым моделям)',
      titleEn: 'Lost Foam Casting Equipment (LGM)',
      descRu: 'Предвспениватели циклического действия, автоматические формовочные прессы для пенополистирола ФА.',
      descEn: 'EPS batch pre-expanders, pattern shape sintering press machinery, and complete modular lost foam setups.',
      icon: Cpu,
      color: 'border-[#10b981]/20 hover:border-[#10b981]',
      tagRu: 'ЛИНИИ ЛГМ',
      tagEn: 'LOST FOAM CASTING',
      statsRu: 'Производство: до 120 кг/ч',
      statsEn: 'Throughput limit: 120 kg/h',
      subcategoriesRu: [
        { label: 'Предвспениватели ПВ-1200', query: 'ПВ', subId: 'pre-expanders' },
        { label: 'Модельные автоматы ФА-1080', query: 'ФА', subId: 'model-molders' }
      ],
      subcategoriesEn: [
        { label: 'Batch pre-expanders PV', query: 'PV', subId: 'pre-expanders' },
        { label: 'Pattern molders FA', query: 'FA', subId: 'model-molders' }
      ]
    },
    {
      id: 'lvm-equipment' as ProductCategory,
      titleRu: 'Оборудование ЛВМ (Литье по выплавляемым моделям)',
      titleEn: 'Investment Casting Equipment (LVM)',
      descRu: 'Высокоавтоматизированные бойлерклавы БК для безопасного и сверхбыстрого удаления воска паром высокого давления.',
      descEn: 'Digital hot steam dewaxing boilerclaves BK delivering crack-free removal in custom investment casting lines.',
      icon: Settings,
      color: 'border-cyan-500/20 hover:border-cyan-500',
      tagRu: 'ЛВМ КЕРАМИКА',
      tagEn: 'INVESTMENT CASTING',
      statsRu: 'БК Давление: до 0.8 МПа',
      statsEn: 'Autoclave press: up to 0.8 MPa',
      subcategoriesRu: [
        { label: 'Бойлерклавы БК-900', query: 'БК', subId: 'boilers' }
      ],
      subcategoriesEn: [
        { label: 'Boilerclaves BK-900', query: 'BK', subId: 'boilers' }
      ]
    },
    {
      id: 'thermal-furnaces' as ProductCategory,
      titleRu: 'Промышленные термические печи',
      titleEn: 'Heat Treatment Furnaces',
      descRu: 'Энергосберегающие камерные печи с выдвижным подом СДО для старения, цементации, закалки литейных заготовок.',
      descEn: 'Car-bottom and vertical shaft heat treatment kilns providing precision multi-zone thermocontrol.',
      icon: Zap,
      color: 'border-yellow-500/20 hover:border-yellow-500',
      tagRu: 'ТЕРМООБРАБОТКА',
      tagEn: 'HEAT TREATMENT',
      statsRu: 'Загрузка: до 15 тонн деталей',
      statsEn: 'Batch weight: up to 15 tons',
      subcategoriesRu: [
        { label: 'Печи с выдвижным подом СДО', query: 'СДО', subId: 'treatment-chambers' }
      ],
      subcategoriesEn: [
        { label: 'Car-bottom furnaces SDO', query: 'SDO', subId: 'treatment-chambers' }
      ]
    },
    {
      id: 'finishing-cnc' as ProductCategory,
      titleRu: 'Обрубной инструмент и обработка',
      titleEn: 'Fettling & Finishing Equipment',
      descRu: 'Профессиональные гидравлические клинья ГК для бесшумного мгновенного отделения литников от заготовок.',
      descEn: 'High capacity hydraulic fettling wedges GK for silent and risk-free separation of metal gating channels.',
      icon: Activity,
      color: 'border-red-500/20 hover:border-red-500',
      tagRu: 'ОБРУБКА ЛИТНИКОВ',
      tagEn: 'FETTLING & SEPARATION',
      statsRu: 'Усилие клина: 25 тонн',
      statsEn: 'Splitting force: 25 tons',
      subcategoriesRu: [
        { label: 'Гидроклинья ГК-25', query: 'ГК', subId: 'fettling-tools' }
      ],
      subcategoriesEn: [
        { label: 'Hydraulic wedges GK-25', query: 'GK', subId: 'fettling-tools' }
      ]
    },
    {
      id: 'tooling' as ProductCategory,
      titleRu: 'Оснастка и пресс-формы',
      titleEn: 'Tooling & Molds',
      descRu: 'Пресс-формы ЛГМ и ЛПД, оснастка для центробежного литья, жеребейки, опочная оснастка и стержневые ящики.',
      descEn: 'LGM & HPDC molds, centrifugal casting tooling, chills, flask tooling and core boxes.',
      icon: Compass,
      color: 'border-indigo-500/20 hover:border-indigo-500',
      tagRu: 'ОСНАСТКА',
      tagEn: 'TOOLING & MOLDS',
      statsRu: '6 типов оснастки',
      statsEn: '6 tooling types',
      subcategoriesRu: [
        { label: 'Пресс-формы ЛГМ', query: 'ПФ-ЛГМ', subId: 'tooling-list' },
        { label: 'Пресс-формы ЛПД', query: 'ПФ-ЛПД', subId: 'tooling-list' },
        { label: 'Оснастка центробежного литья', query: 'ОЦЛ', subId: 'tooling-list' },
        { label: 'Жеребейки', query: 'ЖР', subId: 'tooling-list' }
      ],
      subcategoriesEn: [
        { label: 'LGM molds', query: 'PF-LGM', subId: 'tooling-list' },
        { label: 'HPDC molds', query: 'PF-LPD', subId: 'tooling-list' },
        { label: 'Centrifugal tooling', query: 'OCL', subId: 'tooling-list' },
        { label: 'Chills', query: 'JR', subId: 'tooling-list' }
      ]
    },
    {
      id: 'foundry-materials' as ProductCategory,
      titleRu: 'Литейные материалы',
      titleEn: 'Foundry Materials',
      descRu: 'Футеровочные набивные массы для индукционных печей (кислые, нейтральные, основные), обмазки индуктора и огнеупорный цемент.',
      descEn: 'Refractory dry ramming masses for induction furnaces (acid, neutral, basic), inductor coatings and refractory cement.',
      icon: Layers,
      color: 'border-amber-500/20 hover:border-amber-500',
      tagRu: 'МАТЕРИАЛЫ',
      tagEn: 'FOUNDRY MATERIALS',
      statsRu: '15 марок масс и обмазок',
      statsEn: '15 ramming mass & coating grades',
      subcategoriesRu: [
        { label: 'Футеровочные материалы', query: 'HDD', subId: 'refractory-materials' }
      ],
      subcategoriesEn: [
        { label: 'Refractory materials', query: 'HDD', subId: 'refractory-materials' }
      ]
    }
  ];

  const handleSelectDivision = (divisionId: ProductCategory) => {
    setActiveCategory(divisionId);
    setActiveSubcategory('all');
    setSelectedProductId(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCustomModel = (baseProduct: Product, variantModel: string) => {
    const clonedProduct = {
      ...baseProduct,
      id: `${baseProduct.id}-${variantModel}`,
      model: variantModel,
    };
    onAddToRFQ(clonedProduct);
  };

  const toggleSpecs = (productId: string) => {
    setExpandedProductSpecs((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // 1. Category search / filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      // 2. Subcategory check
      if (activeSubcategory !== 'all' && activeSubcategory !== 'all_direct' && !matchSubcategory(p.subcategory, activeSubcategory)) {
        return false;
      }
      // 3. Sub-subcategory check
      if (activeSubsubcategory !== 'all' && activeSubsubcategory !== 'all_direct' && p.subsubcategory !== activeSubsubcategory) {
        return false;
      }
      // 4. Case-insensitive search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesModel = p.model.toLowerCase().includes(query);
        const matchesTitle = p.title.toLowerCase().includes(query) || (p.titleEn && p.titleEn.toLowerCase().includes(query));
        const matchesDesc = p.description.toLowerCase().includes(query) || (p.descriptionEn && p.descriptionEn.toLowerCase().includes(query));
        const matchesVariants = p.variantModels?.some(v => v.model.toLowerCase().includes(query)) || false;
        
        return matchesModel || matchesTitle || matchesDesc || matchesVariants;
      }
      
      return true;
    });
  }, [activeCategory, activeSubcategory, activeSubsubcategory, searchQuery]);

  const isSelectedVariantInSpecs = (baseProductId: string, variantModel: string): boolean => {
    // Check if specifications contain this specific model mark
    return rfqItemsKeys.some(key => key === baseProductId || rfqItemsKeys.includes(`${baseProductId}-${variantModel}`) || rfqItemsKeys.some(k => k === variantModel));
  };

  const resetAllFilters = () => {
    setActiveCategory('all');
    setActiveSubcategory('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. Industrial Header & Search Banner — DISABLED per user request */}
      {/* <div className="bg-[#00171b] text-white py-14 border-b-4 border-[#e65410] relative overflow-hidden">
        {/* Photo background of steel pouring process with low opacity */}
        {/* <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-15 bg-no-repeat mix-blend-luminosity"
          style={{ backgroundImage: `url(${steelPouringBg})` }}
        />
        {/* Soft orange radial heat glow */}
        {/* <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#e65410]/5 blur-[120px] pointer-events-none z-0 rounded-full" />
        
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 animate-fadeIn">
            {/* <div className="max-w-3xl space-y-3">
              {/* <span className="text-xs font-mono uppercase tracking-widest text-[#e65410] font-black flex items-center space-x-2">
                {/* <Activity className="h-4 w-4 text-[#e65410] animate-pulse" />
                {/* <span>{t.catalogSpecTitle}</span>
              {/* </span>
              {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-sans">
                {/* {activeCategory === 'all' 
                  {/* ? (lang === 'en' ? 'Metallurgical Equipment Catalog' : 'Каталог оборудования «Сибтехлит»')
                  {/* : categories.find(c => c.id === activeCategory)?.label
                {/* }
              {/* </h1>
              {/* <p className="text-[#a0aec0] text-sm sm:text-base leading-relaxed font-sans max-w-2xl text-shadow-sm">
                {/* {activeCategory === 'all'
                  {/* ? (lang === 'en' 
                    {/* ? 'Advanced casting systems matched to certified GOST standards. Full engineering customization, design of technological layouts, and support.' 
                    {/* : 'Специализированное литейное оборудование, сертифицированное под стандарты металлургии СНГ. Проектирование компоновок, поставка узлов, шеф-монтаж и запуск.')
                  {/* : categories.find(c => c.id === activeCategory)?.descRu
                {/* }
              {/* </p>
            {/* </div>
            
            {/* {/* Real Search Box */}
            {/* <div className="w-full lg:max-w-md bg-black/70 p-5 rounded-none border border-teal-900/60 space-y-2 shrink-0 backdrop-blur-xs">
              {/* <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider font-semibold">
                {/* {lang === 'en' ? 'Direct database hardware search' : 'Прямой металлургический поиск по ГОСТ/модели'}
              {/* </label>
              {/* <div className="relative">
                {/* <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <Search className="h-4 w-4 text-[#e65410]" />
                {/* </span>
                {/* <input
                  {/* type="text"
                  {/* value={searchQuery}
                  {/* onChange={(e) => setSearchQuery(e.target.value)}
                  {/* placeholder={t.searchPlaceholder}
                  {/* className="w-full pl-9 pr-8 py-2.5 bg-[#00171b]/95 border border-teal-950 rounded text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-[#e65410] focus:border-[#e65410] focus:outline-hidden font-mono"
                {/* />
                {/* {searchQuery && (
                  {/* <button
                    {/* onClick={() => setSearchQuery('')}
                    {/* className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white bg-transparent border-none cursor-pointer"
                  {/* >
                    {/* ✕
                  {/* </button>
                {/* )}
              {/* </div>
              {/* <p className="text-[9px] text-gray-450 font-mono select-none">
                {/* {lang === 'en' ? 'Suggested: ' : 'Популярное: '}
                {/* {[
                  {/* { en: 'CX-10', ru: 'СХ-10', query: 'СХ-10' },
                  {/* { en: 'Reclamation', ru: 'Регенерация', query: 'регенерация' },
                  {/* { en: 'Crucible', ru: 'Тигель', query: 'GW' },
                  {/* { en: 'Ladle', ru: 'Ковш', query: 'КЛ' },
                  {/* { en: 'Blaster', ru: 'Дробемет', query: 'Q37' },
                {/* ].map((tag, idx, arr) => (
                  {/* <span key={idx}>
                    {/* <button
                      {/* type="button"
                      {/* onClick={() => {
                        {/* setSearchQuery(tag.query);
                        {/* setActiveCategory('all');
                      {/* }}
                      {/* className="text-[#e65410] hover:underline hover:text-orange-400 bg-transparent border-none p-0 cursor-pointer italic font-bold inline text-[10px]"
                    {/* >
                      {/* {lang === 'en' ? tag.en : tag.ru}
                    {/* </button>
                    {/* {idx < arr.length - 1 ? ', ' : ''}
                  {/* </span>
                {/* ))}
              {/* </p>
            {/* </div>
          {/* </div>
        {/* </div>
      </div> */}

      <div className="max-w-full ml-0 mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        
        {/* Dynamic Multi-level Engineering Breadcrumbs */}
        <div id="catalog-breadcrumb" className="bg-white border-2 border-gray-200 px-5 py-3.5 mb-6 shadow-xs flex flex-wrap items-center gap-1.5 text-xs font-mono select-none">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <div key={index} className="flex items-center space-x-1.5">
                {index > 0 && <ChevronRight className="h-3 w-3 text-gray-400 shrink-0" />}
                {item.onClick && !isLast ? (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="flex items-center space-x-1 text-[#00333b] hover:text-[#e65410] hover:underline bg-transparent border-none p-0 cursor-pointer text-left font-semibold"
                  >
                    {index === 0 && <Home className="h-3.5 w-3.5 text-[#e65410] shrink-0" />}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <span className={`flex items-center space-x-1 font-bold ${isLast ? 'text-[#e65410] font-black' : 'text-gray-400'}`}>
                    {index === 0 && <Home className="h-3.5 w-3.5 text-gray-400 shrink-0" />}
                    <span>{item.label}</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Layout: Fixed sidebar + full-width content */}
        
        {/* Left Navigation Sidebar — FIXED position, vertically centered, hidden on mobile */}
{false && (
        <aside className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 w-64 z-20 h-[75vh] overflow-y-auto bg-gray-50/95 backdrop-blur-sm border-r border-gray-200 rounded-none">
          <div className="p-4 space-y-4">
            <div className="bg-white border-2 border-gray-200 p-4 rounded-none shadow-xs space-y-3">
              <h3 className="text-[10px] font-mono font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5 select-none">
                <Sliders className="h-4 w-4 text-[#e65410]" />
                <span>{lang === 'en' ? 'Catalog Divisions' : 'Разделы каталога'}</span>
              </h3>
              
              <div className="space-y-1 flex flex-col">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveSubcategory('all');
                    setActiveSubsubcategory('all');
                    setSearchQuery('');
                    setSelectedProductId(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-2.5 py-2 text-[11px] font-black uppercase transition-all duration-150 rounded-none flex items-center justify-between cursor-pointer border ${
                    activeCategory === 'all'
                      ? 'bg-[#e65410] border-[#e65410] text-white font-black'
                      : 'bg-transparent border-transparent text-[#00333b] hover:bg-slate-50 hover:text-[#e65410]'
                  }`}
                >
                  <span>{lang === 'en' ? 'All Divisions' : 'Все направления'}</span>
                  <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-transform ${activeCategory === 'all' ? 'translate-x-0.5 text-white' : 'text-gray-300'}`} />
                </button>
                {categories.filter(cat => cat.id !== 'all').map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  const catSubcategories = SUBCATEGORIES_MAP[cat.id] || [];
                  return (
                    <div key={cat.id} className="flex flex-col group/item">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setActiveSubcategory('all');
                          setActiveSubsubcategory('all');
                          setSelectedProductId(null);
                          setSearchQuery('');
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className={`w-full text-left px-2.5 py-2 text-[11px] font-black uppercase transition-all duration-150 rounded-none flex items-center justify-between cursor-pointer border ${
                          isSelected
                            ? 'bg-[#e65410] border-[#e65410] text-white font-black'
                            : 'bg-transparent border-transparent text-[#00333b] hover:bg-slate-50 hover:text-[#e65410]'
                        }`}
                      >
                        <span className="truncate leading-tight whitespace-normal pr-1">{cat.label}</span>
                        <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-transform ${isSelected ? 'rotate-90 text-white' : 'text-gray-300'}`} />
                      </button>

                      {/* Level 3: Nested Subcategories */}
                      {isSelected && catSubcategories.length > 0 && (
                        <div className="pl-2 pr-1 py-1 bg-slate-50 border-l border-r border-b border-gray-200 flex flex-col space-y-0.5 animate-slideDown">
                          {catSubcategories.map((sub) => {
                            const isSubSelected = activeSubcategory === sub.id;
                            
                            // Get nested sub-subcategories dynamically from PRODUCTS data
                            const subsubcats = PRODUCTS.filter(
                              (p) => p.category === cat.id && p.subcategory === sub.id
                            ).reduce((acc, p) => {
                              if (p.subsubcategory && !acc.some((x) => x.id === p.subsubcategory)) {
                                  acc.push({
                                    id: p.subsubcategory,
                                    nameRu: p.subsubcategoryRu || p.subsubcategory,
                                    nameEn: p.subsubcategoryEn || p.subsubcategory,
                                  });
                              }
                              return acc;
                            }, [] as { id: string; nameRu: string; nameEn: string }[]);

                            return (
                              <div key={sub.id} className="flex flex-col">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveSubcategory(sub.id);
                                    setActiveSubsubcategory('all');
                                    setSelectedProductId(null);
                                    setSearchQuery('');
                                  }}
                                  className={`w-full text-left px-2 py-1.5 text-[10px] font-bold uppercase transition-all duration-150 rounded-none flex items-center justify-between cursor-pointer border-none bg-transparent ${
                                    isSubSelected
                                      ? 'text-[#e65410] font-black'
                                      : 'text-[#00333b] hover:text-[#e65410] hover:bg-slate-100'
                                  }`}
                                >
                                  <span className="leading-tight whitespace-normal pr-1 text-[10px]">{lang === 'en' ? sub.nameEn : sub.nameRu}</span>
                                  <ChevronRight className={`h-3 w-3 shrink-0 transition-transform ${isSubSelected ? 'rotate-90 text-[#e65410]' : 'text-gray-400'}`} />
                                </button>

                                {/* Level 4: Nested Sub-subcategories */}
                                {isSubSelected && subsubcats.length > 0 && (
                                  <div className="pl-3 py-1 border-l-2 border-orange-500/30 flex flex-col space-y-1">
                                    {subsubcats.map((subsub) => {
                                      const isSubSubSelected = activeSubsubcategory === subsub.id;
                                      return (
                                        <button
                                          key={subsub.id}
                                          type="button"
                                          onClick={() => {
                                            setActiveSubsubcategory(subsub.id);
                                            setSelectedProductId(null);
                                            setSearchQuery('');
                                          }}
                                          className={`w-full text-left px-2 py-1 text-[9px] font-bold transition-all duration-150 rounded-none cursor-pointer border-none bg-transparent leading-tight whitespace-normal ${
                                            isSubSubSelected
                                              ? 'text-[#e65410] font-black underline'
                                              : 'text-slate-500 hover:text-[#e65410] hover:bg-slate-100'
                                          }`}
                                        >
                                          • {lang === 'en' ? subsub.nameEn : subsub.nameRu}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </aside>
)}

        {/* Main Content Area — Full Width */}
        <div className="w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-w-0">
            {activeCategory === 'all' && !searchQuery.trim() ? (
              /* Render Page A: Main Catalog Categories Index — full width grid */
              <div className="w-full animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in animate-duration-250">
                  {sltDivisions.map((div) => {
                    const title = lang === 'en' ? div.titleEn : div.titleRu;
                    const desc = lang === 'en' ? div.descEn : div.descRu;

                    const DIVISION_IMAGES: Record<string, string> = {
                      'xtc-equipment': '/assets/gallery/menu/PL-mikser.jpg',
                      'furnaces': '/assets/gallery/menu/PL-pechi-ppi.jpg',
                      'pgs-equipment': '/assets/gallery/menu/PGS-SITO.jpg',
                      'core-making': '/assets/gallery/menu/Stern.jpg',
                      'shot-blast': '/assets/gallery/menu/ZIP-drob.jpg',
                      'special-casting': '/assets/gallery/menu/LPD.jpg',
                      'lvm-equipment': '/assets/gallery/menu/lgm-bel-1.jpg',
                      'lgm-equipment': '/assets/gallery/menu/lgm-avtoklav.jpg',
                      'thermal-furnaces': '/assets/gallery/menu/Term_pod.jpg',
                      'finishing-cnc': '/assets/gallery/menu/reshetka-pgs.jpg',
                      'sandblast': '/assets/gallery/menu/Kokil.jpg',
                      'ladle-carts': '/assets/gallery/menu/PL-pechi-kovsh.jpg',
                      'cooling-systems': '/assets/gallery/menu/ZIP-kondens.jpg',
                      'tooling': '/assets/gallery/menu/PGS-reshetka.jpg',
                      'spare-parts': '/assets/gallery/menu/Sistema-regeneratsii-3.jpg',
                      'foundry-materials': '/assets/gallery/menu/futerovka-indukczionnyix-pechej.jpg',
                      'video-gallery': '/assets/gallery/menu/PL-mikser.jpg',
                    };
                    const cardImage = DIVISION_IMAGES[div.id] || DIVISION_IMAGES['xtc-equipment'];

                    return (
                      <div
                        key={div.id}
                        className="group bg-white rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-350 hover:shadow-xl hover:-translate-y-1 cursor-pointer select-none relative shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-0"
                        onClick={() => handleSelectDivision(div.id)}
                      >
                        <div className="space-y-4">
                          {/* Image container */}
                          <div className="relative aspect-[4/3] w-full bg-gray-55 overflow-hidden flex items-center justify-center border-b border-gray-100">
                            <img
                              src={cardImage}
                              onError={(e) => {
                                e.currentTarget.src = sandMixerXTC;
                              }}
                              alt={title}
                              className="w-full h-full object-cover transition-all duration-500 ease-out filter brightness-100 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#00333b] group-hover:bg-[#e65410] group-hover:text-white font-extrabold text-[10px] uppercase px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 transition-all duration-300">
                              <span>{lang === 'en' ? 'Learn More' : 'Подробнее'}</span>
                              <ArrowRight className="h-3 w-3 transition-transform duration-250 group-hover:translate-x-1" />
                            </div>
                          </div>

                          {/* Title & Description */}
                          <div className="px-5 pb-6 space-y-2">
                            <h4 className="font-sans font-extrabold text-[#00333b] text-base group-hover:text-[#e65410] transition-colors leading-tight uppercase tracking-tight line-clamp-1">
                              {title}
                            </h4>
                            <p className="text-xs text-[#718096] leading-relaxed line-clamp-2">
                              {desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Render Page B: Dedicated Section Page - Clean Full Width Layout with Interactive Subcategory filtering and Custom stats banners */
              <div className="w-full space-y-6 animate-fade-in">
                {/* MAIN CATALOG CONTENT ON THE DEDICATED PAGE */}
                <div className="space-y-6">
              
              {selectedProductId && filteredProducts.some((prod) => prod.id === selectedProductId) ? (
                /* 1. SINGLE DETAILED PRODUCT DETAILED VIEW - Clean simple and strict space-saving layout */
                <ProductDetailModal
                      product={PRODUCTS.find((prod) => prod.id === selectedProductId)!}
                      lang={lang}
                      t={t}
                      galleryImages={galleryImages}
                      galleryIndex={galleryIndex}
                      setGalleryIndex={setGalleryIndex}
                      setIsLightboxOpen={setIsLightboxOpen}
                      rfqItemsKeys={rfqItemsKeys}
                      onAddToRFQ={onAddToRFQ}
                      expandedProductSpecs={expandedProductSpecs}
                      toggleSpecs={toggleSpecs}
                      isSelectedVariantInSpecs={isSelectedVariantInSpecs}
                      handleAddCustomModel={handleAddCustomModel}
                      materialsMap={MATERIALS_MAP}
                      generalMaterials={GENERAL_MATERIALS}
                      relatedEquipmentMap={RELATED_EQUIPMENT_MAP}
                      relatedCategoryFallbackMap={RELATED_CATEGORY_FALLBACK_MAP}
                      onSelectRelated={setSelectedProductId}
                    />                                      ) : (
              <CatalogContent
                lang={lang}
                activeCategory={activeCategory}
                activeSubcategory={activeSubcategory}
                activeSubsubcategory={activeSubsubcategory}
                availableSubsubcategories={availableSubsubcategories}
                searchQuery={searchQuery}
                filteredProducts={filteredProducts}
                rfqItemsKeys={rfqItemsKeys}
                subcategoryMap={SUBCATEGORIES_MAP}
                setActiveSubcategory={setActiveSubcategory}
                setActiveSubsubcategory={setActiveSubsubcategory}
                setSelectedProductId={setSelectedProductId}
                setSearchQuery={setSearchQuery}
              />
            )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#00252b] to-[#00333b] text-white p-8 rounded-none border border-teal-800 space-y-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-16">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#e65410] uppercase tracking-widest font-black flex items-center space-x-1.5">
              <ShieldAlert className="h-4.5 w-4.5 text-[#e65410]" />
              <span>{lang === 'en' ? 'Blueprints Engineering Service' : 'Комплексный технологический инжиниринг'}</span>
            </span>
            <h4 className="text-xl font-black uppercase text-white font-sans max-w-xl leading-snug">
              {lang === 'en' 
                ? 'Your machinery can be modified to match existing foundation layouts' 
                : 'Поставка нестандартных габаритов оборудования под существующие фундаменты цеха'}
            </h4>
            <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
              {lang === 'en'
                ? 'Siberian Foundry Technologies designs custom steel structures, extended arm mixers with custom reach, and customized filtration chambers matching any specific furnace or dust extraction profile.'
                : '«Сибтехлит» производит индивидуальную подгонку сварных стальных корпусов, увеличивает радиусы обслуживания лопастных зажимов смесителей ХТС и пересчитывает компоновочные сбросы гравитационных печей под конкретную высоту кровельной фермы.'}
            </p>
          </div>
          <div className="shrink-0 flex items-center space-x-2 bg-[#00252b]/45 border border-teal-800 p-4 rounded text-xs font-mono text-[#e65410]">
            <HardHat className="h-5 w-5 text-[#e65410] shrink-0" />
            <span>
              {lang === 'en' ? 'Bespoke layouts calculated in 3D' : 'Проектирование в AutoCAD/КОМПАС 3D'}
            </span>
          </div>
        </div>

        <GalleryLightbox
          images={galleryImages}
          index={galleryIndex}
          setIndex={setGalleryIndex}
          isOpen={isLightboxOpen}
          setIsOpen={setIsLightboxOpen}
          lang={lang}
        />

      </div>
    </div>
  );
}
