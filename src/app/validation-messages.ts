import { FileSizePipe } from './file-type/file-size/file-size.pipe';
import { MaxFilesError } from './file-type/list-validators/max-files-error';
import { MinFilesError } from './file-type/list-validators/min-files-error';
import { TotalFilesizeError } from './file-type/list-validators/total-filesize-error';
import { FileExtensionError } from './file-type/validators/file-extension-error';
import { FilenameForbiddenCharactersError } from './file-type/validators/filename-forbidden-characters-error';
import { FilesizeError } from './file-type/validators/filesize-error';
import { MaxFilenameLengthError } from './file-type/validators/max-filename-length-error';
import { MinFilenameLengthError } from './file-type/validators/min-filename-length-error';

export const APP_LOCALE_ID = 'en-US';

export class ValidationMessages {

  private static readonly FILE_SIZE_PIPE = new FileSizePipe(APP_LOCALE_ID);

  static requiredValidationMessage() {
    return 'This field is required';
  }

  static minValidationMessage(_, field) {
    return `This value should be more than ${field.templateOptions.min}`;
  }

  static maxValidationMessage(_, field) {
    return `This value should be less than ${field.templateOptions.max}`;
  }

  static maxFilenameLengthMessage(err: MaxFilenameLengthError) {
    return `The filename is to long. Max length: ${err.maxFilenameLength}`;
  }

  static minFilenameLengthMessage(err: MinFilenameLengthError) {
    return `The filename is to short. Min length: ${err.minFilenameLength}`;
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

  static filenameForbiddenCharacters(err: FilenameForbiddenCharactersError) {
    return `The filename contains forbidden characters: ${err.actualForbiddenCharacters}`;
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
