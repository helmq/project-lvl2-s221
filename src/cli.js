import commander from 'commander';
import gendiff from '.';
import pjson from '../package.json';

export default () => commander
  .version(pjson.version)
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => {
    console.log(gendiff(first, second));
  })
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
