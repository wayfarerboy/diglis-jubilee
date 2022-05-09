import React from 'react';
import Repeat from '../../components/Player/Repeat';
import faker, { seed } from '../../mocks/faker';
import withReduxState from '../../.storybook/withReduxState';

seed('Player/Repeat');

const story = {
  title: 'Player/Repeat',
  component: Repeat,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <Repeat />;
export const WithValues = (props) => <Repeat {...props} />;
export const WithDisabled = (props) => <Repeat {...props} disabled />;
export const WithMovingMode = withReduxState(
  [{ type: 'setPlaybackMode', payload: 'moving' }],
  Repeat,
);
export const Open = withReduxState([{ type: 'openRepeatMenu' }], Repeat);

export default story;
