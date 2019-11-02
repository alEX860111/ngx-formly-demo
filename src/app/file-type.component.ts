import { Component, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from '@ngx-formly/material';
import { SelectedFile } from './selected-file';
import { UploadService } from './upload-service';

@Component({
  selector: 'formly-field-file',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: FormlyFieldFile, multi: true },
  ]
})
export class FormlyFieldFile extends FieldType implements ControlValueAccessor {

  @ViewChild('fileInput', { static: true})
  fileInput: ElementRef;

  selectedFiles: SelectedFile[] = new Array<SelectedFile>();

  constructor(private uploadService: UploadService) {
    super();
  }

  onChange = (_) => { };

  onTouched = () => { };

  writeValue(_) { }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }

  onBrowseFiles() {
    this.fileInput.nativeElement.value = null;
    this.fileInput.nativeElement.click();
  }

  onBlur() {
    console.log('blur');
    this.onTouched();
  }

  onSelect(event) {
    const fileList: FileList = event.target.files;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      const selectedFile: SelectedFile = {
        file: file,
        progress: 0
      };
      this.selectedFiles.push(selectedFile);
      this.uploadService.upload(file).subscribe(progress => {
        this.selectedFiles[this.selectedFiles.length - 1].progress = progress;
      });
    }

    this.onChange(this.selectedFiles.map(selectedFile => selectedFile.file));
  }

}
