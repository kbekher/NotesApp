import { StyleSheet, View, Animated, PanResponder, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { deleteNote, pinNote, unpinNote } from '@/store/notesSlice';

import { formatDate } from '@/helpers/utils';

import { ThemedText } from './ThemedText';
import { Note, StackParamList } from '@/types/types';
import { RootState } from '@/store/store';
import { StackNavigationProp } from '@react-navigation/stack';


const SWIPE_THRESHOLD = -50;

type HomeNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

type Props = {
  key: string;
  note: Note;
  navigation: HomeNavigationProp;
};

export const NoteItem: React.FC<Props> = ({ note, navigation }) => {
  const { id, text, createdAt } = note;
  const { month, day } = formatDate(createdAt);
  const dispatch = useDispatch();
  const pinnedNotes = useSelector((state: RootState) => state.notes.pinnedNotes);

  // Check if this note is pinned
  const isPinned = pinnedNotes.some((pinnedNote) => pinnedNote.id === id);

  const handleEditNote = (note: Note) => {
    navigation.navigate('NoteView', { noteData: note });
  };

  const handleDeleteNote = () => {
    if (isPinned) {
      dispatch(unpinNote(id));
    }

    dispatch(deleteNote(id));
  }


  const handlePinNote = () => {
    if (isPinned) {
      dispatch(unpinNote(id));
    } else {
      dispatch(pinNote(id));
    }
  };

  return (
    <GestureHandlerRootView>
      <Animated.View style={styles.cardContainer}>

        <TouchableOpacity style={styles.card} onPress={() => handleEditNote(note)}>
          <ThemedText style={styles.text}>{text}</ThemedText>
          <ThemedText style={styles.text}>{month} <ThemedText>{day}</ThemedText></ThemedText>
        </TouchableOpacity>

        {/* Delete Button (Only visible when swiped left) */}
        <Animated.View style={styles.icons}>
          <Pressable onPress={handlePinNote}>
            <MaterialIcons
              name="push-pin"
              size={24}
              color="white"
              style={[styles.button, isPinned && styles.pinnedButton]}
            />
          </Pressable>
          <Pressable onPress={handleDeleteNote}>
            <Feather name="x" size={24} color="white" style={styles.button} />
          </Pressable>
        </Animated.View>

      </Animated.View>

    </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 4,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative'
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 10
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  pinnedButton: {
    backgroundColor: 'blue',
  }
});
