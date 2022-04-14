import React from 'react';
import Wrapper from '../components/Wrapper';
import { seed } from '../mocks/faker';
import generate from '../mocks/generator';
import withReduxState from '../.storybook/withReduxState';

seed('Wrapper');
const data = generate('data').map((item, i) => ({
  ...item,
  audio: `/audio/${i + 1}.mp3`,
}));

const story = {
  title: 'Wrapper',
  component: Wrapper,
};

export const WithDefaults = () => <Wrapper />;
export const WithValues = withReduxState(
  [{ type: 'setData', payload: data }],
  Wrapper,
);

export default story;
