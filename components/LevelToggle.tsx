
import React from 'react';
import { EducationalLevel } from '../types';

interface LevelToggleProps {
  currentLevel: EducationalLevel;
  onLevelChange: (level: EducationalLevel) => void;
}

const LevelToggle: React.FC<LevelToggleProps> = ({ currentLevel, onLevelChange }) => {
  const levels = [
    { id: EducationalLevel.BEGINNER, label: 'Beginner', icon: 'fa-seedling' },
    { id: EducationalLevel.INTERMEDIATE, label: 'Intermediate', icon: 'fa-tree' },
    { id: EducationalLevel.ADVANCED, label: 'Advanced', icon: 'fa-flask' },
  ];

  return (
    <div className="bg-stone-100 p-1.5 rounded-2xl flex items-center gap-1">
      {levels.map((level) => (
        <button
          key={level.id}
          onClick={() => onLevelChange(level.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            currentLevel === level.id 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          <i className={`fa-solid ${level.icon} text-xs ${currentLevel === level.id ? 'text-emerald-500' : ''}`}></i>
          {level.label}
        </button>
      ))}
    </div>
  );
};

export default LevelToggle;
