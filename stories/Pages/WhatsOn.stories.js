import React from 'react';
import WhatsOn from '../../components/Pages/WhatsOn';
import faker, { seed } from '../../mocks/faker';

seed('Pages/WhatsOn');

const story = {
  title: 'Pages/WhatsOn',
  component: WhatsOn,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <WhatsOn />;
export const WithValues = (props) => <WhatsOn {...props} />;

export default story;
