import React from 'react';
import Display from '../../components/Map/Display';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';
import withReduxState from '../../.storybook/withReduxState';

seed('Map/Display');
const data = generate('data');

const story = {
  title: 'Map/Display',
  component: Display,
  args: {
    sx: { height: 480 },
  },
};

export const WithDefaults = () => <Display />;
export const WithData = withReduxState(
  [{ type: 'setData', payload: data }],
  Display,
);

export default story;
