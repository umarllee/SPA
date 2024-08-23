import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { NewItemComponent } from './new-item/new-item.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filterAutocomplete } from 'src/app/utils/autocomplete';

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
  constructor(
    private fb: FormBuilder,
  ) {

    this.generateForm();
    this.filteredOptionsClient = this.FF['projectName'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsunitOwner = this.FF['unitOwner'].valueChanges.pipe(
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

    this.filteredOptionsbussFunc = this.FF['bussFunc'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsrole = this.FF['role'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

  }
  
  generateForm() {
    this.definitionFormGroup = this.fb.group({
      id: 0,
      businessObjId: 'XXXBO-0001',
      description: '',
      projectId: 0,
      projectName: '',
      objNameId: 0,
      objName: '',
      dataDomainId: 0,
      dataDomain: '',

      unitOwnerId: 0,
      unitOwner: '',

      bussFuncId: 0,
      bussFunc: '',

      roleId: 0,
      role: '',

      implDetails: '',
      
    })
  }
  
  definitionFormGroup!: FormGroup;
  UpdateData: any;
  isFormValid = true;

  ngOnInit() {
   
  }

  get FF(): { [key: string]: AbstractControl } {
    return this.definitionFormGroup.controls;
  }

  handleSetAutocomplete(name: string, id: number) {
    switch (name) {
      case 'customerId':
        this.FF['customerId'].setValue(id);
        break;

      default:
        break;
    }
  }

  handleCustomerList(event: any) {
    if (!this.FF['invoiceObjectTypeId'].value) return;
    // this.commonService.getCustomers(event.target.value, this.FF['invoiceObjectTypeId'].value).subscribe({
    //   next: res => {
    //     this.clients = res.data;
    //     this.filteredOptionsClient = this.FF['customerName'].valueChanges.pipe(
    //       startWith(''),
    //       map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    //     );
    //   },
    //   error: err => console.log(err)
    // });
  }
}
