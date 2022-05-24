import React from 'react';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SkipNext from '@mui/icons-material/SkipNext';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
import { bool, func } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

import Volume from './Volume';
import Repeat from './Repeat';

const Controls = ({ sx, dense, disabled, onPlay, onPause, onPrev, onNext }) => {
  const dispatch = useDispatch();
  const active = useSelector(({ playback }) => playback.mode === 'closest');
  const isIntro = useSelector(
    ({ playback }) => playback.track === 'introduction',
  );
  const onExit = () => {
    dispatch({ type: 'playTrack', payload: null });
  };
  return (
    <Box sx={sx}>
      <Grid
        container
        wrap="nowrap"
        alignItems="center"
        justifyContent="center"
        data-help="controls"
        sx={{
          '& > div': {
            transition: 'all .3s ease-in-out',
            '&.skip': {
              transform: active ? 'scale(1)' : 'scale(0.9)',
              opacity: active ? 1 : 0,
              pointerEvents: active ? 'auto' : 'none',
            },
          },
        }}
      >
        {!dense && (
          <Grid
            item
            sx={{
              transform:
                active || isIntro ? 'translateX(0)' : 'translateX(100%)',
            }}
          >
            <Volume sx={{ ml: isIntro ? 3.5 : 0, mr: 1 }} disabled={disabled} />
          </Grid>
        )}
        {!dense && !isIntro && (
          <Grid item className="skip">
            <IconButton
              disabled={disabled || !onPrev}
              onClick={onPrev}
              size="small"
              aria-label="Skip to previous track"
            >
              <SkipPrevious fontSize="large" />
            </IconButton>
          </Grid>
        )}
        <Grid item>
          <IconButton
            disabled={disabled || (!onPause && !onPlay)}
            size={dense ? 'small' : 'large'}
            onClick={onPause || onPlay}
            aria-label={onPause ? 'Pause track' : 'Play track'}
            sx={{
              mx: 1,
              bgcolor: 'secondary.light',
              '&:active,&:focus,&:hover': {
                bgcolor: 'secondary.light',
              },
            }}
          >
            {onPause ? (
              <Pause fontSize={dense ? 'medium' : 'large'} />
            ) : (
              <PlayArrow fontSize={dense ? 'medium' : 'large'} />
            )}
          </IconButton>
        </Grid>
        {(active || !dense) && !isIntro && (
          <Grid item className="skip">
            <IconButton
              disabled={disabled || !onNext}
              onClick={onNext}
              size={dense ? 'small' : 'large'}
              aria-label="Skip to next track"
            >
              <SkipNext fontSize={dense ? 'medium' : 'large'} />
            </IconButton>
          </Grid>
        )}
        {isIntro && (
          <Grid item>
            <Button size="small" onClick={onExit} color="inherit">
              Exit intro
            </Button>
          </Grid>
        )}
        {!dense && !isIntro && (
          <Grid
            item
            sx={{
              transform: active ? 'translateX(0)' : 'translateX(-100%)',
              ml: active ? 0 : -2,
            }}
          >
            <Repeat disabled={disabled} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

Controls.displayName = 'PlayerControls';
Controls.propTypes = {
  onPrev: func,
  onNext: func,
  onPlay: func,
  onPause: func,
  disabled: bool,
  dense: bool,
};

export default Controls;
