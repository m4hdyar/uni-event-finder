import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UniEvent } from '../models/uni-event.model';
import { ApiService } from '../services/api.service';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  columnsToDisplay: string[] = ['title','category','description', 'start_date', 'end_date','cost'];
  

  events!: MatTableDataSource<UniEvent>;

  suggestedEvents!: MatTableDataSource<UniEvent>;
  //events:UniEvent[] = [];


  constructor(private dialog: MatDialog, private api: ApiService, private authService:AuthService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginatorSuggestedEvents!: MatPaginator;
  @ViewChild(MatSort) sortSuggestedEvents!: MatSort;

  ngOnInit(): void {
    this.getAllEvents();
    this.getSuggestedEvents();
  }

  getSuggestedEvents(){
    let userID:string | null =this.authService.getUserID();
    if(userID){
      this.api.getSuggestedEvents(userID).subscribe({
        next: (res) => {
          this.suggestedEvents = new MatTableDataSource(res.events);
          this.suggestedEvents.paginator = this.paginatorSuggestedEvents;
          this.suggestedEvents.sort = this.sortSuggestedEvents;
        },
        error: () => {
          this.suggestedEvents = new MatTableDataSource();
          this.suggestedEvents.paginator = this.paginatorSuggestedEvents;
          this.suggestedEvents.sort = this.sortSuggestedEvents;
        }

      });
    }else return;
  }
  getAllEvents() {
    this.api.getEvent()
      .subscribe({
        next: (res) => {
          this.events = new MatTableDataSource(res.events);
          this.events.paginator = this.paginator;
          this.events.sort = this.sort;
        },
        error: () => {
          alert("Error while fetching the Data")
        }

      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.events.filter = filterValue.trim().toLowerCase();

    if (this.events.paginator) {
      this.events.paginator.firstPage();
    }
  }

}
