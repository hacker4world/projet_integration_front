import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/authentication/header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  public email: string = '';
  public showResetError: boolean = false;
  public resetError: string = '';

  constructor(
    private readonly authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public onPasswordReset() {
    this.showResetError = false;
    this.authenticationService.sendResetEmail(this.email).subscribe(
      (data) => {
        localStorage.setItem('reset-password', this.email);
        this.router.navigate(['./new-password']);
      },
      (error) => {
        this.showResetError = true;
        this.resetError = error.error.responseData;
      }
    );
  }
}
