import commander from 'commander';
import gendiff from '.';
import { version, description } from '../package.json';

export default () => commander
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => {
    console.log(gendiff(first, second));
  })
  .description(description)
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
