import React, { useState } from 'react';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import AutoMode from '@mui/icons-material/AutoMode';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector, useDispatch } from 'react-redux';
import { object, bool } from 'prop-types';

import useLocalStorage from '../../hooks/useLocalStorage';

const modes = {
  moving: {
    Icon: AutoAwesome,
    label: 'Tour guide mode',
    description: 'Play only when near',
  },
  closest: {
    Icon: AutoMode,
    label: 'Explore mode',
    description: 'Play all, closest first',
  },
};
const modeList = Object.keys(modes).map((id) => ({ id, ...modes[id] }));

const Repeat = ({ disabled, sx, open: _open = false }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(_open);
  const [anchor, setAnchor] = useState();
  const [access] = useLocalStorage('locationAccess', 'initing');
  const playMode = useSelector(({ playback }) => playback.mode);

  const onMode = (id) => () => {
    dispatch({ type: 'setPlaybackMode', payload: id });
    setOpen(false);
  };

  const onOpen = (ev) => {
    setAnchor(ev.target);
    setOpen(true);
  };

  const onClose = () => setOpen(false);

  const RepeatIcon = modes[playMode].Icon;
  const denied = access === 'denied';

  return (
    <>
      <IconButton onClick={onOpen} sx={sx} disabled={disabled || denied}>
        <RepeatIcon />
      </IconButton>
      <Menu open={open} onClose={onClose} anchorEl={anchor}>
        {modeList.map(({ id, label, description, Icon }) => (
          <ListItem
            dense
            onClick={onMode(id)}
            key={id}
            selected={id === playMode}
            button
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
  open: bool,
  sx: object,
  disabled: bool,
};

export default Repeat;
