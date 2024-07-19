import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavigationTypes';


type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountScreen'>;

const AccountScreen: React.FC = () => {
  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('test');
  const { login } = useAuth();
  const navigation = useNavigation<AccountScreenNavigationProp>();

  const handleLogin = async () => {
    if (username && password) {
      await login();
      console.log('Username:', username);
      console.log('Password:', password);
      navigation.navigate('ProductBuy');
    } else {
      Alert.alert('Login Failed', 'Please enter both username and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    maxWidth: 400,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default AccountScreen;
