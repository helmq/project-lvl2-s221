import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const buildData = (extension, data) => {
  switch (extension) {
    case '.yaml':
      return yaml.safeLoad(data);
    case '.json':
      return JSON.parse(data);
    default:
      return null;
  }
};

export const gendiffArr = (path1, path2) => {
  const data1 = fs.readFileSync(path1);
  const extension1 = path.extname(path1);
  const data2 = fs.readFileSync(path2);
  const extension2 = path.extname(path2);
  const before = buildData(extension1, data1);
  const after = buildData(extension2, data2);
  if (!before || !after) {
    return 'Error';
  }
  const keys = _.union(Object.keys(before), Object.keys(after));
  return keys.reduce((acc, key) => {
    if (!before[key]) {
      return [...acc, `+ ${key}: ${after[key]}`];
    }
    if (!after[key]) {
      return [...acc, `- ${key}: ${before[key]}`];
    }
    if (before[key] !== after[key]) {
      return [...acc, `+ ${key}: ${after[key]}`, `- ${key}: ${before[key]}`];
    }
    return [...acc, `  ${key}: ${after[key]}`];
  }, []);
};

export default (path1, path2) => {
  const result = gendiffArr(path1, path2);
  return `{\n\t${result.join('\n\t')}\n}`;
};
