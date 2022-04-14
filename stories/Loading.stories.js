import React from 'react';
import Loading from '../components/Loading';
import faker, { seed } from '../mocks/faker';

seed('Loading');

const story = {
  title: 'Loading',
  component: Loading,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Loading />;
export const WithValues = (props) => <Loading {...props} />;

export default story;
