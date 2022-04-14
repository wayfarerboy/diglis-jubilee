import React from 'react';
import Container from '@mui/material/Container';

import TrackTitle from '../../components/List/TrackTitle';
import faker, { seed } from '../../mocks/faker';

seed('List/TrackTitle');
const longText = faker.lorem.title({ min: 12, max: 16 });

const story = {
  title: 'List/TrackTitle',
  component: TrackTitle,
  args: {
    text: faker.lorem.title(),
    animation: false,
  },
};

const Component = (props) => (
  <Container maxWidth="xs">
    <TrackTitle {...props} />
  </Container>
);

export const WithDefaults = () => <Component />;
export const WithText = (props) => <Component {...props} />;
export const WithLongText = (props) => <Component {...props} text={longText} />;

export default story;
