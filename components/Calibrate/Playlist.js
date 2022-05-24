import React from 'react';
import { func } from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import BackButton from './BackButton';
import Introduction from './Introduction';

const Playlist = ({ onReady, onSwitch }) => {
  return (
    <>
      <Typography variant="body1" sx={{ mb: 6 }}>
        To get started, listen to an introduction to the project using the
        button below.
      </Typography>
      <Grid xs item />
      <Introduction onReady={onReady} />
      <BackButton onClick={onSwitch} />
    </>
  );
};

Playlist.displayName = 'CalibratePlaylist';
Playlist.propTypes = {
  onReady: func,
  onSwitch: func,
};

export default Playlist;
