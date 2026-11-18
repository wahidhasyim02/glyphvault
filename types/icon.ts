export type IconStyleVariant = 'linear' | 'line-duotone' | 'solid' | 'duotone' | 'duotone-linear';

export interface IconEntry {
  name: string;
  category: string;
  tags: string[];
  svg: string;
}

export interface IconSettings {
  size: number;
  strokeWidth: number;
  primaryColor: string;
  secondaryColor: string;
  duotoneOpacity: number;
}

export type PreviewBackdrop = 'dark' | 'light' | 'checker';

export type CodeTab = 'svg' | 'nuxt' | 'vue' | 'react' | 'tag' | 'html';
