import React from 'react';
import Compass from '../../components/List/Compass';
import faker, { seed } from '../../mocks/faker';

seed('List/CompassIcon');

const story = {
  title: 'List/Compass',
  component: Compass,
  args: {
    size: 'medium',
    bearing: faker.datatype.number({ min: 0, max: 360 }),
    distance: `${faker.datatype.number({ min: 0, max: 30 })}m`,
  },
  argTypes: {
    onClick: { action: 'clicking' },
    onMouseEnter: { action: 'entering' },
    onMouseLeave: { action: 'leaving' },
  },
};

export const WithDefaults = () => <Compass />;
export const WithProps = (props) => <Compass {...props} />;
export const AsSmall = (props) => <Compass {...props} size="small" />;

export default story;
