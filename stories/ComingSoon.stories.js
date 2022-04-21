import React from 'react';
import ComingSoon from '../components/ComingSoon';
import faker, { seed } from '../mocks/faker';

seed('ComingSoon');

const story = {
  title: 'ComingSoon',
  component: ComingSoon,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <ComingSoon />;
export const WithValues = (props) => <ComingSoon {...props} />;

export default story;
