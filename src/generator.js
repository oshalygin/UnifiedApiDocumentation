/* eslint-disable no-console */
import raml2html from 'raml2html';
import { chalkProcessing, chalkSuccess, chalkError } from '../utilities/chalkConfiguration';
import fs from 'fs';
import path from 'path';

const defaultConfiguration = raml2html.getDefaultConfig();
const distFolder = path.join(__dirname, '../dist');

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

  }
};

export default generator;
