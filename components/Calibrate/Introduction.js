import React from 'react';
import { func } from 'prop-types';
import Button from '@mui/material/Button';

import Introduction from '../Introduction';

const Component = ({ onReady }) => {
  return (
    <>
      <Introduction
        fullWidth
        size="large"
        variant="contained"
        sx={{ mb: 2 }}
        onClick={onReady}
      >
        Play introduction
      </Introduction>
      <Button
        onClick={onReady}
        fullWidth
        size="small"
        variant="outlined"
        sx={{ borderColor: 'primary.light', color: 'primary.light' }}
      >
        Continue without introduction
      </Button>
    </>
  );
};

Component.displayName = 'CalibrateIntroduction';
Component.propTypes = {
  onReady: func,
};

export default Component;
