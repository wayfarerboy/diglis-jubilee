import React from 'react';
import Introduction from '../../components/Calibrate/Introduction';
import faker, { seed } from '../../mocks/faker';

seed('Calibrate/Introduction');

const story = {
  title: 'Calibrate/Introduction',
  component: Introduction,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Introduction />;
export const WithValues = (props) => <Introduction {...props} />;

export default story;
