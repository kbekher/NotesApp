import AsyncStorage from '@react-native-async-storage/async-storage';
import { setNotes } from './notesSlice';
import { Note, User } from '@/types/types';
import { setUser } from './userSlice';

// Save notes to AsyncStorage
export const saveNotesToStorage = (notes: Note[]) => {
  AsyncStorage.setItem('notes', JSON.stringify(notes));
};

// Load notes from the AsyncStorage
export const loadNotesFromStorage = () => async (dispatch: any) => {
  const savedNotes = await AsyncStorage.getItem('notes');
  if (savedNotes) {
    const notes: Note[] = JSON.parse(savedNotes);
    dispatch(setNotes(notes));
  }
};

export const saveUserToStorage = (user: User) => {
  AsyncStorage.setItem('user', JSON.stringify(user));
};

export const loadUserFromStorage = () => async (dispatch: any) => {
  const savedUser = await AsyncStorage.getItem('user');
  if (savedUser) {
    const user: User = JSON.parse(savedUser);
    dispatch(setUser(user));
  }
};

