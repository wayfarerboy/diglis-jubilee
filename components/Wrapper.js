import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';

import Recorder from './Contribute/Recorder';
import AppWrapper from './AppWrapper';
import useData from '../hooks/useData';
import Switcher from './Player/Switcher';
import Details from './List/Details';
import Display from './Map/Display';
import Player from './Player';
import Drawer from './Drawer';
import Tracks from './Audio/Tracks';
import { zoomBounds } from '../helpers/geolocation';
import useAudioUnlocker from '../helpers/useAudioUnlocker';
import Onboarding from './Onboarding';
import Calibrate from './Calibrate';

const Wrapper = () => {
  const [map, setMap] = useState();
  const data = useData();
  const dispatch = useDispatch();
  useAudioUnlocker();

  const onView = (id, noClose) => (ev) => {
    ev.stopPropagation();
    if (!noClose) {
      dispatch({ type: 'setMapMode', payload: 'map' });
      dispatch({ type: 'setAppDrawer', payload: null });
    }
    dispatch({ type: 'setLabel', payload: id });
    map.eachLayer((layer) => {
      if (layer.getLatLng && layer.options.docId === id) {
        map.flyTo(layer.getLatLng(), zoomBounds.max);
      }
    });
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 320px', md: '1fr 420px' },
          gridTemplateRows: {
            xs: 'auto auto auto 1fr auto',
            sm: 'auto 1fr auto',
          },
          gridTemplateAreas: {
            xs: '"switcher" "player" "map" "details" "nearby"',
            sm: '"map player" "map details" "map nearby"',
          },
          width: '100vw',
          height: '100%',
          maxHeight: '100%',
          '> *': { minHeight: 0, maxWidth: '100vw' },
        }}
      >
        <AppWrapper
          title="Diglis Jubilee: Memories"
          description="Explore Diglis and hear historical accounts from our community"
          action={
            <Recorder
              size="small"
              sx={{ pointerEvents: 'auto' }}
              color="primary"
              variant="contained"
            />
          }
        />
        <Tracks data={data} />
        <Display
          data={data}
          sx={{
            gridArea: 'map',
            zIndex: 1,
            position: { xs: 'fixed', sm: 'static' },
            height: { xs: 'calc(100vw - 64px)', sm: 'auto' },
            maxHeight: { xs: '40vh', sm: 'none' },
            top: { xs: 108, sm: 'auto' },
            left: { xs: 0, sm: 'auto' },
          }}
          whenCreated={setMap}
        />
        <Switcher
          sx={{
            display: { xs: 'block', sm: 'none' },
            gridArea: 'switcher',
            zIndex: 'tooltip',
            position: 'relative',
            bgcolor: 'background.paper',
            mt: 8,
          }}
        />
        <Player
          data={data}
          sx={{
            gridArea: 'player',
            position: 'relative',
            bgcolor: 'background.paper',
          }}
          onView={onView}
        />
        <Details
          sx={{
            gridArea: 'details',
            overflowY: 'auto',
            zIndex: 'tooltip',
            position: 'relative',
            bgcolor: 'background.paper',
          }}
          onView={onView}
          data={data}
        />
        <Drawer
          onView={onView}
          data={data}
          sx={{
            gridArea: 'nearby',
            display: 'flex',
            zIndex: 'tooltip',
            position: 'relative',
            bgcolor: 'background.paper',
          }}
          map={map}
        />
      </Box>
      <Onboarding />
      <Calibrate />
    </>
  );
};

export default Wrapper;
