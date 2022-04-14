import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import { seed } from './faker';
import generate from './generator';
import { zoomBounds } from '../helpers/geolocation';

seed('MapWrapper');
const data = generate('data');
const bounds = data.reduce(
  (bounds, { latlng }) => bounds.extend(latlng),
  Leaflet.latLngBounds(),
);
const center = bounds.getCenter();

const Wrapper = ({ width = 480, height = 480, children }) => (
  <MapContainer
    maxZoom={zoomBounds.max}
    minZoom={zoomBounds.min}
    center={center}
    zoom={16}
    style={{ width, height }}
    zoomControl={false}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {children}
  </MapContainer>
);

export default Wrapper;
