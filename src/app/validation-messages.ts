import { MaxFilesError, MinFilesError, TotalFilesizeError } from './file-type/file-list-validators';
import { FileSizePipe } from './file-type/file-size.pipe';
import { FilenameLengthError, FilesizeError } from './file-type/file-validators';

export class ValidationMessages {

  private static readonly FILE_SIZE_PIPE = new FileSizePipe();

  static requiredValidationMessage() {
    return 'This field is required';
  }

  static minValidationMessage(_, field) {
    return `This value should be more than ${field.templateOptions.min}`;
  }

  static maxValidationMessage(_, field) {
    return `This value should be less than ${field.templateOptions.max}`;
  }

  static filesizeMessage(err: FilesizeError) {
    return `The file is too big. Allowed filesize: ${ValidationMessages.FILE_SIZE_PIPE.transform(err.maxFilesize)}`;
  }

  static filenameLengthMessage(err: FilenameLengthError) {
    return `The filename is too long. Allowed characters: ${err.maxFilenameLength}`;
  }

  static minFilesMessage(err: MinFilesError) {
    return `Select at least ${err.minFiles} files`;
  }

  static maxFilesMessage(err: MaxFilesError) {
    return `Select at most ${err.maxFiles} files`;
  }

  static totalFilesizeMessage(err: TotalFilesizeError) {
    return `The files are too big. Allowed total filesize: ${ValidationMessages.FILE_SIZE_PIPE.transform(err.maxTotalFilesize)}`;
  }

}
