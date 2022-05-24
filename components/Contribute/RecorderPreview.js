import React from 'react';
import Box from '@mui/material/Box';
import { object, string } from 'prop-types';

const RecorderPreview = ({ src, sx }) => {
  return (
    <Box component="audio" sx={sx} autoplay src={src} controls preload="auto" />
  );
};

RecorderPreview.displayName = 'ContributeRecorderPreview';
RecorderPreview.propTypes = {
  src: string,
  type: string,
  sx: object,
};

export default RecorderPreview;
