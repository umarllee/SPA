import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  constructor(
    private fb: FormBuilder,
  ) {
  }

  formGroup!: FormGroup;

  generateForm() {
    this.formGroup = this.fb.group({
      id: 0,
      name: '',
      surname: '',
      email: '',
      description: '',

    })
  }

  UpdateData: any;

  get FF(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  isFormValid = true;

  ngOnInit() {
    this.generateForm();
  }
}
