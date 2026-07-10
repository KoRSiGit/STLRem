import { useState } from 'react';
import { CalculatorState } from '../types';
import { Calculator, Sparkles, Sliders } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface FoundryCalculatorProps {
  lang: 'ru' | 'en';
}

export default function FoundryCalculator({ lang }: FoundryCalculatorProps) {
  const [activeCalc, setActiveCalc] = useState<'xtc' | 'furnace'>('xtc');
  const t = TRANSLATIONS[lang];

  // XTC state (Values can remain constant across currencies for simplified comparison modeling)
  const [xtcState, setXtcState] = useState<CalculatorState>({
    mixerCapacity: 10,
    operatingHours: 8,
    binderRatio: 1.2,
    catalystRatio: 40,
    sandCost: lang === 'en' ? 30 : 1800, // modeled in USD or RUB equivalent
    binderCost: lang === 'en' ? 4 : 240,
    catalystCost: lang === 'en' ? 3 : 195,
  });

  // Furnace calculations state
  const [meltWeight, setMeltWeight] = useState<number>(1.0); // tons
  const [furnacePower, setFurnacePower] = useState<number>(800); // kW
  const [metalType, setMetalType] = useState<'iron' | 'steel' | 'bronze' | 'aluminium'>('iron');

  // 1. XTC Calculations logic
  const daysInMonth = 22;
  const hoursPerMonth = xtcState.operatingHours * daysInMonth;
  const sandPerMonth = xtcState.mixerCapacity * hoursPerMonth; // tons

  // Binder (resin) calculation
  const binderPerMonth = (sandPerMonth * 1000 * xtcState.binderRatio) / 100; // in kg
  const binderMonthlyCost = binderPerMonth * xtcState.binderCost;

  // Catalyst calculation (ratio is % of binder, not sand)
  const catalystPerMonth = (binderPerMonth * xtcState.catalystRatio) / 100; // in kg
  const catalystMonthlyCost = catalystPerMonth * xtcState.catalystCost;

  // Sand cost
  const sandMonthlyCost = sandPerMonth * xtcState.sandCost;

  const totalMonthlyCost = sandMonthlyCost + binderMonthlyCost + catalystMonthlyCost;
  const costPerTon = totalMonthlyCost / sandPerMonth; // cost per ton of mold mixture

  // Percent segment math for bar
  const sandPct = (sandMonthlyCost / totalMonthlyCost) * 100 || 0;
  const binderPct = (binderMonthlyCost / totalMonthlyCost) * 100 || 0;
  const catalystPct = (catalystMonthlyCost / totalMonthlyCost) * 100 || 0;

  // 2. Furnace Calculations logic
  const getFurnaceResult = () => {
    let specificEnergyKwh = 580; // kWh/ton to heat to pouring temp
    let label = lang === 'en' ? 'Iron GG/GGG (pouring temp ~1480 °C)' : 'Чугун СЧ (темп. выпуска ~1480 °C)';
    
    if (metalType === 'steel') {
      specificEnergyKwh = 680; // High pouring temp 1620 °C
      label = lang === 'en' ? 'Carbon Steel (pouring temp ~1650 °C)' : 'Сталь углеродистая (темп. выпуска ~1650 °C)';
    } else if (metalType === 'bronze') {
      specificEnergyKwh = 380; // Lower melting point
      label = lang === 'en' ? 'Bronze / Copper Alloys (~1180 °C)' : 'Бронза / Медные сплавы (~1180 °C)';
    } else if (metalType === 'aluminium') {
      specificEnergyKwh = 520; // Lower temp base, high latent heat of melting
      label = lang === 'en' ? 'Aluminum (~720 °C)' : 'Алюминий (~720 °C)';
    }

    const totalEnergyRequired = SpecificEnergyToTotal(meltWeight, specificEnergyKwh); // kWh needed
    // Melt time in minutes = (Energy required / active power) * 60 minutes
    const meltTimeMinutes = (totalEnergyRequired / furnacePower) * 60;
    const hourlyProductivity = meltWeight / (meltTimeMinutes / 60);

    return {
      specificEnergyKwh,
      totalEnergyRequired,
      meltTimeMinutes: Math.round(meltTimeMinutes),
      hourlyProductivity: Math.round(hourlyProductivity * 10) / 10,
      label,
    };
  };

  const SpecificEnergyToTotal = (tons: number, specificKwh: number) => {
    return (tons * specificKwh) / 0.72; // overall system efficiency ~72%
  };

  const furnaceResult = getFurnaceResult();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro header */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#e65410] font-bold">{t.calcSubtitle}</span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl font-display">
            {t.calcHeader}
          </h1>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl leading-relaxed">
            {t.calcDesc}
          </p>
        </div>

        {/* Switch Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setActiveCalc('xtc')}
            className={`flex items-center justify-center space-x-3 p-5 rounded-lg border text-sm uppercase tracking-wider font-extrabold transition cursor-pointer ${
              activeCalc === 'xtc'
                ? 'bg-[#00333b] text-white border-[#00333b]'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Calculator className="h-5 w-5 text-[#e65410]" />
            <span>{t.calcXtcTab}</span>
          </button>
          <button
            onClick={() => setActiveCalc('furnace')}
            className={`flex items-center justify-center space-x-3 p-5 rounded-lg border text-sm uppercase tracking-wider font-extrabold transition cursor-pointer ${
              activeCalc === 'furnace'
                ? 'bg-[#00333b] text-white border-[#00333b]'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="h-5 w-5 text-[#e65410]" />
            <span>{t.calcFurnaceTab}</span>
          </button>
        </div>

        {/* Calculator 1: XTC Calculator */}
        {activeCalc === 'xtc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input fields panel (5 columns) */}
            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-lg p-6 space-y-5">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <Sliders className="h-4 w-4 text-[#e65410]" />
                <h3 className="text-base font-bold text-gray-900 uppercase font-sans tracking-tight">{t.calcXtcInputsHeader}</h3>
              </div>

              {/* Mixer capacity */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-gray-500 flex justify-between">
                  <span>{t.calcXtcMixerPerf}</span>
                  <span className="font-bold text-gray-900">{xtcState.mixerCapacity} {lang === 'en' ? 't/hour' : 'т/час'}</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="60"
                  step="1"
                  value={xtcState.mixerCapacity}
                  onChange={(e) => setXtcState({ ...xtcState, mixerCapacity: Number(e.target.value) })}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Operating hours */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-gray-500 flex justify-between">
                  <span>{t.calcXtcMixerHours}</span>
                  <span className="font-bold text-gray-900">{xtcState.operatingHours} {lang === 'en' ? 'hours/day' : 'ч/день'}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={xtcState.operatingHours}
                  onChange={(e) => setXtcState({ ...xtcState, operatingHours: Number(e.target.value) })}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Resin/Binder ratio */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-gray-500 flex justify-between">
                  <span>{t.calcXtcResinFlow}</span>
                  <span className="font-bold text-gray-900">{xtcState.binderRatio}{t.calcXtcOfSand}</span>
                </label>
                <input
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.1"
                  value={xtcState.binderRatio}
                  onChange={(e) => setXtcState({ ...xtcState, binderRatio: Number(e.target.value) })}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Catalyst ratio of resin */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-gray-500 flex justify-between">
                  <span>{t.calcXtcCatalystFlow}</span>
                  <span className="font-bold text-gray-900">{xtcState.catalystRatio}{t.calcXtcOfResin}</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="5"
                  value={xtcState.catalystRatio}
                  onChange={(e) => setXtcState({ ...xtcState, catalystRatio: Number(e.target.value) })}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Financial values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-gray-400">{t.calcXtcSandCost}</span>
                  <input
                    type="number"
                    value={xtcState.sandCost}
                    onChange={(e) => setXtcState({ ...xtcState, sandCost: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-gray-300 rounded font-bold text-gray-900 focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-gray-400">{t.calcXtcResinCost}</span>
                  <input
                    type="number"
                    value={xtcState.binderCost}
                    onChange={(e) => setXtcState({ ...xtcState, binderCost: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-gray-300 rounded font-bold text-gray-900 focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-[10px] uppercase text-gray-400">{t.calcXtcCatalystCost}</span>
                  <input
                    type="number"
                    value={xtcState.catalystCost}
                    onChange={(e) => setXtcState({ ...xtcState, catalystCost: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-gray-300 rounded font-bold text-gray-900 focus:outline-hidden"
                  />
                </div>
              </div>

            </div>

            {/* Calculations Output pane (7 columns) */}
            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-lg p-6 sm:p-8 space-y-6">
              
              <div className="border-b border-gray-100 pb-4 flex justify-between items-center">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-500 font-bold">{t.calcXtcResultsHeader}</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded font-mono">{t.calcXtcWorkingShifts}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 border border-gray-100 rounded">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">{t.calcXtcSandSpent}</span>
                  <span className="font-sans font-black text-lg block text-[#00333b] mt-1">{sandPerMonth.toLocaleString()} {t.calcXtcTons}</span>
                </div>
                <div className="bg-gray-50 p-4 border border-gray-100 rounded">
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold text-orange-600">{t.calcXtcResinSpent}</span>
                  <span className="font-sans font-black text-lg block text-orange-600 mt-1">{(binderPerMonth / 1000).toFixed(1)} {t.calcXtcT}</span>
                </div>
                <div className="bg-gray-50 p-4 border border-gray-100 rounded">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">{t.calcXtcCatalystSpent}</span>
                  <span className="font-sans font-black text-lg block text-gray-900 mt-1">{(catalystPerMonth / 1000).toFixed(1)} {t.calcXtcT}</span>
                </div>
              </div>

              {/* Graphical visual cost breakdown bar */}
              <div className="space-y-2 font-mono">
                <span className="text-[10px] uppercase text-gray-500">{t.calcXtcBudgetShares}</span>
                <div className="h-5 rounded-md overflow-hidden flex text-[10px] font-bold text-white">
                  <div style={{ width: `${sandPct}%` }} className="bg-[#00333b] h-full flex items-center justify-center min-w-4 truncate px-1">
                    {t.calcXtcSandPart} ({Math.round(sandPct)}%)
                  </div>
                  <div style={{ width: `${binderPct}%` }} className="bg-orange-650 h-full flex items-center justify-center min-w-4 truncate px-1">
                    {t.calcXtcResinPart} ({Math.round(binderPct)}%)
                  </div>
                  <div style={{ width: `${catalystPct}%` }} className="bg-yellow-500 h-full flex items-center justify-center min-w-4 truncate px-1 text-gray-900">
                    {t.calcXtcCatalystPart} ({Math.round(catalystPct)}%)
                  </div>
                </div>
              </div>

              {/* Total output block */}
              <div className="p-6 bg-orange-650/5 border border-orange-500/20 rounded-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-orange-600 uppercase font-black tracking-widest block">{t.calcXtcMonthlyBudget}</span>
                    <span className="font-sans font-black text-3xl text-gray-900">
                      {Math.round(totalMonthlyCost).toLocaleString()} {t.calcXtcRub}
                    </span>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">{t.calcXtcPerTonCost}</span>
                    <span className="font-mono font-extrabold text-[#00333b] text-lg">
                      {Math.round(costPerTon).toLocaleString()} {t.calcXtcRubTon}
                    </span>
                  </div>
                </div>
                
                {/* Economy recommendation card */}
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-850 text-xs rounded leading-relaxed">
                  <span className="font-bold">{t.calcXtcAdviceHeader}</span> {t.calcXtcAdviceText}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Calculator 2: Furnace Calculator */}
        {activeCalc === 'furnace' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input fields panel */}
            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <Sliders className="h-4 w-4 text-[#e65410]" />
                <h3 className="text-base font-bold text-gray-900 uppercase font-sans tracking-tight">{t.calcFurnaceInputsHeader}</h3>
              </div>

              {/* Metal Selection */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase text-gray-500">{t.calcFurnaceAlloyType}</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'iron', label: t.calcFurnaceAlloy1 },
                    { id: 'steel', label: t.calcFurnaceAlloy2 },
                    { id: 'bronze', label: t.calcFurnaceAlloy3 },
                    { id: 'aluminium', label: t.calcFurnaceAlloy4 },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMetalType(m.id as any)}
                      className={`py-2.5 px-3 border rounded text-xs transition uppercase tracking-wider font-extrabold cursor-pointer ${
                        metalType === m.id
                          ? 'bg-orange-500/10 border-orange-500 text-orange-600'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Melt weight */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-gray-500 flex justify-between">
                  <span>{t.calcFurnaceCrucibleCap}</span>
                  <span className="font-bold text-gray-900">{meltWeight} {t.calcXtcT}</span>
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="10.0"
                  step="0.1"
                  value={meltWeight}
                  onChange={(e) => setMeltWeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Power in kW */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-gray-500 flex justify-between">
                  <span>{t.calcFurnacePowerSource}</span>
                  <span className="font-bold text-gray-900">{furnacePower} {lang === 'en' ? 'kW' : 'кВт'}</span>
                </label>
                <input
                  type="range"
                  min="250"
                  max="4000"
                  step="50"
                  value={furnacePower}
                  onChange={(e) => setFurnacePower(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

            </div>

            {/* Calculations Output */}
            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-lg p-6 sm:p-8 space-y-6">
              
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-500 font-bold">{t.calcFurnaceResultsHeader}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#00333b] text-white p-5 rounded border border-teal-800">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">{t.calcFurnaceMeltTime}</span>
                  <span className="font-sans font-black text-2xl block text-amber-500 mt-1">{furnaceResult.meltTimeMinutes} {t.calcFurnaceMin}</span>
                </div>
                <div className="bg-gray-50 p-5 border border-gray-100 rounded">
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-bold text-gray-950">{t.calcFurnaceHourlyYield}</span>
                  <span className="font-sans font-black text-xl block text-[#00333b] mt-1">
                    {furnaceResult.hourlyProductivity} {t.calcFurnaceThour || (lang === 'en' ? 't/hour' : 'т/час')}
                  </span>
                </div>
                <div className="bg-gray-50 p-5 border border-gray-100 rounded">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">{t.calcFurnaceTotalPowerSpent}</span>
                  <span className="font-sans font-black text-xl block text-gray-900 mt-1">
                    {Math.round(furnaceResult.totalEnergyRequired)} {t.calcFurnaceKwh}
                  </span>
                </div>
              </div>

              {/* Physical properties listing */}
              <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-lg space-y-3 font-mono">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">{t.calcFurnaceConstants}</span>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400">{t.calcFurnaceSpecificHeat}</span>
                    <span className="block font-bold text-gray-900 mt-0.5">{furnaceResult.specificEnergyKwh} {t.calcFurnaceKwhT}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">{t.calcFurnaceEfficiency}</span>
                    <span className="block font-bold text-emerald-600 mt-0.5 flex items-center">
                      <span>{t.calcFurnaceEfficiencyVal}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/20 text-gray-800 text-xs rounded leading-relaxed">
                <span className="font-bold text-orange-600">{t.calcFurnaceWarningHeader}</span> {t.calcFurnaceWarningText}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
