import { Component, ElementRef, ViewChild, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from '@ngx-formly/material';
import { SelectedFile } from './selected-file';
import { UploadService } from './upload-service';
import { MatButton } from '@angular/material';

@Component({
  selector: 'formly-field-file',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: FormlyFieldFile, multi: true },
  ]
})
export class FormlyFieldFile extends FieldType implements ControlValueAccessor, OnInit {

  @ViewChild('fileInput', { static: true })
  fileInput: ElementRef;

  @ViewChild('dropzone', { static: true })
  dropzone: ElementRef;

  @ViewChild('browseFilesButton', { static: true })
  browseFilesButton: MatButton;

  selectedFiles: SelectedFile[] = new Array<SelectedFile>();

  constructor(private uploadService: UploadService, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    this.dropzone.nativeElement.addEventListener("dragenter", this.addDragoverClass.bind(this), false);
    this.dropzone.nativeElement.addEventListener("dragover", this.addDragoverClass.bind(this), false);
    this.dropzone.nativeElement.addEventListener("drop", this.onDrop.bind(this), false);
    this.dropzone.nativeElement.addEventListener("dragleave", this.removeDragoverClass.bind(this), false);
    this.dropzone.nativeElement.addEventListener("dragend", this.removeDragoverClass.bind(this), false);

    super.ngOnInit();
  }

  private addDragoverClass(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.renderer.addClass(this.dropzone.nativeElement, 'is-dragover');
    this.browseFilesButton.disabled = true;
  }

  private removeDragoverClass(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.renderer.removeClass(this.dropzone.nativeElement, 'is-dragover');
    this.browseFilesButton.disabled = false;
  }

  private onDrop(event) {
    this.removeDragoverClass(event);
    const fileList: FileList = event.dataTransfer.files;
    this.handleFileList(fileList);
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
    this.handleFileList(fileList);
  }

  private handleFileList(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      const selectedFile: SelectedFile = {
        file: file,
        progress: 0
      };
      this.selectedFiles.push(selectedFile);
      const index = this.selectedFiles.length - 1;
      this.uploadService.upload(file).subscribe(progress => {
        this.selectedFiles[index].progress = progress;
      });
    }

    this.onChange(this.selectedFiles.map(selectedFile => selectedFile.file));
  }

}
