import React from 'react';
import IconButton from '@mui/material/IconButton';
import VolumeOff from '@mui/icons-material/VolumeOff';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { bool, object } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

const Volume = ({ sx, disabled }) => {
  const dispatch = useDispatch();
  const muted = useSelector(({ playback }) => playback.muted);

  const onToggle = () => {
    dispatch({ type: 'toggleMute' });
  };

  return (
    <IconButton sx={sx} onClick={onToggle} disabled={disabled}>
      {muted ? <VolumeOff /> : <VolumeUp />}
    </IconButton>
  );
};

Volume.displayName = 'PlayerVolume';
Volume.propTypes = {
  sx: object,
  disabled: bool,
};

export default Volume;
