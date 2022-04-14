import React from 'react';
import AppWrapper from '../components/AppWrapper';
import faker, { seed } from '../mocks/faker';

seed('AppWrapper');

const story = {
  title: 'AppWrapper',
  component: AppWrapper,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <AppWrapper />;
export const WithValues = (props) => <AppWrapper {...props} />;

export default story;
