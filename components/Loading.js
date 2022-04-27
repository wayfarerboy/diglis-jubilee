import React from 'react';
import Box from '@mui/material/Box';

import LogoTitle from './LogoTitle';

const Loading = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: 'secondary.light',
      }}
    >
      <LogoTitle progress>Loading...</LogoTitle>
    </Box>
  );
};

Loading.displayName = 'Loading';

export default Loading;
