import { Component, OnInit } from '@angular/core';
import { EmployeeRequestsService } from './employee-requests.service';
import { EmployeeRequest } from './employeeRequest.interface';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-requests',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './employee-requests.component.html',
  styleUrl: './employee-requests.component.css',
})
export class EmployeeRequestsComponent implements OnInit {
  public pendingEmployees: EmployeeRequest[] = [];
  public selectedEmployee: EmployeeRequest | null = null;

  constructor(
    private readonly employeeRequestsService: EmployeeRequestsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('user-role');

    if (!token || role != 'ROLE_MANAGER') this.router.navigate(['./login']);

    this.employeeRequestsService
      .fetchPendingEmployees(token!)
      .subscribe((data: any) => {
        this.pendingEmployees = data;
      });
  }

  public showEmployeeDetails(email: string) {
    let employee = this.pendingEmployees.find((e) => e.email == email)!;
    this.selectedEmployee = employee;
  }

  public handleEmployeeRequest(isAccepted: boolean) {
    let token = localStorage.getItem('token')!;
    this.employeeRequestsService
      .handleEmployeeRequest(token, isAccepted, this.selectedEmployee!.id)
      .subscribe(
        (data) => {
          console.log(data);
          this.pendingEmployees = this.pendingEmployees.filter(
            (e) => e.id != this.selectedEmployee!.id
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
