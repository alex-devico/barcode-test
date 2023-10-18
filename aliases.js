const tsConfig = require('./tsconfig.json');

const tsPaths = tsConfig.compilerOptions.paths;
const aliases = Object.keys(tsPaths).reduce(
  (acc, key) => ({
    ...acc,
    [key.replace('/*', '')]: tsPaths[key][0].replace('/*', ''),
  }),
  {}
);

module.exports = aliases;
