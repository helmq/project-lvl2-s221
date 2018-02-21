import gendiff from '../src';
import expectedJSON from './__fixtures__/json/expected';
import expectedYAML from './__fixtures__/yaml/expected';

const fixturesDir = './__tests__/__fixtures__';

test('gendiff JSON', () => {
  const result = gendiff(`${fixturesDir}/json/first.json`, `${fixturesDir}/json/second.json`);
  expect(result).toBe(expectedJSON);
});

test('gendiff YAML', () => {
  const result = gendiff(`${fixturesDir}/yaml/first.yaml`, `${fixturesDir}/yaml/second.yaml`);
  expect(result).toBe(expectedYAML);
});
