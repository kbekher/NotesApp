import React, { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { addNote, Note } from '@/store/notesSlice';
import { saveNotesToStorage } from '@/store/asyncStore';

import { StackParamList } from '@/types/navigation';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

type NoteViewNavigationProp = StackNavigationProp<StackParamList, 'NoteView'>;

type Props = {
  navigation: NoteViewNavigationProp;
};

export default function NoteView({ navigation }: Props) {
  const [noteText, setNoteText] = useState('');
  const dispatch = useDispatch();

  // Fetch all notes from the Redux store
  const notes = useSelector((state: RootState) => state.notes.notes);

  const handleSaveNote = () => {
    const newNote: Note = {
      id: Date.now().toString(), // Unique ID based on timestamp
      text: noteText,
      createdAt: new Date().toISOString(),
    };

    dispatch(addNote(newNote)); // Add note to Redux store

    // Save all notes to AsyncStorage
    const allNotes = [...notes, newNote]; // Assuming 'notes' is fetched from the store
    saveNotesToStorage(allNotes);

    navigation.goBack(); // Navigate back to the home view
  }

  return (
    <ThemedView style={styles.container}>

      <ThemedView style={styles.buttonContainer}>
        <Button title="Back" onPress={handleSaveNote} />
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      </ThemedView>

      <TextInput
        style={styles.textInput}
        placeholder="Type your note here..."
        value={noteText}
        onChangeText={setNoteText}
        multiline
      />

    </ThemedView>
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
  textInput: {
    fontSize: 24,
    marginVertical: 16,
    height: '100%'
  },
});
