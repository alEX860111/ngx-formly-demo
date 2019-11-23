import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SelectedFile } from '../selected-file';

export interface MinFilesError {

  minFiles: number;

  actualFiles: number;

}

export interface MaxFilesError {

  maxFiles: number;

  actualFiles: number;

}

export interface TotalFilesizeError {

  maxTotalFilesize: number;

  actualTotalFilesize: number;

}

export class FileListValidators {

  static totalFilesize(maxTotalFilesize: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const selectedFiles: SelectedFile[] = control.value;

      const actualTotalFilesize = selectedFiles
        .map(file => file.file.size)
        .reduce((size1, size2) => size1 + size2, 0);

      if (actualTotalFilesize > maxTotalFilesize) {
        const error: TotalFilesizeError = { maxTotalFilesize, actualTotalFilesize };
        return { totalFilesize: error };
      }

      return null;
    };
  }

  static minFiles(minFiles: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const selectedFiles: SelectedFile[] = control.value;

      if (selectedFiles.length < minFiles) {
        const error: MinFilesError = {
          minFiles,
          actualFiles: selectedFiles.length
        };
        return { minFiles: error };
      }

      return null;
    };
  }

  static maxFiles(maxFiles: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const selectedFiles: SelectedFile[] = control.value;

      if (selectedFiles.length > maxFiles) {
        const error: MaxFilesError = {
          maxFiles,
          actualFiles: selectedFiles.length
        };
        return { maxFiles: error };
      }

      return null;
    };
  }

}
