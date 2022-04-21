import React from 'react';
import Box from '@mui/material/Box';
import { object } from 'prop-types';
import { MapContainer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import 'leaflet.offline';

const Wrapper = ({ sx, header, footer, ...props }) => {
  return (
    <Box sx={sx} data-help="map">
      {header}
      <MapContainer {...props} />
      {footer}
    </Box>
  );
};

Wrapper.displayName = 'MapWrapper';
Wrapper.propTypes = {
  sx: object,
};

export default Wrapper;
