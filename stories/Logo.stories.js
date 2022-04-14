import React from 'react';
import Logo from '../components/Logo';
import faker, { seed } from '../mocks/faker';

seed('Logo');

const story = {
  title: 'Logo',
  component: Logo,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Logo />;
export const WithValues = (props) => <Logo {...props} />;

export default story;
