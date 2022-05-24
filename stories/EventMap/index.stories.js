import React from 'react';
import index from '../../components/EventMap/index';
import faker, { seed } from '../../mocks/faker';

seed('EventMap/index');

const story = {
  title: 'EventMap/index',
  component: index,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <index />;
export const WithValues = (props) => <index {...props} />;

export default story;
