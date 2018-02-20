import Data from './Data';

export default class JSONData extends Data {
  constructor(filepath) {
    super(filepath);
    this.data = JSON.parse(this.file);
  }
}
