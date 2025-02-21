// Theme mapping
export const ThemeMap = {
  light: 'light',
  dark: 'dark',
} as const;

export type Theme = keyof typeof ThemeMap; // 'light' | 'dark'

// Style mapping
export const styleMap = {
  stack: 'stack',
  grid: 'grid',
} as const;

export type Style = keyof typeof styleMap; // 'stack' | 'grid'

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
  red: 'red',
  blue: 'blue',
  green: 'green',
} as const;

export type ColorList = keyof typeof ColorListMap; // 'red' | 'blue' | 'green'