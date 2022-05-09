import React from 'react';
import Drawer from '../components/Drawer';
import { seed } from '../mocks/faker';
import generate from '../mocks/generator';
import withReduxState from '../.storybook/withReduxState';

seed('Drawer');
const data = generate('data');

const story = {
  title: 'Drawer',
  component: Drawer,
  args: { data },
  argTypes: { onView: { action: 'viewing' } },
};

export const WithDefaults = () => <Drawer />;
export const WithValues = (props) => <Drawer {...props} />;
export const AboutActive = withReduxState(
  [{ type: 'setAppDrawer', payload: 'about' }],
  Drawer,
);
export const NearbyActive = withReduxState(
  [{ type: 'setAppDrawer', payload: 'nearby' }],
  Drawer,
);
export const HelpActive = withReduxState(
  [{ type: 'setAppDrawer', payload: 'help' }],
  Drawer,
);

export default story;
