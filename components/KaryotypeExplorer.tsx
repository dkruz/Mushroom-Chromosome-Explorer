import React, { useState, useEffect, useRef } from 'react';
import { Species, ChromosomeData, EducationalLevel, ChromosomeFunction } from '../types';
import { FUNCTION_COLORS } from '../constants';
import LevelToggle from './LevelToggle';
import MushroomDrawing from './MushroomDrawing';
import GeneDeepDive from './GeneDeepDive';
import { GoogleGenAI } from "@google/genai";

interface KaryotypeExplorerProps {
  species: Species;
  onBack: () => void;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// 1. Optimized Genomic Terminal with Instructional Handshake
const GenomicTerminal: React.FC<{ selectedChr: ChromosomeData | null; speciesId: string; level: EducationalLevel }> = React.memo(({ selectedChr, speciesId, level }) => {
  const [streamBuffer, setStreamBuffer] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);
  const streamEndRef = useRef<HTMLDivElement>(null);
  const streamIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    
    setIsSyncing(true);
    const initialMsgs = [
      '>> INITIALIZING DATA LINK...',
      '>> TARGET: DOE JGI MYCOCOSM DATABASE',
      `>> ACCESSING REF: ${speciesId.toUpperCase()}`,
      selectedChr 
        ? `>> SYNCING CHR_${selectedChr.id} MAP...` 
        : '>> GLOBAL ASSEMBLY SCAN...',
      selectedChr 
        ? '>> ACTION: ENGAGE [DEEP DIVE] FOR MOLECULAR ANALYSIS' 
        : '>> STATUS: SCANNING TOTAL ARCHITECTURE',
      '>> HANDSHAKE COMPLETE: DATA FLOWING'
    ];
    
    setStreamBuffer(initialMsgs);

    const functionalTags = [
      'LOCUS_SYNC', 'POLY_A_SIGNAL', 'TATA_BOX_FOUND', 
      'INTRON_SPLICING', 'EXON_MATCH', 'MADS_BOX_INIT',
      'RECOMB_SUPPRESS', 'ENZYME_ENCODE', 'HYDROPHOBIN_EXPR'
    ];

    const globalMeta = [
      'SCAN_REFERENCE_GENOME', 'ALIGNMENT_OK', 'POL_II_SYNC', 
      'TELOMERE_BOUND', 'SNP_MAP_ACTIVE', 'SCAFFOLD_VERIFIED',
      'KARYOTYPE_STABLE', 'MITOCHONDRIAL_SYNC'
    ];

    const timer = setTimeout(() => {
      setIsSyncing(false);
      const tickRate = selectedChr ? 250 : 500;
      streamIntervalRef.current = window.setInterval(() => {
        setStreamBuffer(prev => {
          let newItem = '';
          if (selectedChr) {
            const isHeader = Math.random() > 0.92;
            const isTag = Math.random() > 0.4;
            if (isHeader) {
              newItem = `>seq|${speciesId.toUpperCase()}|CHR_${selectedChr.id}_LOC_${Math.floor(Math.random()*1000)}`;
            } else if (isTag) {
              newItem = `[${functionalTags[Math.floor(Math.random() * functionalTags.length)]}]`;
            } else {
              newItem = Array.from({length: 8}, () => ['A','C','G','T'][Math.floor(Math.random() * 4)]).join('');
            }
          } else {
            const isMeta = Math.random() > 0.7;
            newItem = isMeta 
              ? `[${globalMeta[Math.floor(Math.random() * globalMeta.length)]}]`
              : `ADDR_0x${Math.floor(Math.random()*10000).toString(16).toUpperCase()}`;
          }

          const next = [...prev, newItem];
          return next.length > 60 ? next.slice(1) : next;
        });
      }, tickRate);
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, [selectedChr, speciesId]);

  useEffect(() => {
    if (streamEndRef.current) {
      streamEndRef.current.scrollTop = streamEndRef.current.scrollHeight;
    }
  }, [streamBuffer]);

  return (
    <div className="flex flex-col h-full font-mono p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${!isSyncing ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`}></div>
          <span className="text-[10px] font-black text-emerald-500/70 uppercase tracking-widest">
            {isSyncing ? 'JGI_MYCOCOSM_LINKING...' : (selectedChr ? `PROTOCOL: MOLECULAR_SEQ` : 'PROTOCOL: ASSEMBLY_SCAN')}
          </span>
        </div>
        <div className="text-[9px] text-emerald-900/50 font-bold uppercase">Source: DOE_JGI</div>
      </div>
      
      <div ref={streamEndRef} className="flex-grow overflow-y-auto custom-scroll space-y-2 text-[11px] leading-tight">
        <div className="flex flex-col gap-2 opacity-90">
          {streamBuffer.map((item, i) => (
            <div key={i} className={`
              ${item.startsWith('>>') ? 'text-emerald-400 font-black animate-pulse-soft mb-1' : ''}
              ${item.startsWith('>') && !item.startsWith('>>') ? 'text-amber-500 font-bold border-l border-amber-500/30 pl-2 mt-1' : ''}
              ${item.startsWith('[') ? 'text-emerald-400 font-bold' : ''}
              ${!item.startsWith('>') && !item.startsWith('[') ? 'text-emerald-800 break-all pl-2 opacity-50' : ''}
            `}>
              {item}
            </div>
          ))}
          <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse ml-2 mt-1"></span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-emerald-900/30 flex justify-between items-center">
        <span className="text-[9px] text-emerald-900 font-bold uppercase tracking-widest">
          {level === EducationalLevel.BEGINNER ? 'MAPPING LIFE BLUEPRINTS' : `SYNC: ${selectedChr ? 'LOCKED' : 'SEARCHING'}`}
        </span>
        <span className="text-[9px] text-emerald-900 font-bold uppercase tracking-widest italic">
          {selectedChr ? `CHR_MAP_${selectedChr.id}` : 'SYSTEM_IDLE'}
        </span>
      </div>
    </div>
  );
});

const KaryotypeExplorer: React.FC<KaryotypeExplorerProps> = ({ species, onBack }) => {
  const [selectedChr, setSelectedChr] = useState<ChromosomeData | null>(null);
  const [level, setLevel] = useState<EducationalLevel>(EducationalLevel.BEGINNER);
  const [isAiMode, setIsAiMode] = useState(false);
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsAiMode(false);
    setIsDeepDiveOpen(false);
    setChatHistory([]);
    
    // Show hint when a chromosome is selected, but only if not dismissed before
    if (selectedChr && !hintDismissed) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedChr, hintDismissed]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const getLabel = (chr: ChromosomeData) => {
    switch (level) {
      case EducationalLevel.ADVANCED: return chr.advancedLabel;
      case EducationalLevel.INTERMEDIATE: return chr.intermediateLabel;
      default: return chr.beginnerLabel;
    }
  };

