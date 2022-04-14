import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 11.2
import * as NextImage from 'next/image';
import GlobalStyles from '@mui/material/GlobalStyles';

import Wrapper from './Wrapper';
import { store } from '../helpers/redux';
import { theme } from '../helpers/theme';

const OriginalNextImage = NextImage.default;

// eslint-disable-next-line
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

const globalStyles = (
  <GlobalStyles
    styles={{
      'html, body, #root, #__next': { height: '100%' },
    }}
  />
);

export const decorators = [
  (Story) => (
    <div id="__next">
      {globalStyles}
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
