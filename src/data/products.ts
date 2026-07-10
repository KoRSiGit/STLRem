import { Product } from '../types';
import { PRODUCTS_XTC } from './products_xtc';
import { PRODUCTS_FURNACES } from './products_furnaces';
import { PRODUCTS_PGS } from './products_pgs';
import { PRODUCTS_OTHERS } from './products_others';
// Generated from MD catalog via convert_catalog.py
import { LGM_EQUIPMENT } from './products_lgm';
// Generated-from-MD catalog (Phase 2): replaces the old _generated duplicates
import { THERMAL_FURNACES } from './products_thermal';
import { DRABEMETY } from './products_drobemety';
import { PESKOSTRU } from './products_peskostrui';
import { CENTRIFUGAL_CASTING } from './products_centrifugal';
import { HPDC_MACHINES } from './products_hpdc';
import { DIE_CASTING } from './products_die_casting';
import { LVM_EQUIPMENT } from './products_lvm';
import { CORE_MAKING } from './products_core_making';
import { FINISHING } from './products_finishing';
import { CNC_MACHINING } from './products_cnc';
import { KOVSHE } from './products_kovshi';
// Manual products (Phase 1)
import { PRODUCTS_COOLING } from './products_cooling';
import { PRODUCTS_TOOLING } from './products_tooling';
import { PRODUCTS_SPARES } from './products_spares';
import { PRODUCTS_MATERIALS } from './products_materials';
import { PRODUCTS_VIDEO } from './products_video';

export const PRODUCTS: Product[] = [
  // Existing curated products
  ...PRODUCTS_XTC,
  ...PRODUCTS_FURNACES,
  ...PRODUCTS_PGS,
  ...PRODUCTS_OTHERS,
  // Generated from MD catalog
  ...LGM_EQUIPMENT,
  ...THERMAL_FURNACES,
  ...DRABEMETY,
  ...PESKOSTRU,
  ...CENTRIFUGAL_CASTING,
  ...HPDC_MACHINES,
  ...DIE_CASTING,
  ...LVM_EQUIPMENT,
  ...CORE_MAKING,
  ...FINISHING,
  ...CNC_MACHINING,
  ...KOVSHE,
  // Manual products (Phase 1)
  ...PRODUCTS_COOLING,
  ...PRODUCTS_TOOLING,
  ...PRODUCTS_SPARES,
  ...PRODUCTS_MATERIALS,
  ...PRODUCTS_VIDEO,
];
