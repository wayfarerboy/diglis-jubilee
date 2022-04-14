import React from 'react';
import Volume from '../../components/Player/Volume';
import { seed } from '../../mocks/faker';
import withReduxState from '../../.storybook/withReduxState';

seed('Player/Volume');

const story = {
  title: 'Player/Volume',
  component: Volume,
};

export const WithNotMuted = () => <Volume />;
export const WithMuted = withReduxState([{ type: 'toggleMute' }], Volume);
export const WithDisabled = () => <Volume disabled />;

export default story;
