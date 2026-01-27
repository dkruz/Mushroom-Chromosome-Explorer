import React, { useState } from 'react';
import { SPECIES_DATA, FUNCTION_COLORS } from '../constants';
import { EducationalLevel, ChromosomeFunction } from '../types';
import LevelToggle from './LevelToggle';

interface ComparativeKaryotypingProps {
  onBack: () => void;
}

const ComparativeKaryotyping: React.FC<ComparativeKaryotypingProps> = ({ onBack }) => {
  const [level, setLevel] = useState<EducationalLevel>(EducationalLevel.BEGINNER);

  // Find max genome size for scaling (Mb)
  const maxGenomeSize = Math.max(...SPECIES_DATA.map(s => parseFloat(s.genomeSize)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors shadow-sm">
            <i className="fa-solid fa-arrow-left text-stone-600"></i>
          </button>
          <div>
            <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tight">Comparative Genomics</h2>
            <p className="text-sm font-mono text-stone-400 italic">Inter-species chromosomal architecture analysis</p>
          </div>
        </div>
        <LevelToggle currentLevel={level} onLevelChange={setLevel} />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {SPECIES_DATA.map((species) => {
          const currentSize = parseFloat(species.genomeSize);
          const relativeScale = currentSize / maxGenomeSize;
          
          return (
            <div key={species.id} className="bg-white border border-stone-200 rounded-[40px] p-8 shadow-sm relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-stone-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-900 rounded-xl flex items-center justify-center text-white">
                    <i className="fa-solid fa-dna text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight">{species.commonName}</h3>
                    <p className="text-[10px] font-mono text-stone-400 font-bold uppercase tracking-widest">{species.scientificName}</p>
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="text-center">
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Total Scale</p>
                    <p className="text-sm font-black text-stone-900">{species.genomeSize}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Unit Count</p>
                    <p className="text-sm font-black text-stone-900">{species.chromosomeCount} CHR</p>
                  </div>
                  <div className="hidden md:block text-center">
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Physical Mass</p>
                    <div className="w-24 h-2 bg-stone-100 rounded-full mt-2 overflow-hidden">
                       <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${relativeScale * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-end gap-x-4 gap-y-10 min-h-[120px]">
                {species.chromosomes.map((chr) => {
                  // Scale individual bars visually based on their ID as a proxy for physical variation
                  const visualHeight = 80 + (chr.id % 5) * 15;
                  const label = level === EducationalLevel.ADVANCED ? chr.advancedLabel : level === EducationalLevel.INTERMEDIATE ? chr.intermediateLabel : chr.beginnerLabel;

                  return (
                    <div key={chr.id} className="flex flex-col items-center group relative cursor-help">
                       <div className={`w-3.5 rounded-full transition-all duration-500 ${FUNCTION_COLORS[chr.primaryFunction]}`} style={{ height: `${visualHeight}px` }}>
                          {chr.isHighlight && <div className="absolute top-1/4 left-0 right-0 h-2 bg-white/30 border-y border-black/5"></div>}
                       </div>
                       <span className="text-[8px] font-black text-stone-400 mt-2 uppercase tracking-tighter">C{chr.id}</span>
                       
                       {/* Floating tooltip for comparison */}
                       <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-stone-950 text-white p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl border border-stone-800">
                          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">CHR {chr.id}</p>
                          <p className="text-[10px] font-bold mb-1 leading-tight">{label}</p>
                          <p className="text-[9px] text-stone-400 leading-relaxed uppercase">{chr.primaryFunction}</p>
                       </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-12 bg-white border border-stone-200 rounded-[32px] p-6 flex flex-wrap justify-center gap-x-8 gap-y-4">
        <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest w-full text-center mb-2">Genomic Function Map</span>
        {Object.values(ChromosomeFunction).filter(f => f !== 'UNKNOWN').map((func) => (
          <div key={func} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${FUNCTION_COLORS[func as ChromosomeFunction]}`}></div>
            <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest">{func}</span>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl max-w-2xl text-left">
           <i className="fa-solid fa-circle-info text-emerald-500"></i>
           <p className="text-xs text-stone-500 leading-relaxed italic">
             <strong>Analyst Note:</strong> While chromosome counts are similar (~13-14), their functional densities vary significantly. <span className="text-stone-900 font-bold">Schizophyllum commune</span> maintains a larger genomic footprint primarily due to its massive array of wood-decay enzymes and thousands of mating identities.
           </p>
        </div>
      </div>
    </div>
  );
};

export default ComparativeKaryotyping;