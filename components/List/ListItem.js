import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { bool, shape, number, oneOf, string, func } from 'prop-types';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import PlayArrow from '@mui/icons-material/PlayArrow';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

import Controls from '../Player/Controls';
import TrackTitle from './TrackTitle';
import Compass from './Compass';
import Description from './Description';

const Component = ({
  author,
  description,
  onPlay,
  title,
  image,
  docId,
  bearing,
  distance,
  variant = 'playback',
  hover,
  onView,
  animation,
  onEnter,
  onLeave,
  onClearHover,
  dense,
  onPause,
  onNext,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isPlaying = useSelector(({ playback }) => playback.track === docId);
  const playMode = useSelector(({ playback }) => playback.mode);
  const PlaybackIcon = isPlaying ? VolumeUp : PlayArrow;
  const onShow = () => {
    dispatch({ type: 'setAppDrawer', payload: null });
    dispatch({ type: 'showPlayer' });
  };
  return (
    <ListItem
      onClick={dense ? onShow : onPlay}
      button={dense || !!onPlay}
      dense={variant === 'list'}
      onMouseEnter={onPlay ? onEnter : null}
      onMouseLeave={onPlay ? onLeave : null}
      selected={variant === 'list' && isPlaying}
      id={dense ? 'play-item' : `list-item-${docId}`}
    >
      {!dense && (
        <Compass
          onClick={onView}
          onMouseEnter={onView ? onClearHover : null}
          onMouseLeave={onView ? onEnter : null}
          sx={{ flexBasis: variant === 'list' ? 48 : 54, flexShrink: 0, mr: 1 }}
          size={variant === 'list' ? 'small' : 'medium'}
          bearing={bearing}
          distance={distance}
        />
      )}
      {(variant === 'list' || dense) && (
        <Paper
          sx={{
            overflow: 'hidden',
            position: 'relative',
            width: 36,
            height: 36,
            flexBasis: 36,
            flexShrink: 0,
            mr: 1,
            backgroundImage: dense
              ? `linear-gradient(25deg, ${theme.palette.primary.main} -50%, ${theme.palette.primary.dark} 20%, ${theme.palette.secondary.dark} 90%)`
              : null,
            bgcolor: !dense ? 'background.default' : null,
            color: 'text.secondary',
            img: {
              objectFit: 'cover',
              opacity: !dense && (hover || isPlaying) ? 0.2 : 1,
            },
          }}
        >
          {image && <Image src={image} layout="fill" />}
          {!dense && (isPlaying || hover) && (
            <PlaybackIcon
              size="small"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </Paper>
      )}
      <ListItemText
        primary={
          variant === 'list' || dense ? (
            title || 'No track selected'
          ) : (
            <TrackTitle
              animation={animation}
              text={
                title || author || playMode === 'closest'
                  ? 'No track selected'
                  : 'No nearby memories'
              }
              sx={{ textAlign: 'center' }}
            />
          )
        }
        primaryTypographyProps={
          variant === 'list' || dense ? { noWrap: true } : {}
        }
        secondary={
          author || playMode === 'closest'
            ? 'Choose one from map or playlist'
            : 'Head towards a marker on the map'
        }
        secondaryTypographyProps={
          variant === 'playback' && !dense
            ? {
                sx: { textAlign: 'center' },
              }
            : {}
        }
      />
      {!dense && (
        <Description
          sx={{ textAlign: 'center', flexBasis: 54, flexShrink: 0, ml: 1 }}
          image={image}
          description={description}
          title={title}
          docId={docId}
        />
      )}
      {dense && (
        <Grid item>
          <Controls dense onPause={onPause} onPlay={onPlay} onNext={onNext} />
        </Grid>
      )}
    </ListItem>
  );
};

Component.displayName = 'ListListItem';

Component.propTypes = {
  author: string,
  description: string,
  latlng: shape({ lat: number, lng: number }),
  onClick: func,
  title: string,
  variant: oneOf(['list', 'playback']),
  image: string,
  docId: string,
  hover: bool,
  onView: func,
  animation: bool,
  onClearHover: func,
  onEnter: func,
  onLeave: func,
  onNext: func,
  onPause: func,
  dense: bool,
};

export default Component;
