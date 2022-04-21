import React from 'react';
import Activities from '../../components/Pages/Activities';
import faker, { seed } from '../../mocks/faker';

seed('Pages/Activities');

const story = {
  title: 'Pages/Activities',
  component: Activities,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Activities />;
export const WithValues = (props) => <Activities {...props} />;

export default story;
