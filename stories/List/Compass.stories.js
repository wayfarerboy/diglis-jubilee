import React from 'react';
import Compass from '../../components/List/Compass';
import faker, { seed } from '../../mocks/faker';
import { getRandomLatlng } from '../../mocks/geolocation';
import withReduxState from '../../.storybook/withReduxState';

seed('List/CompassIcon');

const story = {
  title: 'List/Compass',
  component: Compass,
  args: {
    latlng: getRandomLatlng(true),
    current: getRandomLatlng(),
  },
};

export const WithDefaults = () => <Compass />;
export const WithLocation = (props) => <Compass {...props} />;
export const WithBearing = withReduxState(
  [
    {
      type: 'setBearing',
      payload: faker.datatype.number({ min: 0, max: 360 }),
    },
  ],
  Compass,
);

export default story;
