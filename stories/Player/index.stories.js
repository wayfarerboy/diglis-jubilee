import React from 'react';
import Container from '@mui/material/Container';
import Player from '../../components/Player';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';
import withReduxState from '../../.storybook/withReduxState';

seed('Player/index');

const data = generate('data');

const story = {
  title: 'Player/index',
  component: Player,
  args: {
    data,
  },
  argTypes: {
    onView: { action: 'viewing' },
  },
};

const Component = (props) => (
  <Container maxWidth="xs">
    <Player {...props} />
  </Container>
);

export const WithDefaults = () => <Component />;
export const WithItem = withReduxState(
  [{ type: 'playTrack', payload: data[0].id }],
  Component,
);

export default story;
