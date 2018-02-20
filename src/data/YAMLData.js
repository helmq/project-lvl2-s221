import yaml from 'js-yaml';
import Data from './Data';

export default class YAMLData extends Data {
  constructor(filepath) {
    super(filepath);
    this.data = yaml.safeLoad(this.file);
  }
}
