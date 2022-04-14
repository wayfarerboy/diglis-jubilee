function parseComponentName({ componentName }) {
  var parts = componentName.split('/');
  var pathPrefix = parts.map(() => '..').join('/');
  var displayName = parts.join('');
  var component = parts.pop();
  return {
    componentName,
    component,
    displayName,
    pathPrefix,
  };
}

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Generate a new component with an accompanying stories file',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'Enter the Path/Name of the component',
      },
    ],
    actions: function (d) {
      var data = parseComponentName(d);
      return [
        {
          type: 'add',
          path: 'components/{{componentName}}.js',
          templateFile: 'plop-templates/components.hbs',
          data,
          skipIfExists: true,
        },
        {
          type: 'add',
          path: 'stories/{{componentName}}.stories.js',
          templateFile: 'plop-templates/stories.hbs',
          data,
          skipIfExists: true,
        },
      ];
    },
  });
};
