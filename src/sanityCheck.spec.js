import { expect } from 'chai';

function sut(firstValue, secondValue) {
  return firstValue + secondValue;
}

describe('Sanity Check', () => {

  it('should properly calculate basic math', () => {
    
    const expected = 5;
    const firstValue = 2;
    const secondValue = 3;

    const actual = sut(firstValue, secondValue);
    expect(actual).equals(expected);

  });
});
