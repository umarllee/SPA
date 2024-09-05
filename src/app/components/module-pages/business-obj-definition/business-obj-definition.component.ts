import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { NewItemComponent } from './new-item/new-item.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filterAutocomplete } from 'src/app/utils/autocomplete';
import { BusinessService } from 'src/app/services/business.service';
import { swalSuccess } from 'src/app/utils/alert';
import { formatDate } from '@angular/common';

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
  filteredOptionsautoasset_type?: Observable<any[]>;
  filteredOptionssensitivity_classification?: Observable<any[]>;
  filteredOptionssensitivity_reason?: Observable<any[]>;

  filteredOptionsunitOwner?: Observable<any[]>;
  filteredOptionsbussFunc?: Observable<any[]>;
  filteredOptionsrole?: Observable<any[]>;
  
  filteredOptionssource_system?: Observable<any[]>;
  filteredOptionssource_system_country_code?: Observable<any[]>;
  filteredOptionsreq_frequency_of_refresh?: Observable<any[]>;
  filteredOptionsActive?: Observable<any[]>;
  filteredOptionsdata_capture_mode?: Observable<any[]>;
  filteredOptionssourcing_mode?: Observable<any[]>;
  filteredOptiontrack_history?: Observable<any[]>;
  filteredOptionshistory_type?: Observable<any[]>;
  filteredOptionserror_treatment?: Observable<any[]>;
  filteredOptionsexception_treatment?: Observable<any[]>;


  filteredOptionsremarks?: Observable<any[]>;
  filteredOptionsRule?: Observable<any[]>;
  filteredOptionsbusiness_Term?: Observable<any[]>;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private businessService: BusinessService,
  ) {

    this.generateForm();
    this.filteredOptionsClient = this.FF['projectName'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsObjName = this.FF['business_object_name'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsdataDomain = this.FF['dataDomain'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsautoasset_type = this.FF['business_object_asset_type'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );
    this.filteredOptionssensitivity_classification = this.FF['business_object_sensitivity_classification'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );
    this.filteredOptionssensitivity_reason = this.FF['business_object_sensitivity_reason'].valueChanges.pipe(
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
      
      dataDomain: '',
      projectName: '',
      business_object_id: ['XXXBO-0001', [Validators.required]],
      business_object_name: ['', [Validators.required]],
      business_object_description: ['', [Validators.required]],
      business_object_asset_type: ['', [Validators.required]],
      business_object_sensitivity_classification: ['', [Validators.required]],
      business_object_sensitivity_reason: ['', [Validators.required]],
      version: '',
      date_created: '',
      active: ''
    })

    this.DataOwnerFormGroup = this.fb.group({
      business_unit_owner: ['', [Validators.required]],
      business_function: ['', [Validators.required]],
      role: ['', [Validators.required]],
    })
    
    this.SourceSystemFormGroup = this.fb.group({
      source_system: ['', [Validators.required]],
      source_system_country_code: ['', [Validators.required]],
      req_frequency_of_refresh: ['', [Validators.required]],
      active: ['', [Validators.required]],
      data_capture_mode: ['', [Validators.required]],
      sourcing_mode: ['', [Validators.required]],
      track_history: ['', [Validators.required]],
      history_type: ['', [Validators.required]],
      error_treatment: ['', [Validators.required]],
      exception_treatment: ['', [Validators.required]],
    })

    this.BusinessRulesFormGroup = this.fb.group({
      ruleId: ['', [Validators.required]],
      rule: ['', [Validators.required]],
    })

    this.BusinessTermFormGroup = this.fb.group({
      business_term_id: ['', [Validators.required]],
      business_term: ['', [Validators.required]],
    })
  }

  DataOwnerFormGroup!: FormGroup;
  definitionFormGroup!: FormGroup;
  SourceSystemFormGroup!: FormGroup;
  BusinessRulesFormGroup!: FormGroup;
  BusinessTermFormGroup!: FormGroup;

  UpdateData: any;
  isFormValid = true;

  ngOnInit() {

  }

  get FF(): { [key: string]: AbstractControl } {
    return this.definitionFormGroup.controls;
  }

  get OF(): { [key: string]: AbstractControl } {
    return this.DataOwnerFormGroup.controls;
  }

  get SSF(): { [key: string]: AbstractControl } {
    return this.SourceSystemFormGroup.controls;
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

  item_dialogRef?: MatDialogRef<NewItemComponent>;

  addListValue(){
    this.item_dialogRef = this.dialog.open(NewItemComponent,
      {
        // disableClose: true,
        hasBackdrop: true,
        width: '45%',
        height: 'auto',
        autoFocus: false,
        data: {
        
        }
      })
 
    // this.item_dialogRef.afterClosed().subscribe({
    //   next: res => {
    //   }
    // })
  }

  isBOFormValid = true;
  handleSave() {
    if (this.DataOwnerFormGroup.valid) {
      this.isBOFormValid = true;
      this.businessService.saveBo_owner(this.DataOwnerFormGroup.value).subscribe({
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
