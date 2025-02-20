import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, setNotes } from './notesSlice';

// Save notes to AsyncStorage
export const saveNotesToStorage = (notes: Note[]) => {
  AsyncStorage.setItem('notes', JSON.stringify(notes));
};

export const loadNotesFromStorage = () => async (dispatch: any) => {
  const savedNotes = await AsyncStorage.getItem('notes');
  if (savedNotes) {
    const notes: Note[] = JSON.parse(savedNotes);
    dispatch(setNotes(notes));
  }
};