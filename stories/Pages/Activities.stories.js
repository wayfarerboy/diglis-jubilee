import React from 'react';
import Activities from '../../components/Pages/Activities';

const story = {
  title: 'Pages/Activities',
  component: Activities,
  args: {
    noRandom: true,
  },
};

export const WithDefaults = (props) => <Activities {...props} />;

export default story;
