import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { Profile } from '../models/profile.model';
import { UniEvent } from '../models/uni-event.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  eventReq: { event: UniEvent | null } = {
    event: null
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  postEvent(data: UniEvent) {
    this.eventReq.event = data;
    return this.http.post<any>("http://localhost:3600/api/event/", this.eventReq);
  }
  getEvent() {
    return this.http.get<{ events: UniEvent[] }>("http://localhost:3600/api/event/");
  }

  putEvent(data: UniEvent, id: string) {
    this.eventReq.event = data;
    return this.http.put("http://localhost:3600/api/event/" + id, this.eventReq);
  }
  deleteEvent(id: string) {
    return this.http.delete<any>("http://localhost:3600/api/event/" + id);
  }

  getSuggestedEvents(lokuserID: string): Observable<{ events: UniEvent[] }> {
    return this.getUserProfile(lokuserID).pipe(
      mergeMap((res) => {
        let eventReqParams = new HttpParams();
        let userInterests = res.profile.interest_List.join(",");
        console.log(userInterests);
        
        eventReqParams = eventReqParams.append("category", userInterests);
        console.log(eventReqParams);
        return this.http.get<{ events: UniEvent[] }>("http://localhost:3600/api/event/", { params: eventReqParams });
      }));

  }
  getUserProfile(userID: string): Observable<{ profile: Profile }> {
    return this.http.get<{ profile: Profile }>("http://localhost:3600/api/profile/" + userID);
  }
}
