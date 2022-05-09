import React, { useState } from 'react';
import { MapContainer } from 'react-leaflet';
import Nearby from '../../components/List/Nearby';
import faker, { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';
import withReduxState from '../../.storybook/withReduxState';

seed('List/Nearby');
const data = generate('data');

const story = {
  title: 'List/Nearby',
  component: Nearby,
  args: { data },
  argTypes: { onView: { action: 'viewing' } },
};

const played = data.map(({ id }) => id).filter(() => faker.datatype.boolean());

const Component = (props) => {
  const [map, setMap] = useState();
  return (
    <>
      <MapContainer whenCreated={setMap} />
      <Nearby {...props} map={map} />
    </>
  );
};

export const WithDefaults = () => <Component />;
export const WithValues = withReduxState(
  [{ type: 'setAppDrawer', payload: 'nearby' }],
  Component,
);
export const WithPlayed = withReduxState(
  [{ type: 'setAppDrawer', payload: 'nearby' }],
  (props) => <Component {...props} played={played} />,
);

export default story;
