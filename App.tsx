import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './app/utils/theme';
import {ThemeProvider} from './app/utils/themeContext';
import Routes from './app/navigation';
import {UserProvider} from './app/utils/userContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? theme.dark.colors.background
      : theme.light.colors.background,
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          {/* <SafeAreaView style={[styles.container, backgroundStyle]}> */}
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Routes />
          {/* </SafeAreaView> */}
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
