import { createRef } from 'react';
import Leaflet from 'leaflet';
import { useSelector } from 'react-redux';

import _data from '../helpers/data';
import { addLocationFields } from '../helpers/geolocation';

const data = _data.map((item) => ({ ...item, howler: createRef(null) }));

const useData = () => {
  const result = useSelector(({ geolocation }) => {
    const current = geolocation?.latlng && Leaflet.latLng(geolocation.latlng);
    const bearing = geolocation?.bearing || 0;
    return data
      .map((item) => addLocationFields({ item, current, bearing }))
      .sort(({ distanceValue: a }, { distanceValue: b }) => (a < b ? -1 : 1));
  });

  return result;
};

export default useData;
