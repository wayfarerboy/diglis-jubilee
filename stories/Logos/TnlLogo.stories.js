import React from 'react';
import TnlLogo from '../../components/Logos/TnlLogo';
import { seed } from '../../mocks/faker';

seed('Logos/TnlLogo');

const story = {
  title: 'Logos/TnlLogo',
  component: TnlLogo,
  args: {
    sx: { fontSize: 120 },
  },
};

export const WithDefaults = (props) => <TnlLogo {...props} />;
export const PrimaryColor = (props) => <TnlLogo {...props} color="primary" />;

export default story;
