import React from 'react';
import { func } from 'prop-types';
import Button from '@mui/material/Button';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

const BackButton = ({ onClick }) => {
  return (
    <Button
      startIcon={<ChevronLeft />}
      sx={{ mt: 4 }}
      onClick={onClick}
      size="small"
      color="inherit"
      fullWidth
    >
      Choose a different mode
    </Button>
  );
};

BackButton.displayName = 'CalibrateBackButton';
BackButton.propTypes = {
  onClick: func,
};

export default BackButton;
