import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 11.2

import Wrapper from './Wrapper';
import { store } from '../helpers/redux';
import { theme } from '../helpers/theme';

export const decorators = [
  (Story) => (
    <div id="__next">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <Wrapper>
              <Story />
            </Wrapper>
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/',
    asPath: '/',
    query: {},
    push() {},
  },
};
