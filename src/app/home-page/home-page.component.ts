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
      "title": "First event",
      "description": "First event",
      "startDate": "2017-10-10",
      "endDate": "2017-10-12"
    },
    {
      "title": "Second",
      "description": "Second event",
      "startDate": "2017-10-10",
      "endDate": "2017-10-12"
    },
    {
      "title": "Third",
      "description": "Third event",
      "startDate": "2017-10-10",
      "endDate": "2017-10-12"
    },
    {
      "title": "Fourth",
      "description": "Fourth event",
      "startDate": "2017-10-10",
      "endDate": "2017-10-12"
    }

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
