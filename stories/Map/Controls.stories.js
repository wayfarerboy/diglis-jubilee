import React from 'react';
import Controls from '../../components/Map/Controls';
import { seed } from '../../mocks/faker';
import MapWrapper from '../../mocks/MapWrapper';
import generate from '../../mocks/generator';

seed('Map/Controls');
const data = generate('data');

const story = {
  title: 'Map/Controls',
  component: Controls,
  args: {
    data,
    position: 'bottomright',
  },
};

const Component = (props) => (
  <MapWrapper>
    <Controls {...props} />
  </MapWrapper>
);

export const WithDefaults = () => <Component />;
export const WithAlternativePosition = (props) => <Component {...props} />;

export default story;
