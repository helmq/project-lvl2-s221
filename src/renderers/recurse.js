import _ from 'lodash';

const signs = {
  new: '+',
  deleted: '-',
  unchanged: ' ',
  nested: ' ',
};

const getIndent = depth => ' '.repeat(depth);

const stringify = (key, value, sign, depth) => {
  const stringifyObject = object =>
    Object.keys(object).map(k => stringify(k, object[k], signs.unchanged, depth + 1));

  const indent = getIndent(depth);
  if (_.isObject(value)) {
    return [
      `${indent}${sign} ${key}: {`,
      stringifyObject(value),
      `${indent}}`,
    ];
  }
  return `${indent}${sign} ${key}: ${value}`;
};

const parse = (ast) => {
  const fmap = ({
    key, type, depth, oldValue, newValue, children,
  }) => {
    switch (type) {
      case 'new':
      case 'deleted':
      case 'unchanged':
        return stringify(key, newValue, signs[type], depth);
      case 'nested': {
        const indent = getIndent(depth);
        return [
          `${indent}${signs[type]} ${key}: {`,
          children.map(fmap),
          `${indent}}`,
        ];
      }
      case 'changed': {
        return [
          stringify(key, oldValue, signs.deleted, depth),
          stringify(key, newValue, signs.new, depth),
        ];
      }
      default:
        return null;
    }
  };
  const result = ast.map(fmap);
  return `{\n ${_.flattenDeep(result).join('\n ')}\n}`;
};

export default parse;
