import React from 'react';
import RecorderPreview from '../../components/Contribute/RecorderPreview';
import faker, { seed } from '../../mocks/faker';

seed('Contribute/RecorderPreview');

const story = {
  title: 'Contribute/RecorderPreview',
  component: RecorderPreview,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <RecorderPreview />;
export const WithValues = (props) => <RecorderPreview {...props} />;

export default story;
