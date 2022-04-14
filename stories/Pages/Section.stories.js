import React from 'react';
import Section from '../../components/Pages/Section';
import faker, { seed } from '../../mocks/faker';

seed('Pages/Section');

const story = {
  title: 'Pages/Section',
  component: Section,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Section />;
export const WithValues = (props) => <Section {...props} />;

export default story;
