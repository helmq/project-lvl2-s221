import gendiff from '../src';
import { flat as flatJSON, recursive as recursiveJSON } from './__fixtures__/json/expected';
import { flat as flatYAML, recursive as recursiveYAML } from './__fixtures__/yaml/expected';
import { flat as flatIni, recursive as recursiveIni } from './__fixtures__/ini/expected';

const fixturesDir = './__tests__/__fixtures__';

test('flat JSON', () => {
  const result = gendiff(`${fixturesDir}/json/first.json`, `${fixturesDir}/json/second.json`);
  expect(result).toBe(flatJSON);
});

test('recursive JSON', () => {
  const result = gendiff(`${fixturesDir}/json/r.first.json`, `${fixturesDir}/json/r.second.json`);
  expect(result).toBe(recursiveJSON);
});

test('flat YAML', () => {
  const result = gendiff(`${fixturesDir}/yaml/first.yaml`, `${fixturesDir}/yaml/second.yaml`);
  expect(result).toBe(flatYAML);
});

test('recursive YAML', () => {
  const result = gendiff(`${fixturesDir}/yaml/r.first.yaml`, `${fixturesDir}/yaml/r.second.yaml`);
  expect(result).toBe(recursiveYAML);
});

test('flat ini', () => {
  const result = gendiff(`${fixturesDir}/ini/first.ini`, `${fixturesDir}/ini/second.ini`);
  expect(result).toBe(flatIni);
});

test('recursive ini', () => {
  const result = gendiff(`${fixturesDir}/ini/r.first.ini`, `${fixturesDir}/ini/r.second.ini`);
  expect(result).toBe(recursiveIni);
});
