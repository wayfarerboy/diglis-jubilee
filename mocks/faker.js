import faker from 'faker';

faker.lorem.title = (args) => {
  let min = 1;
  let max = 5;
  if (args?.min || args?.max) {
    min = args.min || 1;
    max = args.max || 5;
  } else if (args) {
    max = args;
  }
  return faker.lorem
    .words(faker.datatype.number({ min, max }))
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.substr(1)}`)
    .join(' ');
};

faker.lorem.description = (max = 3) =>
  faker.lorem.paragraphs(faker.datatype.number({ min: 1, max }), '\n\n');

faker.image.image = (width = 320, height = 320) => {
  const id = faker.datatype.number({ min: 0, max: 1000 });
  return `https://picsum.photos/id/${id}/${width}/${height || width}`;
};

faker.lorem.oneOf = (values = []) => {
  if (!values.length) return null;
  return values[faker.datatype.number({ min: 0, max: values.length - 1 })];
};

faker.lorem.arrayOf = (
  generator,
  { min = 1, max = 5 } = { min: 1, max: 5 },
) => {
  return Array.from(Array(faker.datatype.number({ min, max }))).map(generator);
};

export const arrToObj = (arr) => {
  const obj = {};
  arr.forEach(({ id, ...val }) => (obj[id] = val));
  return obj;
};

faker.lorem.objectOf = (generator, { min = 1, max = 5 } = { min: 1, max: 5 }) =>
  arrToObj(faker.lorem.arrayOf(generator, { min, max }));

export const seed = (val) => {
  if (val) {
    let num = val;
    if (typeof val === 'string') {
      num = val.split('').reduce((v, char) => v + char.charCodeAt(0), 0);
    }
    faker.seed(num);
  }
};

export default faker;
