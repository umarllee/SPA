import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { NewItemComponent } from './new-item/new-item.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filterAutocomplete } from 'src/app/utils/autocomplete';
import { BusinessService } from 'src/app/services/business.service';
import { swalSuccess } from 'src/app/utils/alert';

@Component({
  selector: 'app-business-obj-definition',
  templateUrl: './business-obj-definition.component.html',
  styleUrls: ['./business-obj-definition.component.scss']
})
export class BusinessObjDefinitionComponent {
  objectTypes: any[] = [];
  paymentPurposeTypeIds: any[] = [];
  paymentMethodIds: any[] = [];
  filteredOptionsClient?: Observable<any[]>;
  filteredOptionsObjName?: Observable<any[]>;
  filteredOptionsdataDomain?: Observable<any[]>;

  filteredOptionsunitOwner?: Observable<any[]>;
  filteredOptionsbussFunc?: Observable<any[]>;
  filteredOptionsrole?: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
  ) {

    this.generateForm();
    this.filteredOptionsClient = this.FF['projectName'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsObjName = this.FF['objName'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsdataDomain = this.FF['dataDomain'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsunitOwner = this.OF['business_unit_owner'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsbussFunc = this.OF['business_function'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsrole = this.OF['role'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

  }

  clients: any[] = [
    {
      key: 1,
      value: 'Test'
    },
    {
      key: 2,
      value: 'Test 2'
    },
    {
      key: 3,
      value: 'Meta'
    },
  ];


  generateForm() {
    this.definitionFormGroup = this.fb.group({
      id: 0,
      business_object_id: 'XXXBO-0001',
      business_object_description: '',
      projectId: 0,
      projectName: '',
      business_object_name: '',
      dataDomainId: 0,
      dataDomain: '',
    })

    this.BOFormGroup = this.fb.group({
      business_unit_owner: ['', [Validators.required]],
      business_function: ['', [Validators.required]],
      role: ['', [Validators.required]],
    })
  }

  BOFormGroup!: FormGroup;
  definitionFormGroup!: FormGroup;
  UpdateData: any;
  isFormValid = true;

  ngOnInit() {

  }

  get FF(): { [key: string]: AbstractControl } {
    return this.definitionFormGroup.controls;
  }

  get OF(): { [key: string]: AbstractControl } {
    return this.BOFormGroup.controls;
  }

  handleSetAutocomplete(name: string, id: number) {
    // switch (name) {
    //   case 'customerId':
    //     this.FF['customerId'].setValue(id);
    //     break;

    //   default:
    //     break;
    // }
  }

  isBOFormValid = true;
  handleSave() {
    if (this.BOFormGroup.valid) {
      this.isBOFormValid = true;
      this.businessService.saveBo_owner(this.BOFormGroup.value).subscribe({
        next: res => {
          swalSuccess("Saved successfully.")
        },
        error: err => console.log(err)
      })
    }

    else {
      this.isBOFormValid = false;
    }

  }
}
