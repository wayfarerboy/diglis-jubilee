import React from 'react';
import Marker from '../../components/Map/Marker';
import faker, { seed } from '../../mocks/faker';

seed('Map/Marker');

const story = {
  title: 'Map/Marker',
  component: Marker,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Marker />;
export const WithValues = (props) => <Marker {...props} />;

export default story;
