import React from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import useGeoLocation from '../hooks/useGeolocation';
import BottomNavigation from '@mui/material/BottomNavigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/ViewList';
import Radar from '@mui/icons-material/Radar';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Fade from '@mui/material/Fade';
import 'leaflet/dist/leaflet.css';

import Section from './Section';

const Nearby = dynamic(() => import('./Nearby'), { ssr: false });
const MapDisplay = dynamic(() => import('./MapDisplay'), { ssr: false });

const Component = () => {
  const dispatch = useDispatch();
  const displayMode = useSelector(({ app }) => app.mode);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDVHtBhlA0QGtunEJHDG1VOktMQ8ZhFnGg',
  });
  const { position, accuracy } = useGeoLocation();

  const onChangeMode = (ev, payload) => {
    dispatch({ type: 'setDisplayMode', payload });
  };

  if (!isLoaded || !position) return null;

  return (
    <>
      <Box
        sx={{
          width: '100%',
          pb: 7,
          height: '100%',
          '.leaflet-container': {
            width: '100%',
            height: '100%',
          },
        }}
      >
        <Section active={displayMode === 'map'}>
          <MapDisplay />
        </Section>

        <Section active={displayMode === 'nearby'}>
          <Nearby />
        </Section>

        {displayMode === 'list' && (
          <Box sx={{ overflowY: 'auto', maxHeight: '100%' }}>
            <List>
              <ListItem>
                <ListItemText primary="An item" />
              </ListItem>
            </List>
          </Box>
        )}
      </Box>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 'drawer',
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={displayMode}
          onChange={onChangeMode}
        >
          <BottomNavigationAction label="Map" value="map" icon={<MapIcon />} />
          <BottomNavigationAction
            label="Nearby"
            value="nearby"
            icon={<Radar />}
          />
          <BottomNavigationAction
            label="List"
            value="list"
            icon={<ListIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default Component;
