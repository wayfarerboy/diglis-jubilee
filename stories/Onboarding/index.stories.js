import React from 'react';
import index from '../../components/Onboarding/index';
import faker, { seed } from '../../mocks/faker';

seed('Onboarding/index');

const story = {
  title: 'Onboarding/index',
  component: index,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <index />;
export const WithValues = (props) => <index {...props} />;

export default story;
