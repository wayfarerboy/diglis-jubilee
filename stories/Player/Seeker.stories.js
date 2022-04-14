import React from 'react';
import Container from '@mui/material/Container';
import Seeker from '../../components/Player/Seeker';
import faker, { seed } from '../../mocks/faker';

seed('Player/Seeker');

const total = faker.datatype.number({ min: 30, max: 360 });

const story = {
  title: 'Player/Seeker',
  component: Seeker,
  args: {
    current: faker.datatype.number({ min: 0, max: total }),
    total,
  },
};

const Component = (props) => (
  <Container maxWidth="xs">
    <Seeker {...props} />
  </Container>
);
export const WithDefaults = () => <Component />;
export const WithCurrentTime = (props) => <Component {...props} />;
export const WithCurrentTimeAtZero = (props) => (
  <Component {...props} current={0} />
);

export default story;
