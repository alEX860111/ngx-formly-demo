import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatIconRegistry } from '@angular/material';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileTypeComponent } from './file-type/file-type.component';
import { FileTypeModule } from './file-type/file-type.module';
import { PanelWrapperComponent } from './panel-wrapper.component';
import { RepeatTypeComponent } from './repeat-section.type';
import { ValidationMessages } from './validation-messages';

@NgModule({
  declarations: [
    AppComponent, PanelWrapperComponent, RepeatTypeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FileTypeModule.forRoot({
      // dropzoneText: 'Dateien hier ablegen oder',
      // browseFilesButtonText: 'Dateien durchsuchen',
      // removeFileTooltip: 'Datei entfernen'
    }),
    FormlyModule.forRoot(
      {
        validationMessages: [
          { name: 'required', message: ValidationMessages.requiredValidationMessage },
          { name: 'min', message: ValidationMessages.minValidationMessage },
          { name: 'max', message: ValidationMessages.maxValidationMessage },
          { name: 'maxFilenameLength', message: ValidationMessages.maxFilenameLengthMessage },
          { name: 'minFilenameLength', message: ValidationMessages.minFilenameLengthMessage },
          { name: 'fileExtension', message: ValidationMessages.fileExtensionMessage },
          { name: 'filesize', message: ValidationMessages.filesizeMessage },
          { name: 'minFiles', message: ValidationMessages.minFilesMessage },
          { name: 'maxFiles', message: ValidationMessages.maxFilesMessage },
          { name: 'totalFilesize', message: ValidationMessages.totalFilesizeMessage },
          { name: 'uploadError', message: ValidationMessages.uploadErrorMessage }
        ],
        wrappers: [
          { name: 'panel', component: PanelWrapperComponent },
        ],
        types: [
          { name: 'repeat', component: RepeatTypeComponent },
          { name: 'file', component: FileTypeComponent },
        ],
      }
    ),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    MatButtonModule,
    MatStepperModule,
    MatNativeDateModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileDrop', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file-import.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'file', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileUpload', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file-upload.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileRemove', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/times.svg'));
  }
}
