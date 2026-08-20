export type MergedProject = {
  id: string;
  repo: string;
  slug : string;
  title: string;
  description: string | null;
  readmeExcerpt?: string | null;
  htmlUrl?: string | null;
  homepage?: string | null;
  coverImage?: string | null;
  screenshots: string[];
  language?: string | null;
  tags: string[];
  stars?: number | null;
  forks?: number | null;
  featured: boolean;
};