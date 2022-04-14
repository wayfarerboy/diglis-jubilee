import React from 'react';
import Description from '../../components/List/Description';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';
import withReduxState from '../../.storybook/withReduxState';

seed('List/Description1');
const item = generate('item');

const story = {
  title: 'List/Description',
  component: Description,
  args: {
    ...item,
  },
};

export const WithDefaults = () => <Description />;
export const WithValues = (props) => <Description {...props} />;

export const WithValuesOpen = withReduxState(
  [{ type: 'openDetails', payload: item }],
  Description,
);

export const WithNoImage = withReduxState(
  [{ type: 'openDetails', payload: item }],
  ({ image, ...others }) => <Description {...others} />, // eslint-disable-line
);

export default story;
