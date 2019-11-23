import { AbstractControl, ValidationErrors } from '@angular/forms';
import { SelectedFile } from '../selected-file';
import { FileExtensionError } from './file-extension-error';

export class FileExtensionValidator {

  constructor(private allowedFileExtensions: string[]) { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedFile: SelectedFile = control.value;
    const file: File = selectedFile.file;

    const index = file.name.lastIndexOf('.');

    if (index === -1) {
      const error: FileExtensionError = {
        allowedFileExtensions: this.allowedFileExtensions,
        actualFileExtension: undefined
      };
      return { fileExtension: error };
    }

    const fileExtension = file.name.substring(index + 1);

    if (!this.allowedFileExtensions
      .map(extension => extension.toUpperCase())
      .includes(fileExtension.toUpperCase())) {
      const error: FileExtensionError = {
        allowedFileExtensions: this.allowedFileExtensions,
        actualFileExtension: fileExtension
      };
      return { fileExtension: error };
    }

    return null;
  }

}
