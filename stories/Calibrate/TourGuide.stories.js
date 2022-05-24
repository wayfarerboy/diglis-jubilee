import React from 'react';
import TourGuide from '../../components/Calibrate/TourGuide';
import faker, { seed } from '../../mocks/faker';

seed('Calibrate/TourGuide');

const story = {
  title: 'Calibrate/TourGuide',
  component: TourGuide,
  args: {
    title: faker.lorem.title(),
  },
};

export const WithDefaults = () => <TourGuide />;
export const WithValues = (props) => <TourGuide {...props} />;

export default story;
