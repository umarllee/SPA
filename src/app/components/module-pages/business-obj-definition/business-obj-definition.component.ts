import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { last, map, Observable, startWith } from 'rxjs';
import { NewItemComponent } from './new-item/new-item.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filterAutocomplete } from 'src/app/utils/autocomplete';
import { BusinessService } from 'src/app/services/business.service';
import { swalError, swalInfo, swalSuccess } from 'src/app/utils/alert';
import { formatDate } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ComboboxService } from 'src/app/services/combobox.service';
import { ViewGridComponent } from './view-grid/view-grid.component';

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

  treatmentTypes: any[] = [
    {
      key: 0,
      value: 'Stop'
    },
    {
      key: 1,
      value: 'Continue'
    },

  ];

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

  boNames: any[] = [];
  assetsTypes: any[] = [];
  projectNames: any[] = [];
  scopeDataDomains: any[] = [];
  boAssestsTypes: any[] = [];
  sensitivityClassifications: any[] = [];
  sensitivityReasons: any[] = [];
  dataOwners: any[] = [];
  refreshFrequency: any[] = [];
  dataCaptureModes: any[] = [];
  sourcingModes: any[] = [];
  historyTypes: any[] = [];
  sourceSystems: any[] = [];

  initialBOD_ID = 0;

  countryCodes: any[] = [];

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

  businessObjIds: any[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private comboboxService: ComboboxService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {

    this.getComboboxData();

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

    this.getTableBusinessObjectDefinition(1);

  }

  ngOnInit() {
  }


  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  validBOName(event: any) {
    console.log(event)
    if (event.keyCode == 45) return;
  }

  getComboboxData() {
    this.businessService.getBusinessRule().subscribe({
      next: res => {
        res.data.map((dt: any) => {
          this.businessRules.push({ value: dt.rule });
        })
      },
      error: err => console.log(err)
    })

    this.businessService.getBusiness_term().subscribe({
      next: res => {
        res.data.map((dt: any) => {
          this.boNames.push({ value: dt.business_term });
          this.businessTerms.push({ value: dt.business_term });
        });
      },
      error: err => console.log(err)
    })

    this.businessService.getBo_owner().subscribe({
      next: res => {
        res.data.map((dt: any) => {
          this.businessUnitOwners.push({ value: dt.business_unit_owner });
          this.businessFunctions.push({ value: dt.business_function });
        })
      },
      error: err => console.log(err)
    })

    this.businessService.getBusinessObjectDefinition().subscribe({
      next: res => {
        res.data.map((dt: any) => {
          this.projectNames.push({ value: dt.project_name });
          this.scopeDataDomains.push({ value: dt.scope_of_data_domain });
        })
      },
      error: err => console.log(err)
    })

    this.comboboxService.getCountry_codes().subscribe({
      next: res => {
        res.data.map((dt: any) => this.countryCodes.push({ value: dt.Country_Codes }))
      },
      error: err => console.log(err)
    });

    this.comboboxService.getSource_systems().subscribe({
      next: res => {
        res.data.map((dt: any) => this.sourceSystems.push({ value: dt.Source_System_Code }))
      },
      error: err => console.log(err)
    });

    this.assetsTypes = [
      {
        key: 'Master',
        value: 'Master',
      },
      {
        key: 'Reference',
        value: 'Reference',
      },
      {
        key: 'Event',
        value: 'Event',
      },
      {
        key: 'Config',
        value: 'Config',
      },
    ]

    // this.comboboxService.getData_owner_roles().subscribe({
    //   next: res => {
    //     res.data.map((dt: any) => this.dataOwners.push({ value: dt.data_owner_roles }))
    //   },
    //   error: err => console.log(err)
    // });

    this.dataOwners = [
      {
        key: 'Data Owner',
        value: 'Data Owner'
      },
      {
        key: 'Custodian',
        value: 'Custodian'
      },
      {
        key: 'Champion',
        value: 'Champion'
      },

    ]
    // this.comboboxService.getSensitivity_classification().subscribe({
    //   next: res => {
    //     res.data.map((dt: any) => this.sensitivityClassifications.push({ value: dt.sensitivity_classification }))
    //   },
    //   error: err => console.log(err)
    // });

    this.sensitivityClassifications = [
      {
        key: 'Secret',
        value: 'Secret'
      },
      {
        key: 'Confidential',
        value: 'Confidential'
      },
      {
        key: 'Public & Private',
        value: 'Public & Private'
      },
    ]

    // this.comboboxService.getSensitivity_reason_code().subscribe({
    //   next: res => {
    //     res.data.map((dt: any) => this.sensitivityReasons.push({ value: dt.sensitivity_reason_code }))
    //   },
    //   error: err => console.log(err)
    // });
    this.sensitivityReasons = [
      {
        key: 'PII',
        value: 'PII'
      },
      {
        key: 'Competitive',
        value: 'Competitive'
      }
    ]

    this.refreshFrequency = [
      {
        key: 'Daily',
        value: 'Daily'
      },
      {
        key: 'Weekly',
        value: 'Weekly'
      },
      {
        key: 'Monthy',
        value: 'Monthy'
      }
    ]

    this.dataCaptureModes = [
      {
        key: 'Manual',
        value: 'Manual'
      },
      {
        key: 'Digital',
        value: 'Digital'
      },
    ]

    this.sourcingModes = [
      {
        key: 'Batch',
        value: 'Batch'
      },
      {
        key: 'Realtime',
        value: 'Realtime'
      },
      {
        key: 'NRT',
        value: 'NRT'
      }
    ]

    this.historyTypes = [
      {
        key: 'SnapShot',
        value: 'SnapShot'
      },
      {
        key: 'Incremental',
        value: 'Incremental'
      },
    ]
  }

  keyUpBODefinition() {
    this.filteredOptionsClient = this.FF['project_name'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.projectNames) : this.projectNames))
    );

    this.filteredOptionsObjName = this.FF['business_object_name'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.boNames) : this.boNames))
    );

    this.filteredOptionsdataDomain = this.FF['scope_of_data_domain'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.scopeDataDomains) : this.scopeDataDomains))
    );

    this.filteredOptionsautoasset_type = this.FF['business_object_asset_type'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.assetsTypes) : this.assetsTypes))
    );

    this.filteredOptionssensitivity_classification = this.FF['business_object_sensitivity_classification'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.sensitivityClassifications) : this.sensitivityClassifications))
    );
    this.filteredOptionssensitivity_reason = this.FF['business_object_sensitivity_reason'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.sensitivityReasons) : this.sensitivityReasons))
    );
  }

  businessUnitOwners: any[] = [];
  businessFunctions: any[] = [];

  keyUpOwner() {
    this.filteredOptionsunitOwner = this.OF['business_unit_owner'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.businessUnitOwners) : this.businessUnitOwners))
    );

    this.filteredOptionsbussFunc = this.OF['business_function'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.businessFunctions) : this.businessFunctions))
    );

    this.filteredOptionsrole = this.OF['role'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.dataOwners) : this.dataOwners))
    );
  }

  keyUpImpDetails() {
    this.filteredOptionssource_system = this.SSF['source_system'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.sourceSystems) : this.sourceSystems))
    );

    this.filteredOptionssource_system_country_code = this.SSF['source_system_country_code'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.countryCodes) : this.countryCodes))
    );

    this.filteredOptionsreq_frequency_of_refresh = this.SSF['req_frequency_of_refresh'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.refreshFrequency) : this.refreshFrequency))
    );

    // this.filteredOptionsActive = this.SSF['active'].valueChanges.pipe(
    //   startWith(''),
    //   map((client) => (client ? filterAutocomplete(client, this.actives) : this.actives))
    // );

    this.filteredOptionsdata_capture_mode = this.SSF['data_capture_mode'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.dataCaptureModes) : this.dataCaptureModes))
    );

    this.filteredOptionssourcing_mode = this.SSF['sourcing_mode'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.sourcingModes) : this.sourcingModes))
    );

    this.filteredOptionshistory_type = this.SSF['history_type'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.historyTypes) : this.historyTypes))
    );

    this.filteredOptionserror_treatment = this.SSF['error_treatment'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.treatmentTypes) : this.treatmentTypes))
    );

    this.filteredOptionsexception_treatment = this.SSF['exception_treatment'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.treatmentTypes) : this.treatmentTypes))
    );
  }

  keyUpBusinessAlternateRule() {
    this.filteredOptionsRule = this.BRF['rule'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.businessRules) : this.businessRules))
    );

    this.filteredOptionsbusiness_Term = this.BTF['business_term'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.businessTerms) : this.businessTerms))
    );
  }
  //FORM CODES

  generateBusinessRulesFormGroup() {
    this.BusinessRulesFormGroup = this.fb.group({
      id: 0,
      rule_id: [this.UpdateDataBussnRule ? this.UpdateDataBussnRule.rule_id : '', [Validators.required]],
      rule: [this.UpdateDataBussnRule ? this.UpdateDataBussnRule.rule : '', [Validators.required]],
      business_object_id: [this.UpdateDataBussnRule ? this.UpdateDataBussnRule.business_object_id : ''],
    })
  }

  generateDtOwnerForm() {
    this.DataOwnerFormGroup = this.fb.group({
      business_unit_owner: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.business_unit_owner : '', [Validators.required]],
      business_function: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.business_function : '', [Validators.required]],
      role: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.role : '', [Validators.required]],
      business_object_id: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.business_object_id : ''],
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
      business_object_id: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.business_object_id : ''],
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
      business_object_id: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_object_id : ''],
      business_termcol: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_termcol : ''],
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
      scope_of_data_domain: [this.UpdateDataBusinessObjectDefinition?.scope_of_data_domain || ''],
      project_name: this.UpdateDataBusinessObjectDefinition?.project_name || '',
      business_object_id: [this.UpdateDataBusinessObjectDefinition?.business_object_id || '', [Validators.required]],
      business_object_name: [this.UpdateDataBusinessObjectDefinition?.business_object_name || '', [Validators.required]],
      business_object_description: [this.UpdateDataBusinessObjectDefinition ? this.UpdateDataBusinessObjectDefinition.business_object_description : '', [Validators.required]],
      business_object_asset_type: [this.UpdateDataBusinessObjectDefinition ? this.UpdateDataBusinessObjectDefinition.business_object_asset_type : '', [Validators.required]],
      business_object_sensitivity_classification: [this.UpdateDataBusinessObjectDefinition ? this.UpdateDataBusinessObjectDefinition.business_object_sensitivity_classification : '', [Validators.required]],
      business_object_sensitivity_reason: [this.UpdateDataBusinessObjectDefinition ? this.UpdateDataBusinessObjectDefinition.business_object_sensitivity_reason : '', [Validators.required]],
      version: 0,
      date_created: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      active: true,
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
  viewGrid_dialogRef?: MatDialogRef<ViewGridComponent>;

  addListValue(name: string) {
    this.item_dialogRef = this.dialog.open(NewItemComponent,
      {
        // disableClose: true,
        hasBackdrop: true,
        width: '45%',
        height: 'auto',
        autoFocus: false,
        data: {
          inputName: 'business_object_asset_type'
        }
      })

    // this.item_dialogRef.afterClosed().subscribe({
    //   next: res => {
    //   }
    // })
  }

  isBOFormValid = true;
  handleSave() {
    this.handleSaveBusinessObjectDefinition();
  }

  //TABLE CODES
  dataSourceBusinessOwner: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  dataSourceDtOwner: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  dataSourceSrcSystem: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  dataSourceBussnRule: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  dataSourceAltBusiness: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  dataSourceBusinessObjectDefinition: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  activeBusinessObjectDefinition: any = -1;
  activeBusinessOwner: any = -1;
  activeRowDtOwner: any = -1;
  activeRowSrcSystem: any = -1;
  activeRowBussnRule: any = -1;
  activeRowAltBusiness: any = -1;

  highlightRowDataBusinessOwner: any;
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

  isActiveBusinessOwner = (index: number) => { return this.activeRowSrcSystem === index };
  isActive = (tableIndex: number, index: number) => { return (tableIndex == 1 ? this.activeRowDtOwner : this.activeRowSrcSystem) === index };
  isActiveTerm = (tableIndex: number, index: number) => { return (tableIndex == 1 ? this.activeRowBussnRule : this.activeRowAltBusiness) === index };

  UpdateDataBusinessObjectDefinition: any;
  UpdateDataBusinessOwner: any;
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

    else if (tableIndex == 2) {
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

    else if (tableIndex == 3) {
      if (!this.isActiveBusinessOwner(index)) {
        row != this.highlightRowDataBusinessOwner ? this.highlightRowDataBusinessOwner = row : this.highlightRowDataBusinessOwner = '';
        this.activeBusinessOwner = index;
        this.UpdateDataBusinessOwner = row;
        this.generateForm();
      }
      else {
        this.activeBusinessOwner = -1;
        this.UpdateDataBusinessOwner = '';
        this.generateForm();
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
        this.getTableBusinessRule();
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

  displayedColumnBusinessOwner: any = {
    columns: [
      'business_unit_owner',
      'business_function',
      'role',
      '#',
    ],
    columnsTranslates: ['Business Unit Owner', 'Business Function', 'Role', '#']
  };

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
    columns: ['rule_id', 'rule', '#'],
    columnsTranslates: ['Rule Id', 'Rule', '#']
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
    console.log(this.DataOwnerFormGroup.value)
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

      // this.highlightRowDataDtOwner ? (
      //   this.dataSourceDtOwner.data[this.activeRowDtOwner] = this.DataOwnerFormGroup.value,
      //   this.dataSourceDtOwner.data = this.dataSourceDtOwner.data
      // ) : (
      //   this.dataSourceDtOwner.data.push(this.DataOwnerFormGroup.value),
      //   this.dataSourceDtOwner.data = this.dataSourceDtOwner.data
      // )

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
    this.OF['business_object_id'].setValue(this.initialBOD_ID);
    this.businessService.saveBo_owner(this.DataOwnerFormGroup.value).subscribe({
      next: res => {
        swalSuccess("Saved successfully.");
        this.getTableDataOwner();
      },
      error: err => swalError(err.error.message)
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

      // this.highlightRowDataSrcSystem ? (
      //   this.dataSourceSrcSystem.data[this.activeRowSrcSystem] = this.SourceSystemFormGroup.value,
      //   this.dataSourceSrcSystem.data = this.dataSourceSrcSystem.data
      // ) : (
      //   this.dataSourceSrcSystem.data.push(this.SourceSystemFormGroup.value),
      //   this.dataSourceSrcSystem.data = this.dataSourceSrcSystem.data
      // )

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
    this.SSF['business_object_id'].setValue(this.initialBOD_ID);
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

  getTableBusinessRule() {
    this.businessService.getBusinessRule().subscribe({
      next: res => {
        this.dataSourceBussnRule = new MatTableDataSource<any>(res.data);
        this.dataSourceBussnRule.paginator = this.commonPaginatorBussnRule;

        let rule_id = String(Number(this.dataSourceBussnRule.data[this.dataSourceBussnRule.data.length - 1]?.rule_id.substring(9)) + 1);

        let last_rule_id = (rule_id.length == 1 ? this.FF['business_object_id'].value + 'BR000' : (rule_id.length == 2 ? this.FF['business_object_id'].value + 'BR00' : (rule_id.length == 3 ? this.FF['business_object_id'].value + 'BR0' : ''))) + rule_id
        let BOD_last_value = this.dataSourceBussnRule.data.length ? last_rule_id : this.FF['business_object_id'].value + 'BR' + "0001";

        this.BRF['rule_id'].setValue(BOD_last_value);

        res.data.map((dt: any) => {
          this.businessRules.push({ value: dt.rule });
        })
      },
      error: err => console.log(err)
    })
  }

  isValidBussRule = true;
  handleAddBussRule() {
    if (this.BusinessRulesFormGroup.valid) {
      this.isValidBussRule = true;
      this.highlightRowDataBussnRule ? (
        this.businessService.updateBusinessRule(this.highlightRowDataBussnRule.id, this.BusinessRulesFormGroup.value).subscribe({
          next: res => {
            swalSuccess('Saved successfully');
            this.getTableBusinessRule();
          },
          error: err => console.log(err)
        }),
        this.dataSourceBussnRule.paginator = this.commonPaginatorBussnRule
      ) : (
        this.saveBusinessRule(),
        this.dataSourceBussnRule.paginator = this.commonPaginatorBussnRule
      )

      // this.highlightRowDataBussnRule ? (
      //   this.dataSourceBussnRule.data[this.activeRowBussnRule] = this.BusinessRulesFormGroup.value,
      //   this.dataSourceBussnRule.paginator = this.commonPaginatorBussnRule
      // ) : (
      //   this.dataSourceBussnRule.data.push(this.BusinessRulesFormGroup.value),
      //   this.dataSourceBussnRule.paginator = this.commonPaginatorBussnRule
      // )

      this.UpdateDataBussnRule = '';
      this.generateBusinessRulesFormGroup();
      this.activeRowBussnRule = -1;
      this.highlightRowDataBussnRule = '';
      this.keyUpBusinessAlternateRule();
    }
    else this.isValidBussRule = false
  }

  saveBusinessRule() {
    this.BRF['business_object_id'].setValue(this.initialBOD_ID);
    this.businessService.saveBusinessRule(this.BusinessRulesFormGroup.value).subscribe({
      next: res => {
        swalSuccess('Saved successfully');
        this.getTableBusinessRule();
      }
    })
  }

  handleDeleteBussRule(id: number) {
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
        this.businessService.deleteBusinessRule(id).subscribe({
          next: res => {
            swalSuccess('Deleted successfully!');
            this.getTableBusinessRule();
            this.UpdateDataBussnRule = '';
            this.generateBusinessRulesFormGroup();
            this.activeRowBussnRule = -1;
            this.highlightRowDataBussnRule = '';
          },
          error: err => console.log(err)
        });
      }
    })
  }

  isALtTermFormValid = true;
  handleAddAltTerm() {
    if (this.BusinessTermFormGroup.valid) {
      this.isALtTermFormValid = true;
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
      // this.highlightRowDataAltBusiness ? (
      //   this.dataSourceAltBusiness.data[this.activeRowAltBusiness] = this.BusinessTermFormGroup.value,
      //   this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
      // ) : (
      //   this.dataSourceAltBusiness.data.push(this.BusinessTermFormGroup.value),
      //   this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
      // )

      this.UpdateDataAlternateTerm = '';
      this.generateBusinessTermFormGroup();
      this.activeRowAltBusiness = -1;
      this.highlightRowDataAltBusiness = '';
      this.keyUpBusinessAlternateRule();
    }
    else this.isALtTermFormValid = false;
  }

  saveAltTerm() {
    this.BTF['business_object_id'].setValue(this.initialBOD_ID);
    this.businessService.saveBusiness_term(this.BusinessTermFormGroup.value).subscribe({
      next: res => {
        swalSuccess("Saved successfully.");
        this.getTableBusinessTerm();
      },
      error: err => console.log(err)
    });
  }

  businessRules: any[] = [];
  businessTerms: any[] = [];

  getTableBusinessTerm() {
    this.businessService.getBusiness_term().subscribe({
      next: res => {
        this.dataSourceAltBusiness = new MatTableDataSource<any>(res.data);
        this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness;

        let business_id = String(Number(this.dataSourceAltBusiness.data[this.dataSourceAltBusiness.data.length - 1]?.business_term_id.substring(9)) + 1);

        let last_business_id = (business_id.length == 1 ? this.FF['business_object_id'].value + 'BR000' : (business_id.length == 2 ? this.FF['business_object_id'].value + 'BR00' : (business_id.length == 3 ? this.FF['business_object_id'].value + 'BR0' : ''))) + business_id;
        let BOD_last_value = this.dataSourceAltBusiness.data.length ? last_business_id : this.FF['business_object_id'].value + 'BR' + "0001";

        this.BTF['business_term_id'].setValue(BOD_last_value)

        res.data.map((dt: any) => {
          this.boNames.push({ value: dt.business_term });
          this.businessTerms.push({ value: dt.business_term });
        });
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

  isBusinessObjectDefinitionFormValid = true;
  handleSaveBusinessObjectDefinition() {
    if (this.definitionFormGroup.valid) {
      this.isBusinessObjectDefinitionFormValid = true;
      // this.highlightRowDataBusinessObjectDefinition ? (
      //   this.businessService.updateBusinessObjectDefinition(this.highlightRowDataBusinessObjectDefinition.id, this.definitionFormGroup.value).subscribe({
      //     next: res => {
      //       swalSuccess('Updated successfully!');
      //       this.getTableBusinessObjectDefinition(0);
      //     },
      //     error: err => console.log(err)
      //   }),
      //   this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
      // ) : (
      //   // this.dataSourceAltBusiness.data.push(this.BusinessTermFormGroup.value),

      //   this.FF['business_object_name'].value != this.FF['business_object_description'].value ?
      //     (
      //       this.saveBusinessObjectDefinition(),
      //       this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
      //     )
      //     : swalInfo("BO name and BO description can't be the same!")

      // )

      this.FF['business_object_name'].value != this.FF['business_object_description'].value ?
        (
          this.saveBusinessObjectDefinition(),
          this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
        )
        : swalInfo("BO name and BO description can't be the same!")

      this.keyUpBODefinition();
    }
    else this.isBusinessObjectDefinitionFormValid = false;
  }

  saveBusinessObjectDefinition() {
    this.businessService.saveBusinessObjectDefinition(this.definitionFormGroup.value).subscribe({
      next: res => {
        swalSuccess("Saved successfully.");
        this.getTableBusinessObjectDefinition(0);
      },
      error: err => console.log(err),
      complete: () => {
        this.initialBOD_ID = this.FF['business_object_id'].value;
        this.UpdateDataBusinessObjectDefinition = '';
        this.generateForm();
        this.activeBusinessObjectDefinition = -1;
        // this.highlightRowDataBusinessObjectDefinition = '';
      }
    });
  }

  getTableBusinessObjectDefinition(index: number) {
    this.businessObjIds = [];
    this.businessService.getBusinessObjectDefinition().subscribe({
      next: res => {
        res.data.map((dt: any) => {
          this.projectNames.push({ value: dt.project_name });
          this.scopeDataDomains.push({ value: dt.scope_of_data_domain });
        })

        if (index == 1) { // only work ngOnInit and Refresh page
          let BOD_ID = String(Number(res.data[res.data.length - 1]?.business_object_id.substring(3)) + 1);
          let BOD_last_value = res.data.length ? (BOD_ID.length == 1 ? 'BOD000' : (BOD_ID.length == 2 ? 'BOD00' : (BOD_ID.length == 3 ? 'BOD00' : 'BOD0'))) + BOD_ID : "BOD0001";
          this.FF['business_object_id'].setValue(BOD_last_value)
          this.initialBOD_ID = this.FF['business_object_id'].value;
        } else {
          this.FF['business_object_id'].setValue(this.initialBOD_ID)
        }
      },
      error: err => console.log(err)
    })
  }

  showGrid() {
    this.viewGrid_dialogRef = this.dialog.open(ViewGridComponent,
      {
        disableClose: true,
        // hasBackdrop: true,
        width: '90%',
        height: 'auto',
        autoFocus: false,
      })

    this.viewGrid_dialogRef.afterClosed().subscribe({
      next: res => {
        this.getTableBusinessObjectDefinition(1);
      }
    })
  }

}