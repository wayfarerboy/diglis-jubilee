import React from 'react';
import Bounds from '../../components/Map/Bounds';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';
import MapWrapper from '../../mocks/MapWrapper';

seed('Map/Bounds');
const data = generate('data');

const story = {
  title: 'Map/Bounds',
  component: Bounds,
  args: { data },
};

const Component = (props) => (
  <MapWrapper>
    <Bounds {...props} />
  </MapWrapper>
);

export const WithDefaults = () => <Component />;
export const WithValues = (props) => <Component {...props} />;
export const WithPadding = (props) => <Component {...props} pad={0.5} />;

export default story;
