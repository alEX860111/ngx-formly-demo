import { FormControl } from '@angular/forms';
import { FilesizeError } from './filesize-error';
import { FilesizeValidator } from './filesize-validator';
import { SelectedFile } from '../selected-file';

describe('FileValidators', () => {

    let validator: FilesizeValidator;

    beforeEach(() => validator = new FilesizeValidator(1));

    it('should return null', () => {
      const selectedFile: SelectedFile = { file: new File([], '.txt') };
      const control = new FormControl(selectedFile);
      expect(validator.validate(control)).toBeNull();
    });

    it('should return FilesizeError if file is too big', () => {
      const blob: Blob = new Blob(['hello world']);
      const selectedFile: SelectedFile = { file: new File([blob], '.txt') };
      const control = new FormControl(selectedFile);
      const error: FilesizeError = {
        maxFilesize: 1,
        actualFilesize: blob.size
      };
      expect(validator.validate(control)).toEqual({ filesize: error });
    });

});
