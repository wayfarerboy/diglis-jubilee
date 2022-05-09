import React from 'react';
import Confirm from '../components/Confirm';

const story = {
  title: 'Forms/Confirm',
  component: Confirm,
  args: {
    show: true,
    confirmation: 'Confirmation text to display',
    okLabel: 'Test OK label',
    cancelLabel: 'Test cancel label',
  },
  argTypes: {
    proceed: { action: 'proceeding' },
    cancel: { action: 'cancelling' },
  },
};

export const withDefaults = () => <Confirm />;
export const withProps = (props) => <Confirm {...props} />;
export const hidden = (props) => <Confirm {...props} show={false} />;

export default story;
