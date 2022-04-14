import React from 'react';
import Details from '../../components/List/Details';
import faker, { seed } from '../../mocks/faker';

seed('List/Details');

const story = {
  title: 'List/Details',
  component: Details,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Details />;
export const WithValues = (props) => <Details {...props} />;

export default story;
