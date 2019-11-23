import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FilenameLengthError } from './filename-length-error';
import { SelectedFile } from '../selected-file';

export class FilenameLengthValidator {

  constructor(private readonly maxFilenameLength: number) { }

  validate (control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedFile: SelectedFile = control.value;
    const file: File = selectedFile.file;

    const index = file.name.lastIndexOf('.');

    if (index === -1) {
      const error: FilenameLengthError = {
        maxFilenameLength: this.maxFilenameLength,
        acturalFilenameLength: undefined
      };
      return { filenameLength: error };
    }

    const filename = file.name.substring(0, index);

    if (filename.length > this.maxFilenameLength) {
      const error: FilenameLengthError = {
        maxFilenameLength: this.maxFilenameLength,
        acturalFilenameLength: filename.length
      };
      return { filenameLength: error };
    }

    return null;
  }
  
}
