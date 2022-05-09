const { readFileSync, writeFileSync, existsSync } = require('fs');
const { resolve, join } = require('path');
const Mustache = require('mustache');

const isUppercase = /[A-Z]+/;
const prefix = 'storyshots-test-js-storyshots';
const suffix = '-1-snap.png';
const diffSuffix = '-1-diff.png';

const dataFile = resolve(__dirname, '.storyshots-reporter-cache.json');
const templateFile = resolve(__dirname, 'storyshots-report.mustache');
const testDir = resolve(__dirname, '__tests__');
const reportFile = resolve(testDir, 'index.html');

const generateFilename = (titles, isDiff) =>
  join(
    '__image_snapshots__',
    ...(isDiff ? ['__diff_output__'] : []),
    `${prefix}${titles
      .map((title) =>
        title
          .trim()
          .replaceAll(' ', '-')
          .split('')
          .map((char) =>
            isUppercase.test(char) ? `-${char.toLowerCase()}` : char,
          )
          .join(''),
      )
      .join('-')
      .replaceAll('--', '-')}${isDiff ? diffSuffix : suffix}`,
  );

const parseComponent = ({ ancestorTitles, title }) => {
  const titles = [
    ...[].concat(...ancestorTitles.map((_title) => _title.split('/'))),
    title,
  ];
  titles.shift();
  return titles;
};

const removeFromData = ({ title, obj }) => {
  Object.keys(obj).forEach((status) => {
    const index = obj[status].findIndex(
      ({ title: _title }) => _title === title,
    );
    if (index > -1) obj[status].splice(index, 1);
  });
};

const classifyToObj = ({ status, obj, component, filename }) => {
  let newObj;
  const title = component.join(' / ');
  removeFromData({ title, obj });
  const snapFile = resolve(testDir, filename);
  if (existsSync(snapFile)) {
    switch (status) {
      case 'failed':
        newObj = {
          ...obj,
          failed: [
            ...obj.failed,
            { title, filename: generateFilename(component, true) },
          ],
        };
        break;
      default:
        newObj = {
          ...obj,
          succeeded: [...obj.succeeded, { title, filename }],
        };
        break;
    }
  } else {
    newObj = { ...obj, missing: [...obj.missing, { title }] };
  }
  return newObj;
};

const classify = (obj, result) => {
  const component = parseComponent(result);
  const filename = generateFilename(component);
  return classifyToObj({ obj, component, filename, status: result.status });
};

const writeHtml = (obj) => {
  const sectionTitles = {
    failed: 'Failed',
    succeeded: 'Succeeded',
    missing: 'Missing',
  };
  const view = {
    timestamp: Date.now(),
    sections: ['failed', 'missing', 'succeeded'].map((id) => ({
      id,
      title: sectionTitles[id],
      count: obj[id].length,
      items: obj[id],
    })),
    sectionId: function () {
      return this.id;
    },
    sectionTitle: function () {
      return `${this.title} (${this.count} ${
        this.count === 1 ? 'test' : 'tests'
      })`;
    },
    items: function () {
      return this.items;
    },
    filename: function () {
      return this.filename;
    },
    itemTitle: function () {
      return this.title;
    },
  };
  const template = readFileSync(templateFile, 'utf8');
  const html = Mustache.render(template, view);
  writeFileSync(reportFile, html);
};

const readData = () => {
  try {
    const data = readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {
      failed: [],
      succeeded: [],
      missing: [],
    };
  }
};

const writeData = (obj) => {
  writeFileSync(dataFile, JSON.stringify(obj, null, 2));
};

class StoryshotsReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onTestResult(test, testResult) {
    const data = readData();
    const obj = testResult.testResults.reduce(classify, data);
    writeData(obj);
    writeHtml(obj);
  }
}

module.exports = StoryshotsReporter;
