import { Release } from './release.interface';

export interface Screenshot {
  image_type: string;
  type: string;
  url: string;
}

export interface TypeValue {
  type: string;
  value: string;
}

export interface Branding {
  scheme_preference?: 'light' | 'dark';
  type: string;
  value: string;
}

export interface DesktopApp {
  id: string;
  name: Record<string, string>;
  summary: Record<string, string>;
  description: Record<string, string>;
  developer: Record<string, string>;
  metadata: TypeValue[];
  branding: Branding[];
  screenshots: Screenshot[];
  url: TypeValue[];
  releases: Release[];
  categories: string[];
  keywords: string[];
}
