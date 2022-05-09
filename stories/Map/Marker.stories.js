import React from 'react';
import Marker from '../../components/Map/Marker';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';
import MapWrapper from '../../mocks/MapWrapper';

seed('Map/Marker');
const item = generate('item');

const story = {
  title: 'Map/Marker',
  component: Marker,
  args: {
    item,
  },
};

const Component = (props) => (
  <MapWrapper>
    <Marker {...props} />
  </MapWrapper>
);

export const WithDefaults = () => <Component />;
export const WithValues = (props) => <Component {...props} />;

export default story;
