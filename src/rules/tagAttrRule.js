const BaseRule = require('./baseRule');

class TagAttrRule extends BaseRule {
  constructor(doc, scope, tag) {
    super(doc);
    this.scope = scope || 'html';
    this.tag = tag;
  }

  check() {
    const { attr, attrExist } = this.constraints;
    const selector = !attrExist
      ? `${this.scope} ${this.tag}[${attr}]`
      : `${this.scope} ${this.tag}:not([${attr}])`;
    this.result = this._$(selector).length;
  }

  getResult() {
    let message;
    const { attr, attrExist } = this.constraints;
    if (this.result) {
      message = `There ${this.result > 1 ? 'are' : 'is'} ${this.result} <${
        this.tag
      }> ${this.result > 1 ? 'tags' : 'tag'} ${
        attrExist ? 'without' : 'with'
      } <${attr}> attribute`;
    }
    return message;
  }
}

module.exports = TagAttrRule;
