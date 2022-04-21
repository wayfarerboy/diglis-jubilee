import React from 'react';
import ManualLocation from '../../components/Map/ManualLocation';
import faker, { seed } from '../../mocks/faker';

seed('Map/ManualLocation');

const story = {
  title: 'Map/ManualLocation',
  component: ManualLocation,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <ManualLocation />;
export const WithValues = (props) => <ManualLocation {...props} />;

export default story;
