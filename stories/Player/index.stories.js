import React from 'react';
import Container from '@mui/material/Container';
import Player from '../../components/Player';
import faker, { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';
import withReduxState from '../../.storybook/withReduxState';

seed('Player/index');

const data = generate('data');
const current = generate('latlng');
const duration = faker.datatype.number({ min: 60, max: 360 });
const audioTracks = {
  [data[0].id]: {
    duration,
    currentTime: faker.datatype.number({ min: 0, max: duration }),
    play: () => {},
  },
};

const story = {
  title: 'Player/index',
  component: Player,
  args: {
    audioTracks,
  },
};

const Component = (props) => (
  <Container maxWidth="xs">
    <Player {...props} />
  </Container>
);

export const WithDefaults = () => <Component />;
export const WithItem = withReduxState(
  [
    { type: 'addToPlaylist', payload: data[0].id },
    { type: 'playTrack', payload: 0 },
    { type: 'setData', payload: data },
    { type: 'setCanPlay', payload: true },
    { type: 'setPlaying', payload: true },
    { type: 'setGeolocation', payload: { latlng: current } },
  ],
  Component,
);

export default story;
