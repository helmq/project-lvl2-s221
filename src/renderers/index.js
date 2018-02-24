import plain from './plain';
import recurse from './recurse';
import json from './json';

const renderers = {
  recurse,
  plain,
  json,
};

export default format =>
  renderers[format];
