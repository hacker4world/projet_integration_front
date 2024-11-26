import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/authentication/header/header.component';
import { LoginFormComponent } from '../../components/authentication/login-form/login-form.component';
import { Login } from '../../dto/authentication/Login';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, LoginFormComponent, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginError: boolean = false;
  public errorMessage: string = '';

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  public handleLogin(loginData: Login) {
    this.loginError = false;

    this.authenticationService.login(loginData).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);

        localStorage.setItem('user-role', data.role);

        localStorage.setItem('user-id', data.accountId);

        this.router.navigate(['./dashboard']);
      },
      (error) => {
        console.log(error.error.responseData);
        this.loginError = true;
        this.errorMessage = error.error.responseData;
      }
    );
  }
}
