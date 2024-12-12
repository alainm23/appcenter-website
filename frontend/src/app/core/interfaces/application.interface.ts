export interface Application {
  id: string;
  name: Record<string, string>;
  summary: Record<string, string>;
  description: Record<string, string>;
  developer: Record<string, string>;
  icon: string;
  metadata: any[];
  branding: any[];
  screenshots: any[];
  url: any[];
  releases: any[];
}
