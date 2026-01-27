
import React from 'react';

interface DikaryonIntroProps {
  onContinue: () => void;
}

const DikaryonIntro: React.FC<DikaryonIntroProps> = ({ onContinue }) => {
  return (
    <div className="bg-white border border-stone-200 rounded-[40px] overflow-hidden shadow-sm max-w-5xl mx-auto my-8">
      <div className="p-10 md:p-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Biological Fundamental</span>
          <div className="h-[1px] flex-grow bg-stone-100"></div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-8 tracking-tight uppercase">The Dikaryon Foundation</h2>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-stone-500 text-lg leading-relaxed">
              Unlike human cells, which merge two sets of DNA into one nucleus, higher fungi maintain <span className="text-stone-900 font-bold border-b-2 border-emerald-400">two separate, genetically distinct nuclei</span> in every cell.
            </p>
            <p className="text-stone-500 text-lg leading-relaxed italic">
              Imagine two specialized architects living in the same studio, each managing their own unique set of blueprints for the collective structure.
            </p>
            
            <div className="pt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-stone-50 px-4 py-3 rounded-2xl border border-stone-100">
                <div className="w-4 h-4 rounded-full bg-blue-500 shadow-md shadow-blue-500/30"></div>
                <span className="text-xs font-black text-stone-700 uppercase tracking-wider">Nucleus A</span>
              </div>
              <div className="flex items-center gap-3 bg-stone-50 px-4 py-3 rounded-2xl border border-stone-100">
                <div className="w-4 h-4 rounded-full bg-rose-500 shadow-md shadow-rose-500/30"></div>
                <span className="text-xs font-black text-stone-700 uppercase tracking-wider">Nucleus B</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-stone-50 rounded-[60px] border border-stone-200 flex items-center justify-center p-12 overflow-hidden">
              {/* Parchment texture background */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-1/2 h-1/2 rounded-full bg-blue-500/10 border-2 border-dashed border-blue-300 absolute -translate-x-6 flex items-center justify-center">
                   <div className="w-6 h-6 rounded-full bg-blue-500 shadow-xl shadow-blue-500/50"></div>
                </div>
                <div className="w-1/2 h-1/2 rounded-full bg-rose-500/10 border-2 border-dashed border-rose-300 absolute translate-x-6 flex items-center justify-center">
                   <div className="w-6 h-6 rounded-full bg-rose-500 shadow-xl shadow-rose-500/50"></div>
                </div>
                <div className="absolute inset-0 border-4 border-stone-200 rounded-full scale-125 opacity-20"></div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-stone-900 text-white p-6 rounded-3xl shadow-2xl max-w-[220px]">
              <p className="text-[10px] leading-relaxed">
                <span className="font-black text-emerald-400 block mb-2 uppercase tracking-[0.2em]">Condition: n + n</span>
                A prolonged lifecycle stage where parental genomes function in parallel without nuclear fusion.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onContinue();
            }}
            className="w-full bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.3em] py-6 rounded-2xl hover:bg-emerald-700 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-2xl shadow-emerald-600/30 flex items-center justify-center gap-4"
          >
            Enter Species Explorer
            <i className="fa-solid fa-microscope text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DikaryonIntro;
