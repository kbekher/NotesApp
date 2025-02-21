import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/types/types';

type SettingsNavigationProp = StackNavigationProp<StackParamList, 'Settings'>;

type Props = {
  navigation: SettingsNavigationProp;
};

export default function SettingsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.title}>Settings</Text>
      {/* Settings options */}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
});
