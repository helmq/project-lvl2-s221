import gendiff from '../src';

const fixturesDir = './__tests__/__fixtures__';

test('gendiff JSON', () => {
  const result = '{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t+ verbose: true\n}';
  expect(gendiff(`${fixturesDir}/json/first.json`, `${fixturesDir}/json/second.json`)).toBe(result);
});

test('gendiff YAML', () => {
  const result = '{\n\t- plugins: 2\n\t+ env: ruby\n\t- env: node\n\t  no-console: true\n\t+ extends: 12\n\t- extends: 5\n\t+ no-debugger: true\n}';
  expect(gendiff(`${fixturesDir}/yaml/first.yaml`, `${fixturesDir}/yaml/second.yaml`)).toBe(result);
});
