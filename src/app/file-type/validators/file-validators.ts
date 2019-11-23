import { ValidatorFn } from '@angular/forms';
import { FileExtensionValidator } from './file-extension-validator';
import { MaxFilenameLengthValidator } from './max-filename-length-validator';
import { FilesizeValidator } from './filesize-validator';

export class FileValidators {

  static maxFilenameLength(maxFilenameLength: number): ValidatorFn {
    const validator = new MaxFilenameLengthValidator(maxFilenameLength);
    return validator.validate.bind(validator);
  }

  static fileExtension(allowedFileExtensions: string[]): ValidatorFn {
    const validator = new FileExtensionValidator(allowedFileExtensions);
    return validator.validate.bind(validator);
  }

  static filesize(maxFilesize: number): ValidatorFn {
    const validator = new FilesizeValidator(maxFilesize);
    return validator.validate.bind(validator);
  }

}
