import React from 'react';
import Menu from '../components/Menu';
import faker, { seed } from '../mocks/faker';

seed('Menu');

const story = {
  title: 'Menu',
  component: Menu,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Menu />;
export const WithValues = (props) => <Menu {...props} />;

export default story;
