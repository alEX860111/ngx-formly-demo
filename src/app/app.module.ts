import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelWrapperComponent } from './panel-wrapper.component';
import { RepeatTypeComponent } from './repeat-section.type';
import { maxValidationMessage, minValidationMessage, requiredValidationMessage } from './validation-messages';

@NgModule({
  declarations: [
    AppComponent, PanelWrapperComponent, RepeatTypeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(
      {
        validationMessages: [
          { name: 'required', message: requiredValidationMessage },
          { name: 'min', message: minValidationMessage },
          { name: 'max', message: maxValidationMessage },
        ],
        wrappers: [
          { name: 'panel', component: PanelWrapperComponent },
        ],
        types: [
          { name: 'repeat', component: RepeatTypeComponent },
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
export class AppModule { }
