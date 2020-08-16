const { DOC_FIXTURE } = require('./fixtures');

const {
  TagAttrRule,
  TagRule,
  TagAttrValueRule,
  TagConditionRule,
} = require('../src/rules/index');

describe('Rules', () => {
  describe('CheckTagAttrRule', () => {
    it('should match correct num of tags with attr', () => {
      const tagAttrRule = new TagAttrRule(DOC_FIXTURE, '', 'img');
      tagAttrRule.setConstraints({ attr: 'alt', attrExist: false });
      tagAttrRule.check();
      expect(tagAttrRule.result).toBe(1);
    });

    it('should match correct num of tags with no attr', () => {
      const tagAttrRule = new TagAttrRule(DOC_FIXTURE, '', 'img');
      tagAttrRule.setConstraints({ attr: 'alt', attrExist: true });
      tagAttrRule.check();
      expect(tagAttrRule.result).toBe(2);
    });
  });

  describe('CheckTagAttrValueRule', () => {
    it('should match correct num of tags with attr:value pair', () => {
      const tagAttrValueRule = new TagAttrValueRule(
        DOC_FIXTURE,
        'head',
        'meta'
      );
      tagAttrValueRule.setConstraints({
        attr: 'name',
        value: 'descriptions',
        attrExist: true,
      });
      tagAttrValueRule.check();
      expect(tagAttrValueRule.result).toBe(1);
    });

    describe('CheckTagRule', () => {
      it('should match correct num of tags that should exist', () => {
        const tagAttrValueRule = new TagRule(DOC_FIXTURE, 'head', 'title');
        tagAttrValueRule.setConstraints({
          tagExist: true,
        });
        tagAttrValueRule.check();
        expect(tagAttrValueRule.result).toBe(1);
      });

      it('should match correct num of tags that should not exist', () => {
        const tagAttrValueRule = new TagRule(DOC_FIXTURE, 'head', 'meta');
        tagAttrValueRule.setConstraints({
          tagExist: false,
        });
        tagAttrValueRule.check();
        expect(tagAttrValueRule.result).toBe(3);
      });
    });

    describe('CheckTagConditionRule', () => {
      it('should return true when condition is satisfied', () => {
        const tagConditionRule = new TagConditionRule(
          DOC_FIXTURE,
          '',
          'strong'
        );
        tagConditionRule.setConstraints({ operator: '>', value: 2 });
        tagConditionRule.check();
        expect(tagConditionRule.result).toBe(true);
      });

      it('should return false when condition is not satisfied', () => {
        const tagConditionRule = new TagConditionRule(DOC_FIXTURE, '', 'h1');
        tagConditionRule.setConstraints({ operator: '<', value: 2 });
        tagConditionRule.check();
        expect(tagConditionRule.result).toBe(false);
      });
    });
  });
});
