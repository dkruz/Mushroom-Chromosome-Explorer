import React, { useState, useEffect } from 'react';
import { Species } from './types';
import Header from './components/Header';
import DikaryonIntro from './components/DikaryonIntro';
import SpeciesSelection from './components/SpeciesSelection';
import KaryotypeExplorer from './components/KaryotypeExplorer';
import ComparativeKaryotyping from './components/ComparativeKaryotyping';
import ResourceModal, { ResourceType } from './components/ResourceModal';
import DiagnosticOverlay from './components/DiagnosticOverlay';

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'selection' | 'explorer' | 'comparison'>('intro');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [activeResource, setActiveResource] = useState<ResourceType | null>(null);
  const [isDiagOpen, setIsDiagOpen] = useState(false);

  const handleToSpecies = () => {
    setStep('selection');
    setSelectedSpecies(null);
    dispatchDiag('INFO', 'Navigation: Returned to Species Selection');
  };

  const handleToAbout = () => {
    setStep('intro');
    dispatchDiag('INFO', 'Navigation: Returned to Intro');
  };

  const handleToComparison = () => {
    setStep('comparison');
    dispatchDiag('INFO', 'Navigation: Entered Comparative Mode');
  };

  const handleSpeciesSelect = (species: Species) => {
    setSelectedSpecies(species);
    setStep('explorer');
    dispatchDiag('SUCCESS', `Specimen Initialized: ${species.scientificName}`);
  };

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const dispatchDiag = (level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR', message: string) => {
    window.dispatchEvent(new CustomEvent('app-diag', { detail: { level, message } }));
  };

  // Keyboard support for internal tools
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveResource(null);
      
      // Hidden trigger for Integrity/QA: Shift + D
      if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        setIsDiagOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header 
        onSpeciesClick={handleToSpecies} 
        onAboutClick={handleToAbout}
        onReset={handleToSpecies} 
      />
      
      <main className="flex-grow">
        {step === 'intro' && (
          <div className="px-4 py-12">
            <DikaryonIntro onContinue={() => setStep('selection')} />
          </div>
        )}
        
        {step === 'selection' && (
          <SpeciesSelection 
            onSelect={handleSpeciesSelect} 
            onCompare={handleToComparison}
          />
        )}
        
        {step === 'explorer' && selectedSpecies && (
          <KaryotypeExplorer 
            species={selectedSpecies} 
            onBack={() => setStep('selection')} 
          />
        )}

        {step === 'comparison' && (
          <ComparativeKaryotyping 
            onBack={() => setStep('selection')}
          />
        )}
      </main>

      <footer className="bg-white border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center text-white">
                    <i className="fa-solid fa-flask text-sm"></i>
                 </div>
                 <h2 className="font-bold text-stone-900">Mushroom Chromosome Explorer</h2>
              </div>
              <p className="text-sm text-stone-500 max-w-md leading-relaxed">
                An educational framework for understanding higher fungi through the lens of genetic mapping and the unique dikaryotic lifecycle.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-4">Authoritative Sources</h3>
              <ul className="space-y-2">
                <li><button type="button" onClick={(e) => handleExternalLink(e, 'https://mycocosm.jgi.doe.gov/')} className="text-sm text-stone-500 hover:text-emerald-600 transition-colors">MycoCosm (DOE JGI)</button></li>
                <li><button type="button" onClick={(e) => handleExternalLink(e, 'https://www.ncbi.nlm.nih.gov/')} className="text-sm text-stone-500 hover:text-emerald-600 transition-colors">NCBI GenBank</button></li>
                <li><button type="button" onClick={(e) => handleExternalLink(e, 'https://www.broadinstitute.org/')} className="text-sm text-stone-500 hover:text-emerald-600 transition-colors">Broad Institute</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-4">Contact & Support</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    type="button" 
                    onClick={() => setActiveResource('documentation')}
                    className="text-sm text-stone-500 hover:text-emerald-600 transition-colors"
                  >
                    Documentation
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => setActiveResource('protocols')}
                    className="text-sm text-stone-500 hover:text-emerald-600 transition-colors"
                  >
                    Lab Protocols
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => setActiveResource('glossary')}
                    className="text-sm text-stone-500 hover:text-emerald-600 transition-colors"
                  >
                    Glossary
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-stone-400">© 2024 Fungal Genomics Consortium. Built for Science Education.</p>
            </div>
            <div className="flex gap-6">
              <i className="fa-brands fa-github text-stone-400 hover:text-stone-600 cursor-pointer"></i>
              <i className="fa-brands fa-twitter text-stone-400 hover:text-stone-600 cursor-pointer"></i>
              <i className="fa-solid fa-envelope text-stone-400 hover:text-stone-600 cursor-pointer"></i>
            </div>
          </div>
        </div>
      </footer>

      {/* Resource Modal Overlay */}
      {activeResource && (
        <ResourceModal 
          type={activeResource} 
          onClose={() => setActiveResource(null)} 
        />
      )}

      {/* Diagnostic System (Hidden by default, triggered by keyboard shortcut) */}
      <DiagnosticOverlay 
        isOpen={isDiagOpen} 
        onClose={() => setIsDiagOpen(false)} 
      />
    </div>
  );
};

export default App;