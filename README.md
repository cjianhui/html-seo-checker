## Installation

`npm install --save html-seo-checker`

## Usage

### With file input and console output

```
const HTMLSeoChecker = require('html-seo-checker');
const inputFilePath = './test.html';

const htmlSeoChecker = new HTMLSeoChecker();
htmlSeoChecker.check(inputFilePath, console);
```

### With stream input and stream output

```
const fs = require('fs');
const https = require('https');
const HTMLSeoChecker = require('html-seo-checker');
const destFilePath = './result.txt';

const htmlSeoChecker = new HTMLSeoChecker();

https.get('https://www.google.com/', (readableStream) => {
  const writableStream = fs.createWriteStream(destFilePath);
  htmlSeoChecker.check(readableStream, writableStream);
});

```

### Rules

You can specify your own custom rules when using `html-seo-checker`. Otherwise, a default set of rules will be used.

```
const HTMLSeoChecker = require('html-seo-checker`);
const customRules = [
    ...
]
const htmlSeoChecker = new HTMLSeoChecker(customRules)
```

A sample rules configuration can be found `src/rules.json`.

#### Guidelines

1. To include/exclude a tag, change the `exist` attribute.
2. In the `tag` object, `exist: true` is implicit unless otherwise specified.
3. To specify a parent for a `tag`, use the `scope` attribute.
4. The operators supported so far are `<, >, <=, >=,` and `=`.

#### Example

The 5 pre-defined SEO rules are:

```
[
  {
    "tag": { "name": "img" },
    "attr": {
      "alt": { "value": null, "exist": true }
    }
  },
  {
    "tag": { "name": "a" },
    "attr": {
      "rel": { "value": null, "exist": true }
    }
  },
  {
    "tag": { "scope": "head", "name": "title", "exist": true }
  },
  {
    "tag": { "scope": "head", "name": "meta" },
    "attr": {
      "name": { "value": "descriptions", "exist": true }
    }
  },
  {
    "tag": { "scope": "head", "name": "meta" },
    "attr": {
      "name": { "value": "robots", "exist": true }
    }
  },
  {
    "tag": { "scope": "head", "name": "meta" },
    "attr": {
      "name": { "value": "keywords", "exist": true }
    }
  },
  {
    "tag": { "name": "strong" },
    "condition": { "operator": ">", "value": 15 }
  },
  {
    "tag": { "name": "h1" },
    "condition": { "operator": ">", "value": 1 }
  }
]

```

To check if the tag `<meta name="robots">` exists:

```
{
    "tag": { "name": "meta" },
    "attr": {
      "name": { "value": "robots", "exist": true }
    }
},
```

To disable a rule, set `disable: true`. All rules are enabled (implicitly) by default.

```
{
    "tag": { "name": "meta" },
    "attr": {
      "name": { "value": "robots", "exist": true }
    },
    "disable": true
},
```

### Tests

`npm run test`
