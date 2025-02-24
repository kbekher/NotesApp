import { getThemeColors } from '@/helpers/themeColors';
import { isColorKey } from '@/helpers/utils';
import { ColorList, ColorListMap, Colors, Theme } from '@/types/constants';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

type ThemedBackgroundProps = {
  color?: ColorList; // Expect a key from the ColorListMap object
  theme: Theme
};

export function ThemedBackground({ color, theme }: ThemedBackgroundProps) {
  const { width, height } = Dimensions.get('window');
  const spacing = 21;
  const columns = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);

  const { background, pattern } = getThemeColors(theme, color);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      {/* Pattern Layer */}
      <View style={styles.patternContainer}>
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: columns }).map((_, col) => (
            <View
              key={`${row}-${col}`}
              style={[
                styles.circle,
                {
                  left: col * spacing,
                  top: row * spacing,
                  backgroundColor: pattern,
                },
              ]}
            />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Covers entire screen
  },
  patternContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
});