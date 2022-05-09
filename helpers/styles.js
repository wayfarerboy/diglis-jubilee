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
    styles={{
      'body, #__next': {
        minHeight: '100%',
        bgcolor: 'background.default',
      },
    }}
  />
);
