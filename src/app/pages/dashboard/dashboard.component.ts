import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { employeeLinks } from './links/employee.links';
import { Link } from './links/link.interface';
import { managerLinks } from './links/manager.links';
import { Router, RouterModule } from '@angular/router';
import { adminLinks } from './links/admin.links';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidenavComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public sidenavLinks: Link[] = [];

  public sidenavTitle: string = '';

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    let role = localStorage.getItem('user-role');
    if (!role) this.router.navigate(['./login']);
    else if (role == 'ROLE_MANAGER') {
      this.sidenavLinks = managerLinks;
      this.sidenavTitle = 'Manager dashboard';
    } else if (role == 'ROLE_EMPLOYEE') {
      this.sidenavLinks = employeeLinks;
      this.sidenavTitle = 'Employee dashboard';
    } else {
      this.sidenavLinks = adminLinks;
      this.sidenavTitle = 'Admin dashboard';
    }
  }
}
