import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile={
    userId:0,
    firstName:'',
    lastName:'',
    email: '',
    age:0,
    address:''
  };
  selectedFile: File | null = null;
  profileImage: string | null = null;
  constructor(private profileService: ProfileService,private route: ActivatedRoute,private router: Router)
  {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.profile.userId = userId;

  //njib les informations eli fel profil
    this.profileService.getProfileDetails(userId).subscribe(
      (response: any) => {
        if (response && response.data) {this.profile = {
          ...this.profile,
            ...response.data,
          };
        }
      },
      (error) => {
        console.error('Error', error);
      }
    );
    //njib el image du profil
    this.profileService.getImage(userId).subscribe(
      (imageBlob: Blob) => {
        this.convertBlobToImage(imageBlob);
      },
      (error) => {
        console.error('Error image', error);
      }
    );
  }
  loadUserProfile(): void {
    this.profileService.getProfileDetails(this.profile.userId).subscribe(
      (response) => {
        // njib les données mtaa user
        this.profile.firstName = response.data.firstName || '';
        this.profile.lastName = response.data.lastName || '';
        this.profile.age = response.data.age || null;
        this.profile.address = response.data.adress || '';
        if (response.data.image) {
          this.profileImage = `data:image/png;base64,${response.data.image}`;
        }
      }
    );
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result as string;
    }

    reader.readAsDataURL(this.selectedFile as Blob);
  }
  private convertBlobToImage(imageBlob: Blob) {
    const reader = new FileReader();
    reader.onload = () =>{
      this.profileImage = reader.result as string;
    }
    reader.readAsDataURL(imageBlob);

  }

  onSubmit(): void {


    if(this.selectedFile){
      this.profileService.uploadImage(this.selectedFile, this.profile.userId).subscribe(() => {
        alert("downloaded imagee")
      })
    }
    this.profileService.updateProfile(this.profile).subscribe(() => {
      alert("profile updated")
      this.router.navigate(['/']);
    },
      (error) => {
      alert("profile updated failed");
      }
    )
    if (this.isFormValid()) {
      alert('Profil updated');
    } else {
      alert('Please complete all the fields');
    }
  }
  isFormValid(): boolean {
    return (
      this.profile.firstName.trim() !== '' &&
      this.profile.lastName.trim() !== '' &&
      this.profile.age !== null &&
      this.profile.address.trim() !== ''
    );
  }



}
