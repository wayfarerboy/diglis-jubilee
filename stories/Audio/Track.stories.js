import React, { createRef } from 'react';
import Track from '../../components/Audio/Track';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';

seed('Audio/Track');
const src = generate('audio');

const story = {
  title: 'Audio/Track',
  component: Track,
  args: {
    src,
    audioRef: createRef(null),
    muted: false,
  },
  argTypes: {
    onPlay: { action: 'playing' },
    onPause: { action: 'pausing' },
    onStop: { action: 'stopping' },
    onError: { action: 'has error' },
  },
};

export const WithDefaults = () => <Track />;
export const WithValues = (props) => <Track {...props} />;

export default story;
