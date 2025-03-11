import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { Feather } from '@expo/vector-icons';

import { RootState } from '@/store/store';
import { addNote, updateNote } from '@/store/notesSlice';
import { saveNotesToStorage } from '@/store/asyncStore';

import { Note, StackParamList } from '@/types/types';

import ThemedText from '@/components/ThemedText';
import ThemedBackground from '@/components/ThemedBackground';
import { ColorListMap, Colors } from '@/types/constants';
import Editor from '@/components/dom-components/hello-dom';

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

  // State for styled text
  // const [noteText, setNoteText] = useState('');

  const [plainText, setPlainText] = useState('');
  const [editorState, setEditorState] = useState<string | null>(null);

  console.log(plainText);
  console.log(editorState);
  console.log(typeof editorState);

  // Check if we are editing an existing note
  const noteData = route?.params?.noteData; // Get the note passed from HomeView

  // State for selected text style TODO: delete
  // const [selectedStyle, setSelectedStyle] = useState<"headline" | "bold" | "normal" | "none">("normal");

  useEffect(() => {
    if (noteData) {
      setEditorState(noteData.editorState); // Set the existing note text to the editor state
      setPlainText(noteData.plainText); // Set the existing note text to the editor state
    }
  }, [noteData]);

  const handleSaveNote = () => {
    if (editorState && editorState.trim() !== '') {
      let updatedNotes = [...notes];

      if (noteData) {
        // If editing, update the existing note
        const updatedNote: Note = {
          ...noteData,
          plainText: plainText,
          editorState: editorState, // Store as a string for Redux
          // text: JSON.stringify(editorState), // Store as a string for Redux
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
          plainText: plainText,
          editorState: editorState, // Store as a string for Redux
          // text: JSON.stringify(editorState), // Store as a string for Redux
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

      {/* Header */}
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleSaveNote}>
          <Feather name="chevron-left" size={24} color={Colors[theme].text} />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Feather style={[styles.icon, { backgroundColor: Colors[theme].iconBg }]} name="more-horizontal" size={24} color={Colors[theme].text} />
        </Pressable>
      </View>

      <View style={{ flex: 1 }}> 
        <Editor 
          setPlainText={setPlainText}
          setEditorState={setEditorState}
        /> 
      </View>

      {/* Text Style Toolbar */}
      {/* <View style={styles.toolbarContainer}>
        <View style={[styles.toolbar, { backgroundColor: Colors[theme].toolbar }]}>
          <Pressable onPress={() => applyStyle("headline")}>
            <Text style={[styles.headlineBtn, selectedStyle === "headline" && { color: ColorListMap[noteColor] }]}>
              The
            </Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable onPress={() => applyStyle("bold")}>
            <Text style={[styles.boldBtn, selectedStyle === "bold" && { color: ColorListMap[noteColor] }]}>
              The
            </Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable onPress={() => applyStyle("normal")}>
            <Text style={[styles.normalBtn, selectedStyle === "normal" && { color: ColorListMap[noteColor] }]}>
              The
            </Text>
          </Pressable>
        </View>

        <View style={[styles.checkmark, { backgroundColor: Colors[theme].toolbar }]}>
          <Pressable>
            <Feather name="list" size={24} color={Colors[theme].text} />
          </Pressable>
        </View>

      </View> */}
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
    flex: 1,
  },
  icon: {
    borderRadius: 50,
    padding: 4
  },
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    gap: 8,
    marginBottom: 6
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
    borderRadius: 67,
    paddingHorizontal: 40,
    height: 33,
    alignSelf: "center",
  },
  checkmark: {
    borderRadius: 50,
    width: 33,
    height: 33,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headlineBtn: {
    fontSize: 24,
    fontWeight: 400,
  },
  headline: {
    fontSize: 64,
    fontWeight: 400,
  },
  boldBtn: {
    fontSize: 20,
    fontWeight: 700,
  },
  bold: {
    fontSize: 24,
    fontWeight: 700,
  },
  normalBtn: {
    fontSize: 16,
    fontWeight: 400,
  },
  normal: {
    fontSize: 20,
    fontWeight: 400,
  },
  divider: {
    width: 1,
    height: "70%",
    backgroundColor: "black",
  },
});
