import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/authentication/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent implements OnInit {
  public email: string = '';
  public code: string = '';
  public newPassword: string = '';

  public showResetError: boolean = false;
  public resetError: string = '';

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    let email = localStorage.getItem('reset-password');
    if (!email) this.router.navigate(['./login']);
    else this.email = email;
  }

  public handlePasswordChange() {
    this.showResetError = false;
    if (this.newPassword.length < 8) {
      this.showResetError = true;
      this.resetError = 'Password must have atleast 8 characters';
    } else
      this.authenticationService
        .resetPassword(this.code, this.email, this.newPassword)
        .subscribe(
          (data) => {
            this.router.navigate(['./login']);
          },
          (error) => {
            this.showResetError = true;
            this.resetError = error.error.responseData;
          }
        );
  }
}
