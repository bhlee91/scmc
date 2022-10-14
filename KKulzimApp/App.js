import React, {useEffect} from 'react';
import {
  configureFonts,
  DarkTheme,
  useTheme,
  withTheme,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  Card,
  Button,
} from 'react-native-paper';
import store from './src/store/index/'
import AppInner from './AppInner';
// import store from './src/store';
import {Provider as StoreProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0084ff',
    accent: '#f1c40f',
    background: '#f9f9f9',
    paper: 'white',
  },
};

function App() {
  return (
    <MenuProvider style={{ backgroundColor: 'white', padding: 10, justifyContent: 'space-between' }}>
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AppInner />
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </MenuProvider>
  );
}

export default App;
