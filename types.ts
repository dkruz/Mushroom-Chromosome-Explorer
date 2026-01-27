export enum EducationalLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum ChromosomeFunction {
  REPRODUCTION = 'REPRODUCTION',
  METABOLISM = 'METABOLISM',
  ARCHITECTURE = 'ARCHITECTURE',
  DEFENSE = 'DEFENSE',
  MAINTENANCE = 'MAINTENANCE',
  UNKNOWN = 'UNKNOWN'
}

export interface Gene {
  id: string;
  name: string;
  technicalName?: string;
  category: string;
  description: string;
  technicalDescription: string;
  location: string; // e.g. "Locus 42.1"
}

export interface ChromosomeData {
  id: number;
  primaryFunction: ChromosomeFunction;
  title: string;
  beginnerLabel: string;
  intermediateLabel: string;
  advancedLabel: string;
  description: string;
  genes?: Gene[];
  isHighlight?: boolean;
}

export interface TechnicalSynopsis {
  basePairs: string;
  geneCount: string;
  strainRef: string;
  gcContent: string;
  repeatContent: string;
  assemblyNote: string;
}

export interface Species {
  id: string;
  scientificName: string;
  commonName: string;
  chromosomeCount: number;
  genomeSize: string;
  focus: string;
  difficulty: number;
  chromosomes: ChromosomeData[];
  description: string;
  image: string;
  technicalSynopsis?: TechnicalSynopsis;
}