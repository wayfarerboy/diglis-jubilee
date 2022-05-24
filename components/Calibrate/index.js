import React, { useState } from 'react';
import { func } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Logo from '../Logo';
import useWidth from '../../hooks/useWidth';
import { darkTheme } from '../../helpers/theme';
import TourGuide from './TourGuide';
import Playlist from './Playlist';
import { modes, modeList } from '../../helpers/modes';

const Component = () => {
  const width = useWidth();
  const dispatch = useDispatch();
  const [preMode, setPreMode] = useState();
  const playMode = useSelector(({ playback }) => playback.mode);

  const onChoose = (mode) => () => setPreMode(mode);

  const onSwitch = () => setPreMode();

  const onModeReady = () => {
    dispatch({ type: 'setPlaybackMode', payload: preMode });
    setPreMode();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={!playMode}
        fullScreen={width === 'xs'}
      >
        <DialogContent
          sx={{
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'stretch',
            textAlign: 'center',
          }}
        >
          <Logo
            variant="full"
            width={240}
            height={128}
            sx={{ mt: 2, position: 'relative', left: -4 }}
          />
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              marginTop: -2,
            }}
            paragraph
          >
            Memories
          </Typography>
          <Typography variant="h6" paragraph>
            {modes[preMode]?.label || 'Choose a play mode'}
          </Typography>
          {!preMode && (
            <>
              <Typography variant="body1" color="text.secondary" paragraph>
                This project plays audio recordings from the Diglis community.
                There are two ways to play these tracks:
              </Typography>
              <List>
                {modeList.map(({ id, Icon, label, body }) => (
                  <ListItem
                    key={id}
                    onClick={onChoose(id)}
                    button
                    disableGutters
                  >
                    <Icon fontSize="large" sx={{ mr: 2 }} />
                    <ListItemText primary={label} secondary={body} />
                    <Grid item xs />
                    <ChevronRight fontSize="large" sx={{ ml: 1 }} />
                  </ListItem>
                ))}
              </List>
              <Typography color="text.secondary" variant="caption">
                Select one of the modes above.
              </Typography>
            </>
          )}
          {preMode === 'moving' && (
            <TourGuide onSwitch={onSwitch} onReady={onModeReady} />
          )}
          {preMode === 'closest' && (
            <Playlist onSwitch={onSwitch} onReady={onModeReady} />
          )}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

Component.displayName = 'CalibrateContainer';
Component.propTypes = {
  onReady: func,
};

export default Component;
