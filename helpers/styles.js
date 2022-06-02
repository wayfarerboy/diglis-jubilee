import React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';

export const globalStyles = (
  <GlobalStyles
    styles={{
      'body, #__next': {
        minHeight: '100%',
      },
    }}
  />
);

export const globalStylesDark = (
  <GlobalStyles
    styles={(theme) => ({
      'body, #__next': {
        minHeight: '100%',
        background: theme.palette.background.default,
      },
    })}
  />
);
