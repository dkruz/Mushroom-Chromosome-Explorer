import React from 'react';
import { Species } from '../types';
import { SPECIES_DATA } from '../constants';

interface SpeciesSelectionProps {
  onSelect: (species: Species) => void;
  onCompare: () => void;
}

const SpeciesSelection: React.FC<SpeciesSelectionProps> = ({ onSelect, onCompare }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-700">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-stone-900 mb-4 tracking-tight uppercase">Select a Model Organism</h2>
        <p className="text-stone-400 text-lg font-medium max-w-2xl mx-auto">Explore individual genomic profiles or compare them side-by-side.</p>
      </div>

      {/* Genomic Context Banner */}
      <div className="max-w-5xl mx-auto mb-16 bg-stone-900 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-stone-800 flex flex-col lg:flex-row items-center gap-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        
        <div className="flex-grow flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 flex flex-col items-center">
             <div className="text-emerald-400 font-black text-5xl mb-2">80+</div>
             <div className="text-[10px] font-black text-stone-500 uppercase tracking-[0.2em]">Chromosome-Level Assemblies</div>
          </div>
          <div className="h-[1px] w-12 bg-stone-800 md:h-12 md:w-[1px]"></div>
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-3">The Genomic Elite</h3>
            <p className="text-stone-400 text-sm leading-relaxed italic max-w-xl">
              While genomic sequencing is accelerating, only a small percentage of fungal species have reached the "gold standard" of complete chromosomal mapping. These high-resolution models provide the essential blueprints for all of fungal life.
            </p>
          </div>
        </div>

        <button 
          onClick={onCompare}
          className="w-full lg:w-auto px-10 py-5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-4 whitespace-nowrap group"
        >
          <i className="fa-solid fa-layer-group text-sm group-hover:scale-110 transition-transform"></i>
          Compare Architectures
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {SPECIES_DATA.map((species, index) => (
          <div 
            key={species.id}
            className="bg-white border border-stone-200 rounded-[32px] overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
          >
            {/* Header Plate */}
            <div className="px-8 py-5 border-b border-stone-100 bg-stone-50/50 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-1">Genomic Grade</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < species.difficulty ? 'bg-amber-400' : 'bg-stone-200'}`}></div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-stone-300 font-bold uppercase tracking-widest italic text-right block">FIG. {(index + 1).toFixed(1)}</span>
              </div>
            </div>

            {/* Specimen Signature Box */}
            <div className="h-40 relative bg-stone-900 flex items-center justify-center p-8 overflow-hidden group">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent"></div>
               <div className="w-16 h-16 rounded-full border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500 text-3xl group-hover:scale-110 transition-transform duration-500">
                  <i className="fa-solid fa-dna"></i>
               </div>
               <div className="absolute bottom-4 right-6 text-[10px] font-mono text-stone-500 uppercase tracking-widest italic opacity-40">
                  DNA REF: {species.id.toUpperCase()}
               </div>
            </div>
            
            <div className="p-8 flex-grow flex flex-col">
              <div className="mb-6">
                <p className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">Species Profile</p>
                <h3 className="text-2xl font-black text-stone-900 leading-tight">{species.commonName}</h3>
                <p className="text-xs font-mono text-stone-400 italic mt-1">{species.scientificName}</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center gap-4 text-stone-500 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 border border-stone-100 rounded-lg">
                    <i className="fa-solid fa-microscope text-stone-300"></i>
                    <span>{species.chromosomeCount} CHR</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 border border-stone-100 rounded-lg">
                    <i className="fa-solid fa-database text-stone-300"></i>
                    <span>{species.genomeSize}</span>
                  </div>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">
                  {species.description}
                </p>
              </div>
              
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(species);
                }}
                className="w-full py-4 bg-stone-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-stone-900/10 flex items-center justify-center gap-4 group/btn"
              >
                <span>Initialize Explorer</span>
                <i className="fa-solid fa-arrow-right-long group-hover/btn:translate-x-2 transition-transform"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpeciesSelection;