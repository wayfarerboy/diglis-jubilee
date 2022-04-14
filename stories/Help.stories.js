import React from 'react';
import Help from '../components/Help';
import faker, { seed } from '../mocks/faker';

seed('Help');

const story = {
  title: 'Help',
  component: Help,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Help />;
export const WithValues = (props) => <Help {...props} />;

export default story;
