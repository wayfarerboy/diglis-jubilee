import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const defaultTheme = {
  palette: {
    primary: {
      main: '#362653',
      light: '#e1d0ff',
    },
    secondary: {
      main: '#68996D',
      light: '#adffb6',
    },
  },
  typography: {
    fontFamily: `'Merriweather Sans', sans-serif`,
    fontWeight: 300,
  },
};

const darkThemeDefaults = {
  palette: {
    primary: {
      main: '#adffb6',
    },
    secondary: {
      main: '#DFCC4D',
    },
    background: {
      default: '#362653',
    },
    mode: 'dark',
  },
  typography: {
    fontFamily: `'Merriweather Sans', sans-serif`,
    fontWeight: 300,
  },
};

export const theme = responsiveFontSizes(createTheme(defaultTheme), {
  factor: 3,
});

export const darkTheme = responsiveFontSizes(createTheme(darkThemeDefaults), {
  factor: 3,
});
