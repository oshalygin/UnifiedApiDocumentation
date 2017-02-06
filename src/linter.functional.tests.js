/* eslint-disable no-console */
/* eslint-disable max-nested-callbacks */
import raml2html from 'raml2html';
import { expect } from 'chai';
import glob from 'glob';

import path from 'path';

const configuration = raml2html.getDefaultConfig();

describe('Specification Linter', () => {

  it('should return no linting errors for clean RAML spec', (done) => {
    const testSpecification = path.join(__dirname, '../test/test.clean.spec.raml');

    raml2html.render(testSpecification, configuration)
      .then(result => {
        const actual = result.length;
        expect(actual).greaterThan(0);
        done();
      })
      .catch(error => {
        expect(error.parserErrors.length).equals(0); //eslint-disable-line no-unused-expressions
        done();
      });
  });

  it('should return linting errors for the error RAML spec', (done) => {
    const testSpecification = path.join(__dirname, '../test/test.error.spec.raml');
    const expectedNumberOfErrors = 55;

    raml2html.render(testSpecification, configuration)
      .then(result => { //eslint-disable-line no-unused-vars
        const actual = result.length;
        expect(actual).equals(0);
        done();
      })
      .catch(error => {
        const actual = error.parserErrors.length;
        expect(actual).equals(expectedNumberOfErrors);
        done();
      });
  });

  it('should not contain any errors when parsing all RAML files', (done) => {

    const specifications = glob.sync(path.join(__dirname, '../specs/**/*.raml'));
    const numberOfSpecifications = specifications.length;
    console.log(`Processing (${numberOfSpecifications}) RAML Specifications`);

    specifications.forEach((specification, index) => {
      raml2html.render(specification, configuration)
        .then(() => { 
          console.log(`Successfully processed ${specification}`);
          if (index === 0) {
            done();
          }
        })
        .catch((errors) => {
          console.log(`Error processing ${specification}`);
          console.error(JSON.stringify(errors, null, 2));
          expect(errors.parserErrors.length).equals(0);
          if (index === 0) {
            done();
          }
        });
    });

  });
});
