import _ from 'lodash';

const build = (obj1, obj2, depth = 0) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj1, key)) {
      return {
        key, value: value2, type: 'new', depth,
      };
    }
    if (!_.has(obj2, key)) {
      return {
        key, value: value1, type: 'deleted', depth,
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key, children: build(value1, value2, depth + 1), type: 'nested', depth,
      };
    }
    if (value1 === value2) {
      return {
        key, value: value1, type: 'unchanged', depth,
      };
    }
    return {
      key, value: [value1, value2], type: 'changed', depth,
    };
  });
};
export default build;
