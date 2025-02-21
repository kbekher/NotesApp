import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import { Note, StackParamList } from '@/types/types';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { loadNotesFromStorage } from '@/store/asyncStore';
import { NoteItem } from '@/components/NoteItem';
import { SearchBar } from '@/components/SearchBar';

type HomeNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

type Props = {
  navigation: HomeNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {

  // const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadedNotes = useSelector((state: RootState) => state.notes.notes);
  const loadedUser = useSelector((state: RootState) => state.user.user);
  
  const name = loadedUser ? loadedUser.name : 'Guest';

  // console.log('Notes:', loadedNotes);
  // console.log('Home User:', loadedUser);

  // Filter notes based on search query
  const filteredNotes = loadedNotes.filter(note =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditNote = (note : Note) => {
    navigation.navigate('NoteView', { noteData: note });
  };

  // Load notes from AsyncStorage when the component mounts
  useEffect(() => {
    loadNotesFromStorage();
  }, []);


  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Hi, {name}</ThemedText>
      <ThemedText style={styles.title}>
        You {loadedNotes.length > 0 
          ? `have ${loadedNotes.length} note${loadedNotes.length > 1 ? 's' : ''}` 
          : "don't have any notes yet."}
      </ThemedText>

      {/* Show search and notes if there are any */}
      {loadedNotes.length > 0 ? (
        <>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {filteredNotes.length > 0 ? (
            filteredNotes.map(note => (
              <TouchableOpacity style={styles.noteContainer} key={note.id} onPress={() => handleEditNote(note)}>
                <NoteItem note={note} />
              </TouchableOpacity>
            ))
          ) : (
            <ThemedText style={styles.emptyState}>No matching notes found.</ThemedText>
          )}
        </>
      ) : (
        <ThemedText style={styles.emptyState}>Create your first note!</ThemedText>
      )}

      <ThemedView style={styles.notesContainer}></ThemedView>
      {/* Navigation buttons */}
      <ThemedView style={styles.buttonContainer}>
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
        <Button title="Add Note" onPress={() => navigation.navigate('NoteView', {})} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 100,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  notesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  emptyState: {
    fontSize: 48,
    lineHeight: 48,
    marginTop: 100,
    color: 'gray'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: '80%',
    marginBottom: 16,
  },
});
