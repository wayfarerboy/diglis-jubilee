import React from 'react';
import BackButton from '../../components/Calibrate/BackButton';
import faker, { seed } from '../../mocks/faker';

seed('Calibrate/BackButton');

const story = {
  title: 'Calibrate/BackButton',
  component: BackButton,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <BackButton />;
export const WithValues = (props) => <BackButton {...props} />;

export default story;
