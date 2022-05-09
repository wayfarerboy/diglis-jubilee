import React from 'react';
import Switcher from '../../components/Player/Switcher';
import { seed } from '../../mocks/faker';
import withReduxState from '../../.storybook/withReduxState';

seed('Player/Switcher');

const story = {
  title: 'Player/Switcher',
  component: Switcher,
};

export const WithDefaults = () => <Switcher />;
export const WithMapMode = withReduxState(
  [{ type: 'setMapMode', payload: 'map' }],
  Switcher,
);

export default story;
