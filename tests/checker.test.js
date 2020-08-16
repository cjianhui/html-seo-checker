const fs = require('fs');
const HTMLSeoChecker = require('..');

const destFilePath = './output.txt';

afterAll(() => {
  fs.unlinkSync(destFilePath);
});

describe('HTMLSeoChecker', () => {
  const htmlSeoChecker = new HTMLSeoChecker();
  it('should display error when input is invalid', () => {
    console.log = jest.fn();
    htmlSeoChecker.check(1, './output.txt');
    expect(console.log).toHaveBeenCalledWith('Invalid input type!');
  });

  it('should display error when output is invalid', () => {
    console.log = jest.fn();
    htmlSeoChecker.check('./test.html', 1);
    expect(console.log).toHaveBeenCalledWith('Invalid output type!');
  });

  it('should create output file', async () => {
    htmlSeoChecker.check('./test.html', destFilePath);
    setTimeout(3000, () => {
      expect(fs.existsSync(destFilePath)).toBe(true);
    });
  });

  it('should create output file from writable stream', () => {
    const writableStream = fs.createWriteStream(destFilePath);
    htmlSeoChecker.check('./test.html', writableStream);
    setTimeout(3000, () => {
      expect(fs.existsSync(destFilePath)).toBe(true);
    });
  });
});
