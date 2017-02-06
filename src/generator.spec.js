import { setOutputPath } from './generator';
import { expect } from 'chai';

describe('Generator tests', () => {
  it('should properly set the output path recursively based on the source path', () => {
    const source = '/Users/john.doe/dev/UnifiedApiDocumentation/specs/types.d/types.raml';
    const expected = '/Users/john.doe/dev/UnifiedApiDocumentation/dist/types.d/types.html';
    const actual = setOutputPath(source);

    expect(actual).equals(expected);

  });

  it('should properly set the output path recursively by version based on the source path', () => {
    const source = '/Users/john.doe/dev/UnifiedApiDocumentation/specs/types.d/v1/types.raml';
    const expected = '/Users/john.doe/dev/UnifiedApiDocumentation/dist/types.d/v1/types.html';
    const actual = setOutputPath(source);

    expect(actual).equals(expected);

  });
});
