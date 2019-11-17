import { FormControl, ValidatorFn } from '@angular/forms';
import { FileExtensionError, FilenameInvalidError, FilenameLengthError, FileValidators } from './file-validators';
import { SelectedFile } from './selected-file';

describe('FileValidators', () => {

  describe('filename', () => {

    let validator: ValidatorFn;

    beforeEach(() => validator = FileValidators.filename({
      maxFilenameLength: 5,
      allowedFileExtensions: ['txt']
    }));

    it('should return FilenameInvalidError', () => {
      const selectedFile: SelectedFile = { file: new File([], '.txt') };
      const control = new FormControl(selectedFile);
      const error: FilenameInvalidError = { actualFilename: selectedFile.file.name };
      expect(validator(control)).toEqual({ filenameInvalid: error });
    });

    it('should return FilenameLengthError', () => {
      const selectedFile: SelectedFile = { file: new File([], '123456.txt') };
      const control = new FormControl(selectedFile);
      const error: FilenameLengthError = {
        acturalFilenameLength: 6,
        maxFilenameLength: 5
      };
      expect(validator(control)).toEqual({ filenameLength: error });
    });

    it('should return FileExtensionError', () => {
      const selectedFile: SelectedFile = { file: new File([], '12345.pdf') };
      const control = new FormControl(selectedFile);
      const error: FileExtensionError = {
        allowedFileExtensions: ['txt'],
        actualFileExtension: 'pdf'
      };
      expect(validator(control)).toEqual({ fileExtension: error });
    });

    it('should return null', () => {
      const selectedFile: SelectedFile = { file: new File([], '12345.txt') };
      const control = new FormControl(selectedFile);
      expect(validator(control)).toBeNull();
    });

  });

});
