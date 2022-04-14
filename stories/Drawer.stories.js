import React from 'react';
import Drawer from '../components/Drawer';
import faker, { seed } from '../mocks/faker';

seed('Drawer');

const story = {
  title: 'Drawer',
  component: Drawer,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Drawer />;
export const WithValues = (props) => <Drawer {...props} />;

export default story;
