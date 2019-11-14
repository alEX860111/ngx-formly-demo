import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { of, Subscription } from 'rxjs';
import { UploadService } from './upload-service';
import { SelectedFile } from './selected-file';

@Component({
  selector: 'app-file-control',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.scss']
})
export class FileControlComponent implements OnInit, OnDestroy {

  @Input()
  field: FormlyFieldConfig;

  @Input()
  uploadUrl: string;

  @Output()
  deleteFile = new EventEmitter<any>();

  progress = 0;

  actionIcon = 'close';

  file: File;

  private progessSubscription: Subscription;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    const selectedFile: SelectedFile = this.field.formControl.value;
    this.file = selectedFile.file;

    if (!this.field.formControl.valid || !this.uploadUrl) {
      return;
    }

    this.field.formControl.setAsyncValidators(() => {
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
            this.actionIcon = 'done';
          }
        },
        null,
        () => this.field.formControl.updateValueAndValidity());
  }

  ngOnDestroy() {
    this.cancelUpload();
  }

  removeFile() {
    this.cancelUpload();
    this.deleteFile.emit();
  }

  onMouseenter() {
    this.actionIcon = 'close';
  }

  onMouseleave() {
    if (this.progress === 100) {
      this.actionIcon = 'done';
    }
  }

  private cancelUpload() {
    if (this.progessSubscription) {
      this.progessSubscription.unsubscribe();
    }
  }

}
