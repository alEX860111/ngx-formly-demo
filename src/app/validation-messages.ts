import { FileSizePipe } from './file-type/file-size.pipe';
import { MaxFilesError } from './file-type/list-validators/max-files-error';
import { MinFilesError } from './file-type/list-validators/min-files-error';
import { TotalFilesizeError } from './file-type/list-validators/total-filesize-error';
import { FileExtensionError } from './file-type/validators/file-extension-error';
import { FilenameLengthError } from './file-type/validators/filename-length-error';
import { FilesizeError } from './file-type/validators/filesize-error';

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

  static filenameLengthMessage(err: FilenameLengthError) {
    return `The filename is too long. Allowed characters: ${err.maxFilenameLength}`;
  }

  static fileExtensionMessage(err: FileExtensionError) {
    const allowedFileExtensions = err.allowedFileExtensions
      .map(ext => `'${ext}'`)
      .join(', ');
    return `The file extension '${err.actualFileExtension}' is not allowed. Allowed extensions are: ${allowedFileExtensions}`;
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
