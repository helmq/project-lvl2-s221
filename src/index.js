import commander from 'commander';

export default () => {
  const program = commander
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);
  return program;
};
