import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;
  selectedFile: File | null = null;
  profileImage: string | null = null;
  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user-id');
    let profileImage: string = '';

    if (!token) this.router.navigate(['./login']);
    else {
      this.profileService
        .getProfileDetails(Number(userId), token)
        .subscribe((data) => {
          this.profile = data.responseData;
        });
    }
  }
}
