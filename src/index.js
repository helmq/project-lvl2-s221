import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parsers = {
  '.yaml': yaml.safeLoad,
  '.json': JSON.parse,
};

const buildData = (extension, file) =>
  (parsers[extension] ? parsers[extension](file) : null);

export default (path1, path2) => {
  const file1 = fs.readFileSync(path1);
  const extension1 = path.extname(path1);
  const file2 = fs.readFileSync(path2);
  const extension2 = path.extname(path2);
  const data1 = buildData(extension1, file1);
  const data2 = buildData(extension2, file2);
  if (!data1 || !data2) {
    return 'Error';
  }
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const result = _.flatten(keys.map((key) => {
    if (!data1[key]) {
      return `+ ${key}: ${data2[key]}`;
    }
    if (!data2[key]) {
      return `- ${key}: ${data1[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return [`+ ${key}: ${data2[key]}`, `- ${key}: ${data1[key]}`];
    }
    return `  ${key}: ${data2[key]}`;
  }));
  return `{\n\t${result.join('\n\t')}\n}`;
};
