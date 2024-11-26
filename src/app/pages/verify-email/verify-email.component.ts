import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/authentication/header/header.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [HeaderComponent, FormsModule, RouterModule, CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
})
export class VerifyEmailComponent implements OnInit {
  public verificationCode: string = '';
  public emailToVerify: string = '';

  public showVerificationError: boolean = false;
  public verificationError: string = '';

  constructor(
    private readonly router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    let email = localStorage.getItem('email-to-verify');
    if (!email) this.router.navigate(['./signup']);
    else this.emailToVerify = email;
  }

  public handleVerification() {
    this.showVerificationError = false;
    this.authenticationService
      .verifyEmail(this.emailToVerify, this.verificationCode)
      .subscribe(
        (data) => {
          this.router.navigate(['./login']);
        },
        (error) => {
          this.showVerificationError = true;
          this.verificationError = error.error.responseData;
        }
      );
  }
}
