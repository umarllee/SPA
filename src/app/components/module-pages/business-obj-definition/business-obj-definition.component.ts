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
import Swal from 'sweetalert2';

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

  countryCodes: any[] = [
    {
      key: 1,
      value: '1'
    },
    {
      key: 2,
      value: '2'
    },
  ];

  actives: any[] = [
    {
      key: 1,
      value: 'Yes'
    },
    {
      key: 0,
      value: 'No'
    },
  ];


  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private businessService: BusinessService,
  ) {

    this.generateForm();
    this.generateDtOwnerForm();
    this.generateBusinessRulesFormGroup();
    this.generateSourceSystemFormGroup();
    this.generateBusinessTermFormGroup();
    this.generateCreatedTermFormGroup();

    this.keyUpOwner();
    this.keyUpBODefinition();
    this.keyUpImpDetails();
    this.keyUpBusinessAlternateRule();
  }

  ngOnInit() {
    this.getTableDataOwner();
    this.getTableImpDetails();
    this.getTableBusinessTerm();
  }

  keyUpBODefinition() {
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
  }

  keyUpOwner() {
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

  keyUpImpDetails() {
    this.filteredOptionssource_system = this.SSF['source_system'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionssource_system_country_code = this.SSF['source_system_country_code'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.countryCodes) : this.countryCodes))
    );

    this.filteredOptionsreq_frequency_of_refresh = this.SSF['req_frequency_of_refresh'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    // this.filteredOptionsActive = this.SSF['active'].valueChanges.pipe(
    //   startWith(''),
    //   map((client) => (client ? filterAutocomplete(client, this.actives) : this.actives))
    // );

    this.filteredOptionsdata_capture_mode = this.SSF['data_capture_mode'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionssourcing_mode = this.SSF['sourcing_mode'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptiontrack_history = this.SSF['track_history'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionshistory_type = this.SSF['history_type'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionserror_treatment = this.SSF['error_treatment'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsexception_treatment = this.SSF['exception_treatment'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );
  }

  keyUpBusinessAlternateRule() {
    this.filteredOptionsRule = this.BRF['rule'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );

    this.filteredOptionsbusiness_Term = this.BTF['business_term'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.clients) : this.clients))
    );
  }
  //FORM CODES

  generateBusinessRulesFormGroup() {
    this.BusinessRulesFormGroup = this.fb.group({
      id: 0,
      ruleId: [this.UpdateDataBussnRule ? this.UpdateDataBussnRule.ruleId : '', [Validators.required]],
      rule: [this.UpdateDataBussnRule ? this.UpdateDataBussnRule.rule : '', [Validators.required]],
    })
  }

  generateDtOwnerForm() {
    this.DataOwnerFormGroup = this.fb.group({
      business_unit_owner: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.business_unit_owner : '', [Validators.required]],
      business_function: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.business_function : '', [Validators.required]],
      role: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.role : '', [Validators.required]],
    })
  }

  generateSourceSystemFormGroup() {
    this.SourceSystemFormGroup = this.fb.group({
      id: this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.id : 0,
      source_system: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.source_system : '', [Validators.required]],
      source_system_country_code: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.source_system_country_code : '', [Validators.required]],
      req_frequency_of_refresh: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.req_frequency_of_refresh : '', [Validators.required]],
      active: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.active : '', [Validators.required]],
      data_capture_mode: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.data_capture_mode : '', [Validators.required]],
      sourcing_mode: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.sourcing_mode : '', [Validators.required]],
      track_history: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.track_history : '', [Validators.required]],
      history_type: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.history_type : '', [Validators.required]],
      error_treatment: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.error_treatment : '', [Validators.required]],
      exception_treatment: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.exception_treatment : '', [Validators.required]],
    })
  }

  generateBusinessTermFormGroup() {
    this.BusinessTermFormGroup = this.fb.group({
      version: 0,
      date_created: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      active: 0,
      business_term_id: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_term_id : '', [Validators.required]],
      business_term: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_term : '', [Validators.required]],
      business_term_description: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_term_description : '', [Validators.required]],
    })
  }

  generateCreatedTermFormGroup() {
    this.CreatedTermFormGroup = this.fb.group({
      id: 0,
      created_updated_By: ['', [Validators.required]],
      created_updated_ate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      remarks: ['', [Validators.required]],
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

  get BTF(): { [key: string]: AbstractControl } {
    return this.BusinessTermFormGroup.controls;
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

    }

    else {
      this.isBOFormValid = false;
    }
  }

  //TABLE CODES
  dataSourceDtOwner: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  dataSourceSrcSystem: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  dataSourceBussnRule: MatTableDataSource<any> = new MatTableDataSource<any>([
    {
      ruleId: '1',
      rule: 'test rule',
    },
  ]);

  dataSourceAltBusiness: MatTableDataSource<any> = new MatTableDataSource<any>([]);

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

  UpdateDataDtOwner: any;
  UpdateDataSrsSystem: any;
  UpdateDataBussnRule: any;
  UpdateDataAlternateTerm: any;

  highlight(tableIndex: number, index: number, id: number, row: any): void {
    if (tableIndex == 1) {
      if (!this.isActive(1, index)) {
        row != this.highlightRowDataDtOwner ? this.highlightRowDataDtOwner = row : this.highlightRowDataDtOwner = '';
        this.activeRowDtOwner = index;
        this.UpdateDataDtOwner = row;
        this.generateDtOwnerForm();
      }
      else {
        this.UpdateDataDtOwner = '';
        this.generateDtOwnerForm();
        this.activeRowDtOwner = -1;
        this.highlightRowDataDtOwner = '';
      }
    }

    if (tableIndex == 2) {
      if (!this.isActive(2, index)) {
        row != this.highlightRowDataSrcSystem ? this.highlightRowDataSrcSystem = row : this.highlightRowDataSrcSystem = '';
        this.activeRowSrcSystem = index;
        this.UpdateDataSrsSystem = row;
        this.generateSourceSystemFormGroup();
      }
      else {
        this.UpdateDataSrsSystem = '';
        this.generateSourceSystemFormGroup();
        this.activeRowSrcSystem = -1;
        this.UpdateDataSrsSystem = '';
      }
    }

  }

  highlightTerm(tableIndex: number, index: number, id: number, row: any): void {
    if (tableIndex == 1) {
      if (!this.isActiveTerm(1, index)) {
        row != this.highlightRowDataBussnRule ? this.highlightRowDataBussnRule = row : this.highlightRowDataBussnRule = '';
        this.activeRowBussnRule = index;
        this.UpdateDataBussnRule = row;
        this.generateBusinessRulesFormGroup();
      }
      else {
        this.UpdateDataBussnRule = '';
        this.generateBusinessRulesFormGroup();
        this.activeRowBussnRule = -1;
        this.highlightRowDataBussnRule = '';
      }
    }

    if (tableIndex == 2) {
      if (!this.isActiveTerm(2, index)) {
        row != this.highlightRowDataAltBusiness ? this.highlightRowDataAltBusiness = row : this.highlightRowDataAltBusiness = '';
        this.activeRowAltBusiness = index;
        this.UpdateDataAlternateTerm = row;
        this.generateBusinessTermFormGroup();
      }
      else {
        this.UpdateDataAlternateTerm = '';
        this.generateBusinessTermFormGroup();
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
      '#',
    ],
    columnsTranslates: ['Business Unit Owner', 'Business Function', 'Role', '#']
  };

  displayedColumnsSrcSystem: any = {
    columns: [
      'source_system',
      'source_system_country_code',
      'req_frequency_of_refresh',
      'active',
      'data_capture_mode',
      'sourcing_mode',
      'track_history',
      'history_type',
      'error_treatment',
      'exception_treatment',
      '#',
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
      '#',
    ]
  };

  displayedColumnsBussnRule: any = {
    columns: ['ruleId', 'rule',],
    columnsTranslates: ['Rule Id', 'Rule']
  };

  displayedColumnsAltBusiness: any = {
    columns: ['business_term_id', 'business_term', 'business_term_description', '#'],
    columnsTranslates: ['Business Term ID', 'Business Term', 'Business Term description', '#']
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
  isDataOwnerFormValid = true;
  handleAddOwner() {
    if (this.DataOwnerFormGroup.valid) {
      this.isDataOwnerFormValid = true;
      this.highlightRowDataDtOwner ? (
        this.businessService.updateBo_owner(this.highlightRowDataDtOwner.id, this.DataOwnerFormGroup.value).subscribe({
          next: res => {
            swalSuccess('Updated successfully!');
            this.getTableDataOwner();
          },
          error: err => console.log(err)
        }),
        this.dataSourceDtOwner.paginator = this.commonPaginator

      ) : (
        this.saveDataOwner(),
        // this.dataSourceDtOwner.data.push(this.DataOwnerFormGroup.value),
        this.dataSourceDtOwner.paginator = this.commonPaginator
      )

      this.UpdateDataDtOwner = '';
      this.generateDtOwnerForm();
      this.activeRowDtOwner = -1;
      this.highlightRowDataDtOwner = '';
      this.keyUpOwner();
    }
    else this.isDataOwnerFormValid = false

  }

  handleDeleteOwner(id: number) {
    Swal.fire({
      text: 'Do you want to delete data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#266AB8',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.businessService.deleteBo_owner(id).subscribe({
          next: res => {
            swalSuccess('Deleted successfully!');
            this.getTableDataOwner();
            this.UpdateDataDtOwner = '';
            this.generateDtOwnerForm();
            this.activeRowDtOwner = -1;
            this.highlightRowDataDtOwner = '';
          },
          error: err => console.log(err)
        });
      }
    })
  }

  getTableDataOwner() {
    this.businessService.getBo_owner().subscribe({
      next: res => {
        this.dataSourceDtOwner = new MatTableDataSource<any>(res.data);
        this.dataSourceDtOwner.paginator = this.commonPaginator;
      },
      error: err => console.log(err)
    })
  }

  saveDataOwner() {
    this.businessService.saveBo_owner(this.DataOwnerFormGroup.value).subscribe({
      next: res => {
        swalSuccess("Saved successfully.");
        this.getTableDataOwner();
      },
      error: err => console.log(err)
    })
  }

  isImpDetailsFormGroup = true;
  handleAddImpDetails() {
    if (this.SourceSystemFormGroup.valid) {
      this.isImpDetailsFormGroup = true;
      this.highlightRowDataSrcSystem ? (
        // this.dataSourceSrcSystem.data[this.activeRowSrcSystem] = this.SourceSystemFormGroup.value,
        this.businessService.updateImpDetails(this.highlightRowDataSrcSystem.id, this.DataOwnerFormGroup.value).subscribe({
          next: res => {
            swalSuccess('Updated successfully!');
            this.getTableImpDetails();
          },
          error: err => console.log(err)
        }),
        this.dataSourceSrcSystem.data = this.dataSourceSrcSystem.data
      ) : (
        this.saveImpDetails(),
        this.dataSourceSrcSystem.data = this.dataSourceSrcSystem.data
      )

      this.UpdateDataSrsSystem = '';
      this.generateSourceSystemFormGroup();
      this.activeRowSrcSystem = -1;
      this.highlightRowDataSrcSystem = '';
      this.keyUpImpDetails();
    }
    else this.isImpDetailsFormGroup = false;
  }

  getTableImpDetails() {
    this.businessService.getImpDetails().subscribe({
      next: res => {
        this.dataSourceSrcSystem = new MatTableDataSource<any>(res.data);
        this.dataSourceSrcSystem.paginator = this.commonPaginatorSrcSystem;
      },
      error: err => console.log(err)
    })
  }

  saveImpDetails() {
    this.businessService.saveImpDetails(this.SourceSystemFormGroup.value).subscribe({
      next: res => {
        swalSuccess("Saved successfully.");
        this.getTableImpDetails();
      },
      error: err => console.log(err)
    })
  }

  handleDeleteImpDetails(id: number) {
    Swal.fire({
      text: 'Do you want to delete data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#266AB8',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.businessService.deleteImpDetails(id).subscribe({
          next: res => {
            swalSuccess('Deleted successfully!');
            this.getTableImpDetails();
            this.UpdateDataSrsSystem = '';
            this.generateSourceSystemFormGroup();
            this.activeRowSrcSystem = -1;
            this.highlightRowDataSrcSystem = '';
          },
          error: err => console.log(err)
        });
      }
    })
  }

  handleAddBussRule() {
    this.highlightRowDataBussnRule ? (
      this.dataSourceBussnRule.data[this.activeRowBussnRule] = this.BusinessRulesFormGroup.value,
      this.dataSourceBussnRule.data = this.dataSourceBussnRule.data
    ) : (
      this.dataSourceBussnRule.data.push(this.BusinessRulesFormGroup.value),
      this.dataSourceBussnRule.data = this.dataSourceBussnRule.data
    )

    this.UpdateDataBussnRule = '';
    this.generateBusinessRulesFormGroup();
    this.activeRowBussnRule = -1;
    this.highlightRowDataBussnRule = '';
    this.keyUpBusinessAlternateRule();
  }

  handleDeleteBussRule() {
    Swal.fire({
      text: 'Do you want to delete data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#266AB8',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {

      }
    })
  }

  isALtTermFormValid = true;
  handleAddAltTerm() {
    if (this.BusinessTermFormGroup.valid) {
      this.highlightRowDataAltBusiness ? (
        this.businessService.updateBusiness_term(this.highlightRowDataAltBusiness.id, this.BusinessTermFormGroup.value).subscribe({
          next: res => {
            swalSuccess('Updated successfully!');
            this.getTableBusinessTerm();
          },
          error: err => console.log(err)
        }),
        this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
      ) : (
        // this.dataSourceAltBusiness.data.push(this.BusinessTermFormGroup.value),
        this.saveAltTerm(),
        this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
      )

      this.UpdateDataAlternateTerm = '';
      this.generateBusinessTermFormGroup();
      this.activeRowAltBusiness = -1;
      this.highlightRowDataAltBusiness = '';
      this.keyUpBusinessAlternateRule();
    }
    else this.isALtTermFormValid = false;
  }

  saveAltTerm() {
    this.businessService.saveBusiness_term(this.BusinessTermFormGroup.value).subscribe({
      next: res => {
        swalSuccess("Saved successfully.");
        this.getTableBusinessTerm();
      },
      error: err => console.log(err)
    });
  }

  getTableBusinessTerm() {
    this.businessService.getBusiness_term().subscribe({
      next: res => {
        this.dataSourceAltBusiness = new MatTableDataSource<any>(res.data);
        this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness;
      },
      error: err => console.log(err)
    })
  }

  handleDeleteAltTerm(id: number) {
    Swal.fire({
      text: 'Do you want to delete data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#266AB8',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.businessService.deleteBusiness_term(id).subscribe({
          next: res => {
            swalSuccess('Deleted successfully!');
            this.getTableBusinessTerm();
            this.UpdateDataAlternateTerm = '';
            this.generateBusinessTermFormGroup();
            this.activeRowAltBusiness = -1;
            this.highlightRowDataAltBusiness = '';
          },
          error: err => console.log(err)
        });
      }
    })
  }
}
