import React from 'react';
import { object } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

import usePlaylist from '../../hooks/usePlaylist';
import Artwork from './Artwork';
import Seeker from './Seeker';
import ListItem from '../List/ListItem';
import Controls from './Controls';

const noop = () => {};

const Player = ({ onView = noop, data = [], sx = {} }) => {
  const dispatch = useDispatch();

  const mode = useSelector(({ map }) => map.mode);
  const detailsOpen = useSelector(({ map }) => map.detailsOpen);
  const nearby = useSelector(({ map }) => map.nearby);
  const dense = useSelector(({ map, app }) => !!app.drawer || map.detailsOpen);
  const playId = useSelector(({ playback }) => playback.track);
  const playing = useSelector(({ playback }) => playback.playing);
  const [item, nextTrack, prevTrack] = usePlaylist(data);

  const audio = item?.howler?.current;

  const onPlay = (ev) => {
    ev.stopPropagation();
    audio?.play();
  };

  const onPause = (ev) => {
    ev.stopPropagation();
    audio.pause();
  };

  const onNext = (ev) => {
    ev.stopPropagation();
    dispatch({ type: 'playTrack', payload: nextTrack.id });
    onView(nextTrack.id)(ev);
  };

  const onPrev = (ev) => {
    if (audio.seek() > 2 || !prevTrack) {
      audio.seek(0);
    } else {
      dispatch({ type: 'playTrack', payload: prevTrack.id });
      onView(prevTrack.id)(ev);
    }
  };

  const controls = {
    onNext: nextTrack !== false ? onNext : null,
    onPlay: !playing && playId ? onPlay : null,
    onPause: playing ? onPause : null,
    onPrev: item?.audio ? onPrev : null,
  };

  return (
    <Box
      sx={{
        ...sx,
        zIndex: {
          xs: mode === 'track' || detailsOpen || nearby ? 'tooltip' : 0,
          sm: 'appBar',
        },
      }}
      data-help="player"
    >
      <Collapse in={!dense}>
        <Box
          sx={{
            px: 4,
            pt: { xs: 0, sm: 4 },
            pb: 0,
            textAlign: 'center',
            opacity: { xs: !detailsOpen && mode === 'track' ? 1 : 0, sm: 1 },
            pointerEvents: {
              xs: !detailsOpen && mode === 'track' ? 'auto' : 'none',
              sm: 'auto',
            },
          }}
        >
          <Artwork onClick={playing ? onPause : onPlay} image={item.image} />
        </Box>
      </Collapse>
      <List
        sx={
          dense
            ? {
                boxShadow: 3,
                position: 'relative',
                zIndex: 2,
              }
            : {}
        }
      >
        <ListItem
          dense={dense}
          disablePadding
          align="center"
          docId={item.id}
          onView={onView(item.id)}
          {...controls}
          {...item}
        />
      </List>
      {!dense && (
        <Seeker
          key={item?.id}
          audio={audio}
          sx={{ mb: { xs: 0, sm: 1 }, mx: 4 }}
        />
      )}
      {!dense && (
        <Controls
          sx={{ mx: 4, position: 'relative', top: { xs: -16, sm: 0 } }}
          {...controls}
        />
      )}
    </Box>
  );
};

Player.displayName = 'Player';
Player.propTypes = {
  sx: object,
};

export default Player;
