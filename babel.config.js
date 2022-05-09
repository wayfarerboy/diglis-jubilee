module.exports = function (api) {
  api.cache(true);
  const presets = ['next/babel'];
  const plugins = [
    'macros',
    'babel-plugin-dynamic-import-node',
    'react-docgen',
  ];
  const env = { test: { plugins: ['transform-dynamic-import'] } };
  return {
    presets,
    plugins,
    env,
  };
};
