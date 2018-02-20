import fs from 'fs';

export default class Data {
  constructor(filepath) {
    this.file = fs.readFileSync(filepath);
  }

  getObject() {
    return this.object;
  }
}
