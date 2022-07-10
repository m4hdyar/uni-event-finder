import { Component, OnInit } from '@angular/core';

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

  //username = 'Boring Geek 1337';
  email = 'postbox@example.net';
  //password = 'JgAPNXxB';
  program = 2;
  is_International = false;
  need_Job = true;

  majors: Major[] = [
    { value: 'course-0', viewValue: '[No study course selected]' },
    { value: 'course-1', viewValue: 'Economathematics' },
    { value: 'course-2', viewValue: 'Environmental Toxicology' },
    { value: 'course-3', viewValue: 'Implantology and Dental Surgery' },
    { value: 'course-4', viewValue: 'Modern East Asian Studies' },
    { value: 'course-5', viewValue: 'Periodontology' },
    { value: 'course-6', viewValue: 'Transnational ecosystem-based Water Management' }
  ];

  selectedMajor: string = this.majors[0].value;

  interests = ['Sports', 'Music', 'Education', 'Foreign languages', 'History', 'Theatre'];
  selectedInterests = [];

  constructor() { }

  ngOnInit(): void {
  }

}
