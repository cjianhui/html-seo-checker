const BaseRule = require('./baseRule');

class TagConditionRule extends BaseRule {
  constructor(doc, scope, tag) {
    super(doc);
    this.scope = scope || 'html';
    this.tag = tag;
    this._operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '>': (a, b) => a > b,
      '>=': (a, b) => a >= b,
      '<': (a, b) => a < b,
      '<=': (a, b) => a <= b,
      '=': (a, b) => a === b,
    };
    this._operatorStrings = {
      '<': ' less than',
      '>': ' more than',
      '<=': ' at most',
      '>=': ' at least',
      '=': '',
    };
  }

  check() {
    const { operator, value } = this.constraints;
    const selector = `${this.scope} ${this.tag}`;
    const numOfElements = this._$(selector).length;
    this.result = this._operators[operator](numOfElements, value);
  }

  getResult() {
    let message;
    const { operator, value } = this.constraints;
    if (this.result) {
      message = `There ${value > 1 ? 'are' : 'is'}${
        this._operatorStrings[operator]
      } ${value} <${this.tag}> ${value > 1 ? 'tags' : 'tag'} in <${
        this.scope
      }>`;
    }
    return message;
  }
}

module.exports = TagConditionRule;
