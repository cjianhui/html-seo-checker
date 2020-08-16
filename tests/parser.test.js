const Parser = require('../src/parser');

const { DOC_FIXTURE } = require('./fixtures');

const rulesFixture = [
  {
    tag: { name: 'img' },
    attr: {
      alt: { value: null, exist: true },
    },
    disable: true,
  },
  {
    tag: { scope: 'head', name: 'title', exist: true },
  },
  {
    tag: { scope: 'head', name: 'meta' },
    attr: {
      name: { value: 'descriptions', exist: true },
    },
  },
  {
    tag: { name: 'a' },
    attr: {
      rel: { value: null, exist: true },
    },
  },
  {
    tag: { name: 'meta', exist: true },
    condition: { operator: '>=', value: 2 },
  },
];

describe('Parser', () => {
  const parser = new Parser(DOC_FIXTURE, rulesFixture);
  it('should return only enabled rules', () => {
    const enabledRules = parser.getEnabledRules();
    expect(enabledRules.length).toBe(4);
  });

  it('should parse rules correctly', () => {
    const rules = parser.getEnabledRules();
    const parsedRules = parser.getParsedRules(rules);
    expect(parsedRules[0].constructor.name).toBe('TagRule');
    expect(parsedRules[1].constructor.name).toBe('TagAttrValueRule');
    expect(parsedRules[2].constructor.name).toBe('TagAttrRule');
    expect(parsedRules[3].constructor.name).toBe('TagConditionRule');
  });

  it('should format and return results', () => {
    const results = parser.getResults();
    const expectedResults =
      'There is 1 <a> tag without <rel> attribute\nThere are at least 2 <meta> tags in <html>';
    expect(results).toEqual(expectedResults);
  });
});
