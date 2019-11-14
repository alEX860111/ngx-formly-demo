import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileControlComponent } from './file-control.component';
import { FileInputComponent } from './file-input.component';
import { FileSizePipe } from './file-size.pipe';
import { FileTypeComponent } from './file-type.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';

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
    FileControlComponent,
    FileSizePipe,
    FileInputComponent
  ]
})
export class FileTypeModule { }
