import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Script from 'next/script';

import Cookies from '../components/Cookies';
import Snackbar from '../components/Snackbar';
import { theme } from '../helpers/theme';
import { store } from '../helpers/redux';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
						function gtag() {
							dataLayer.push(arguments);
						}
						gtag('js', new Date());
						gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');`}
      </Script>
      <Provider store={store}>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
            <Snackbar />
            <Cookies />
          </ThemeProvider>
        </CssBaseline>
      </Provider>
    </>
  );
}

export default MyApp;
