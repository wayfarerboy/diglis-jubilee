import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { func, arrayOf, object } from 'prop-types';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import ButtonBase from '@mui/material/ButtonBase';
import VolumeUp from '@mui/icons-material/VolumeUp';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Fab from '@mui/material/Fab';

import { dataItem } from '../../helpers/propTypes';
import Compass from './Compass';

const Details = ({ data = [], onView, sx = {} }) => {
  const dispatch = useDispatch();

  const exploreMode = useSelector(
    ({ playback }) => playback.mode === 'closest',
  );
  const nearby = useSelector(({ map }) => map.nearby);
  const open = useSelector(({ map }) => map.detailsOpen);
  const { title, image, description, docId } = useSelector(
    ({ map }) => map.details,
  );
  const item = data.find(({ id }) => docId === id);

  const playing = useSelector(({ playback }) => playback.track === docId);

  const onPlay = (ev) => {
    if (!playing) dispatch({ type: 'playTrack', payload: docId });
    dispatch({ type: 'showPlayer' });
    onView(docId)(ev);
  };

  const onExited = () => dispatch({ type: 'clearDetails' });
  const onCloseNearby = () => dispatch({ type: 'setAppDrawer', payload: null });

  return (
    <Box
      component={nearby ? ButtonBase : 'div'}
      onClick={nearby ? onCloseNearby : null}
      sx={sx}
    >
      <Collapse in={open} onExited={onExited}>
        <Box sx={{ position: 'relative', height: '100%', overflowY: 'auto' }}>
          {image && (
            <Box>
              <Box
                sx={{
                  height: 200,
                  position: 'relative',
                  img: { objectFit: 'cover' },
                }}
              >
                <Image src={image} layout="fill" />
              </Box>
            </Box>
          )}
          <Box sx={{ p: 2, pb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {exploreMode ? (
                <Fab
                  sx={{ position: 'relative', top: -2, mr: 1 }}
                  onClick={onPlay}
                  color="inherit"
                  size="small"
                >
                  {playing ? (
                    <VolumeUp fontSize="medium" />
                  ) : (
                    <PlayArrow fontSize="medium" />
                  )}
                </Fab>
              ) : (
                <Compass
                  sx={{ display: 'inline-block', pr: 1 }}
                  size="small"
                  {...(item || {})}
                  onClick={onView(item?.id)}
                />
              )}
              {title}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {description}
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

Details.displayName = 'ListDetails';
Details.propTypes = {
  sx: object,
  onView: func,
  data: arrayOf(dataItem),
};

export default Details;
