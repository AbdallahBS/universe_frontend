/**
 * School Types
 * Generic type definitions for higher education schools.
 * Reusable across all platform sections (cycle ingénieur, orientation, comparison, etc.)
 */

export interface DetailedSpecialty {
  name: string;
  code: string;
  license?: string[] | string;
  description: string;
  planEtudeUrl: string;
  duration: string;
  capacity: number;
  lastAcceptableScore: number;
}

export interface ScoreEntry {
  specialty: string;
  code: string;
  lastAcceptableScore: number;
  places: number;
}

export interface School {
  _id: string;
  schoolId: string;
  name: string;
  fullName: string;
  location: string;
  type: 'specifique' | 'independant' | 'ressource-pedagogique';
  image: string;
  logo?: string;
  description: string;
  specialties: string[];
  detailedSpecialties: DetailedSpecialty[];
  lastYearScores: {
    year: number;
    detailedScores: ScoreEntry[];
  };
  concoursStatus: 'launched' | 'not-launched' | 'closed' | 'results-published';
  concoursWebsite?: string;
  annexeRangUrl?: string;
  candidatureGuideUrl?: string;
  website: string;
  establishedYear: number;
  studentsCount: number;
  ranking?: number;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  gallery: string[];
  facilities: string[];
  partnerships: string[];
  university: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScoreComponent {
  subject: string;
  coefficient: number;
  description: string;
}

export interface ScoreCalculationInfo {
  scoreE: {
    title: string;
    description: string;
    formula: string;
    components: ScoreComponent[];
    minimumRequired: number;
    tips: string[];
  };
  scoreA: {
    title: string;
    description: string;
    formula: string;
    components: ScoreComponent[];
    concoursSubjects: string[];
    tips: string[];
  };
} 

export interface SchoolConfig {
  scoreCalculationInfo: ScoreCalculationInfo;
  availableSpecialties: string[];
}

export interface SchoolFilters {
  type?: School['type'];
  specialty?: string;
  location?: string;
  search?: string;
}

/** @deprecated Use School from types/school instead */
export type University = School;