  const handleAiConsult = async () => {
    if (!selectedChr) return;
    setIsAiMode(true);
    if (chatHistory.length === 0) {
      const initialPrompt = `As an expert mycologist, provide a brief, 2-sentence fascinating insight about Chromosome ${selectedChr.id} (${getLabel(selectedChr)}) in ${species.scientificName}. Mention its role in ${selectedChr.primaryFunction.toLowerCase()}.`;
      await sendMessageToAi(initialPrompt, true);
    }
  };

  const handleDeepDiveTrigger = () => {
    setIsDeepDiveOpen(true);
    setHintDismissed(true);
    setShowHint(false);
  };

  const sendMessageToAi = async (text: string, isInitial = false) => {
    if (!text.trim() || isAiLoading) return;
    if (!process.env.API_KEY) {
      setChatHistory(prev => [...prev, { role: 'model', text: "Genomic Hub unreachable: API Key missing." }]);
      return;
    }
    if (!isInitial) {
      setChatHistory(prev => [...prev, { role: 'user', text }]);
      setChatInput('');
    }
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: text,
        config: {
          systemInstruction: `You are a specialized Genomic AI Analyst for a mycological research platform. Specimen: ${species.scientificName}. Current Focus: Chromosome ${selectedChr?.id}. Level: ${level}. Responses must be concise, expert-level, and formatted in Markdown where helpful.`,
          temperature: 0.7,
        },
      });
      setChatHistory(prev => [...prev, { role: 'model', text: response.text || "Consultation complete." }]);
    } catch (error: any) {
      setChatHistory(prev => [...prev, { role: 'model', text: "Error contacting Genomic AI Hub." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors shadow-sm">
            <i className="fa-solid fa-arrow-left text-stone-600"></i>
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl border border-stone-100 flex items-center justify-center p-2 shadow-sm">
               <MushroomDrawing speciesId={species.id} size="small" className="text-stone-900" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tight">{species.commonName}</h2>
              <p className="text-sm font-mono text-stone-400 italic">{species.scientificName}</p>
            </div>
          </div>
        </div>
        <LevelToggle currentLevel={level} onLevelChange={setLevel} />
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="bg-white border border-stone-200 rounded-[40px] p-10 shadow-sm relative overflow-hidden flex flex-col min-h-[600px]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] block mb-2">Genomic Profile</span>
                <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight">Chromosome Map</h3>
              </div>
              <div className="group relative">
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/50 px-3 py-1.5 rounded-full cursor-help">
                  <i className="fa-solid fa-award text-amber-500 text-[10px]"></i>
                  <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">Official Record</span>
                </div>
                {level === EducationalLevel.BEGINNER && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-stone-900 text-white p-4 rounded-2xl text-[10px] leading-relaxed z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-stone-800">
                    <p className="font-bold text-amber-400 mb-2 uppercase tracking-widest">Sourced from MycoCosm (JGI)</p>
                    This information comes from the Department of Energy's Joint Genome Institute, the world's most trusted library for mushroom DNA data.
                  </div>
                )}
              </div>
            </div>

            {species.technicalSynopsis && (
              <div className="mb-10 bg-stone-50 border border-stone-200 rounded-3xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div>
                   <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Assembly</p>
                   <p className="text-sm font-mono font-bold text-stone-900">{species.technicalSynopsis.basePairs}</p>
                 </div>
                 <div>
                   <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Gene Count</p>
                   <p className="text-sm font-mono font-bold text-stone-900">{species.technicalSynopsis.geneCount}</p>
                 </div>
                 <div>
                   <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">GC Content</p>
                   <p className="text-sm font-mono font-bold text-stone-900">{species.technicalSynopsis.gcContent}</p>
                 </div>
                 <div>
                   <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Ref Strain</p>
                   <p className="text-xs font-bold text-stone-900 truncate">{species.technicalSynopsis.strainRef}</p>
                 </div>
              </div>
            )}

            <div className="flex flex-wrap items-end gap-x-6 gap-y-12 flex-grow mb-10">
              {species.chromosomes.map((chr) => {
                const isSelected = selectedChr?.id === chr.id;
                const height = 180 + (chr.id % 5) * 30;
                return (
                  <button key={chr.id} onClick={() => setSelectedChr(chr)} className="flex flex-col items-center group relative outline-none">
                    <div className="mb-2">
                       <span className={`text-[10px] font-black transition-colors ${isSelected ? 'text-emerald-600' : 'text-stone-400'}`}>CHR {chr.id}</span>
                    </div>
                    <div className={`w-6 rounded-full transition-all duration-300 relative ${isSelected ? 'ring-4 ring-emerald-500/20 shadow-lg' : ''} ${FUNCTION_COLORS[chr.primaryFunction]}`} style={{ height: `${height}px` }}>
                      {chr.isHighlight && <div className="absolute top-1/4 left-0 right-0 h-4 bg-white/40 border-y border-black/10"></div>}
                      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-black/20 -translate-y-1/2"></div>
                    </div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[9px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest z-10">
                      {getLabel(chr)}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-6 border-t border-stone-100 flex flex-wrap gap-x-8 gap-y-4">
              {Object.values(ChromosomeFunction).filter(f => f !== 'UNKNOWN').map((func) => (
                <div key={func} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${FUNCTION_COLORS[func as ChromosomeFunction]}`}></div>
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{func}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8 flex flex-col h-full min-h-[600px]">
          {selectedChr ? (
            <div className="bg-stone-900 rounded-[40px] p-8 text-white shadow-xl relative overflow-hidden flex-shrink-0 animate-in slide-in-from-bottom-4">
               <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Active Unit</span>
                  <span className="text-stone-500 font-mono text-[10px] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    SYNCED_TO_MYCOCOSM
                  </span>
                </div>
                <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">{getLabel(selectedChr)}</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-6 line-clamp-2">{selectedChr.description}</p>
                
                <div className="grid grid-cols-2 gap-4 relative">
                  <button onClick={handleAiConsult} className="bg-emerald-600 hover:bg-emerald-500 text-white py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    AI Hub
                  </button>
                  <button onClick={handleDeepDiveTrigger} className="bg-stone-800 hover:bg-stone-700 text-white py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                    <i className="fa-solid fa-magnifying-glass-chart"></i>
                    Deep Dive
                  </button>

                  {/* Ghost Hint Tooltip */}
                  {showHint && (
                    <div className="absolute top-full left-0 right-0 pt-4 animate-in fade-in slide-in-from-top-2 duration-700 pointer-events-none">
                       <div className="bg-emerald-500 text-stone-950 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-center shadow-lg flex items-center justify-center gap-2">
                         <i className="fa-solid fa-arrow-up animate-bounce"></i>
                         Inspect molecular loci in Deep Dive
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 border border-stone-200 rounded-[40px] p-8 flex items-center justify-center text-center flex-shrink-0 h-48 border-dashed">
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-2">Monitor Standby</p>
                <p className="text-sm text-stone-500 font-medium italic">Select a chromosome segment to focus analysis</p>
              </div>
            </div>
          )}

          <div className="flex-grow bg-stone-950 border border-emerald-900/30 rounded-[40px] overflow-hidden shadow-inner flex flex-col relative transition-colors duration-500">
            {isAiMode ? (
              <div className="flex flex-col h-full bg-white text-stone-900 animate-in fade-in zoom-in-95">
                <div className="px-8 py-4 bg-stone-50 border-b border-stone-100 flex justify-between items-center">
                   <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                     <i className="fa-solid fa-brain text-emerald-500"></i>
                     AI Consultant
                   </span>
                   <button onClick={() => setIsAiMode(false)} className="text-[10px] font-black text-stone-400 hover:text-stone-900">RETURN TO STREAM</button>
                </div>
                <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scroll">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-stone-900 text-white rounded-tr-none' : 'bg-stone-100 text-stone-800 rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isAiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-stone-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                        <div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.5s]"></div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div className="p-4 border-t border-stone-100">
                   <form onSubmit={(e) => { e.preventDefault(); sendMessageToAi(chatInput); }} className="flex gap-2">
                     <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Inquire about genomic loci..." className="flex-grow border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                     <button type="submit" className="w-12 h-12 bg-stone-900 text-white rounded-xl flex items-center justify-center"><i className="fa-solid fa-paper-plane"></i></button>
                   </form>
                </div>
              </div>
            ) : (
              < GenomicTerminal selectedChr={selectedChr} speciesId={species.id} level={level} />
            )}
          </div>
        </div>
      </div>

      {isDeepDiveOpen && selectedChr && (
        <GeneDeepDive 
          chromosome={selectedChr} 
          level={level} 
          onClose={() => setIsDeepDiveOpen(false)} 
        />
      )}
    </div>
  );
};

export default KaryotypeExplorer;