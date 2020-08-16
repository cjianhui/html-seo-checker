const cheerio = require('cheerio');

class BaseRule {
  constructor(doc) {
    this._$ = cheerio.load(doc, { lowerCaseTags: true });
    this.result = null;
    this.constraints = null;
  }

  setConstraints(constraints) {
    this.constraints = constraints;
  }

  check() {
    throw new Error('Please implement me!');
  }

  getResult() {
    throw new Error('Please implement me!');
  }
}

module.exports = BaseRule;
