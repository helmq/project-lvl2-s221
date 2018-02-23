export const flat = '{\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n - proxy: 123.234.53.22\n + verbose: true\n}';

export const recursive = '{\n   common: {\n    setting1: Value 1\n  - setting2: 200\n  - setting3: true\n  + setting3: {\n     key: value\n  }\n    setting6: {\n     key: value\n   + ops: vops\n  }\n  + setting4: blah blah\n  + setting5: {\n     key5: value5\n  }\n }\n   group1: {\n  - baz: bas\n  + baz: bars\n    foo: bar\n  - nest: {\n     key: value\n  }\n  + nest: str\n }\n - group2: {\n    abc: 12345\n }\n + group3: {\n    fee: 100500\n }\n}';

export const plain = 'Property \'common.setting2\' was removed\nPropery \'common.setting3\' was updated. From true to complex value\nProperty \'common.setting6.ops\' was added with value: \'vops\'\nProperty \'common.setting4\' was added with value: \'blah blah\'\nProperty \'common.setting5\' was added with complex value\nPropery \'group1.baz\' was updated. From \'bas\' to \'bars\'\nPropery \'group1.nest\' was updated. From complex value to \'str\'\nProperty \'group2\' was removed\nProperty \'group3\' was added with complex value';
