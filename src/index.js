import commander from 'commander';
import _ from 'lodash';
import fs from 'fs';

export default (path1, path2) => {
  const parse = (beforePath, afterPath) => {
    const before = JSON.parse(fs.readFileSync(beforePath));
    const after = JSON.parse(fs.readFileSync(afterPath));
    const afterExists = _.reduce(after, (acc, val, key) => {
      if (!before[key]) {
        return `${acc}\n\t+ ${key}: ${val}`;
      }
      if (before[key] !== val) {
        return `${acc}\n\t+ ${key}: ${val}\n\t- ${key}: ${before[key]}`;
      }
      return `${acc}\n\t  ${key}: ${val}`;
    }, '');
    const result = _.reduce(before, (acc, val, key) =>
      (!after[key] ? `${acc}\n\t- ${key}: ${val}` : acc), afterExists);
    return `{${result}\n}`;
  };
  if (path1 && path2) {
    return parse(path1, path2);
  }
  const program = commander
    .version('0.1.0')
    .arguments('<firstConfig> <secondConfig>')
    .action((first, second) => {
      console.log(parse(first, second));
    })
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);
  return program;
};
