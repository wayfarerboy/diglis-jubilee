import React from 'react';
import ZoomToFit from '../../components/Map/ZoomToFit';
import { seed } from '../../mocks/faker';
import MapWrapper from '../../mocks/MapWrapper';
import generate from '../../mocks/generator';

seed('Map/ZoomToFit');
const data = generate('data');

const story = {
  title: 'Map/ZoomToFit',
  component: ZoomToFit,
  args: {
    data,
    position: 'bottomright',
  },
};

const Component = (props) => (
  <MapWrapper>
    <ZoomToFit {...props} />
  </MapWrapper>
);

export const WithDefaults = () => <Component />;
export const InBottomRight = (props) => <Component {...props} />;

export default story;
