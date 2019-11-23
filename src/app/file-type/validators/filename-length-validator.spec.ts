import { FormControl } from '@angular/forms';
import { FilenameLengthError } from './filename-length-error';
import { FilenameLengthValidator } from './filename-length-validator';
import { SelectedFile } from '../selected-file';

describe('FilenameLengthValidator', () => {

  let validator: FilenameLengthValidator;

  beforeEach(() => {
    validator = new FilenameLengthValidator(5);
  });

  it('should return null', () => {
    const selectedFile: SelectedFile = { file: new File([], '.txt') };
    const control = new FormControl(selectedFile);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return null', () => {
    const selectedFile: SelectedFile = { file: new File([], '12345.txt') };
    const control = new FormControl(selectedFile);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return FilenameLengthError if filename is too long', () => {
    const selectedFile: SelectedFile = { file: new File([], '123456.txt') };
    const control = new FormControl(selectedFile);
    const error: FilenameLengthError = {
      maxFilenameLength: 5,
      acturalFilenameLength: 6
    };
    expect(validator.validate(control)).toEqual({ filenameLength: error });
  });

  it('should return FilenameLengthError if filename cannot be determined', () => {
    const selectedFile: SelectedFile = { file: new File([], '123456') };
    const control = new FormControl(selectedFile);
    const error: FilenameLengthError = {
      maxFilenameLength: 5,
      acturalFilenameLength: undefined
    };
    expect(validator.validate(control)).toEqual({ filenameLength: error });
  });

});
