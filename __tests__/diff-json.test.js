import gendiff from '../src';

test('gendiff', () => {
  const fixturesDir = './__tests__/__fixtures__';
  const result = '{\n\t+ timeout: 20\n\t- timeout: 50\n\t+ verbose: true\n\t  host: hexlet.io\n\t- proxy: 123.234.53.22\n}';
  expect(gendiff(`${fixturesDir}/first.json`, `${fixturesDir}/second.json`)).toBe(result);
});
