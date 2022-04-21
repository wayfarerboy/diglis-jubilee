import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Info from '@mui/icons-material/Info';
import { object, string } from 'prop-types';
import { useDispatch } from 'react-redux';

const Description = ({ sx, title, image, docId, description }) => {
  const dispatch = useDispatch();
  const onOpen = (ev) => {
    ev.stopPropagation();
    dispatch({ type: 'setAppDrawer', payload: null });
    dispatch({
      type: 'openDetails',
      payload: { title, image, description, docId },
    });
  };
  return (
    <Box sx={sx} data-help="details">
      <IconButton disabled={!description} onClick={onOpen}>
        <Info />
      </IconButton>
    </Box>
  );
};

Description.displayName = 'PlayerDescription';
Description.propTypes = {
  title: string,
  description: string,
  image: string,
  sx: object,
  docId: string,
};

export default Description;
