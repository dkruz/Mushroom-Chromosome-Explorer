
import React from 'react';

interface MushroomDrawingProps {
  speciesId: string;
  size?: 'small' | 'large';
  className?: string;
}

const MushroomDrawing: React.FC<MushroomDrawingProps> = ({ speciesId, size = 'large', className = '' }) => {
  const isLarge = size === 'large';
  const strokeWidth = isLarge ? 1.5 : 2;
  const color = "currentColor";

  const renderPaths = () => {
    switch (speciesId) {
      case 's-commune': // Split Gill: Fan-like clusters
        return (
          <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 85 Q50 60 20 40 Q15 35 25 30 Q40 25 55 45" />
            <path d="M50 85 Q55 60 85 45 Q90 40 80 35 Q65 30 50 50" />
            <path d="M50 85 Q45 70 35 60 Q30 55 40 50 Q50 45 55 65" />
            <path d="M50 85 Q55 70 65 60 Q70 55 60 50 Q50 45 45 65" />
            {/* Gills detail */}
            <path d="M30 42 L35 48" opacity="0.4" />
            <path d="M70 47 L65 53" opacity="0.4" />
            <path d="M40 33 L43 38" opacity="0.4" />
            <path d="M60 33 L57 38" opacity="0.4" />
          </g>
        );
      case 'c-cinerea': // Inky Cap: Tall, slender, dripping
        return (
          <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 90 L50 45" /> {/* Stem */}
            <path d="M48 90 L48 50" opacity="0.5" />
            <path d="M52 90 L52 50" opacity="0.5" />
            <path d="M35 50 Q35 25 50 20 Q65 25 65 50 Q65 55 50 55 Q35 55 35 50 Z" /> {/* Cap */}
            <path d="M40 54 L40 60" /> {/* Drips */}
            <path d="M50 54 L50 65" />
            <path d="M60 54 L60 58" />
            <path d="M42 30 Q50 28 58 30" opacity="0.3" /> {/* Texture */}
          </g>
        );
      case 'a-bisporus': // Button Mushroom: Short, round, stout
        return (
          <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M40 85 Q40 70 45 65 L55 65 Q60 70 60 85" /> {/* Stem */}
            <path d="M20 50 Q20 20 50 20 Q80 20 80 50 Q80 65 50 65 Q20 65 20 50 Z" /> {/* Cap */}
            <path d="M25 50 Q50 48 75 50" opacity="0.4" /> {/* Underside line */}
            <path d="M45 75 L55 75" opacity="0.4" />
          </g>
        );
      default:
        return <circle cx="50" cy="50" r="30" stroke={color} fill="none" />;
    }
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${isLarge ? 'w-48 h-48' : 'w-full h-full'} ${className}`}
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}
    >
      <defs>
        <style>
          {`
            @keyframes draw {
              to { stroke-dashoffset: 0; }
            }
            .mushroom-path path {
              stroke-dasharray: 200;
              stroke-dashoffset: 200;
              animation: draw 1.5s ease-out forwards;
            }
          `}
        </style>
      </defs>
      <g className="mushroom-path">
        {renderPaths()}
      </g>
    </svg>
  );
};

export default MushroomDrawing;
