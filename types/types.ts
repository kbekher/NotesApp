import { ColorList, Lang, Style, TextStyle, Theme } from "./constants";

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
  editorState: string;
  plainText: string; // TODO: stringify for homeview and use as object for note view
  createdAt: string; // Store date as a string (ISO format)
  // isPinned: boolean; //TODO:
}

export type StackParamList = {
  Welcome: undefined;
  Home: undefined;
  NoteView: { noteData?: Note }; 
  Settings: undefined;
};


