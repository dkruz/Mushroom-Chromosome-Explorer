import { Species, ChromosomeFunction, ChromosomeData } from './types';

export const FUNCTION_COLORS: Record<ChromosomeFunction, string> = {
  [ChromosomeFunction.REPRODUCTION]: 'bg-purple-500',
  [ChromosomeFunction.METABOLISM]: 'bg-emerald-500',
  [ChromosomeFunction.ARCHITECTURE]: 'bg-amber-500',
  [ChromosomeFunction.DEFENSE]: 'bg-rose-500',
  [ChromosomeFunction.MAINTENANCE]: 'bg-sky-500',
  [ChromosomeFunction.UNKNOWN]: 'bg-slate-400',
};

export const SPECIES_DATA: Species[] = [
  {
    id: 's-commune',
    scientificName: 'Schizophyllum commune',
    commonName: 'Split Gill',
    chromosomeCount: 14,
    genomeSize: '38.5 Mb',
    focus: 'Mating complexity & Wood rot',
    difficulty: 5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Schizophyllum_commune_G2.jpg/800px-Schizophyllum_commune_G2.jpg',
    description: 'A global wood-decay fungus known for having over 23,000 different mating types and complex CAZyme profiles.',
    technicalSynopsis: {
      basePairs: '38.5–41.1 Million (Mb)',
      geneCount: '13,210–13,386',
      strainRef: 'H4-8 (Ref) / IUM1114-SS01',
      gcContent: '~57%',
      repeatContent: '11.2%',
      assemblyNote: 'Mapped to 14 distinct chromosomes via 36 scaffolds in H4-8.'
    },
    chromosomes: Array.from({ length: 14 }, (_, i) => {
      const id = i + 1;
      if (id === 1) return {
        id, primaryFunction: ChromosomeFunction.REPRODUCTION, title: 'Chromosome 1',
        beginnerLabel: 'Identity (A-Locus)', intermediateLabel: 'MAT-A Complex', advancedLabel: 'Homeodomain HD1/HD2',
        description: 'The master identity switch. Determines compatibility and triggers clamp connection formation.',
        isHighlight: true,
        genes: [
          {
            id: 'hd1', name: 'HD1 Architect', technicalName: 'HD1-1', category: 'Transcription Factor',
            location: 'Locus 1.1A', description: 'Tells the cell: "We have a partner!"',
            technicalDescription: 'Homeodomain protein that forms a heterodimer to initiate dikaryotic development.'
          },
          {
            id: 'hd2', name: 'HD2 Architect', technicalName: 'HD2-1', category: 'Transcription Factor',
            location: 'Locus 1.1B', description: 'The second half of the identity key.',
            technicalDescription: 'Pairs with HD1 to bind specific DNA motifs triggering sexual morphogenesis.'
          }
        ]
      };
      if (id === 2) return {
        id, primaryFunction: ChromosomeFunction.METABOLISM, title: 'Chromosome 2',
        beginnerLabel: 'Wood-rot Factory A', intermediateLabel: 'CAZyme Cluster Alpha', advancedLabel: 'Cellulolytic Machinery I',
        description: 'Part of the primary chemical library used to degrade complex wood polymers like cellulose.',
        isHighlight: true,
        genes: [
          {
            id: 'cbh1', name: 'Cellulose Snippers', technicalName: 'GH7-CBH1', category: 'CAZyme',
            location: 'Locus 2.45', description: 'Sharp chemical scissors for long wood fibers.',
            technicalDescription: 'Cellobiohydrolase I; acts processively on the reducing ends of cellulose.'
          }
        ]
      };
      return {
        id, primaryFunction: ChromosomeFunction.MAINTENANCE, title: `Chromosome ${id}`,
        beginnerLabel: 'Housekeeping', intermediateLabel: 'Cell Metabolism', advancedLabel: 'Basal Expression',
        description: 'Handles basic survival functions and DNA repair.'
      };
    })
  },
  {
    id: 'c-cinerea',
    scientificName: 'Coprinopsis cinerea',
    commonName: 'Inky Cap',
    chromosomeCount: 13,
    genomeSize: '37 Mb',
    focus: 'Development & Meiosis',
    difficulty: 3,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Coprinopsis_cinerea_G1.jpg/800px-Coprinopsis_cinerea_G1.jpg',
    description: 'A model organism for studying fungal development, specifically synchronous meiosis and cap differentiation.',
    technicalSynopsis: {
      basePairs: '36.0–37.5 Million (Mb)',
      geneCount: '13,342–15,250',
      strainRef: 'Broad / Hybrid Assemblies',
      gcContent: 'N/A',
      repeatContent: 'N/A',
      assemblyNote: 'Mapped to 13 chromosomes; physical sizes range from 1 to 5 Mb.'
    },
    chromosomes: Array.from({ length: 13 }, (_, i) => {
      const id = i + 1;
      if (id === 10) return {
        id, primaryFunction: ChromosomeFunction.DEFENSE, title: 'Chromosome 10',
        beginnerLabel: 'Auto-Digest System', intermediateLabel: 'Autolysis Mechanism', advancedLabel: 'Chitinase Cascade Cluster',
        description: 'Houses the "suicide program" genes that trigger cell wall breakdown, dissolving the mushroom into ink.',
        isHighlight: true,
        genes: [
          {
            id: 'chi1', name: 'Ink Maker', technicalName: 'CHI-18', category: 'Chitinase',
            location: 'Locus 10.8', description: 'Dissolves the cap into liquid ink to spread spores.',
            technicalDescription: 'High-activity chitinase that catalyzes the hydrolytic cleavage of chitin in cell walls.'
          }
        ]
      };
      return {
        id, primaryFunction: ChromosomeFunction.METABOLISM, title: `Chromosome ${id}`,
        beginnerLabel: 'Blueprint', intermediateLabel: 'Core Genomics', advancedLabel: 'Syntenic Region',
        description: 'Part of the stable core genome for cap development.'
      };
    })
  },
  {
    id: 'a-bisporus',
    scientificName: 'Agaricus bisporus',
    commonName: 'Button Mushroom',
    chromosomeCount: 13,
    genomeSize: '30 Mb+',
    focus: 'Commercial traits & Browning',
    difficulty: 1,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Agaricus_bisporus_01.jpg/800px-Agaricus_bisporus_01.jpg',
    description: 'The world\'s most significant edible mushroom, optimized for mass commercial production and agricultural resilience.',
    technicalSynopsis: {
      basePairs: '30.39–33.03 Million (Mb)',
      geneCount: '10,438–13,030',
      strainRef: 'H97 (Ref) / KMCC00540 / ARP23',
      gcContent: 'N/A',
      repeatContent: 'N/A',
      assemblyNote: '13 chromosomes confirmed; reference H97 assembly covers 30.39 Mb.'
    },
    chromosomes: Array.from({ length: 13 }, (_, i) => {
      const id = i + 1;
      if (id === 5) return {
        id, primaryFunction: ChromosomeFunction.DEFENSE, title: 'Chromosome 5',
        beginnerLabel: 'Browning/Bruising', intermediateLabel: 'Melanin Pathway', advancedLabel: 'AbPPO Gene Cluster',
        description: 'Responsible for creating melanin "scabs" when cells are damaged.',
        isHighlight: true,
        genes: [
          {
            id: 'ppo1', name: 'Bruise Switch', technicalName: 'PPO-1', category: 'Oxidase',
            location: 'Locus 5.12', description: 'Turns the mushroom brown when touched to keep bacteria out.',
            technicalDescription: 'Polyphenol oxidase involved in the oxidation of phenols to quinones.'
          }
        ]
      };
      return {
        id, primaryFunction: ChromosomeFunction.METABOLISM, title: `Chromosome ${id}`,
        beginnerLabel: 'Nutrient Intake', intermediateLabel: 'Core Metabolism', advancedLabel: 'Primary Expression',
        description: 'Genes focused on general nutrient extraction and growth.'
      };
    })
  }
];