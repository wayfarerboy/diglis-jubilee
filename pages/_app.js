import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Snackbar from '../components/Snackbar';
import { theme } from '../helpers/theme';
import { store } from '../helpers/redux';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <Snackbar />
        </ThemeProvider>
      </CssBaseline>
    </Provider>
  );
}

export default MyApp;
