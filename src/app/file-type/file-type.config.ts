import { InjectionToken } from '@angular/core';

export const FILE_TYPE_CONFIG = new InjectionToken<FileTypeConfig>('FileTypeConfig');

export const FILE_TYPE_ICON_NAMESPACE = 'FileTypeIcons';

export class FileTypeConfig {

  readonly dropzoneIcon: string;

  readonly removeFileIcon: string;

  readonly uploadDoneIcon: string;

  readonly fileIcon: string;

  constructor(params: {
    dropzoneIcon: string,

    removeFileIcon: string,

    uploadDoneIcon: string,

    fileIcon: string
  }) {
    this.dropzoneIcon = `${FILE_TYPE_ICON_NAMESPACE}:${params.dropzoneIcon}`;
    this.removeFileIcon = `${FILE_TYPE_ICON_NAMESPACE}:${params.removeFileIcon}`;
    this.uploadDoneIcon = `${FILE_TYPE_ICON_NAMESPACE}:${params.uploadDoneIcon}`;
    this.fileIcon = `${FILE_TYPE_ICON_NAMESPACE}:${params.fileIcon}`;
  }

}
