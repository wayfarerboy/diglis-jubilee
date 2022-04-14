import React from 'react';
import Switcher from '../../components/Player/Switcher';
import faker, { seed } from '../../mocks/faker';

seed('Player/Switcher');

const story = {
  title: 'Player/Switcher',
  component: Switcher,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Switcher />;
export const WithValues = (props) => <Switcher {...props} />;

export default story;
