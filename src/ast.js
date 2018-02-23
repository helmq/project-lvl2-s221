import _ from 'lodash';

const build = (obj1, obj2, depth = 0) => {
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
export default build;
