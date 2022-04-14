import React from 'react';
import LocateWarning from '../../components/Map/LocateWarning';
import faker, { seed } from '../../mocks/faker';

seed('Map/LocateWarning');

const story = {
  title: 'Map/LocateWarning',
  component: LocateWarning,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <LocateWarning />;
export const WithValues = (props) => <LocateWarning {...props} />;

export default story;
