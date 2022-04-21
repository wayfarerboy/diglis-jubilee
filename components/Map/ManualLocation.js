import React from 'react';
import { Circle, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

const ManualLocation = () => {
  const dispatch = useDispatch();
  useMapEvents({
    click: (ev) => {
      dispatch({
        type: 'setGeolocation',
        payload: {
          manual: true,
          latlng: { lat: ev.latlng.lat, lng: ev.latlng.lng },
        },
      });
    },
  });

  const latlng = useSelector(({ geolocation }) => geolocation.latlng);
  const isManual = useSelector(({ geolocation }) => !!geolocation.manual);

  if (!isManual) return null;
  return <Circle center={latlng} radius={10} />;
};

ManualLocation.displayName = 'MapManualLocation';

export default ManualLocation;
