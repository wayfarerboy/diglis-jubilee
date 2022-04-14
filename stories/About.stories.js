import React from 'react';
import About from '../components/About';
import faker, { seed } from '../mocks/faker';

seed('About');

const story = {
  title: 'About',
  component: About,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <About />;
export const WithValues = (props) => <About {...props} />;

export default story;
