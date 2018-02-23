import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import * as ast from './ast';

const parsers = {
  '.yaml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

const parseFile = (extension, file) =>
  (parsers[extension] ? parsers[extension](file) : null);

export default (path1, path2) => {
  const file1 = fs.readFileSync(path1, 'utf-8');
  const extension1 = path.extname(path1);
  const file2 = fs.readFileSync(path2, 'utf-8');
  const extension2 = path.extname(path2);
  const data1 = parseFile(extension1, file1);
  const data2 = parseFile(extension2, file2);
  if (!data1 || !data2) {
    return 'Error';
  }
  const result = _.flattenDeep(ast.parse(ast.build(data1, data2)));
  const resultStr = result.join('\n\t');
  return `{\n\t${resultStr}\n}`;
};
