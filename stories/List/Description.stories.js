import React from 'react';
import Description from '../../components/List/Description';
import { seed } from '../../mocks/faker';
import generate from '../../mocks/generator';

seed('List/Description1');
const item = generate('item');

const story = {
  title: 'List/Description',
  component: Description,
  args: {
    ...item,
    docId: item.id,
  },
};

export const WithDefaults = () => <Description />;
export const WithValues = (props) => <Description {...props} />;
export const WithNoImage = (
  { image, ...others }, // eslint-disable-line
) => <Description {...others} />;

export default story;
