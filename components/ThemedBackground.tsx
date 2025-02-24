import { ColorList } from '@/types/constants';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

type ThemedBackgroundProps = {
  color?: ColorList | "#ffffff";
};

export function ThemedBackground({ color }: ThemedBackgroundProps) {
  const { width, height } = Dimensions.get('window');
  const spacing = 21;
  const columns = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});