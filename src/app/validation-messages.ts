import { MaxFilesError, MinFilesError, TotalFilesizeError } from './file-type/file-list-validators';
import { FileSizePipe } from './file-type/file-size.pipe';
import { FileExtensionError, FilenameLengthError, FilesizeError } from './file-type/file-validators';

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

  static filenameInvalidMessage() {
    return 'The file name is invalid';
  }

  static filenameLengthMessage(err: FilenameLengthError) {
    return `The filename is too long. Allowed characters: ${err.maxFilenameLength}`;
  }

  static fileExtensionMessage(err: FileExtensionError) {
    const allowedFileExtensions = err.allowedFileExtensions
      .map(ext => `'${ext}'`)
      .join(', ');
    return `The file extension '${err.actualFileExtension}' is invalid. Allowed extensions are: ${allowedFileExtensions}`;
  }

  static filesizeMessage(err: FilesizeError) {
    return `The file is too big. Allowed filesize: ${ValidationMessages.FILE_SIZE_PIPE.transform(err.maxFilesize)}`;
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

  static uploadErrorMessage() {
    return 'The file could not be uploaded';
  }

}
