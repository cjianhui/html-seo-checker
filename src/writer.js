const fs = require('fs');
const stream = require('stream');

class Writer {
  constructor(output, encoding = 'utf8') {
    this.encoding = encoding;
    const type = this._getOutputType(output);
    this.output = output;
    this.type = type;
  }

  writeOutput(data) {
    let writer;
    switch (this.type) {
      case 'file':
        writer = this._writeToFile(data);
        break;
      case 'stream':
        writer = this._writeToStream(data);
        break;
      case 'console':
        writer = this._writeToConsole(data);
        break;
      default:
        break;
    }
    return writer;
  }

  isValidType(output) {
    return this._getOutputType(output) !== 'invalid';
  }

  _getOutputType(output) {
    let type = 'invalid';
    if (typeof output === 'string') {
      type = 'file';
    } else if (
      typeof output === 'object' &&
      output instanceof stream.Writable
    ) {
      type = 'stream';
    } else if (
      typeof output === 'object' &&
      output instanceof console.Console
    ) {
      type = 'console';
    }
    return type;
  }

  _writeToFile(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.output, data, { encoding: this.encoding }, (err) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  _writeToStream(content) {
    this.output.setDefaultEncoding(this.encoding);
    return new Promise((resolve, reject) => {
      const CHUNK_SIZE = 4096;
      const write = (data) => {
        let succeeded = true;
        let buffer = data;
        while (buffer.length > CHUNK_SIZE && succeeded) {
          const chunk = buffer.substr(0, CHUNK_SIZE);
          succeeded = this.output.write(chunk);
          buffer = buffer.slice(CHUNK_SIZE);
        }
        if (!succeeded) {
          reject(new Error('Writing to stream failed'));
        } else {
          this.output.end(data);
          resolve();
        }
      };
      const data = content;
      write(data);
    });
  }

  _writeToConsole(data) {
    this.output.log(data);
  }
}

module.exports = Writer;
