import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/types/types';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedText } from '@/components/ThemedText';
import { Collapsible } from '@/components/Collapsible';
import { ColorListMap, LangMap, StyleMap, ThemeMap } from '@/types/constants';
import { saveUserToStorage } from '@/store/asyncStore';
import { setUser } from '@/store/userSlice';

type SettingsNavigationProp = StackNavigationProp<StackParamList, 'Settings'>;

type Props = {
  navigation: SettingsNavigationProp;
};

export default function SettingsScreen({ navigation }: Props) {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);
  if (!user) return;

  const { homeColor, noteColor, cardStyle, lang, theme, name } = user;

  // Local states initialized with current user values
  const [localName, setLocalName] = useState(name);
  const [localHomeColor, setLocalHomeColor] = useState(homeColor);
  const [localNoteColor, setLocalNoteColor] = useState(noteColor);
  const [localCardStyle, setLocalCardStyle] = useState(cardStyle);
  const [localLang, setLocalLang] = useState(lang);
  const [localTheme, setLocalTheme] = useState(theme);

  const handleGoBack = () => {
    const updatedUser = {
      name: localName.trim() !== '' ? localName : user.name,
      homeColor: localHomeColor !== homeColor ? localHomeColor : homeColor,
      noteColor: localNoteColor !== noteColor ? localNoteColor : noteColor,
      cardStyle: localCardStyle !== cardStyle ? localCardStyle : cardStyle,
      lang: localLang !== lang ? localLang : lang,
      theme: localTheme !== theme ? localTheme : theme,
    };

    // Check if anything changed before dispatching
    if (JSON.stringify(updatedUser) !== JSON.stringify(user)) {
      dispatch(setUser(updatedUser));
      saveUserToStorage(updatedUser);
    }

    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      <ThemedBackground />

      <View style={styles.buttonContainer}>
        <Pressable onPress={handleGoBack} >
          <Feather name="chevron-left" size={24} color="black" />
        </Pressable>
      </View>

      <View>
        <ThemedText type="title">Settings</ThemedText>

        {/* Name Input */}
        <ThemedText type="subtitle">Name on the home screen</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={localName}
          onChangeText={setLocalName}
        />

        {/* Home Screen Color Selection */}
        <ThemedText type="subtitle">Home screen color</ThemedText>
        <Collapsible title={localHomeColor}>
          {(Object.keys(ColorListMap) as (keyof typeof ColorListMap)[]).map((color) => (
            <Pressable key={color} onPress={() => setLocalHomeColor(color)}>
              <ThemedText>{color}</ThemedText>
            </Pressable>
          ))}
        </Collapsible>

        {/* Note Color Selection */}
        <ThemedText type="subtitle">Note color</ThemedText>
        <Collapsible title={localNoteColor}>
          {(Object.keys(ColorListMap) as (keyof typeof ColorListMap)[]).map((color) => (
            <Pressable key={color} onPress={() => setLocalNoteColor(color)}>
              <ThemedText>{color}</ThemedText>
            </Pressable>
          ))}
        </Collapsible>

        {/* Card Style Selection */}
        <ThemedText type="subtitle">Card Style</ThemedText>
        <Collapsible title={localCardStyle}>
          {(Object.keys(StyleMap) as (keyof typeof StyleMap)[]).map((style) => (
            <Pressable key={style} onPress={() => setLocalCardStyle(style)}>
              <ThemedText>{style}</ThemedText>
            </Pressable>
          ))}
        </Collapsible>

        {/* Language Selection */}
        <ThemedText type="subtitle">Language</ThemedText>
        <Collapsible title={localLang}>
          {(Object.keys(LangMap) as (keyof typeof LangMap)[]).map((language) => (
            <Pressable key={language} onPress={() => setLocalLang(language)}>
              <ThemedText>{language}</ThemedText>
            </Pressable>
          ))}
        </Collapsible>

        {/* Theme Selection */}
        <ThemedText type="subtitle">Theme</ThemedText>
        <Collapsible title={localTheme}>
          {(Object.keys(ThemeMap) as (keyof typeof ThemeMap)[]).map((themeOption) => (
            <Pressable key={themeOption} onPress={() => setLocalTheme(themeOption)}>
              <ThemedText>{themeOption}</ThemedText>
            </Pressable>
          ))}
        </Collapsible>
      </View>


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
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
  input: {
    padding: 16,
    width: '80%',
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#fff',
    borderRadius: 64,
    textAlign: 'center'
  }
});
