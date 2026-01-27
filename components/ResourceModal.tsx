import React from 'react';

export type ResourceType = 'documentation' | 'protocols' | 'glossary';

interface ResourceModalProps {
  type: ResourceType;
  onClose: () => void;
}

const ResourceModal: React.FC<ResourceModalProps> = ({ type, onClose }) => {
  const content = {
    documentation: {
      title: "System Documentation",
      subtitle: "Fungal Genomic Architecture",
      sections: [
        {
          h: "1. Base Pairs (The Code)",
          p: "Fundamental units of DNA (A-T / G-C). Fungal genomes are relatively compact, typically 7 to 40 million base pairs (Mb). This efficiency allows for rapid cellular response and metabolic adaptation compared to the 3,000 million base pairs found in humans."
        },
        {
          h: "2. Genes (The Instructions)",
          p: "Discrete segments coding for proteins or RNA. Fungi exhibit high gene density and unique 'Gene Clusters'—grouped genes for specific metabolic pathways (like wood decay or toxin synthesis) that are often inherited as a single functional unit."
        },
        {
          h: "3. Chromosomes (The Containers)",
          p: "Organized DNA-protein structures ensuring stable inheritance. While chromosome numbers vary widely (3 in some yeasts to 30+ in mycorrhizae), fungi often utilize specialized Accessory Chromosomes to carry non-essential but advantageous traits like drug resistance."
        },
        {
          h: "MADS-box: Morphogenetic Architects",
          p: "A critical family of genes that govern mushroom tissue differentiation. They act as the high-level switchboard, deciding when mycelium transforms into the complex structures of gills, stems, and caps."
        },
        {
          h: "Reliability & Data Sources",
          p: "Species metrics and karyotypes are derived from the JGI MycoCosm database and peer-reviewed fungal genomics literature. The AI Analyst provides inferred scientific insights based on these established genomic addresses."
        }
      ]
    },
    protocols: {
      title: "Lab Protocols",
      subtitle: "Standard Procedures for Higher Fungi",
      sections: [
        {
          h: "Dikaryon Isolation",
          p: "Procedure for verifying the presence of clamp connections under 400x magnification to confirm successfully paired parental nuclei."
        },
        {
          h: "DNA Extraction",
          p: "CTAB-based protocol optimized for polysaccharide-rich fungal tissue to ensure high-purity template for whole-genome sequencing."
        },
        {
          h: "Targeted Editing (CRISPR-Cas9)",
          p: "Protocol for utilizing genomic addresses (loci) to perform precision editing. Enables the validation of gene function and the systematic engineering of fungal physiological traits."
        }
      ]
    },
    glossary: {
      title: "Genomic Glossary",
      subtitle: "Terminology of Fungal Genetics",
      sections: [
        {
          h: "Accessory Chromosomes",
          p: "Non-essential 'B-chromosomes' that can be exchanged between strains via horizontal transfer. They frequently carry genes related to pathogenicity, virulence, or environmental stress tolerance."
        },
        {
          h: "Ploidy (n vs 2n)",
          p: "The count of chromosome sets. Most fungi are haploid (n) for the majority of their lifecycle, though higher mushrooms maintain a prolonged dikaryotic (n+n) state before brief diploidy (2n)."
        },
        {
          h: "Dikaryon (n+n)",
          p: "A unique fungal state where a cell contains two separate, genetically distinct haploid nuclei that function in parallel without merging."
        },
        {
          h: "Locus (pl. Loci)",
          p: "The specific physical location of a gene or DNA sequence on a chromosome, essentially a genomic 'address'."
        },
        {
          h: "MAT-Locus",
          p: "The mating-type locus; a chromosomal region that determines sexual compatibility and identity between individuals."
        },
        {
          h: "Autolysis",
          p: "Programmed self-digestion of tissue, notably used by Inky Caps (C. cinerea) to dissolve the cap into fluid for spore release."
        }
      ]
    }
  }[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] animate-in zoom-in-95 duration-300 border border-stone-200">
        <div className="w-full md:w-72 bg-stone-900 p-10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-8">
              <i className={`fa-solid ${type === 'documentation' ? 'fa-book' : type === 'protocols' ? 'fa-flask-vial' : 'fa-language'} text-xl`}></i>
            </div>
            <h2 className="text-white text-3xl font-black uppercase tracking-tight leading-none mb-2">{content.title}</h2>
            <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest leading-relaxed">
              {content.subtitle}
            </p>
          </div>
          <div className="hidden md:block">
            <p className="text-stone-500 text-[9px] font-mono leading-relaxed">
              Ref: FG-Atlas-v1.7.0<br/>
              Educational & Scientific Resource
            </p>
          </div>
        </div>
        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="p-8 md:p-12 overflow-y-auto">
            <div className="space-y-12">
              {content.sections.map((section, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                  <h3 className="text-stone-900 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-emerald-500"></span>
                    {section.h}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed max-w-xl">
                    {section.p}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 border-t border-stone-100 bg-stone-50/50 flex justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-stone-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-600 transition-all"
            >
              Close Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;