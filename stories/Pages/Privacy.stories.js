import React from 'react';
import Privacy from '../../components/Pages/Privacy';
import faker, { seed } from '../../mocks/faker';

seed('Pages/Privacy');

const story = {
  title: 'Pages/Privacy',
  component: Privacy,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Privacy />;
export const WithValues = (props) => <Privacy {...props} />;

export default story;
