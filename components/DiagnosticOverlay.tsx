
import React, { useState, useEffect } from 'react';
import { SPECIES_DATA } from '../constants';

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

interface DiagnosticOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const DiagnosticOverlay: React.FC<DiagnosticOverlayProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [integrityStatus, setIntegrityStatus] = useState<'IDLE' | 'PASS' | 'FAIL'>('IDLE');
  const [apiKeyPresent, setApiKeyPresent] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      addLog('INFO', 'System Diagnostic Initialized');
      checkIntegrity();
      setApiKeyPresent(!!process.env.API_KEY);
    }
  }, [isOpen]);

  // Listen for global diagnostic events
  useEffect(() => {
    const handleDiagEvent = (e: any) => {
      const { level, message } = e.detail;
      addLog(level, message);
    };
    window.addEventListener('app-diag', handleDiagEvent);
    return () => window.removeEventListener('app-diag', handleDiagEvent);
  }, []);

  const addLog = (level: LogEntry['level'], message: string) => {
    const entry: LogEntry = {
      timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
      level,
      message
    };
    setLogs(prev => [entry, ...prev].slice(0, 50));
  };

  const checkIntegrity = () => {
    addLog('INFO', 'Starting Data Integrity Audit...');
    try {
      let issues = 0;
      SPECIES_DATA.forEach(s => {
        if (s.chromosomes.length !== s.chromosomeCount) {
          addLog('ERROR', `Integrity Fail: ${s.scientificName} count mismatch (${s.chromosomes.length} vs ${s.chromosomeCount})`);
          issues++;
        }
        s.chromosomes.forEach(c => {
          if (!c.beginnerLabel || !c.intermediateLabel || !c.advancedLabel) {
            addLog('WARN', `Data Gap: CHR ${c.id} in ${s.id} missing labels`);
            issues++;
          }
        });
      });

      if (issues === 0) {
        setIntegrityStatus('PASS');
        addLog('SUCCESS', 'All Genomic Constants Validated (GM Ready)');
      } else {
        setIntegrityStatus('FAIL');
        addLog('WARN', `Audit complete with ${issues} observations.`);
      }
    } catch (e) {
      setIntegrityStatus('FAIL');
      addLog('ERROR', `Critical Audit Failure: ${e instanceof Error ? e.message : 'Unknown'}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-stone-950 z-[200] shadow-2xl border-l border-emerald-500/30 flex flex-col font-mono animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 bg-stone-900 border-b border-stone-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <h2 className="text-emerald-500 text-xs font-black uppercase tracking-widest">System Diagnostics</h2>
        </div>
        <button onClick={onClose} className="text-stone-500 hover:text-white transition-colors">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {/* Status Grid */}
      <div className="p-6 grid grid-cols-2 gap-4 border-b border-stone-800">
        <div className="bg-stone-900/50 p-4 rounded-xl border border-stone-800">
          <p className="text-[10px] text-stone-500 uppercase mb-2">API Connectivity</p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${apiKeyPresent ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`}></div>
            <span className="text-xs text-white uppercase">{apiKeyPresent ? 'Active (Ready)' : 'Missing Key'}</span>
          </div>
        </div>
        <div className="bg-stone-900/50 p-4 rounded-xl border border-stone-800">
          <p className="text-[10px] text-stone-500 uppercase mb-2">Integrity Audit</p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${integrityStatus === 'PASS' ? 'bg-emerald-500' : integrityStatus === 'FAIL' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
            <span className="text-xs text-white uppercase">{integrityStatus}</span>
          </div>
        </div>
      </div>

      {/* Log Feed */}
      <div className="flex-grow overflow-hidden flex flex-col p-6">
        <p className="text-[10px] text-stone-500 uppercase mb-4 flex items-center gap-2">
          <i className="fa-solid fa-list-ul"></i>
          Live Event Stream
        </p>
        <div className="flex-grow overflow-y-auto space-y-2 pr-2 custom-diag-scroll">
          {logs.map((log, i) => (
            <div key={i} className="text-[11px] leading-relaxed flex gap-3 group">
              <span className="text-stone-600 flex-shrink-0">[{log.timestamp}]</span>
              <span className={`flex-shrink-0 font-bold ${
                log.level === 'SUCCESS' ? 'text-emerald-500' : 
                log.level === 'ERROR' ? 'text-rose-500' : 
                log.level === 'WARN' ? 'text-amber-500' : 'text-sky-400'
              }`}>
                {log.level.padEnd(7)}
              </span>
              <span className="text-stone-300 break-words">{log.message}</span>
            </div>
          ))}
          {logs.length === 0 && <p className="text-stone-700 italic text-xs">Awaiting signals...</p>}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-stone-800 bg-stone-900/30">
        <button 
          onClick={checkIntegrity}
          className="w-full py-3 border border-emerald-500/50 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-500 hover:text-stone-900 transition-all"
        >
          Re-Run Integrity Scan
        </button>
        <p className="mt-4 text-[9px] text-stone-600 text-center uppercase tracking-tighter">
          Atlas Core v1.6.0 | Build: Release-Candidate
        </p>
      </div>

      <style>{`
        .custom-diag-scroll::-webkit-scrollbar { width: 4px; }
        .custom-diag-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-diag-scroll::-webkit-scrollbar-thumb { background: #292524; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default DiagnosticOverlay;
