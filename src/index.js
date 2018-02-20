import _ from 'lodash';
import fs from 'fs';

export default (path1, path2) => {
  const before = JSON.parse(fs.readFileSync(path1));
  const after = JSON.parse(fs.readFileSync(path2));
  const keys = _.union(Object.keys(before), Object.keys(after));
  const result = keys.map((key) => {
    if (!before[key]) {
      return `+ ${key}: ${after[key]}`;
    }
    if (!after[key]) {
      return `- ${key}: ${before[key]}`;
    }
    if (before[key] !== after[key]) {
      return `+ ${key}: ${after[key]}\n\t- ${key}: ${before[key]}`;
    }
    return `  ${key}: ${after[key]}`;
  });

  return `{\n\t${result.join('\n\t')}\n}`;
};
