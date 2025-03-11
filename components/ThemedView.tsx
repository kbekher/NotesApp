import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Theme } from '@/types/constants';

export type ThemedViewProps = ViewProps & {
  lightColor?: Theme;
  darkColor?: Theme;
};

export default function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
