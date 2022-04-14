import React from 'react';
import Calibrate from '../components/Calibrate';
import faker, { seed } from '../mocks/faker';

seed('Calibrate');

const story = {
  title: 'Calibrate',
  component: Calibrate,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Calibrate />;
export const WithValues = (props) => <Calibrate {...props} />;

export default story;
