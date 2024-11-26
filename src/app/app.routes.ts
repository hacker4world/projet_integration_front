import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeRequestsComponent } from './pages/employee-requests/employee-requests.component';
import { ManagerRequestsComponent } from './pages/manager-requests/manager-requests.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'signup',
    component: SignupComponent,
  },
  { path: 'profile/edit/:id', component: ProfileComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'new-password', component: NewPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'employee-requests',
        component: EmployeeRequestsComponent,
      },
      {
        path: 'manager-requests',
        component: ManagerRequestsComponent,
      },
    ],
  },
];
