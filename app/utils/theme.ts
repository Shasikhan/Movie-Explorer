export const theme = {
  dark: {
    name: 'dark',
    colors: {
      background: '#0D0D0D',
      backgroundSecondary: '#1A1A1A',
      cardBackground: '#212121',
      primaryText: '#FFFFFF',
      secondaryText: '#B3B3B3',
      accent: '#E50914',
      highlight: '#FFD700',
      info: '#3E8EDE',
      textInputBackground: '#2B2B2B',
      textInputBorder: '#dedede',
    },
  },
  light: {
    name: 'light',
    colors: {
      background: '#F5F5F5',
      backgroundSecondary: '#FFFFFF',
      cardBackground: '#FFFFFF',
      primaryText: '#121212',
      secondaryText: '#666666',
      accent: '#E50914',
      highlight: '#FFD700',
      info: '#3E8EDE',
      tagBackground: '#E0E0E0',
      textInputBackground: '#FFFFFF',
      textInputBorder: '#CCCCCC',
    },
  },
};

export type ThemeType = typeof theme.dark | typeof theme.light;
