import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/authentication/header/header.component';
import { SignupFormComponent } from '../../components/authentication/signup-form/signup-form.component';
import { SignupSwitchComponent } from '../../components/authentication/signup-switch/signup-switch.component';
import { AuthenticationService } from '../../services/authentication.service';
import { EmployeeSignup } from '../../dto/authentication/EmployeeSignup';
import { ManagerSignup } from '../../dto/authentication/ManagerSignup';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    HeaderComponent,
    SignupFormComponent,
    SignupSwitchComponent,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  public signupMode: string = 'employee';

  public showSignupError: boolean = false;
  public signupError: string = '';

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  public handleModeChange(newMode: string): void {
    this.signupMode = newMode;
  }

  public handleSignup(signupData: EmployeeSignup | ManagerSignup) {
    this.showSignupError = false;
    if (this.signupMode == 'employee') {
      this.authenticationService.employeeSignup(signupData).subscribe(
        (data) => {
          localStorage.setItem('email-to-verify', signupData.email);
          this.router.navigate(['./verify-email']);
        },
        (error) => {
          this.showSignupError = true;
          this.signupError = error.error.responseData;
        }
      );
    } else {
      this.authenticationService.managerSignup(signupData).subscribe(
        (data) => {
          localStorage.setItem('email-to-verify', signupData.email);
          this.router.navigate(['./verify-email']);
        },
        (error) => {
          this.showSignupError = true;
          this.signupError = error.error.responseData;
        }
      );
    }
  }
}
