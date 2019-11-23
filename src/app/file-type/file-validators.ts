import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SelectedFile } from './selected-file';

export interface FilenameLengthError {

  maxFilenameLength: number;

  acturalFilenameLength: number;

}

export interface FileExtensionError {

  allowedFileExtensions: string[];
  
  actualFileExtension: string;

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

      const index = file.name.lastIndexOf('.');

      if (index === -1) {
        const error: FilenameLengthError = {
          maxFilenameLength,
          acturalFilenameLength: undefined
        };
        return { filenameLength: error };
      }

      const filename = file.name.substring(0, index);

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

  static fileExtension(allowedFileExtensions?: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const selectedFile: SelectedFile = control.value;
      const file: File = selectedFile.file;

      const index = file.name.lastIndexOf('.');

      if (index === -1) {
        const error: FileExtensionError = {
          allowedFileExtensions,
          actualFileExtension: undefined
        };
        return { fileExtension: error };
      }

      const fileExtension = file.name.substring(index + 1);

      if (!allowedFileExtensions.includes(fileExtension)) {
        const error: FileExtensionError = {
          allowedFileExtensions,
          actualFileExtension: fileExtension
        };
        return { fileExtension: error };
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
