import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

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
          key: 'file',
          type: 'file',
        },
        {
          key: 'firstname',
          type: 'input',
          templateOptions: {
            label: 'First name',
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
