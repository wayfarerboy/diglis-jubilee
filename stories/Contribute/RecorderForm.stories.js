import React from 'react';
import RecorderForm from '../../components/Contribute/RecorderForm';
import faker, { seed } from '../../mocks/faker';

seed('Contribute/RecorderForm');

const story = {
  title: 'Contribute/RecorderForm',
  component: RecorderForm,
  args: {
    audioSrc: faker.internet.url(),
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    onRecord: { action: 'recording' },
  },
};

const Component = ({ onSubmit: submit, ...props }) => {
  const onSubmit = async (values) => submit(values);
  return <RecorderForm {...props} onSubmit={onSubmit} />;
};

export const WithDefaults = () => <Component />;
export const WithValues = (props) => <Component {...props} />;

export default story;
