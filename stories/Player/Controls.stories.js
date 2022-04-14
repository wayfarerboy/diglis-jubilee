import React from 'react';
import Controls from '../../components/Player/Controls';
import { seed } from '../../mocks/faker';
import withReduxState from '../../.storybook/withReduxState';

seed('Player/Controls');

const story = {
  title: 'Player/Controls',
  component: Controls,
  argTypes: {
    onNext: { action: 'next' },
    onPrev: { action: 'previous' },
    onToggle: { action: 'toggling play' },
  },
};

export const WithDefaults = () => <Controls />;
export const WithCanPlay = withReduxState(
  [{ type: 'setCanPlay', payload: true }],
  Controls,
);

export const WithNoNext = withReduxState(
  [
    { type: 'setPlaying', payload: true },
    { type: 'setCanPlay', payload: true },
  ],
  (props) => <Controls {...props} onNext={null} />,
);

export const WithNoPrev = withReduxState(
  [
    { type: 'setPlaying', payload: true },
    { type: 'setCanPlay', payload: true },
  ],
  (props) => <Controls {...props} onPrev={null} />,
);

export const CannotPlay = (props) => <Controls {...props} />;

export const Playing = withReduxState(
  [
    { type: 'setPlaying', payload: true },
    { type: 'setCanPlay', payload: true },
  ],
  Controls,
);

export const Disabled = withReduxState(
  [
    { type: 'setPlaying', payload: true },
    { type: 'setCanPlay', payload: true },
  ],
  (props) => <Controls {...props} disabled />,
);

export default story;
