import commander from 'commander';
import gendiff from '.';

export default () => commander
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => {
    console.log(gendiff(first, second));
  })
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
