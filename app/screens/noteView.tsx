import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { addNote, updateNote } from '@/store/notesSlice';
import { saveNotesToStorage } from '@/store/asyncStore';

import { Note, StackParamList } from '@/types/types';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

type NoteViewNavigationProp = StackNavigationProp<StackParamList, 'NoteView'>;

type Props = {
  navigation: NoteViewNavigationProp;
  route: any;
};

export default function NoteView({ navigation, route }: Props) {
  const dispatch = useDispatch();

  // Fetch all notes from the Redux store
  const notes = useSelector((state: RootState) => state.notes.notes);

  const [noteText, setNoteText] = useState('');

  // Check if we are editing an existing note
  const noteData = route?.params?.noteData; // Get the note passed from HomeView
  useEffect(() => {
    if (noteData) {
      setNoteText(noteData.text); // Set initial text to the passed note's text
    }
  }, [noteData]);

  const handleSaveNote = () => {
    if (noteText !== '') {
      let updatedNotes = [...notes];

      if (noteData) {
        // If editing, update the existing note
        const updatedNote: Note = {
          ...noteData,
          text: noteText,
          createdAt: new Date().toISOString(),
        };

        // Update the note in the store
        dispatch(updateNote(updatedNote));

        // Update the notes array in Redux and save to storage
        updatedNotes = updatedNotes.map(note => 
          note.id === updatedNote.id ? updatedNote : note
        );
      } else {
        // If creating a new note, add to the notes list
        const newNote: Note = {
          id: Date.now().toString(),
          text: noteText,
          createdAt: new Date().toISOString(),
        };

        dispatch(addNote(newNote)); // Add note to Redux store
        updatedNotes.push(newNote); // Add note to the local array
      }

      // Save all notes to AsyncStorage
      saveNotesToStorage(updatedNotes);
    }

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
