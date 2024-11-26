import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login } from '../../../dto/authentication/Login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<Login>();

  public email: string = '';
  public password: string = '';

  public handleLoginSubmit() {
    this.login.emit({
      email: this.email,
      password: this.password,
    });
  }
}
