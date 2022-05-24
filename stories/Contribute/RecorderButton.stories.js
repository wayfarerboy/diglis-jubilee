import React from 'react';
import RecorderButton from '../../components/Contribute/RecorderButton';
import faker, { seed } from '../../mocks/faker';

seed('Contribute/RecorderButton');

const story = {
  title: 'Contribute/RecorderButton',
  component: RecorderButton,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <RecorderButton />;
export const WithValues = (props) => <RecorderButton {...props} />;

export default story;
