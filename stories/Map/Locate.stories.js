import React from 'react';
import Locate from '../../components/Map/Locate';
import { seed } from '../../mocks/faker';
import MapWrapper from '../../mocks/MapWrapper';

seed('Map/Locate');

const story = {
  title: 'Map/Locate',
  component: Locate,
  args: {
    position: 'bottomright',
  },
};

const Component = (props) => (
  <MapWrapper>
    <Locate {...props} />
  </MapWrapper>
);

export const WithDefaults = () => <Component />;
export const ToBottomRight = (props) => <Component {...props} />;

export default story;
