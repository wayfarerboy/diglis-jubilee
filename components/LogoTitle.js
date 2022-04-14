import React from 'react';
import Box from '@mui/material/Box';
import { bool, any } from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import Logo from './Logo';

const LogoTitle = ({ progress, children }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Logo
        variant="full"
        width={240}
        height={128}
        sx={{ position: 'relative', left: -4 }}
      />
      <Grid
        container
        alignItems="center"
        spacing={2}
        sx={{ mt: 0 }}
        justifyContent="center"
      >
        {progress && (
          <CircularProgress size={24} color="secondary" sx={{ mr: 1 }} />
        )}
        <Typography variant="body2">{children}</Typography>
      </Grid>
    </Box>
  );
};

LogoTitle.displayName = 'LogoTitle';
LogoTitle.propTypes = {
  children: any,
  progress: bool,
};

export default LogoTitle;
