import React from 'react';
import Index from '../../components/Onboarding/index';
import faker, { seed } from '../../mocks/faker';

seed('Onboarding/index');

const story = {
  title: 'Onboarding/index',
  component: Index,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Index />;
export const WithValues = (props) => <Index {...props} />;

export default story;
