import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SelectedFile } from './selected-file';

export interface FilenameLengthError {

  maxFilenameLength: number;

  acturalFilenameLength: number;

}

export interface FilesizeError {

  maxFilesize: number;

  actualFilesize: number;

}

export class FileValidators {

  static filenameLength(maxFilenameLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const selectedFile: SelectedFile = control.value;
      const file: File = selectedFile.file;

      const filename = file.name.substring(0, file.name.indexOf('.'));

      if (filename.length > maxFilenameLength) {
        const error: FilenameLengthError = {
          maxFilenameLength,
          acturalFilenameLength: filename.length
        };
        return { filenameLength: error };
      }

      return null;
    };
  }

  static filesize(maxFilesize: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const selectedFile: SelectedFile = control.value;
      const file: File = selectedFile.file;

      if (file.size > maxFilesize) {
        const error: FilesizeError = {
          maxFilesize,
          actualFilesize: file.size
        };
        return { filesize: error };
      }

      return null;
    };
  }

}
