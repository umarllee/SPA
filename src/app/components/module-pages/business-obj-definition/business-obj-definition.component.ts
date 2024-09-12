import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { NewItemComponent } from './new-item/new-item.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filterAutocomplete } from 'src/app/utils/autocomplete';
import { BusinessService } from 'src/app/services/business.service';
import { swalSuccess } from 'src/app/utils/alert';
import { formatDate } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  filteredOptioncreated_updated_By?: Observable<any[]>;

  DataOwnerFormGroup!: FormGroup;
  definitionFormGroup!: FormGroup;
  SourceSystemFormGroup!: FormGroup;
  BusinessRulesFormGroup!: FormGroup;
  BusinessTermFormGroup!: FormGroup;
  CreatedTermFormGroup!: FormGroup;

  UpdateData: any;
  isFormValid = true;
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
    private dialog: MatDialog,
    private fb: FormBuilder,
    private businessService: BusinessService,
  ) {

    this.generateForm();
    this.generateDtOwnerForm();

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

  ngOnInit() {

  }

  //FORM CODES

  generateDtOwnerForm(){
    this.DataOwnerFormGroup = this.fb.group({
      business_unit_owner: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.business_unit_owner : '', [Validators.required]],
      business_function: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.business_function : '', [Validators.required]],
      role: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.role : '', [Validators.required]],
    })
  }

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
      id: 0,
      ruleId: ['', [Validators.required]],
      rule: ['', [Validators.required]],
    })

    this.BusinessTermFormGroup = this.fb.group({
      id: 0,
      business_term_id: ['', [Validators.required]],
      business_term: ['', [Validators.required]],
    })

    this.CreatedTermFormGroup = this.fb.group({
      id: 0,
      created_updated_By: ['', [Validators.required]],
      created_updated_ate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      remarks: ['', [Validators.required]],
    })
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

  get BRF(): { [key: string]: AbstractControl } {
    return this.BusinessRulesFormGroup.controls;
  }

  get CRF(): { [key: string]: AbstractControl } {
    return this.CreatedTermFormGroup.controls;
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

  addListValue() {
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

  //TABLE CODES
  dataSourceDtOwner: MatTableDataSource<any> = new MatTableDataSource<any>([
    {
      business_unit_owner: 'owner',
      business_function: 'business_function',
      role: 'role',
    }
  ]);

  dataSourceSrcSystem: MatTableDataSource<any> = new MatTableDataSource<any>([
    {
      name: 'test source sys',
      surname: 'test code',
      testRole: 'test refresh',
      active: 'y',
      capmode: 'tets',
      srcmode: 'tessstt',
      trackHistory: 'mockdata',
      historyType: 'mockdata',
      errTreatment: 'testdata',
      exepTreatment: 'etstdata',
    },
  ]);

  dataSourceBussnRule: MatTableDataSource<any> = new MatTableDataSource<any>([
    {
      name: '1',
      surname: 'test rule',
    },
  ]);

  dataSourceAltBusiness: MatTableDataSource<any> = new MatTableDataSource<any>([
    {
      name: '1',
      surname: 'business term',

    },
  ]);

  activeRowDtOwner: any = -1;
  activeRowSrcSystem: any = -1;
  activeRowBussnRule: any = -1;
  activeRowAltBusiness: any = -1;

  highlightRowDataDtOwner: any;
  highlightRowDataSrcSystem: any;
  highlightRowDataBussnRule: any;
  highlightRowDataAltBusiness: any;

  onChangePageDtOwner(event: PageEvent) {
  }

  onChangePageSrcSystem(event: PageEvent) {

  }

  onChangePageBussnRule(event: PageEvent) {

  }

  onChangePageAltBusiness(event: PageEvent) {

  }

  isActive = (tableIndex: number, index: number) => { return (tableIndex == 1 ? this.activeRowDtOwner : this.activeRowSrcSystem) === index };
  isActiveTerm = (tableIndex: number, index: number) => { return (tableIndex == 1 ? this.activeRowBussnRule : this.activeRowAltBusiness) === index };


  UpdateDataDtOwner:any;
  UpdateDataSrsSystem:any;

  highlight(tableIndex: number, index: number, id: number, row: any): void {
    if (tableIndex == 1) {
      if (!this.isActive(1, index)) {
        row != this.highlightRowDataDtOwner ? this.highlightRowDataDtOwner = row : this.highlightRowDataDtOwner = '';
        this.activeRowDtOwner = index;
        this.UpdateDataDtOwner = row;
        this.generateDtOwnerForm();
      }
      else {
        this.activeRowDtOwner = -1;
        this.highlightRowDataDtOwner = '';
      }
    }

    if (tableIndex == 2) {
      if (!this.isActive(2, index)) {
        row != this.highlightRowDataSrcSystem ? this.highlightRowDataSrcSystem = row : this.highlightRowDataSrcSystem = '';
        this.activeRowSrcSystem = index;
      }
      else {
        this.activeRowSrcSystem = -1;
        this.highlightRowDataSrcSystem = '';
      }
    }

  }

  highlightTerm(tableIndex: number, index: number, id: number, row: any): void {
    if (tableIndex == 1) {
      if (!this.isActiveTerm(1, index)) {
        row != this.highlightRowDataBussnRule ? this.highlightRowDataBussnRule = row : this.highlightRowDataBussnRule = '';
        this.activeRowBussnRule = index;
      }
      else {
        this.activeRowBussnRule = -1;
        this.highlightRowDataBussnRule = '';
      }
    }

    if (tableIndex == 2) {
      if (!this.isActive(2, index)) {
        row != this.highlightRowDataAltBusiness ? this.highlightRowDataAltBusiness = row : this.highlightRowDataAltBusiness = '';
        this.activeRowAltBusiness = index;
      }
      else {
        this.activeRowAltBusiness = -1;
        this.highlightRowDataAltBusiness = '';
      }
    }

  }

  displayedColumnsDtOwner: any = {
    columns: [
      'business_unit_owner',
      'business_function',
      'role',
    ],
    columnsTranslates: ['Business Unit Owner', 'Business Function', 'Role']
  };


  displayedColumnsSrcSystem: any = {
    columns: [
      'name',
      'surname',
      'testRole',
      'active',
      'capmode',
      'srcmode',
      'trackHistory',
      'historyType',
      'errTreatment',
      'exepTreatment',
    ],
    columnsTranslates: [
      'Source System',
      'Source Sys. Country Code',
      'Req Frequency of Refresh',
      'Active',
      'Data Capture Mode',
      'Sourcing Mode',
      'Track History ',
      'History Type',
      'Error Treatment',
      'Exception  Treatment',
    ]
  };

  displayedColumnsBussnRule: any = {
    columns: ['name', 'surname',],
    columnsTranslates: ['Rule Id', 'Rule']
  };

  displayedColumnsAltBusiness: any = {
    columns: ['name', 'surname',],
    columnsTranslates: ['Business Term ID', 'Business Term']
  };

  pageEvent!: PageEvent;
  lengthDtOwner?: number;
  lengthSrcSystem?: number;
  lengthBussnRule?: number;
  lengthAltBusiness?: number;
  pageSize!: number;
  pageSizeOptions: number[] = [20, 30, 40];
  @ViewChild('commonPagDtOwner') commonPaginator!: MatPaginator;
  @ViewChild('commonPagSrcSystem') commonPaginatorSrcSystem!: MatPaginator;
  @ViewChild('commonPagBussnRule') commonPaginatorBussnRule!: MatPaginator;
  @ViewChild('commonPagAltBusiness') commonPaginatorAltBusiness!: MatPaginator;



  //ADD DATA OWNER

  handleAddOwner(){
    this.dataSourceDtOwner.data.push(this.DataOwnerFormGroup.value);
    this.dataSourceDtOwner.data = this.dataSourceDtOwner.data;
    this.generateDtOwnerForm();
  }
}
