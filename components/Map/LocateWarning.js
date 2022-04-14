import React from 'react';
import Box from '@mui/material/Box';
import { object, string } from 'prop-types';

const LocateWarning = ({ title = 'Hello world', sx }) => {
  return (
    <Box sx={sx}>{title}</Box>
  );
};

LocateWarning.displayName = 'MapLocateWarning';
LocateWarning.propTypes = {
  title: string,
  sx: object,
};

export default LocateWarning;
