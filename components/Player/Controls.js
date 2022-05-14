import React from 'react';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SkipNext from '@mui/icons-material/SkipNext';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
import { string, bool, func } from 'prop-types';
import { useSelector } from 'react-redux';

import Volume from './Volume';
import Repeat from './Repeat';

const Controls = ({
  variant,
  sx,
  dense,
  disabled,
  onPlay,
  onPause,
  onPrev,
  onNext,
}) => {
  const active = useSelector(({ playback }) => playback.mode === 'closest');
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
        {!dense && variant !== 'intro' && (
          <Grid
            item
            sx={{
              transform: active ? 'translateX(0)' : 'translateX(100%)',
            }}
          >
            <Volume sx={{ mr: 1 }} disabled={disabled} />
          </Grid>
        )}
        {!dense && variant !== 'intro' && (
          <Grid item className="skip">
            <IconButton
              disabled={disabled || !onPrev}
              onClick={onPrev}
              size="small"
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
            sx={{
              mx: 1,
              bgcolor: 'secondary.light',
            }}
          >
            {onPause ? (
              <Pause fontSize={dense ? 'medium' : 'large'} />
            ) : (
              <PlayArrow fontSize={dense ? 'medium' : 'large'} />
            )}
          </IconButton>
        </Grid>
        {(active || !dense) && variant !== 'intro' && (
          <Grid item className="skip">
            <IconButton
              disabled={disabled || !onNext}
              onClick={onNext}
              size={dense ? 'small' : 'large'}
            >
              <SkipNext fontSize={dense ? 'medium' : 'large'} />
            </IconButton>
          </Grid>
        )}
        {!dense && variant !== 'intro' && (
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
  variant: string,
  dense: bool,
};

export default Controls;
