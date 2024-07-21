import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavigationTypes';
import { Button, TextInput, useTheme } from 'react-native-paper';

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountScreen'>;

const AccountScreen: React.FC = () => {
  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('test');
  const [securityPassword, setSecurityPassword] = useState(true);
  const { login } = useAuth();
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const { colors } = useTheme();

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.surface }]}>LOGIN</Text>
      <TextInput
        style={[styles.input, { color: colors.surface, backgroundColor: colors.background }]}
        placeholder="Username"
        value={username}
        mode="outlined"
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { color: colors.surface, backgroundColor: colors.background }]}
        placeholder="Password"
        secureTextEntry={securityPassword}
        value={password}
        mode="outlined"
        onChangeText={setPassword}
        right={
          <TextInput.Icon
            icon={securityPassword ? "eye-off" : "eye"}
            onPress={() => setSecurityPassword(!securityPassword)}
          />
        }
      />
      <Button
        style={[styles.button, { width: '100%' }]}
        mode="contained"
        onPress={handleLogin}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
  },
});

export default AccountScreen;
