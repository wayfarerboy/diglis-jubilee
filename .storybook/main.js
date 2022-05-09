const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next-router',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  staticDirs: [toPath('public'), toPath('mocks')],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
          'next/image': toPath('mocks/nextImage.js'),
          [toPath('hooks/useLibrary')]: toPath('mocks/useLibrary.js'),
          [toPath('hooks/useFirestoreDocData')]: toPath('mocks/noop-query.js'),
          [toPath('hooks/useFirestoreDocDataOnce')]: toPath(
            'mocks/noop-query.js',
          ),
          [toPath('hooks/useFirestoreCollectionData')]: toPath(
            'mocks/noop-query.js',
          ),
          [toPath('hooks/useFirestoreCollectionDataOnce')]: toPath(
            'mocks/noop-query.js',
          ),
          [toPath('helpers/firebase/query')]: toPath('mocks/noop.js'),
          [toPath('helpers/firebase/doc')]: toPath('mocks/doc.js'),
          [toPath('helpers/firebase/collection')]: toPath(
            'mocks/collection.js',
          ),
        },
      },
    };
  },
  features: {
    postcss: false,
    buildStoriesJson: true,
  },
};
