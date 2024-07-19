import * as React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { LightSchema, DarkSchema } from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux'
import { store } from './src/store';
import { AuthProvider } from './src/context/AuthContext';
function App() {
  const colorScheme = useColorScheme();

  const statusBarStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  const statusBarbackgroundColor = colorScheme === 'dark' ? '#0093d2' : '#00aeef';

  const theme = colorScheme === 'dark' ? DarkSchema : LightSchema;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={{ ...DefaultTheme, ...theme }}>
          <StatusBar
            barStyle={statusBarStyle}
            backgroundColor={statusBarbackgroundColor}
          />
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
