/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';

import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'status',
      message: 'Do you want to proceed? (y/n)',
    },
    {
      type: 'input',
      name: 'qr',
      message: 'Enter something:',
      when: (answers) => answers.status === 'y',
    },
  ])
  .then((answers) => {
    console.log(answers);
    const qr_link = answers.qr;
    console.log('qr Answer:', qr_link);
    // Save the answer to a string variable or use it as needed
    var qr_svg = qr.image(qr_link, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qrOutput.png'));
 
    // var svg_string = qr.imageSync('I love QR!', { type: 'png' }); 

    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      throw error;
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
      console.log(error);
    }
  });
