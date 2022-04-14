import React from 'react';
import Wrapper from '../../components/Map/Wrapper';
import faker, { seed } from '../../mocks/faker';

seed('Map/Wrapper');

const story = {
  title: 'Map/Wrapper',
  component: Wrapper,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Wrapper />;
export const WithValues = (props) => <Wrapper {...props} />;

export default story;
