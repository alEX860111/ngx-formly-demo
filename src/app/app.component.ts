import { Component } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FileListValidators } from './file-type/list-validators/file-list-validators';
import { FileValidators } from './file-type/validators/file-validators';

export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  activedStep = 0;

  model = { addresses: [{}] };
  steps: StepType[] = [
    {
      label: 'Personal data',
      fields: [
        {
          key: 'pictures',
          type: 'file',
          templateOptions: {
            label: 'Pictures',
            description: 'Upload some nice pictures',
            required: true,
            uploadUrl: '/upload'
          },
          validators: {
            validation: [
              Validators.required,
              FileListValidators.minFiles(2),
              FileListValidators.maxFiles(4),
              FileListValidators.totalFilesize(400 * 1000)
            ]
          },
          fieldArray: {
            validators: {
              validation: [
                FileValidators.minFilenameLength(1),
                FileValidators.maxFilenameLength(50),
                FileValidators.fileExtension(['pdf', 'txt', 'png']),
                FileValidators.filesize(1000 * 1000)
              ]
            }
          }
        },
        {
          key: 'firstname',
          type: 'input',
          templateOptions: {
            label: 'First name',
            description: 'Your first name',
            required: true,
          },
        },
        {
          key: 'lastname',
          type: 'input',
          templateOptions: {
            label: 'Last name',
            required: true,
          },
        },
        {
          key: 'age',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'Age',
            required: false,
            min: 18,
            max: 40,
          },
        },
        {
          key: 'addresses',
          type: 'repeat',
          templateOptions: {
            label: 'Address',
            addText: 'Add Address',
            removeText: 'Remove Address'
          },
          fieldArray: {
            fieldGroup: [
              {
                type: 'input',
                key: 'postalcode',
                templateOptions: {
                  label: 'Postal code',
                  required: true,
                },
              },
              {
                type: 'input',
                key: 'city',
                templateOptions: {
                  label: 'City',
                  required: true
                },
              }
            ],
          },
        },
      ],
    },
    {
      label: 'Destination',
      fields: [
        {
          key: 'country',
          type: 'input',
          templateOptions: {
            label: 'Country',
            required: true,
          },
        },
        {
          key: 'hobby',
          wrappers: ['panel'],
          templateOptions: { label: 'Hobby' },
          fieldGroup: [{
            key: 'name',
            type: 'input',
            templateOptions: {
              required: true,
              type: 'text',
              label: 'Name',
            },
          }],
        },
      ],
    },
    {
      label: 'Day of the trip',
      fields: [
        {
          key: 'day',
          type: 'datepicker',
          templateOptions: {
            label: 'Day of the trip',
            required: true,
          },
        },
      ],
    },
  ];

  form = new FormArray(this.steps.map(() => new FormGroup({})));
  options = this.steps.map(() => <FormlyFormOptions>{});

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  submit() {
    console.log(JSON.stringify(this.model));
  }
}
