import React from 'react';
import Introduction from '../components/Introduction';
import faker, { seed } from '../mocks/faker';

seed('Introduction');

const story = {
  title: 'Introduction',
  component: Introduction,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Introduction />;
export const WithValues = (props) => <Introduction {...props} />;

export default story;
