import React, { createRef } from 'react';
import { useSelector } from 'react-redux';
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
};

const Component = () => {
  const data = useSelector(({ data }) => data);
  const audioTracks = data.map(() => createRef(null));
  return <Tracks audioTracks={audioTracks} />;
};

export const WithDefaults = () => <Tracks />;
export const WithValues = withReduxState(
  [{ type: 'setData', payload: data }],
  Component,
);
export const WithPlayingTrack = withReduxState(
  [
    { type: 'setData', payload: data },
    { type: 'playTrack', payload: data[0].id },
  ],
  Component,
);

export default story;
