import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormlyModule } from '@ngx-formly/core';
import { FileControlComponent } from './file-control.component';
import { FileInputComponent } from './file-input.component';
import { FileSizePipe } from './file-size.pipe';
import { FileTypeComponent } from './file-type.component';
import { FileTypeConfig, FILE_TYPE_CONFIG } from './file-type.config';

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
export class FileTypeModule {

  constructor(@Optional() @SkipSelf() parentModule: FileTypeModule) {
    if (parentModule) {
      throw new Error(
        'FileTypeModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: FileTypeConfig = {
    dropzoneIcon: 'file_copy',
    removeFileIcon: 'close',
    uploadDoneIcon: 'done',
    fileIcon: 'folder'
  }): ModuleWithProviders {
    return {
      ngModule: FileTypeModule,
      providers: [
        { provide: FILE_TYPE_CONFIG, useValue: config }
      ]
    };
  }

}
