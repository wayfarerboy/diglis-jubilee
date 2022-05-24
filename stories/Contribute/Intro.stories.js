import React from 'react';
import Intro from '../../components/Contribute/Intro';
import { seed } from '../../mocks/faker';

seed('Contribute/Intro');

const story = {
  title: 'Contribute/Intro',
  component: Intro,
  argTypes: {
    onNext: { action: 'next' },
  },
};

export const WithDefaults = () => <Intro />;
export const WithValues = (props) => <Intro {...props} />;

export default story;
