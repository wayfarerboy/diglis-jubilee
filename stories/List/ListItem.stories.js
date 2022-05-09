import React from 'react';
import List from '@mui/material/List';
import Container from '@mui/material/Container';

import ListItem from '../../components/List/ListItem';
import faker, { seed } from '../../mocks/faker';
import { addLocationFields } from '../../helpers/geolocation';
import generate from '../../mocks/generator';
import withReduxState from '../../.storybook/withReduxState';

seed('List/ListItem');
const longTitle = faker.lorem.title({ min: 8, max: 16 });
const current = generate('latlng', { asLeaflet: true });
const bearing = faker.datatype.number({ min: 0, max: 360 });
const item = addLocationFields({ item: generate('item'), current, bearing });

const story = {
  title: 'List/ListItem',
  component: ListItem,
  args: {
    docId: item.id,
    animation: false,
    ...item,
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

const Component = (props) => (
  <Container maxWidth="sm">
    <List>
      <ListItem {...props} />
    </List>
  </Container>
);

export const WithDefaults = () => <Component />;
export const WithItem = (props) => <Component {...props} />;
export const WithItemAsList = (props) => (
  <Component {...props} variant="list" />
);
export const WithPlayingItemAsList = withReduxState(
  [{ type: 'playTrack', payload: item.id }],
  (props) => <Component {...props} variant="list" />,
);
export const WithHoveredItemAsList = (props) => (
  <Component {...props} variant="list" hover />
);
export const WithLongTitle = (props) => (
  <Component {...props} title={longTitle} />
);
export const WithLongTitleAsList = (props) => (
  <Component {...props} title={longTitle} variant="list" />
);
export const AsPlayed = (props) => (
  <Component {...props} played variant="list" />
);

export default story;
