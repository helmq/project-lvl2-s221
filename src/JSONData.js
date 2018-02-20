import Data from './Data';

export default class JSONData extends Data {
  constructor(filepath) {
    super(filepath);
    this.object = JSON.parse(this.file);
  }
}
