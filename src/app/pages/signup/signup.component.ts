import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/authentication/header/header.component';
import { SignupFormComponent } from '../../components/authentication/signup-form/signup-form.component';
import { SignupSwitchComponent } from '../../components/authentication/signup-switch/signup-switch.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, SignupFormComponent, SignupSwitchComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  public signupMode: string = 'employee';

  public handleModeChange(newMode: string): void {
    this.signupMode = newMode;
  }
}
