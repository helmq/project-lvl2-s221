import _ from 'lodash';

const valConvertIfString = val =>
  (typeof val === 'string' ? `'${val}'` : val);

const parse = (ast, parent = null) => {
  const iter = ({
    key, type, value, children,
  }) => {
    const newKey = parent ? `${parent}.${key}` : key;
    switch (type) {
      case 'deleted':
        return `Property '${newKey}' was removed`;
      case 'new': {
        const checkedVal = valConvertIfString(value);
        const val = _.isObject(checkedVal) ? 'complex value' : `value: ${checkedVal}`;
        return `Property '${newKey}' was added with ${val}`;
      }
      case 'nested':
        return parse(children, newKey);
      case 'changed': {
        const [value1, value2] = value;
        const checkedVal1 = valConvertIfString(value1);
        const checkedVal2 = valConvertIfString(value2);
        const val1 = _.isObject(checkedVal1) ? 'complex value' : checkedVal1;
        const val2 = _.isObject(checkedVal2) ? 'complex value' : checkedVal2;
        return `Propery '${newKey}' was updated. From ${val1} to ${val2}`;
      }
      default:
        return '';
    }
  };
  const result = ast.map(iter);
  return _.compact(result).join('\n');
};

export default parse;
