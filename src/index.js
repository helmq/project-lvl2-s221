import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import build from './ast';
import getRenderer from './renderers';

const parsers = {
  '.yaml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

const parseFile = (extension, content) =>
  (parsers[extension] ? parsers[extension](content) : null);

export default (path1, path2, format = 'recurse') => {
  const fileContent1 = fs.readFileSync(path1, 'utf-8');
  const fileContent2 = fs.readFileSync(path2, 'utf-8');
  const fileExtension1 = path.extname(path1);
  const fileExtension2 = path.extname(path2);
  const parsedContent1 = parseFile(fileExtension1, fileContent1);
  const parsedContent2 = parseFile(fileExtension2, fileContent2);
  if (!parsedContent1 || !parsedContent2) {
    return 'Error';
  }
  const ast = build(parsedContent1, parsedContent2);
  const renderer = getRenderer(format);
  return renderer(ast);
};
