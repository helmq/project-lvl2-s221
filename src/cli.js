import commander from 'commander';
import gendiff from '.';
import { version, description } from '../package.json';

export default () => commander
  .version(version)
  .option('-f, --format [type]', 'output format[type]')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second, option) => {
    console.log(gendiff(first, second, option.format));
  })
  .description(description)
  .parse(process.argv);
