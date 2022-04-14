import React from 'react';
import Footer from '../../components/Pages/Footer';
import faker, { seed } from '../../mocks/faker';

seed('Pages/Footer');

const story = {
  title: 'Pages/Footer',
  component: Footer,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Footer />;
export const WithValues = (props) => <Footer {...props} />;

export default story;
