import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormlyModule } from '@ngx-formly/core';
import { FileInputComponent } from './file-input.component';
import { FileSizePipe } from './file-size.pipe';
import { FileTypeComponent } from './file-type.component';
import { FileUploadComponent } from './file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatProgressBarModule,
    FormlyModule,
  ],
  declarations: [
    FileTypeComponent,
    FileUploadComponent,
    FileSizePipe,
    FileInputComponent
  ]
})
export class FileTypeModule { }
