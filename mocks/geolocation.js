import Leaflet from 'leaflet';

import faker from './faker';

export const getRandomLatlng = (asLeaflet) => {
  const latlng = {
    lat: faker.address.latitude(52.17321907192248, 52.182218788699124),
    lng: faker.address.longitude(-2.222474834933261, -2.2168111108434303),
  };
  return asLeaflet ? Leaflet.latLng(latlng) : latlng;
};
