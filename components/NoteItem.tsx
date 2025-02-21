import { StyleSheet, View, Animated, PanResponder, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { deleteNote } from '@/store/notesSlice';

import { formatDate } from '@/helpers/utils';

import { ThemedText } from './ThemedText';
import { Note } from '@/types/types';


const SWIPE_THRESHOLD = -50;

type Props = {
  note: Note;
};

export const NoteItem: React.FC<Props> = ({ note }) => {
  const { id, text, createdAt } = note;
  const { month, day } = formatDate(createdAt);
  const dispatch = useDispatch();


  const handleDeleteNote = () => {
    dispatch(deleteNote(id));
  }


  return (
    <GestureHandlerRootView>
        <Animated.View style={styles.card}>

          <View>
            <ThemedText style={styles.text}>{text}</ThemedText>
            <ThemedText style={styles.text}>{month} <ThemedText>{day}</ThemedText></ThemedText>
          </View>

          {/* Delete Button (Only visible when swiped left) */}
          <Animated.View style={styles.deleteButton}>
            <Pressable onPress={handleDeleteNote}>
              <Feather name="x" size={24} color="white" />
            </Pressable>
          </Animated.View>

        </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 4,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  }
});
