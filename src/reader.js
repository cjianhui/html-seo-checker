const fs = require('fs');
const stream = require('stream');

class Reader {
  constructor(input, encoding = 'utf8') {
    this.encoding = encoding;
    const type = this._getInputType(input);
    this.input = input;
    this.type = type;
  }

  readInput() {
    let promise;
    switch (this.type) {
      case 'file':
        promise = this._readFromFile();
        break;
      case 'stream':
        promise = this._readFromStream();
        break;
      default:
        break;
    }
    return promise;
  }

  isValidType(input) {
    return this._getInputType(input) !== 'invalid';
  }

  _getInputType(input) {
    let type = 'invalid';

    if (typeof input === 'string') {
      type = 'file';
    } else if (input instanceof stream.Readable) {
      type = 'stream';
    }
    return type;
  }

  _readFromFile() {
    console.log(`Reading from file: ${this.input}`);
    return new Promise((resolve, reject) => {
      fs.readFile(this.input, { encoding: this.encoding }, (err, data) => {
        if (!err && data) {
          resolve(data);
        }

        if (err) {
          reject(err);
        }
      });
    });
  }

  _readFromStream() {
    console.log('Reading from stream');
    this.input.setEncoding(this.encoding);
    return new Promise((resolve, reject) => {
      let data = '';
      this.input.on('error', (err) => {
        reject(err);
      });
      this.input.on('data', (chunk) => {
        data += chunk;
      });
      this.input.on('end', () => {
        if (data.length !== 0) {
          resolve(data);
        } else {
          reject(new Error('Stream has no content'));
        }
      });
    });
  }
}

module.exports = Reader;
