import React, { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector, useDispatch } from 'react-redux';
import { object, bool } from 'prop-types';

import { modes, modeList } from '../../helpers/modes';
import useLocalStorage from '../../hooks/useLocalStorage';

const Repeat = ({ disabled, sx }) => {
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const open = useSelector(({ playback }) => playback.repeatOpen);
  const [access] = useLocalStorage('locationAccess', 'initing');
  const isManual = useSelector(({ geolocation }) => !!geolocation.manual);
  const playMode = useSelector(({ playback }) => playback.mode || 'closest');

  const onMode = (id) => () => {
    dispatch({ type: 'setPlaybackMode', payload: id });
  };

  const onOpen = () => {
    dispatch({ type: 'openRepeatMenu' });
  };

  const onClose = () => {
    dispatch({ type: 'closeRepeatMenu' });
  };

  const RepeatIcon = modes[playMode].Icon;
  const denied = access === 'denied' && !isManual;

  return (
    <>
      <IconButton
        onClick={onOpen}
        sx={sx}
        disabled={disabled}
        data-help="repeat"
        ref={buttonRef}
        aria-label="Open play mode menu"
      >
        <RepeatIcon />
      </IconButton>
      <Menu open={open} onClose={onClose} anchorEl={buttonRef.current}>
        {modeList.map(({ id, label, description, Icon }) => (
          <ListItem
            dense
            onClick={onMode(id)}
            key={id}
            disabled={id === 'moving' && denied}
            selected={id === playMode}
            button
            data-help={id}
            aria-label={label}
          >
            <Icon fontSize="small" sx={{ mr: 2 }} />
            <ListItemText primary={label} secondary={description} />
          </ListItem>
        ))}
      </Menu>
    </>
  );
};

Repeat.displayName = 'PlayerRepeat';
Repeat.propTypes = {
  sx: object,
  disabled: bool,
};

export default Repeat;
