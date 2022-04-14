import React from 'react';
import Repeat from '../../components/Player/Repeat';
import faker, { seed } from '../../mocks/faker';

seed('Player/Repeat');

const story = {
  title: 'Player/Repeat',
  component: Repeat,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Repeat />;
export const WithValues = (props) => <Repeat {...props} />;
export const WithDisabled = (props) => <Repeat {...props} disabled />;

export default story;
