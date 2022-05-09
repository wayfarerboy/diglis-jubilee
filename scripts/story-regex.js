const madge = require('madge');
const simpleGit = require('simple-git');

const git = simpleGit();

const includedPaths = [
  'components',
  'containers',
  'content',
  'helpers',
  'hooks',
  'pages',
];

const getDependencies = (res, _path, checked = []) =>
  res
    .depends(_path)
    .filter((p) => !checked.includes(p) && p.startsWith('components'))
    .map((p) => getDependencies(res, p, [...checked, p]))
    .reduce((arr, cur) => [...arr, ...cur], [_path]);

const init = async () => {
  const baseDir = await git.revparse({ '--show-toplevel': null });
  const status = await git.status({ '--untracked-files': 'no' });
  const stories = status.staged
    .filter((_path) => _path.startsWith('stories'))
    .map((p) => p.substr(0, p.length - 11).replace('stories/', ''));
  const changed = await Promise.all(
    status.staged
      .filter((_path) => includedPaths.some((p) => _path.startsWith(p)))
      .map(async (_path) => {
        try {
          const res = await madge(includedPaths, { baseDir });
          return getDependencies(res, _path)
            .filter((p) => p.startsWith('components'))
            .map((p) => p.substr(0, p.length - 3).replace('components/', ''));
        } catch (err) {
          throw new Error(err);
        }
      }),
  );
  const files = []
    .concat(...changed, ...stories)
    .filter((a, i, arr) => arr.indexOf(a) === i);
  console.log((files.length ? '-t ' : '') + files.join('|'));
};

init();
