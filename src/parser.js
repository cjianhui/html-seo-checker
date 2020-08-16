const fs = require('fs');
const path = require('path');
const {
  TagAttrRule,
  TagAttrValueRule,
  TagRule,
  TagConditionRule,
} = require('./rules/index');

const DEFAULT_RULES_FILE_PATH = path.join(__dirname, 'rules.json');
const rulesFile = fs.readFileSync(DEFAULT_RULES_FILE_PATH);
const defaultRules = JSON.parse(rulesFile);

class Parser {
  constructor(data, rules = defaultRules) {
    this.rules = rules;
    this.data = data;
  }

  getEnabledRules() {
    return this.rules.filter((rule) => !rule.disable);
  }

  getParsedRules(rules) {
    return rules.map((rule) => this._parseRule(rule));
  }

  getResults() {
    const rules = this.getEnabledRules();
    const parsedRules = this.getParsedRules(rules);
    const results = [];
    for (const rule of parsedRules) {
      rule.check();
      const result = rule.getResult();
      if (result) {
        results.push(result);
      }
    }
    return results.join('\n');
  }

  _parseRule(rule) {
    const { tag, attr, condition } = rule;
    if (condition) {
      const conditionRule = new TagConditionRule(
        this.data,
        tag.scope,
        tag.name
      );
      conditionRule.setConstraints(condition);
      return conditionRule;
    }

    if (attr) {
      const attrName = Object.keys(attr)[0];
      const { value, exist } = attr[attrName];
      let attrRule;
      if (!value) {
        attrRule = new TagAttrRule(this.data, tag.scope, tag.name);
        attrRule.setConstraints({ attr: attrName, attrExist: exist });
      } else {
        attrRule = new TagAttrValueRule(this.data, tag.scope, tag.name);
        attrRule.setConstraints({ attr: attrName, value, attrExist: exist });
      }
      return attrRule;
    }

    const tagRule = new TagRule(this.data, tag.scope, tag.name);
    tagRule.setConstraints({ tagExist: tag.exist });
    return tagRule;
  }
}

module.exports = Parser;
