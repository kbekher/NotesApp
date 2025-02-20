import React, { useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import { StackParamList } from '@/types/navigation';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { loadNotesFromStorage } from '@/store/asyncStore';

type HomeNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

type Props = {
  navigation: HomeNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  // const dispatch = useDispatch(); // Get the dispatch function from Redux

  // Load notes from AsyncStorage when the component mounts
  // useEffect(() => {
  //   dispatch(loadNotesFromStorage()); // Use dispatch to call the loadNotesFromStorage function
  // }, [dispatch]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Your Notes</ThemedText>
      {/* Placeholder for notes */}
      <ThemedView style={styles.notesContainer}></ThemedView>
      {/* Navigation buttons */}
      <ThemedView style={styles.buttonContainer}>
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
        <Button title="Add Note" onPress={() => navigation.navigate('NoteView')} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 100,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  notesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
