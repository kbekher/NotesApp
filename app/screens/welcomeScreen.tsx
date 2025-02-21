import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/types/types';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { loadUserFromStorage, saveUserToStorage } from '@/store/asyncStore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setUser } from '@/store/userSlice';

type WelcomeNavigationProp = StackNavigationProp<StackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeNavigationProp;
};

export default function WelcomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const loadedUser = useSelector((state: RootState) => state.user.user);

  const handleProceed = () => {
    if (name.trim()) {
      const newUser = {
        name: name,
        homeColor: "ffffff",
        noteColor: "ffffff",
        theme: "light",
        lang: "en",
      };

      // Dispatch the action to store user data in Redux
      dispatch(setUser(newUser));

      // Save user tp storage
      saveUserToStorage(newUser);

      // Save name to state or AsyncStorage here if needed
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    i18n.changeLanguage('en');
    loadUserFromStorage();

    // If the name is saved
    if (loadedUser) {
      i18n.changeLanguage(loadedUser.lang); // set user preffered lang
      navigation.navigate('Home'); // navigate to Home directly
    }

  }, [loadedUser]);

  return (
    <>
      {!loadedUser && (
        <View style={styles.container}>
          <Text style={styles.title}>{t('welcome')}</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
          <Button title="Proceed" onPress={handleProceed} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: '80%',
    marginBottom: 16,
  },
});
