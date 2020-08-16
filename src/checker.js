const Parser = require('./parser');
const Reader = require('./reader');
const Writer = require('./writer');

class HTMLSeoChecker {
  constructor(rules) {
    this.rules = rules;
    this.reader = null;
    this.writer = null;
  }

  check(input, output) {
    this.reader = new Reader(input);
    if (!this.reader.isValidType(input)) {
      console.log('Invalid input type!');
      return;
    }
    this.writer = new Writer(output);
    if (!this.writer.isValidType(output)) {
      console.log('Invalid output type!');
      return;
    }

    this.reader
      .readInput()
      .then((data) => new Parser(data).getResults())
      .then((content) => {
        this.writer.writeOutput(content);
      })
      .catch((err) => console.log(err));
  }
}

module.exports = HTMLSeoChecker;
