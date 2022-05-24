import React from 'react';
import AppWrapper from '../components/AppWrapper';
import faker, { seed } from '../mocks/faker';
import Button from '@mui/material/Button';

seed('AppWrapper');

const story = {
  title: 'AppWrapper',
  component: AppWrapper,
  args: {
    title: faker.lorem.title(),
    action: <Button>{faker.lorem.word()}</Button>,
  },
};

export const WithDefaults = () => <AppWrapper />;
export const WithValues = (props) => <AppWrapper {...props} />;

export default story;
