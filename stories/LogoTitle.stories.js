import React from 'react';
import LogoTitle from '../components/LogoTitle';
import faker, { seed } from '../mocks/faker';

seed('LogoTitle');

const story = {
  title: 'LogoTitle',
  component: LogoTitle,
  args: {
    spacing: 1,
    children: faker.lorem.title(),
    progress: true,
    dark: false,
  },
};

export const WithDefaults = () => <LogoTitle />;
export const WithValues = (props) => <LogoTitle {...props} />;
export const WithNodeChildren = ({ children, ...props }) => (
  <LogoTitle {...props}>
    <div>{children}</div>
  </LogoTitle>
);
export const WithLargeSpacing = (props) => <LogoTitle {...props} spacing={4} />;
export const WithNoProgress = (props) => (
  <LogoTitle {...props} progress={false} />
);
export const WithDarkTheme = (props) => <LogoTitle {...props} dark />;

export default story;
