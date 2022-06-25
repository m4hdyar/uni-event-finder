import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  columnsToDisplay = ['title','category','description', 'start_date', 'end_date'];

  events = [
    {
      "title": "First event",
      "category" : "education",
      "description": "First event",
      "startDate": "2017-10-10",
      "endDate": "2017-10-12"
    },
    {
      "title": "Second",
      "category" : "education",
      "description": "Second event",
      "startDate": "2017-10-10",
      "endDate": "2017-10-12"
    },
    {
      "title": "Third",
      "category" : "Party",
      "description": "Third event",
      "startDate": "2017-10-10",
      "endDate": "2017-10-12"
    },
    {
      "title": "Fourth",
      "category" : "Sport",
      "description": "Fourth event",
      "startDate": "2017-10-10",
      "endDate": "2017-10-12"
    }

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
