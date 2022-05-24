import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import { bool } from 'prop-types';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import { modes } from '../helpers/modes';
import Introduction from './Introduction';

const Help = ({ active }) => {
  const dispatch = useDispatch();

  const onStart = () => {
    dispatch({ type: 'playTrack', payload: null });
    dispatch({ type: 'openOnboarding', payload: 0 });
    dispatch({ type: 'setAppDrawer', payload: null });
  };

  const onPlay = () => {
    dispatch({ type: 'setAppDrawer', payload: null });
  };

  return (
    <Collapse in={active}>
      <Box sx={{ p: 2, bgcolor: 'secondary.light' }}>
        <Typography variant="h5">How to use this app</Typography>
        <Divider sx={{ borderColor: 'primary.main', mb: 2 }} />
        <Typography variant="body1" paragraph>
          This app is best experienced on your mobile phone with headphones, and
          is intended to be listened to in {modes.moving.label} while walking
          around the Diglis area.
        </Typography>
        <Typography variant="caption" paragraph>
          You can optionally browse the memories from a laptop or desktop in
          {modes.closest.label} and choose the memories you wish to listen to.
        </Typography>
        <Button size="large" variant="contained" onClick={onStart} fullWidth>
          Show guide
        </Button>
        <Introduction
          size="large"
          color="secondary"
          variant="contained"
          onClick={onPlay}
          fullWidth
          sx={{ mt: 1 }}
        >
          Play introduction
        </Introduction>
      </Box>
    </Collapse>
  );
};

Help.displayName = 'Help';
Help.propTypes = {
  active: bool,
};

export default Help;
