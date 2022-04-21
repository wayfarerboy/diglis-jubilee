import React from 'react';
import Backdrop from '../../components/Onboarding/Backdrop';
import faker, { seed } from '../../mocks/faker';

seed('Onboarding/Backdrop');

const story = {
  title: 'Onboarding/Backdrop',
  component: Backdrop,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Backdrop />;
export const WithValues = (props) => <Backdrop {...props} />;

export default story;
