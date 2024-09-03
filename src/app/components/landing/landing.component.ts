import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClickMode, HoverMode, MoveDirection, OutMode, Container, Engine } from 'tsparticles-engine';
import { ParticlesConfig } from './particles-config';

declare var particlesJS: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  opts = {
    particles: {
      color: {
        value: ['#ff0000', '#0000ff']
      },
      lineLinked: {
        enable: true,
        color: 'random'
      },
      move: {
        enable: true,
        speed: 5
      }
    }
  };

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
    particlesJS('particles-js', ParticlesConfig, function() {});
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }



}
