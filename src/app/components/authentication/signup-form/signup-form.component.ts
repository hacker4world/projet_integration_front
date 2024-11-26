import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeSignup } from '../../../dto/authentication/EmployeeSignup';
import { ManagerSignup } from '../../../dto/authentication/ManagerSignup';

@Component({
  selector: 'signup-form',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  @Input('signupMode') public signupMode: string = '';
  @Output() signup = new EventEmitter<EmployeeSignup | ManagerSignup>();

  constructor(private readonly authenticationService: AuthenticationService) {}

  public signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(20),
      Validators.max(60),
    ]),
    rib: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    employeeRole: new FormControl('', [Validators.required]),
    managerGrade: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public passwordMode: 'password' | 'text' = 'password';

  public isFormSubmitted: boolean = false;

  public changePasswordMode(element: HTMLInputElement): void {
    this.passwordMode = element.checked ? 'text' : 'password';
  }

  public onFormSubmit(): void {
    this.isFormSubmitted = true;
    if (!this.allFieldsValid(this.signupForm)) return;

    if (
      this.signupMode == 'employee' &&
      this.signupForm.get('employeeRole')?.value != ''
    ) {
      let signupData: EmployeeSignup = {
        name: this.signupForm.get('name')?.value,
        lastName: this.signupForm.get('lastName')?.value,
        age: this.signupForm.get('age')?.value,
        RIB: this.signupForm.get('rib')?.value,
        adress: this.signupForm.get('address')?.value,
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value,
        role_employer: this.signupForm.get('employeeRole')?.value,
      };

      this.signup.emit(signupData);
    } else if (
      this.signupMode == 'manager' &&
      this.signupForm.get('managerGrade')?.value != ''
    ) {
      let signupData: ManagerSignup = {
        name: this.signupForm.get('name')?.value,
        lastName: this.signupForm.get('lastName')?.value,
        age: this.signupForm.get('age')?.value,
        RIB: this.signupForm.get('rib')?.value,
        adress: this.signupForm.get('address')?.value,
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value,
        grade: this.signupForm.get('managerGrade')?.value,
      };

      this.signup.emit(signupData);
    }
  }

  public isFieldInvalid(fieldName: string): boolean {
    if (!this.isFormSubmitted) return false;
    if (this.signupForm.get(fieldName)?.invalid) return true;
    return false;
  }

  private allFieldsValid(form: FormGroup): boolean {
    return (
      form.get('name')!.valid &&
      form.get('lastName')!.valid &&
      form.get('age')!.valid &&
      form.get('rib')!.valid &&
      form.get('address')!.valid &&
      form.get('email')!.valid &&
      form.get('password')!.valid
    );
  }
}
