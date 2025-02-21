// Define the User type //TODO: use mapping
export interface User {
  name: string;
  homeColor: string;
  noteColor: string;
  theme: string;
  lang: string;
}
// Define the Note type
export interface Note {
  id: string;
  text: string;
  createdAt: string; // Store date as a string (ISO format)
}

export type StackParamList = {
  Welcome: undefined;
  Home: undefined;
  NoteView: { noteData?: Note }; 
  Settings: undefined;
};