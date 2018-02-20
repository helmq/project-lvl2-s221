import { gendiffArr as gendiff } from '../src';

const fixturesDir = './__tests__/__fixtures__';

test('gendiff JSON', () => {
  const result = gendiff(`${fixturesDir}/json/first.json`, `${fixturesDir}/json/second.json`);
  const expected = [
    '  host: hexlet.io',
    '+ timeout: 20',
    '- timeout: 50',
    '- proxy: 123.234.53.22',
    '+ verbose: true',
  ];
  for (let i = 0; i < expected.length; i += 1) {
    expect(result).toContain(expected[i]);
  }
});

test('gendiff YAML', () => {
  const result = gendiff(`${fixturesDir}/yaml/first.yaml`, `${fixturesDir}/yaml/second.yaml`);
  const expected = [
    '- plugins: 2',
    '+ env: ruby',
    '- env: node',
    '  no-console: true',
    '+ extends: 12',
    '- extends: 5',
    '+ no-debugger: true',
  ];
  for (let i = 0; i < expected.length; i += 1) {
    expect(result).toContain(expected[i]);
  }
});
