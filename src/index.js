import commander from 'commander';

export default () => {
  const program = commander
    .version('0.0.4')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);
  return program;
};
