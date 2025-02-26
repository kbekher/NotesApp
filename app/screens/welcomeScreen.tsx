import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/types/types';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { loadUserFromStorage, saveUserToStorage } from '@/store/asyncStore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setUser } from '@/store/userSlice';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { setRandomColor } from '@/helpers/utils';
import { LangMap, StyleMap, ThemeMap } from '@/types/constants';
import { ThemedBackground } from '@/components/ThemedBackground';

type WelcomeNavigationProp = StackNavigationProp<StackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeNavigationProp;
};

export default function WelcomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [homeColor] = useState(() => setRandomColor());
  const [noteColor] = useState(() => setRandomColor());

  const loadedUser = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    i18n.changeLanguage('en');
    loadUserFromStorage();

    if (loadedUser) {
      i18n.changeLanguage(loadedUser.lang);
      navigation.navigate('Home');
    }
  }, []);

  const handleProceed = () => {
    if (name.trim()) {
      setError(false);

      const newUser = {
        name: name,
        homeColor: homeColor,
        noteColor: noteColor,
        cardStyle: StyleMap.stack,
        theme: ThemeMap.light,
        lang: LangMap.en,
      };

      dispatch(setUser(newUser));
      saveUserToStorage(newUser);
      navigation.navigate('Home');
    } else {
      setError(true);
    }
  };

  return (
    <>
      {!loadedUser && (
        <View style={styles.container}>
          <ThemedBackground theme='light' color={homeColor} />

          <ThemedText style={styles.title}>{t('welcome')}</ThemedText>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Your Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setError(false);
            }}
          />

          {error && <ThemedText style={styles.errorText}>Name is required!</ThemedText>}

          <Pressable onPress={handleProceed}>
            <Feather style={styles.icon} name="chevron-right" size={24} color="black" />
          </Pressable>

        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    padding: 16,
    width: '80%',
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#fff',
    borderRadius: 64,
    textAlign: 'center'
  },
  inputError: {
    backgroundColor: 'red',
  },
  errorText: {
    color: 'red'
  },
  icon: {
    padding: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.36)', //default to light theme
    borderRadius: 50,
  }
});
