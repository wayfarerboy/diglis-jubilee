/* global jest */
import React from 'react';

const Component = (props) => <>{props.children}</>;
Component.displayName = 'MockReactMarkdown';

jest.mock('react-markdown', () => Component);
