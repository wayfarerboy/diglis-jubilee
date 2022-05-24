import React from 'react';
import Recorder from '../../components/Contribute/Recorder';
import faker, { seed } from '../../mocks/faker';

seed('Contribute/Recorder');

const story = {
  title: 'Contribute/Recorder',
  component: Recorder,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Recorder />;
export const WithValues = (props) => <Recorder {...props} />;

export default story;
