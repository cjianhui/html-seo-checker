const BaseRule = require('./baseRule');

class TagRule extends BaseRule {
  constructor(doc, scope, tag) {
    super(doc);
    this.scope = scope || 'html';
    this.tag = tag;
  }

  check() {
    const selector = `${this.scope} ${this.tag}`;
    this.result = this._$(selector).length;
  }

  getResult() {
    let message;
    const { tagExist } = this.constraints;
    const ruleViolated = this.result ^ tagExist;
    if (ruleViolated) {
      message = `<${this.scope}> ${
        this.result ? 'contains' : 'does not contain'
      } <${this.tag}> tag`;
    }

    return message;
  }
}

module.exports = TagRule;
