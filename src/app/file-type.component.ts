import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UploadService } from './upload-service';
import { SelectedFile } from './selected-file';

@Component({
  selector: 'formly-field-file',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: FormlyFieldFile, multi: true },
  ]
})
export class FormlyFieldFile extends FieldType implements ControlValueAccessor {

  constructor(private uploadService: UploadService) {
    super();
  }

  selectedFiles: SelectedFile[];

  onChange = (_) => { };

  onTouched = () => { };

  writeValue(_) { }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }

  onBlur() {
    console.log('blur');
    this.onTouched();
  }

  onSelect(event) {
    const fileList: FileList = event.target.files;

    this.selectedFiles = new Array<SelectedFile>();
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      const selectedFile: SelectedFile = {
        file: file,
        progress: 0
      };
      this.selectedFiles.push(selectedFile);
      this.uploadService.upload(file).subscribe(progress => {
        this.selectedFiles[i].progress = progress;
      });
    }

    this.onChange(this.selectedFiles.map(selectedFile => selectedFile.file));
  }

}
