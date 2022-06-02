import React from 'react';
import DogShow from '../../components/Pages/DogShow';
import faker, { seed } from '../../mocks/faker';

seed('Pages/DogShow');

const story = {
  title: 'Pages/DogShow',
  component: DogShow,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <DogShow />;
export const WithValues = (props) => <DogShow {...props} />;

export default story;
