import React from 'react';

export interface MaterialItem {
  id: string;
  titleRu: string;
  titleEn: string;
  model: string;
  descRu: string;
  descEn: string;
  packRu: string;
  packEn: string;
}

// Вариант Б: subcategory в данных = subcategory-id (английский slug), совпадает с sub.id
export const matchSubcategory = (pSub: string, activeSubId: string): boolean => {
  if (activeSubId === 'all') return true;
  return pSub === activeSubId || pSub.toLowerCase().includes(activeSubId.toLowerCase());
};

export const renderFormattedText = (text: string): React.ReactNode => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part: string, index: number) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-extrabold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

// Преобразует плоский массив specs в одну таблицу (одна модель) или
// многоколоночную таблицу (несколько моделей, разделённых ключами "Модель"/"Model").
export const parseSpecsToTable = (specs: any[]) => {
  if (!specs || specs.length === 0) return null;

  const isModelKey = (name: string, nameEn?: string) => {
    const n = name.toLowerCase();
    const ne = (nameEn || '').toLowerCase();
    return n === 'модель' || n === 'model' || n === 'model name' || ne === 'model' || ne === 'model name';
  };

  const modelIndices: number[] = [];
  specs.forEach((s, idx) => {
    if (isModelKey(s.name, s.nameEn)) {
      modelIndices.push(idx);
    }
  });

  if (modelIndices.length <= 1) {
    return {
      type: 'single' as const,
      rows: specs,
    };
  }

  const columns: Record<string, string>[] = [];
  const columnsEn: Record<string, string>[] = [];
  const uniqueParams: { nameRu: string; nameEn: string }[] = [];
  const paramMap = new Set<string>();

  for (let i = 0; i < modelIndices.length; i++) {
    const start = modelIndices[i];
    const end = i < modelIndices.length - 1 ? modelIndices[i + 1] : specs.length;
    const colSpecs = specs.slice(start, end);

    const colData: Record<string, string> = {};
    const colDataEn: Record<string, string> = {};

    colSpecs.forEach((s: any) => {
      const ruName = s.name;
      const enName = s.nameEn || s.name;

      colData[ruName] = s.value;
      colDataEn[enName] = s.valueEn || s.value;

      const key = `${ruName}##${enName}`;
      if (!paramMap.has(key)) {
        paramMap.add(key);
        uniqueParams.push({ nameRu: ruName, nameEn: enName });
      }
    });

    columns.push(colData);
    columnsEn.push(colDataEn);
  }

  return {
    type: 'multi' as const,
    params: uniqueParams,
    columns,
    columnsEn,
  };
};

export type SpecGroupKey = 'dimensions' | 'electrical' | 'performance' | 'other';

export interface SpecGroup {
  key: SpecGroupKey;
  titleRu: string;
  titleEn: string;
  icon: 'ruler' | 'zap' | 'gauge' | 'settings';
  specs: { name: string; value: string; nameEn?: string; valueEn?: string }[];
}

const GROUP_RULES: { key: SpecGroupKey; titleRu: string; titleEn: string; icon: 'ruler' | 'zap' | 'gauge' | 'settings'; match: RegExp }[] = [
  { key: 'dimensions', titleRu: 'Габариты и конструкция', titleEn: 'Dimensions & Construction', icon: 'ruler', match: /диаметр|габарит|размер|длина|ширина|высота|масса|вес|кожух|корпус|габарит/i },
  { key: 'electrical', titleRu: 'Электрика и энергоносители', titleEn: 'Electrical & Power', icon: 'zap', match: /напряжени|мощност|трансформатор|электрод|ток|кВА|кВт|В\b|энерг|питани|двигат/i },
  { key: 'performance', titleRu: 'Производительность', titleEn: 'Performance', icon: 'gauge', match: /емкость|производительност|пр-сть|т\/ч|тонн|производит|производств|производител|выплавк|плавк/i },
];

export const groupSpecs = (specs: { name: string; value: string; nameEn?: string; valueEn?: string }[]): SpecGroup[] => {
  if (!specs || specs.length === 0) return [];
  const groups: Record<SpecGroupKey, SpecGroup> = {
    dimensions: { key: 'dimensions', titleRu: 'Габариты и конструкция', titleEn: 'Dimensions & Construction', icon: 'ruler', specs: [] },
    electrical: { key: 'electrical', titleRu: 'Электрика и энергоносители', titleEn: 'Electrical & Power', icon: 'zap', specs: [] },
    performance: { key: 'performance', titleRu: 'Производительность', titleEn: 'Performance', icon: 'gauge', specs: [] },
    other: { key: 'other', titleRu: 'Прочие параметры', titleEn: 'Other Parameters', icon: 'settings', specs: [] },
  };
  for (const s of specs) {
    let assigned: SpecGroupKey = 'other';
    for (const rule of GROUP_RULES) {
      if (rule.match.test(s.name)) { assigned = rule.key; break; }
    }
    groups[assigned].specs.push(s);
  }
  return (Object.keys(groups) as SpecGroupKey[])
    .map((k) => groups[k])
    .filter((g) => g.specs.length > 0);
};
