import React from 'react';
import LogoTitle from '../components/LogoTitle';
import faker, { seed } from '../mocks/faker';

seed('LogoTitle');

const story = {
  title: 'LogoTitle',
  component: LogoTitle,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <LogoTitle />;
export const WithValues = (props) => <LogoTitle {...props} />;

export default story;
