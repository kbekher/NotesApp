// Theme mapping
export const ThemeMap = {
  light: 'light',
  dark: 'dark',
} as const;

export type Theme = keyof typeof ThemeMap; // 'light' | 'dark'

// Style mapping
export const StyleMap = {
  stack: 'stack',
  grid: 'grid',
} as const;

export type Style = keyof typeof StyleMap; // 'stack' | 'grid'

// Lang mapping
export const LangMap = {
  en: 'en',
  de: 'de',
  ua: 'ua',
  ru: 'ru',
} as const;

export type Lang = keyof typeof LangMap; // 'en' | 'de' | 'ua' | 'ru'

// ColorList mapping
export const ColorListMap = {
  purple: '#AA6AFE',
  yellow: '#E9BA06',
  gray: '#94826C',
  red: '#E22403',
  green: '#08A243',
} as const;

export type ColorList = keyof typeof ColorListMap; // '#AA6AFE' | '#E9BA06 | ...