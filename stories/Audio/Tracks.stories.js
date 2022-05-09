import React from 'react';
import Tracks from '../../components/Audio/Tracks';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';
import withReduxState from '../../.storybook/withReduxState';

seed('Audio/Tracks');
const data = generate('data').map((item, i) => ({
  ...item,
  audio: `/audio/${i + 1}.mp3`,
}));

const story = {
  title: 'Audio/Tracks',
  component: Tracks,
  args: { data },
};

export const WithDefaults = () => <Tracks />;
export const WithValues = Tracks;
export const WithPlayingTrack = withReduxState(
  [{ type: 'playTrack', payload: data[0].id }],
  Tracks,
);

export default story;
