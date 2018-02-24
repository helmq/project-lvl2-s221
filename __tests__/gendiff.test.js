import gendiff from '../src';
import { flat as flatJSON, recursive as recursiveJSON, plain, json } from './__fixtures__/json/expected';
import { flat as flatYAML, recursive as recursiveYAML } from './__fixtures__/yaml/expected';
import { flat as flatIni, recursive as recursiveIni } from './__fixtures__/ini/expected';

const fixturesDir = './__tests__/__fixtures__';

test('flat JSON recurse', () => {
  const result = gendiff(`${fixturesDir}/json/first.json`, `${fixturesDir}/json/second.json`, 'recurse');
  expect(result).toBe(flatJSON);
});

test('recursive JSON recurse', () => {
  const result = gendiff(`${fixturesDir}/json/r.first.json`, `${fixturesDir}/json/r.second.json`, 'recurse');
  expect(result).toBe(recursiveJSON);
});

test('flat YAML recurse', () => {
  const result = gendiff(`${fixturesDir}/yaml/first.yaml`, `${fixturesDir}/yaml/second.yaml`, 'recurse');
  expect(result).toBe(flatYAML);
});

test('recursive YAML recurse', () => {
  const result = gendiff(`${fixturesDir}/yaml/r.first.yaml`, `${fixturesDir}/yaml/r.second.yaml`, 'recurse');
  expect(result).toBe(recursiveYAML);
});

test('flat ini recurse', () => {
  const result = gendiff(`${fixturesDir}/ini/first.ini`, `${fixturesDir}/ini/second.ini`, 'recurse');
  expect(result).toBe(flatIni);
});

test('recursive ini recurse', () => {
  const result = gendiff(`${fixturesDir}/ini/r.first.ini`, `${fixturesDir}/ini/r.second.ini`, 'recurse');
  expect(result).toBe(recursiveIni);
});

test('recursive JSON plain', () => {
  const result = gendiff(`${fixturesDir}/json/r.first.json`, `${fixturesDir}/json/r.second.json`, 'plain');
  expect(result).toBe(plain);
});

test('recursive JSON as json', () => {
  const result = gendiff(`${fixturesDir}/json/r.first.json`, `${fixturesDir}/json/r.second.json`, 'json');
  expect(result).toBe(json);
});
