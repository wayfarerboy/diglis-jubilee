import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

const defaultDelay = 600;
const delays = {};

const getMatchOptions = () => ({
  failureThreshold: 0.2,
  failureThresholdType: 'percent',
});

const chromeExecutablePath = '/opt/homebrew/bin/chromium';

const beforeScreenshot = (page, { context: { kind, story } }) => {
  let part = '';
  const delayKey = [...kind.split('/'), story]
    .map((_part) => {
      part += (part ? '/' : '') + _part;
      return part;
    })
    .find((_part) => delays[_part]);
  let delay = delays[delayKey];
  let promise = Promise.resolve();
  if (typeof delay === 'string') {
    promise = page.waitForSelector(delay, { visible: true });
    delay = defaultDelay;
  }
  return promise.then(
    () =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay || defaultDelay),
      ),
  );
};

const getScreenshotOptions = () => ({
  fullPage: true,
  captureBeyondViewport: true,
});

initStoryshots({
  test: imageSnapshot({
    suite: 'Image storyshots',
    storybookUrl: 'https://storybook.generamics.co.uk',
    getMatchOptions,
    getScreenshotOptions,
    beforeScreenshot,
    chromeExecutablePath,
  }),
});
