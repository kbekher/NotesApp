import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { Feather } from '@expo/vector-icons';

import { RootState } from '@/store/store';
import { addNote, updateNote } from '@/store/notesSlice';
import { saveNotesToStorage } from '@/store/asyncStore';

import { Note, StackParamList } from '@/types/types';

import { ThemedText } from '@/components/ThemedText';
import { ThemedBackground } from '@/components/ThemedBackground';
import { Colors } from '@/types/constants';

type NoteViewNavigationProp = StackNavigationProp<StackParamList, 'NoteView'>;

type Props = {
  navigation: NoteViewNavigationProp;
  route: any;
};

export default function NoteView({ navigation, route }: Props) {
  const dispatch = useDispatch();

  // Fetch all notes from the Redux store
  const user = useSelector((state: RootState) => state.user.user);
  if (!user) return;

  const notes = useSelector((state: RootState) => state.notes.notes);

  const { noteColor, theme } = user;

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
    <View style={styles.container}>
      <ThemedBackground color={noteColor} theme={theme} />

      <View style={styles.buttonContainer}>

        <Pressable onPress={handleSaveNote}>
          <Feather name="chevron-left" size={24} color={Colors[theme].text}/>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Feather name="more-horizontal" size={24} color={Colors[theme].text} />
        </Pressable>

      </View>

      <TextInput
        style={styles.textInput}
        value={noteText}
        onChangeText={setNoteText}
        multiline
      />

    </View>
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
