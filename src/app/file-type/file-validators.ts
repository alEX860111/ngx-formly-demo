import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SelectedFile } from './selected-file';

export interface FilenameSpecification {

  maxFilenameLength?: number;

  allowedFileExtensions?: string[];

}

export interface FilenameInvalidError {

  actualFilename: string;

}

export interface FilenameLengthError {

  maxFilenameLength: number;

  acturalFilenameLength: number;

}

export interface FileExtensionError {

  actualFileExtension: string;

  allowedFileExtensions: string[];

}

export interface FilesizeError {

  maxFilesize: number;

  actualFilesize: number;

}

export class FileValidators {

  private static readonly FILE_NAME_REGEX = /^([\w-]+)\.([A-Za-z]+)$/;

  static filename(filenameSpecification: FilenameSpecification): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const selectedFile: SelectedFile = control.value;
      const file: File = selectedFile.file;

      const match = this.FILE_NAME_REGEX.exec(file.name);

      if (!match) {
        const error: FilenameInvalidError = { actualFilename: file.name };
        return { filenameInvalid: error };
      }

      if (filenameSpecification.maxFilenameLength && match[1].length > filenameSpecification.maxFilenameLength) {
        const error: FilenameLengthError = {
          maxFilenameLength: filenameSpecification.maxFilenameLength,
          acturalFilenameLength: match[1].length
        };
        return { filenameLength: error };
      }

      if (filenameSpecification.allowedFileExtensions && !filenameSpecification.allowedFileExtensions.includes(match[2])) {
        const error: FileExtensionError = {
          actualFileExtension: match[2],
          allowedFileExtensions: filenameSpecification.allowedFileExtensions
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
