import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { of, Subscription } from 'rxjs';
import { FileUploadService } from './file-upload.service';
import { SelectedFile } from './selected-file';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [FileUploadService]
})
export class FileUploadComponent implements OnInit, OnDestroy {

  @Input()
  field: FormlyFieldConfig;

  @Input()
  uploadUrl: string;

  @Output()
  deleteFile = new EventEmitter<any>();

  progress = 0;

  uploadError: string;

  file: File;

  private actionIconIsHovered: boolean;

  private progessSubscription: Subscription;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
    const selectedFile: SelectedFile = this.field.formControl.value;
    this.file = selectedFile.file;

    if (!this.field.formControl.valid || !this.uploadUrl) {
      return;
    }

    this.field.formControl.setAsyncValidators(() => {
      if (this.uploadError) {
        return of({ uploadError: true });
      }

      if (this.progress === 100) {
        return of(null);
      }

      return of({ uploadInProgress: true });
    });

    setTimeout(() => this.field.formControl.updateValueAndValidity(), 0);

    this.progessSubscription = this.uploadService.upload(this.file, this.uploadUrl)
      .subscribe(
        uploadState => {
          this.progress = uploadState.progress;
          if (this.progress === 100) {
            this.field.formControl.value.location = uploadState.location;
          }
        },
        error => {
          this.uploadError = error;
          this.field.formControl.updateValueAndValidity();
        },
        () => this.field.formControl.updateValueAndValidity());
  }

  ngOnDestroy() {
    this.cancelUpload();
  }

  removeFile() {
    this.cancelUpload();
    this.deleteFile.emit();
  }

  getActionIcon(): string {
    if (this.actionIconIsHovered) {
      return 'fileType:removeFileIcon';
    }

    if (this.progress === 100 && !this.uploadError) {
      return 'fileType:uploadDoneIcon';
    }

    return 'fileType:removeFileIcon'
  }

  onActionIconMouseenter() {
    this.actionIconIsHovered = true;
  }

  onActionIconMouseleave() {
    this.actionIconIsHovered = false;
  }

  get showProgressBar(): boolean {
    return this.progessSubscription && !this.uploadError;
  }

  private cancelUpload() {
    if (this.progessSubscription) {
      this.progessSubscription.unsubscribe();
    }
  }

}
