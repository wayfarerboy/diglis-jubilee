import React from 'react';
import Playlist from '../../components/Calibrate/Playlist';
import faker, { seed } from '../../mocks/faker';

seed('Calibrate/Playlist');

const story = {
  title: 'Calibrate/Playlist',
  component: Playlist,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Playlist />;
export const WithValues = (props) => <Playlist {...props} />;

export default story;
