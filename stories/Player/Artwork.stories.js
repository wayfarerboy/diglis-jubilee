import React from 'react';
import Container from '@mui/material/Container';
import Artwork from '../../components/Player/Artwork';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';

seed('Player/Artwork');

const story = {
  title: 'Player/Artwork',
  component: Artwork,
  args: {
    image: generate('image'),
  },
};

const Component = (props) => (
  <Container maxWidth="sm">
    <Artwork sx={{ width: 240 }} {...props} />
  </Container>
);

export const WithNoImage = () => <Component />;
export const WithImage = (props) => <Component {...props} />;

export default story;
