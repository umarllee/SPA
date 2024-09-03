import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent {
  constructor(
    private dialogRef: MatDialogRef<NewItemComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  formGroup!: FormGroup;

  generateForm() {
    this.formGroup = this.fb.group({
      name: '',
    })
  }

  ngOnInit() {
    this.generateForm();
  }


  handleSave(){
    
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
