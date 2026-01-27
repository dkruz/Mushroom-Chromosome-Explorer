import React, { useState } from 'react';
import { ChromosomeData, Gene, EducationalLevel, ChromosomeFunction } from '../types';
import { FUNCTION_COLORS } from '../constants';

interface GeneDeepDiveProps {
  chromosome: ChromosomeData;
  level: EducationalLevel;
  onClose: () => void;
}

const GeneDeepDive: React.FC<GeneDeepDiveProps> = ({ chromosome, level, onClose }) => {
  const [selectedGene, setSelectedGene] = useState<Gene | null>(chromosome.genes?.[0] || null);

  // Default genes if none provided for variety
  const displayGenes = chromosome.genes || [
    {
      id: 'placeholder', name: 'Baseline Survival', technicalName: 'HSP-70', category: 'Housekeeping',
      location: `Locus ${chromosome.id}.1`, description: 'Basic genes for keeping the cell alive.',
      technicalDescription: 'Conserved Heat Shock Proteins assisting in protein folding and stress response.'
    }
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-stone-950 z-[110] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-emerald-500/20">
      {/* Header */}
      <div className="p-8 bg-stone-900/50 border-b border-white/5 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className={`w-2 h-2 rounded-full ${FUNCTION_COLORS[chromosome.primaryFunction]}`}></div>
            <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Molecular Deep Dive</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Chromosome {chromosome.id} Loci</h2>
        </div>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* DNA Ribbon Navigation */}
        <div className="w-24 bg-stone-900/20 border-r border-white/5 flex flex-col items-center py-10 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            {/* Stylized Helix Line */}
            <svg width="40" height="100%" className="h-full">
               <path d="M20 0 Q40 50 20 100 T20 200" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
          
          <div className="flex flex-col gap-12 z-10">
            {displayGenes.map((gene) => (
              <button 
                key={gene.id} 
                onClick={() => setSelectedGene(gene)}
                className={`relative group flex flex-col items-center transition-all ${selectedGene?.id === gene.id ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
              >
                <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${selectedGene?.id === gene.id ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'border-stone-700 bg-stone-900 text-stone-500'}`}>
                   <i className="fa-solid fa-dna text-xs"></i>
                </div>
                <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-stone-800 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest font-black pointer-events-none">
                  {gene.location}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Gene Content */}
        <div className="flex-grow overflow-y-auto p-10 custom-scroll space-y-10">
          {selectedGene ? (
            <>
              <div className="animate-in fade-in duration-500">
                <span className="text-emerald-500 font-mono text-[10px] font-bold uppercase tracking-widest mb-4 block">Selected Locus: {selectedGene.location}</span>
                <h3 className="text-4xl font-black text-white mb-2 leading-none uppercase tracking-tight">{selectedGene.name}</h3>
                <p className="text-stone-400 font-mono text-sm italic">{selectedGene.technicalName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-stone-900/50 p-6 rounded-3xl border border-white/5">
                   <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-1">Gene Category</p>
                   <p className="text-white text-xs font-bold uppercase">{selectedGene.category}</p>
                 </div>
                 <div className="bg-stone-900/50 p-6 rounded-3xl border border-white/5">
                   <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-1">Functional Stability</p>
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                     <p className="text-emerald-500 text-xs font-bold uppercase tracking-tighter">High (98%)</p>
                   </div>
                 </div>
              </div>

              <div className="space-y-6">
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[32px] relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                      <i className="fa-solid fa-quote-right text-4xl text-emerald-500"></i>
                   </div>
                   <p className="text-stone-300 text-lg leading-relaxed italic">
                     {level === EducationalLevel.BEGINNER ? selectedGene.description : selectedGene.technicalDescription}
                   </p>
                </div>

                <div className="bg-stone-950 p-6 rounded-3xl border border-white/5">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Base Pair Stream</span>
                      <span className="text-[9px] text-emerald-500 font-bold uppercase animate-pulse">Live</span>
                   </div>
                   <div className="font-mono text-[10px] text-emerald-900 break-all leading-tight opacity-50 bg-stone-900 p-4 rounded-xl">
                      {Array.from({length: 240}, () => ['A','C','G','T'][Math.floor(Math.random() * 4)]).join('')}
                   </div>
                </div>
              </div>

              <div className="pt-8 mt-10 border-t border-white/5">
                <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-6">Expert Mycology Insight</h4>
                <div className="flex gap-4 p-6 bg-stone-900/30 rounded-2xl border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-stone-400">
                    <i className="fa-solid fa-microscope text-lg"></i>
                  </div>
                  <p className="text-stone-400 text-xs leading-relaxed italic">
                    {chromosome.primaryFunction === ChromosomeFunction.REPRODUCTION 
                      ? "Genetic diversity in this region allows these mushrooms to find compatible mates across entire forest ecosystems."
                      : "The presence of these enzymes allows the species to efficiently reclaim carbon from dead biomass, cycling nutrients back into the soil."}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <p className="text-stone-500 text-sm font-medium italic">Select a gene locus on the ribbon to begin analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneDeepDive;