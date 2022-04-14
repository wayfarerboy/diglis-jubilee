import React from 'react';
import Controls from '../../components/Map/Controls';
import { seed } from '../../mocks/faker';
import MapWrapper from '../../mocks/MapWrapper';

seed('Map/Controls');

const story = {
  title: 'Map/Controls',
  component: Controls,
  args: {
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
