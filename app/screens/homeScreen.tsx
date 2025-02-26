import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import { Note, StackParamList } from '@/types/types';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { loadNotesFromStorage } from '@/store/asyncStore';
import { NoteItem } from '@/components/NoteItem';
import { SearchBar } from '@/components/SearchBar';
import { Feather } from '@expo/vector-icons';
import { ThemedBackground } from '@/components/ThemedBackground';
import { Colors } from '@/types/constants';

type HomeNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

type Props = {
  navigation: HomeNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {

  // const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const user = useSelector((state: RootState) => state.user.user);
  if (!user) return;

  const { name, homeColor, cardStyle, theme, lang } = user;

  console.log('Loaded user', user);

  const pinnedNotes = useSelector((state: RootState) => state.notes.pinnedNotes);
  const allNotes = useSelector((state: RootState) => state.notes.notes);

  // Combine pinned notes first and then unpinned notes in reverse order
  const sortedNotes = [
    ...pinnedNotes,
    ...allNotes.filter((note) => !pinnedNotes.some((pinnedNote) => pinnedNote.id === note.id)),
  ];

  // Filter notes based on search query
  const filteredNotes = sortedNotes.filter(note =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Load notes from AsyncStorage when the component mounts
  useEffect(() => {
    loadNotesFromStorage();
  }, []);


  return (
    <View style={styles.container}>
      <ThemedBackground color={homeColor} theme={theme} />

      <ThemedText style={styles.title}>Hi, {name}</ThemedText>
      <ThemedText style={styles.title}>
        You {sortedNotes.length > 0
          ? `have ${sortedNotes.length} note${sortedNotes.length > 1 ? 's' : ''}`
          : "don't have any notes yet."}
      </ThemedText>

      <View style={styles.notesContainer}>
        {sortedNotes.length > 0 ? (
          <>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <NoteItem key={note.id} note={note} navigation={navigation} />
              ))
            ) : (
              <ThemedText style={styles.emptyState}>No matching notes found.</ThemedText>
            )}
          </>
        ) : (
          <ThemedText style={styles.emptyState}>Create your first note!</ThemedText>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {/* <Button title="Settings" onPress={() => navigation.navigate('Settings')} /> */}
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Feather style={[styles.icon, { backgroundColor: Colors[theme].iconBg }]} name="menu" size={24} color={Colors[theme].text} />
        </Pressable>

        {/* <Button title="Add Note" onPress={() => navigation.navigate('NoteView', {})} /> */}
        <Pressable onPress={() => navigation.navigate('NoteView', {})}>
          <Feather style={[styles.icon, { backgroundColor: Colors[theme].iconBg }]} name="plus" size={24} color={Colors[theme].text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    padding: 16,
    paddingTop: 100,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  notesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  emptyState: {
    fontSize: 48,
    lineHeight: 48,
    marginTop: 100,
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
  icon: {
    padding: 28,
    borderRadius: 50
  }
});
