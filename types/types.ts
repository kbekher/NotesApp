import { ColorList, Lang, Style, Theme } from "./constants";

// Define the User type //TODO: use mapping
export interface User {
  name: string;
  homeColor: ColorList;
  noteColor: ColorList;
  cardStyle: Style;
  theme: Theme;
  lang: Lang;
}
// Define the Note type
export interface Note {
  id: string;
  text: StyledText[]; // TODO: stringify for homw view and use as object for note view
  createdAt: string; // Store date as a string (ISO format)
  // isPinned: boolean; //TODO:
}

export type StackParamList = {
  Welcome: undefined;
  Home: undefined;
  NoteView: { noteData?: Note }; 
  Settings: undefined;
};

export interface StyledText {
  content: string; // The actual text
  style: 'headline' | 'bold' | 'normal' | 'none'; // Style type
  isChecklist?: boolean; // Whether it's part of a checklist
}