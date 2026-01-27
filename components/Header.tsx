
import React from 'react';

interface HeaderProps {
  onSpeciesClick: () => void;
  onAboutClick: () => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSpeciesClick, onAboutClick, onReset }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo as a Button */}
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onReset();
          }}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white group-hover:bg-emerald-700 transition-colors">
            <i className="fa-solid fa-dna text-xl"></i>
          </div>
          <div>
            <h1 className="font-bold text-stone-900 leading-tight">Mushroom Explorer</h1>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Genomic Atlas</p>
          </div>
        </button>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onSpeciesClick();
            }}
            className="text-sm font-bold text-stone-600 hover:text-emerald-600 transition-colors uppercase tracking-wider"
          >
            Species
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onAboutClick();
            }}
            className="text-sm font-bold text-stone-600 hover:text-emerald-600 transition-colors uppercase tracking-wider"
          >
            About
          </button>
          <div className="h-4 w-[1px] bg-stone-200"></div>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://mycocosm.jgi.doe.gov/', '_blank', 'noopener,noreferrer');
            }}
            className="text-[10px] font-black text-white bg-stone-900 px-4 py-2 rounded-full hover:bg-stone-800 transition-all uppercase tracking-widest flex items-center gap-2"
          >
            <span>MycoCosm</span>
            <i className="fa-solid fa-external-link opacity-50"></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
