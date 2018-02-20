import _ from 'lodash';
import path from 'path';
import YAMLData from './data/YAMLData';
import JSONData from './data/JSONData';

const buildObject = (filepath) => {
  const extension = path.extname(filepath);
  switch (extension) {
    case '.yaml':
      return new YAMLData(filepath).getData();
    case '.json':
      return new JSONData(filepath).getData();
    default:
      return null;
  }
};

export default (path1, path2) => {
  const before = buildObject(path1);
  const after = buildObject(path2);
  if (!before || !after) {
    return 'Error';
  }
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
