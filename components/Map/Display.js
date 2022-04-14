import React from 'react';
import { func, object } from 'prop-types';
import { TileLayer, ZoomControl } from 'react-leaflet';
import { useSelector } from 'react-redux';

import Wrapper from './Wrapper';
import Bounds from './Bounds';
import Marker from './Marker';
import Controls from './Controls';
import { zoomBounds } from '../../helpers/geolocation';
import LocateWarning from './LocateWarning';

const Display = ({ data, whenCreated, sx = {} }) => {
  const active = useSelector(
    ({ app, map }) => map.mode === 'map' && !app.drawer && !map.detailsOpen,
  );
  const center = useSelector(({ map }) => map.center);
  const zoom = useSelector(({ map }) => map.zoom);
  return (
    <Wrapper
      sx={{
        width: '100%',
        height: '100%',
        opacity: { xs: active ? 1 : 0, sm: 1 },
        pointerEvents: { xs: active ? 'auto' : 'none', sm: 'auto' },
        '& *': {
          pointerEvents: { xs: active ? 'auto' : 'none', sm: 'auto' },
        },
        transition: 'opacity .3s ease-in-out',
        ...sx,
        '@keyframes bounce': {
          '0%': { mt: `-32px` },
          '30%': { mt: `-50px` },
          '50%': { mt: `-32px` },
          '70%': { mt: `-38px` },
          '80%': { mt: `-32px` },
          '90%': { mt: `-34px` },
          '100%': { mt: `-32px` },
        },
        '.leaflet-div-icon': {
          background: 'transparent',
          border: 0,
          '&.selected': {
            animation: 'bounce 0.35s ease 1',
          },
        },
      }}
      maxZoom={zoomBounds.max}
      minZoom={zoomBounds.min}
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
      whenCreated={whenCreated}
      footer={<LocateWarning />}
    >
      <Bounds pad={1.5} data={data} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((item) => (
        <Marker key={item.id} item={item} />
      ))}
      <ZoomControl position="bottomright" />
      <Controls data={data} position="bottomright" />
    </Wrapper>
  );
};

Display.displayName = 'MapDisplay';
Display.propTypes = { sx: object, whenCreated: func };

export default Display;
