import { Colors, ColorListMap, Theme, ColorList } from '@/types/constants';

export function getThemeColors(
  theme: Theme,
  customColor?: ColorList
): { background: string; text: string; pattern: string } {
  if (theme === 'light') {
    return {
      background: customColor ? ColorListMap[customColor] : Colors.light.background,
      text: Colors.light.text,
      pattern: 'rgba(0, 0, 0, 0.05)', // Light dots on light background
    };
  } else {
    return {
      background: Colors.dark.background,
      text: Colors.dark.text,
      pattern: 'rgba(255, 255, 255, 0.05)', // White dots with low opacity on dark background
    };
  }
}
