import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Note type
export interface Note {
  id: string;
  text: string;
  createdAt: string; // Store date as a string (ISO format)
}

// Define the initial state type
interface NotesState {
  notes: Note[];
  pinnedNotes: Note[];
}

// Set the initial state with proper types
const initialState: NotesState = {
  notes: [],
  pinnedNotes: [],
};


// Create the slice
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // Set all notes from AsyncStorage (overwrites current notes)
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },

    // Add a new note
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
    },

    // Delete a note by its ID
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },

    // Pin a note (move it to the pinned notes list)
    pinNote: (state, action: PayloadAction<string>) => {
      const noteToPin = state.notes.find(note => note.id === action.payload);
      if (noteToPin) {
        state.notes = state.notes.filter(note => note.id !== action.payload);
        state.pinnedNotes.unshift(noteToPin);
      }
    },
  },
});

export const { setNotes, addNote, deleteNote, pinNote } = notesSlice.actions;
export default notesSlice.reducer;