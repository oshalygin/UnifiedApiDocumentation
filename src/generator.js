/* eslint-disable no-console */
import raml2html from 'raml2html';
import glob from 'glob';
import mkdirp from 'mkdirp';
import { chalkProcessing, chalkSuccess, chalkError } from '../utilities/chalkConfiguration';

import fs from 'fs';
import path from 'path';

const defaultConfiguration = raml2html.getDefaultConfig();
const distFolder = path.join(__dirname, '../dist');

export function setOutputPath(source) {
  return source
    .replace('specs', 'dist')
    .replace('raml', 'html');
}

function createOutputDirectory(outputPath) {
  const directory = path.dirname(outputPath);
  mkdirp.sync(directory, (error) => {
    if (error) {
      console.error(chalkError(`Could not create a directory at, ${directory}`));
    }
  });
}

const generator = {
  single(ramlSpecification, outputName) {

    chalkProcessing('Rendering HTML output, standby...');
    raml2html.render(ramlSpecification, defaultConfiguration)
      .then(
      (result) => {
        console.log(chalkProcessing('Rendered the markup, writing to output...'));

        const outputPath = path.join(distFolder, `/${outputName}.html`);
        fs.writeFile(outputPath, result, (error) => {
          if (error) {
            console.error(chalkError('Could not save the file...'));
            console.error(chalkError(error));
          }
          console.log(chalkSuccess(`Specification created: ${outputPath}`));
        });
      })
      .catch((errors) => {
        console.error(chalkProcessing(`RAML Processing Errors: ${errors.parserErrors.length}`));
        console.error(chalkError(JSON.stringify(errors, null, 2)));
        process.exit(1);
      });
  },
  all() {
    const specifications = glob.sync(path.join(__dirname, '../specs/**/*.raml'));

    const numberOfSpecifications = specifications.length;
    console.log(chalkProcessing(`Processing (${numberOfSpecifications}) RAML Specifications`));

    specifications.forEach((specification) => {
      raml2html.render(specification, defaultConfiguration)
        .then((result) => {
          const outputPath = setOutputPath(specification);
          createOutputDirectory(outputPath);
          
          fs.writeFile(outputPath, result, (error) => {
            if (error) {
              console.error(chalkError(`Could not save the file, ${specification}`));
              console.error(chalkError(error));
              process.exit(1);
            }
            console.log(chalkSuccess(`Specification saved to: ${outputPath}`));
          });

        })
        .catch(() => {
          console.error(chalkError(`Error processing ${specification}`));
          console.error(chalkError('Validate RAML specifications by running "lint:raml" prior to generating content'));
          process.exit(1);
        });
    });

  }
};

export default generator;
