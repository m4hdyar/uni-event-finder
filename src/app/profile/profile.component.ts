import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../models/profile.model';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

export interface Major {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;

  email = '';

  profile: Profile | null = null;

  majors: Major[] = [
    { value: 'no-course', viewValue: '[No study course selected]' },
    { value: 'eco', viewValue: 'Economathematics' },
    { value: 'env', viewValue: 'Environmental Toxicology' },
    { value: 'imp', viewValue: 'Implantology and Dental Surgery' },
    { value: 'mod', viewValue: 'Modern East Asian Studies' },
    { value: 'peri', viewValue: 'Periodontology' },
    { value: 'tran', viewValue: 'Transnational ecosystem-based Water Management' }
  ];


  interests = ['Sport', 'Music', 'Education', 'Foreign languages','Party', 'History', 'Theatre', 'Job', 'Other'];

  userProfile: Profile | null = null;
  constructor(private formBilder: FormBuilder, private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.profileForm = this.formBilder.group({
      program: ['', Validators.required],
      major: ['', Validators.required],
      interest_List: ['', Validators.required],
      need_Job: [false],
      is_International: [false]
    });
    let emailFromLocal=this.authService.getEmailID();
    if (emailFromLocal) {
      this.email = emailFromLocal;
    }

    let userID: string | null = this.authService.getUserID();

    if (userID) {
      this.apiService.getUserProfile(userID).subscribe({
        next: (res) => {

          this.profileForm.get('program')?.setValue(res.profile.program);
          this.profileForm.get('is_International')?.setValue(res.profile.is_International);
          this.profileForm.get('need_Job')?.setValue(res.profile.need_Job);
          this.profileForm.get('major')?.setValue(res.profile.major);
          this.profileForm.get('interest_List')?.setValue(res.profile.interest_List);
          this.profile = res.profile;



        },
        error: (err) => {
          console.log(err);
        }

      });
    } else return;
  }

  updateProfile() {
    if (this.profileForm.valid) {
      let programValue: string = this.profileForm.get('program')?.value;
      let is_InternationalValue: boolean = this.profileForm.get('is_International')?.value;
      let need_JobValue: boolean = this.profileForm.get('need_Job')?.value;
      let majorValue: string = this.profileForm.get('major')?.value;
      let interest_ListValue: string[] = this.profileForm.get('interest_List')?.value;


      let profile: Profile = {
        _id: this.profile?._id,
        user: this.profile?.user,
        username: '',
        program: programValue,
        is_International: is_InternationalValue,
        need_Job: need_JobValue,
        major: majorValue,
        interest_List: interest_ListValue
      }
      this.apiService.postProfile(profile).subscribe({
        next: (res) => {
          alert("Profile updated!");
        },
        error: (err) => {
          alert("Error saving data!");
        }
      });

    }
  }

}
