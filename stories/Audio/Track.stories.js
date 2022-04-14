import React from 'react';
import Track from '../../components/Audio/Track';
import faker, { seed } from '../../mocks/faker';

seed('Audio/Track');

const story = {
  title: 'Audio/Track',
  component: Track,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Track />;
export const WithValues = (props) => <Track {...props} />;

export default story;
