import React from 'react';
import Section from '../../components/Pages/Section';
import faker, { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';

seed('Pages/Section');

const story = {
  title: 'Pages/Section',
  component: Section,
  args: {
    image: generate('image'),
    title: faker.lorem.title(),
    body: faker.lorem.description(),
    keyId: faker.datatype.uuid(),
    index: 0,
    visible: true,
  },
  argTypes: {
    onEnter: { actions: 'entering' },
  },
};

export const WithDefaults = () => <Section />;
export const WithValues = (props) => <Section {...props} />;

export default story;
