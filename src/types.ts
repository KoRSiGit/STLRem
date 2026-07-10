export type ProductCategory =
  | 'furnaces'
  | 'cooling-systems'
  | 'shot-blast'
  | 'sandblast'
  | 'xtc-equipment'
  | 'pgs-equipment'
  | 'core-making'
  | 'lgm-equipment'
  | 'lvm-equipment'
  | 'special-casting'
  | 'thermal-furnaces'
  | 'finishing-cnc'
  | 'ladle-carts'
  | 'tooling'
  | 'spare-parts'
  | 'foundry-materials'
  | 'video-gallery'
  | 'hpdc';

export interface ProductSpec {
  name: string;
  value: string;
  nameEn?: string;
  valueEn?: string;
}

export interface EquipmentVariant {
  model: string;
  capacity?: string;
  capacityEn?: string;
  power?: string;
  powerEn?: string;
  extraField?: string;
  extraFieldVal?: string;
  extraFieldValEn?: string;
  specs?: ProductSpec[];
}

export interface GalleryImage {
  path: string;
  caption: string;
}

export interface Product {
  id: string;
  category: ProductCategory;
  subcategory?: string;
  subcategoryRu?: string;
  subcategoryEn?: string;
  subsubcategory?: string;
  subsubcategoryRu?: string;
  subsubcategoryEn?: string;
  title: string;
  titleEn?: string;
  model: string;
  description: string;
  descriptionEn?: string;
  features: string[];
  featuresEn?: string[];
  specs: ProductSpec[];
  imageUrl: string;
  capacity?: string;
  capacityEn?: string;
  power?: string;
  powerEn?: string;
  variantModels?: EquipmentVariant[];
  galleryImages?: GalleryImage[];
  specTableHtml?: string; // Raw HTML table from MD catalog
}

export interface RFQItem {
  product: Product;
  quantity: number;
  comments?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface CalculatorState {
  mixerCapacity: number; // t/hour
  operatingHours: number; // hours/day
  binderRatio: number; // % (typically 1.0 - 2.0%)
  catalystRatio: number; // % of binder (typically 30 - 50%)
  sandCost: number; // rub/ton
  binderCost: number; // rub/kg
  catalystCost: number; // rub/kg
}
