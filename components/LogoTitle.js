import React from 'react';
import Box from '@mui/material/Box';
import { number, bool, any } from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import Logo from './Logo';

const LogoTitle = ({ spacing = 2, progress, children, dark }) => {
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
        spacing={spacing}
        sx={{ mt: 0 }}
        justifyContent="center"
      >
        {progress && (
          <CircularProgress
            size={24}
            color={dark ? 'primary' : 'secondary'}
            sx={{ mr: 1 }}
          />
        )}
        <Typography variant="body2" component="div">
          {children}
        </Typography>
      </Grid>
    </Box>
  );
};

LogoTitle.displayName = 'LogoTitle';
LogoTitle.propTypes = {
  children: any,
  progress: bool,
  dark: bool,
  spacing: number,
};

export default LogoTitle;
