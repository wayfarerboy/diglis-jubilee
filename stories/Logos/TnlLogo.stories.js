import React from 'react';
import TnlLogo from '../../components/Logos/TnlLogo';
import faker, { seed } from '../../mocks/faker';

seed('Logos/TnlLogo');

const story = {
  title: 'Logos/TnlLogo',
  component: TnlLogo,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <TnlLogo />;
export const WithValues = (props) => <TnlLogo {...props} />;

export default story;
