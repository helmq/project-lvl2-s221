import _ from 'lodash';

const parse = (ast) => {
  const sign = {
    new: '+',
    deleted: '-',
    unchanged: ' ',
  };
  const iter = ({ key, type, ...rest }) => {
    const indent = ' '.repeat(rest.depth);
    if (type === 'changed') {
      if (_.isObject(rest.val1)) {
        return [
          `${indent}${sign.deleted} ${key}: {`,
          rest.val1.map(iter),
          `${indent}}`,
          `${indent}${sign.new} ${key}: ${rest.val2}`,
        ];
      } else if (_.isObject(rest.val2)) {
        return [
          `${indent}${sign.deleted} ${key}: ${rest.val1}`,
          `${indent}${sign.new} ${key}: {`,
          rest.val2.map(iter),
          `${indent}}`,
        ];
      }
      return [
        `${indent}${sign.deleted} ${key}: ${rest.val1}`,
        `${indent}${sign.new} ${key}: ${rest.val2}`,
      ];
    }
    if (rest.children) {
      return [
        `${indent}${sign[type]} ${key}: {`,
        rest.children.map(iter),
        `${indent}}`,
      ];
    }
    if (type === 'unchanged') {
      return `${indent}${sign[type]} ${key}: ${rest.val1}`;
    }
    if (_.isArray(rest.val)) {
      return [
        `${indent}${sign[type]} ${key}: {`,
        rest.val.map(iter),
        `${indent}}`,
      ];
    }
    return `${indent}${sign[type]} ${key}: ${rest.val}`;
  };
  const result = ast.map(iter);
  return `{\n ${_.flattenDeep(result).join('\n ')}\n}`;
};

export default parse;
