import { string, number, object, shape } from 'prop-types';

export const dataItem = shape({
  id: string,
  title: string,
  description: string,
  image: string,
  audio: string,
  howler: object,
  latlng: shape({
    lat: number,
    lng: number,
  }),
});
