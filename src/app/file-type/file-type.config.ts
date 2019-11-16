import { InjectionToken } from '@angular/core';

export const FILE_TYPE_CONFIG = new InjectionToken<FileTypeConfig>('FileTypeConfig');

export interface FileTypeConfig {

  dropzoneIcon: string;

  removeFileIcon: string;

  uploadDoneIcon: string;

  fileIcon: string;

}
