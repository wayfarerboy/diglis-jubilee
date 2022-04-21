const sizes = {
  header: {
    small: {
      h1: 'h5',
      h2: 'h6',
      h3: 'subtitle1',
      h4: 'body1',
      h5: 'body2',
      h6: 'body2',
    },
    medium: {
      h1: 'h3',
      h2: 'h4',
      h3: 'h5',
      h4: 'h6',
      h5: 'subtitle1',
      h6: 'body1',
    },
    large: {
      h1: 'h2',
      h2: 'h3',
      h3: 'h4',
      h4: 'h5',
      h5: 'h6',
      h6: 'subtitle1',
    },
  },
  body: {
    small: 'body2',
    medium: 'subtitle1',
    large: 'h6',
  },
};

const match = {
  small: ['xs', 'sm'],
  medium: ['md'],
  large: ['lg', 'xl'],
};

Object.keys(match).forEach(key => {
  match[key].forEach(newKey => {
    sizes.header[newKey] = sizes.header[key];
    sizes.body[newKey] = sizes.body[key];
  });
});

export { sizes };
