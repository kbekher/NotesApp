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

// TextStyle mapping
export const TextStyleMap = {
  headline: 'headline',
  bold: 'bold',
  paragraph: 'paragraph',
} as const;

export type TextStyle = keyof typeof TextStyleMap; // 'headline' | 'bold' | 'normal' 
// ColorList mapping
export const ColorListMap = {
  purple: '#AA6AFE',
  yellow: '#E9BA06',
  gray: '#94826C',
  red: '#E22403',
  green: '#08A243',
} as const;

export type ColorList = keyof typeof ColorListMap; // '#AA6AFE' | '#E9BA06 | ...

// Theme mapping
export const ThemeMap = {
  light: 'light',
  dark: 'dark',
} as const;

export type Theme = keyof typeof ThemeMap; // 'light' | 'dark'

// const tintColorLight = '#0a7ea4';
// const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    iconBg: 'rgba(27, 27, 27, 0.36)',
    toolbar: 'rgba(255, 255, 255, 0.8)'
    // tint: tintColorLight,
    // icon: '#687076',
    // tabIconDefault: '#687076',
    // tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    iconBg: 'rgba(255, 255, 255, 0.36)',
    toolbar: 'rgba(0, 0, 0, 1)'
    // tint: tintColorDark,
    // icon: '#9BA1A6',
    // tabIconDefault: '#9BA1A6',
    // tabIconSelected: tintColorDark,
  },
};