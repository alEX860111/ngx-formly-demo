import { FormControl, ValidatorFn } from '@angular/forms';
import { FileExtensionError, FilenameLengthError, FilesizeError, FileValidators } from './file-validators';
import { SelectedFile } from './selected-file';

describe('FileValidators', () => {

  describe('filenameLength', () => {

    let validator: ValidatorFn;

    beforeEach(() => validator = FileValidators.filenameLength(5));

    it('should return null', () => {
      const selectedFile: SelectedFile = { file: new File([], '.txt') };
      const control = new FormControl(selectedFile);
      expect(validator(control)).toBeNull();
    });

    it('should return null', () => {
      const selectedFile: SelectedFile = { file: new File([], '12345.txt') };
      const control = new FormControl(selectedFile);
      expect(validator(control)).toBeNull();
    });

    it('should return FilenameLengthError if filename is too long', () => {
      const selectedFile: SelectedFile = { file: new File([], '123456.txt') };
      const control = new FormControl(selectedFile);
      const error: FilenameLengthError = {
        maxFilenameLength: 5,
        acturalFilenameLength: 6
      };
      expect(validator(control)).toEqual({ filenameLength: error });
    });

    it('should return FilenameLengthError if filename cannot be determined', () => {
      const selectedFile: SelectedFile = { file: new File([], '123456') };
      const control = new FormControl(selectedFile);
      const error: FilenameLengthError = {
        maxFilenameLength: 5,
        acturalFilenameLength: undefined
      };
      expect(validator(control)).toEqual({ filenameLength: error });
    });

  });

  describe('fileExtension', () => {

    let validator: ValidatorFn;

    beforeEach(() => validator = FileValidators.fileExtension(['pdf', 'txt']));

    it('should return null', () => {
      const selectedFile: SelectedFile = { file: new File([], '.txt') };
      const control = new FormControl(selectedFile);
      expect(validator(control)).toBeNull();
    });

    it('should return FileExtensionError if extension is not allowed', () => {
      const selectedFile: SelectedFile = { file: new File([], '.png') };
      const control = new FormControl(selectedFile);
      const error: FileExtensionError = {
        allowedFileExtensions: ['pdf', 'txt'],
        actualFileExtension: 'png'
      };
      expect(validator(control)).toEqual({ fileExtension: error });
    });

    it('should return FileExtensionError if extension cannot be determined', () => {
      const selectedFile: SelectedFile = { file: new File([], 'foo') };
      const control = new FormControl(selectedFile);
      const error: FileExtensionError = {
        allowedFileExtensions: ['pdf', 'txt'],
        actualFileExtension: undefined
      };
      expect(validator(control)).toEqual({ fileExtension: error });
    });

  });

  describe('filesize', () => {

    let validator: ValidatorFn;

    beforeEach(() => validator = FileValidators.filesize(1));

    it('should return null', () => {
      const selectedFile: SelectedFile = { file: new File([], '.txt') };
      const control = new FormControl(selectedFile);
      expect(validator(control)).toBeNull();
    });

    it('should return FilesizeError if file is too big', () => {
      const blob: Blob = new Blob(['hello world']);
      const selectedFile: SelectedFile = { file: new File([blob], '.txt') };
      const control = new FormControl(selectedFile);
      const error: FilesizeError = {
        maxFilesize: 1,
        actualFilesize: blob.size
      };
      expect(validator(control)).toEqual({ filesize: error });
    });

  });

});
