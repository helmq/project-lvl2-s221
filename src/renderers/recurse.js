import _ from 'lodash';

const parse = (ast) => {
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

  const fmap = ({
    key, type, depth, value, children,
  }) => {
    switch (type) {
      case 'new':
      case 'deleted':
      case 'unchanged':
        return stringify(key, value, signs[type], depth);
      case 'nested': {
        const indent = getIndent(depth);
        return [
          `${indent}${signs[type]} ${key}: {`,
          children.map(fmap),
          `${indent}}`,
        ];
      }
      case 'changed': {
        const [value1, value2] = value;
        return [
          stringify(key, value1, signs.deleted, depth),
          stringify(key, value2, signs.new, depth),
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
