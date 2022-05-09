import React from 'react';
import Display from '../../components/Map/Display';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';

seed('Map/Display');
const data = generate('data');

const story = {
  title: 'Map/Display',
  component: Display,
  args: {
    data,
    sx: { height: 480 },
  },
  argTypes: { whenCreated: { action: 'created' } },
};

export const WithDefaults = () => <Display />;
export const WithData = (props) => <Display {...props} />;

export default story;
