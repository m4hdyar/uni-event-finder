import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  columnsToDisplay = ['title', 'description', 'start_date', 'end_date'];
  events = [
    {
      "title": "hi",
      "description": "My desc is ",
      "startDate": "2017-10-10",
      "endDate": "2018-20-1"
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
