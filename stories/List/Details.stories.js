import React from 'react';
import Details from '../../components/List/Details';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';
import withReduxState from '../../.storybook/withReduxState';

seed('List/Details');
const data = generate('data');

const story = {
  title: 'List/Details',
  component: Details,
  args: {
    data,
  },
};

export const WithDefaults = () => <Details />;
export const WithValues = (props) => <Details {...props} />;
export const WithDetails = withReduxState(
  [{ type: 'openDetails', payload: data[0] }],
  Details,
);

export default story;
