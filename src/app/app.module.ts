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
import { FileTypeConfig, FILE_TYPE_ICON_NAMESPACE } from './file-type/file-type.config';
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
    FileTypeModule.forRoot(new FileTypeConfig({
      dropzoneIcon: 'dropzoneIcon',
      fileIcon: 'fileIcon',
      removeFileIcon: 'removeFileIcon',
      uploadDoneIcon: 'uploadDoneIcon'
    })),
    FormlyModule.forRoot(
      {
        validationMessages: [
          { name: 'required', message: ValidationMessages.requiredValidationMessage },
          { name: 'min', message: ValidationMessages.minValidationMessage },
          { name: 'max', message: ValidationMessages.maxValidationMessage },
          { name: 'filenameLength', message: ValidationMessages.filenameLengthMessage },
          { name: 'filesize', message: ValidationMessages.filesizeMessage },
          { name: 'minFiles', message: ValidationMessages.minFilesMessage },
          { name: 'maxFiles', message: ValidationMessages.maxFilesMessage },
          { name: 'totalFilesize', message: ValidationMessages.totalFilesizeMessage },
          { name: 'uploadError', message: 'File Upload Error' }
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
    matIconRegistry.addSvgIconInNamespace(FILE_TYPE_ICON_NAMESPACE, 'dropzoneIcon', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file-import.svg'));
    matIconRegistry.addSvgIconInNamespace(FILE_TYPE_ICON_NAMESPACE, 'fileIcon', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file.svg'));
    matIconRegistry.addSvgIconInNamespace(FILE_TYPE_ICON_NAMESPACE, 'uploadDoneIcon', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/check.svg'));
    matIconRegistry.addSvgIconInNamespace(FILE_TYPE_ICON_NAMESPACE, 'removeFileIcon', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/times.svg'));
  }
}
