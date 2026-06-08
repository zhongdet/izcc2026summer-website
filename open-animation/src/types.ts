/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ClubInfo {
  id: 'INFOR' | 'ZSISC' | 'CKCSC' | 'CGISC';
  short: 'I' | 'Z' | 'C' | 'C2';
  name: string;
  fullName: string;
  school: string;
  themeColor: string;
  glowColor: string;
  textColor: string;
  logoColor: string;
  bgGradient: string;
  established: number;
  description: string;
  specialties: string[];
  motto: string;
  accentHtml: string; // Tailwinds classes
}

export interface Course {
  id: string;
  title: string;
  category: 'programming' | 'algorithm' | 'security' | 'interactive' | 'creative';
  difficulty: '★☆☆' | '★★☆' | '★★★';
  instructor: string;
  description: string;
  topics: string[];
  iconName: string;
}

export interface DaySchedule {
  day: number;
  date: string;
  title: string;
  activities: {
    time: string;
    title: string;
    type: 'class' | 'game' | 'meal' | 'ceremony' | 'rest';
    description?: string;
  }[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'fees' | 'courses' | 'other';
}
