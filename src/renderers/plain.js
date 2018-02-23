import _ from 'lodash';

const valConvertIfString = val =>
  (typeof val === 'string' ? `'${val}'` : val);

const parse = (ast, parent = null) => {
  const iter = ({ key, type, ...rest }) => {
    const newKey = parent ? `${parent}.${key}` : key;
    switch (type) {
      case 'deleted':
        return `Property '${newKey}' was removed`;
      case 'new': {
        const checkedVal = valConvertIfString(rest.val);
        const val = _.isArray(checkedVal) ? 'complex value' : `value: ${checkedVal}`;
        return `Property '${newKey}' was added with ${val}`;
      }
      case 'changed': {
        const checkedVal1 = valConvertIfString(rest.val1);
        const checkedVal2 = valConvertIfString(rest.val2);
        const val1 = _.isArray(checkedVal1) ? 'complex value' : checkedVal1;
        const val2 = _.isArray(checkedVal2) ? 'complex value' : checkedVal2;
        return `Propery '${newKey}' was updated. From ${val1} to ${val2}`;
      }
      case 'unchanged': {
        if (_.has(rest, 'children')) {
          return parse(rest.children, newKey);
        }
        return '';
      }
      default:
        return null;
    }
  };
  const result = ast.map(iter);
  return _.compact(result).join('\n');
};

export default parse;
