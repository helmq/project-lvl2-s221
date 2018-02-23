import plain from './plain';
import recurse from './recurse';

const renderers = {
  recurse,
  plain,
};

export default format =>
  renderers[format];
