import React, { useState } from 'react';
import { MapContainer } from 'react-leaflet';
import Nearby from '../../components/List/Nearby';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';
import withReduxState from '../../.storybook/withReduxState';

seed('List/Nearby');
const data = generate('data');
const latlng = generate('latlng');

const story = {
  title: 'List/Nearby',
  component: Nearby,
};

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
  [
    { type: 'setData', payload: data },
    { type: 'setGeolocation', payload: { latlng } },
  ],
  Component,
);

export default story;
