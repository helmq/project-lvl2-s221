export const flat = '{\n - plugins: 2\n - env: node\n + env: ruby\n   no-console: true\n - extends: 5\n + extends: 12\n + no-debugger: true\n}';

export const recursive = '{\n   common: {\n    setting1: Value 1\n  - setting2: 200\n  - setting3: true\n  + setting3: {\n     key: value\n  }\n    setting6: {\n     key: value\n   + ops: vops\n  }\n  + setting4: blah blah\n  + setting5: {\n     key5: value5\n  }\n }\n   group1: {\n  - baz: bas\n  + baz: bars\n    foo: bar\n  - nest: {\n     key: value\n  }\n  + nest: str\n }\n - group2: {\n    abc: 12345\n }\n + group3: {\n    fee: 100500\n }\n}';
