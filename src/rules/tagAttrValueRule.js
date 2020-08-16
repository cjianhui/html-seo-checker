const BaseRule = require('./baseRule');

class TagAttrValueRule extends BaseRule {
  constructor(doc, scope, tag) {
    super(doc);
    this.scope = scope || 'html';
    this.tag = tag;
  }

  check() {
    const { attr, value } = this.constraints;
    const selector = `${this.scope} ${this.tag}[${attr}=${value}]`;
    this.result = this._$(selector).length;
  }

  getResult() {
    let message;
    const { attr, value, attrExist } = this.constraints;
    const ruleViolated = attrExist ^ this.result;
    if (ruleViolated) {
      message = `There ${this.result > 1 ? 'are' : 'is'} ${this.result} <${
        this.tag
      }> ${this.result > 1 ? 'tags' : 'tag'} ${
        this.result === 0 ? 'with' : 'without'
      } <${attr}="${value}"> attribute`;
    }
    return message;
  }
}

module.exports = TagAttrValueRule;
