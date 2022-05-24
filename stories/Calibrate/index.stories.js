import React from 'react';
import Calibrate from '../../components/Calibrate';

const story = {
  title: 'Calibrate/index',
  component: Calibrate,
  argTypes: {
    onReady: { action: 'ready' },
  },
};

export const WithDefaults = () => <Calibrate />;
export const WithValues = (props) => <Calibrate {...props} />;

export default story;
