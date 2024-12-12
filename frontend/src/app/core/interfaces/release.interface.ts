export interface Issue {
  url: string;
  issue: string;
}

export interface Release {
  description: Record<string, string>;
  version: string;
  timestamp: number;
  issues: Issue[];
}
