import Leaflet from 'leaflet';
import faker from './faker';

const generators = {
  data: ({ min = 6, max = 12, ...others }) =>
    Array.from(Array(faker.datatype.number({ min, max }))).map(() =>
      generators.item(others),
    ),

  item: (opts) => ({
    title: faker.lorem.title(),
    author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.lorem.description(),
    id: faker.datatype.uuid(),
    latlng: generators.latlng(opts),
    image: generators.image(opts),
    audio: generators.audio(opts),
  }),

  latlng: ({ asLeaflet }) => {
    const latlng = {
      lat: Number(
        faker.address.latitude(52.17321907192248, 52.182218788699124),
      ),
      lng: Number(
        faker.address.longitude(-2.222474834933261, -2.2168111108434303),
      ),
    };
    return asLeaflet ? Leaflet.latLng(latlng) : latlng;
  },

  image: () => `/images/${faker.datatype.number({ min: 0, max: 50 })}.jpg`,
  audio: () => `/audio/${faker.datatype.number({ min: 1, max: 50 })}.mp3`,
};

const generator = (type, opts = {}) => {
  const func = generators[type];
  if (!func) throw new Error('unknown-generator-type');
  return func(opts);
};

export default generator;
