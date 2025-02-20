import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/types/navigation';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

type WelcomeNavigationProp = StackNavigationProp<StackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeNavigationProp;
};

export default function WelcomeScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const [name, setName] = useState('');

  const handleProceed = () => {
    if (name.trim()) {
      // Save name to state or AsyncStorage here if needed
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    i18n.changeLanguage('en'); // Set the initial language EN
  }, []);

  return (
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
