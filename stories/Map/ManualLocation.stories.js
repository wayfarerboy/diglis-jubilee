import React from 'react';
import ManualLocation from '../../components/Map/ManualLocation';
import { seed } from '../../mocks/faker';
import MapWrapper from '../../mocks/MapWrapper';

seed('Map/ManualLocation');

const story = {
  title: 'Map/ManualLocation',
  component: ManualLocation,
};

const Component = (props) => (
  <MapWrapper>
    <ManualLocation {...props} />
  </MapWrapper>
);

export const WithDefaults = () => <Component />;
export const WithValues = (props) => <Component {...props} />;

export default story;
