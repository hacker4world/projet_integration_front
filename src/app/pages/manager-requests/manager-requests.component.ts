import { Component } from '@angular/core';
import { EmployeeRequest } from '../employee-requests/employeeRequest.interface';
import { EmployeeRequestsService } from '../employee-requests/employee-requests.service';
import { Router, RouterModule } from '@angular/router';
import { ManagerRequest } from './manager.request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-requests',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './manager-requests.component.html',
  styleUrl: './manager-requests.component.css',
})
export class ManagerRequestsComponent {
  public pendingManagers: ManagerRequest[] = [];
  public selectedManager: ManagerRequest | null = null;

  constructor(
    private readonly employeeRequestsService: EmployeeRequestsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('user-role');

    if (!token || role != 'ROLE_ADMIN') this.router.navigate(['./login']);

    this.employeeRequestsService
      .fetchPendingManagers(token!)
      .subscribe((data: any) => {
        this.pendingManagers = data;
      });
  }

  public showManagerDetails(email: string) {
    let employee = this.pendingManagers.find((e) => e.email == email)!;
    console.log(employee);

    this.selectedManager = employee;
  }

  public handleManagerRequest(isAccepted: boolean) {
    let token = localStorage.getItem('token')!;
    this.employeeRequestsService
      .handleManagerRequest(token, isAccepted, this.selectedManager!.id)
      .subscribe(
        (data) => {
          console.log(data);
          this.pendingManagers = this.pendingManagers.filter(
            (e) => e.id != this.selectedManager!.id
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
