import _ from 'lodash';

export const parse = (ast) => {
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
          [rest.val1.map(iter)],
          `${indent}}`,
          `${indent}${sign.new} ${key}: ${rest.val2}`,
        ];
      } else if (_.isObject(rest.val2)) {
        return [
          `${indent}${sign.deleted} ${key}: ${rest.val1}`,
          `${indent}${sign.new} ${key}: {`,
          [rest.val2.map(iter)],
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
        [parse(rest.children)],
        `${indent}}`,
      ];
    }
    if (type === 'unchanged') {
      return `${indent}${sign[type]} ${key}: ${rest.val1}`;
    }
    if (_.isArray(rest.val)) {
      return [
        `${indent}${sign[type]} ${key}: {`,
        rest.val.map(iter), `${indent}}`,
      ];
    }
    return `${indent}${sign[type]} ${key}: ${rest.val}`;
  };
  return ast.map(iter);
};

export const build = (obj1, obj2, depth = 0) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const iter = (key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];
    if (!_.has(obj1, key)) {
      const val = _.isObject(val2) ? build(val2, val2, depth + 1) : val2;
      return {
        key, val, type: 'new', depth,
      };
    }
    if (!_.has(obj2, key)) {
      const val = _.isObject(val1) ? build(val1, val1, depth + 1) : val1;
      return {
        key, val, type: 'deleted', depth,
      };
    }
    if (_.isObject(val1) && _.isObject(val2)) {
      return {
        key, children: build(val1, val2, depth + 1), type: 'unchanged', depth,
      };
    }
    const type = val1 === val2 ? 'unchanged' : 'changed';
    return {
      key,
      val1: _.isObject(val1) ? build(val1, val1, depth + 1) : val1,
      val2: _.isObject(val2) ? build(val2, val2, depth + 1) : val2,
      type,
      depth,
    };
  };
  return keys.map(iter);
};
