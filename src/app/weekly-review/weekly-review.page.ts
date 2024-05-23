import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weekly-review',
  templateUrl: './weekly-review.page.html',
  styleUrls: ['./weekly-review.page.scss'],
})
export class WeeklyReviewPage implements OnInit {
  uid!: string;
  user: any[] = [];
  ipAdress: string = 'localhost';
  constructionSiteMap: Map<number, string> = new Map();
  timeData: { date: string, hoursWorked: string, cid: number }[] = [];
  currentWeekDates: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.uid = this.cookieService.get('uid');
    if (this.uid) {
      this.calculateCurrentWeekDates();
      this.getDetails(this.uid);
    } else {
      console.error("User ID not found in cookies.");
    }
  }

  calculateCurrentWeekDates() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)); // Adjust for Sunday as first day
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      this.currentWeekDates.push(day.toISOString().split('T')[0]);
    }
  }

  getDetails(uid: string) {
    this.http.get<any[]>(`http://${this.ipAdress}:3000/api/user/details?uid=${uid}`).subscribe(
      (response) => {
        this.user = response;
        // Call getTime after fetching user details
        this.getTime(uid);
      },
      (error) => {
        console.error("Error fetching user details:", error);
      }
    );
  }

  getTime(uid: string) {
    const uidParam = encodeURIComponent(uid);
    // Fetch time tracking data for the current week
    this.http.get<any[]>(`http://${this.ipAdress}:3000/api/timetracking/getAll?uid=${uidParam}&startDate=${this.currentWeekDates[0]}&endDate=${this.currentWeekDates[6]}`).subscribe(
      (response) => {
        // Calculate hours worked for each entry and populate timeData
        response.forEach((entry: any) => {
          const hoursWorked = this.calculateHoursWorked(entry.tdateStart, entry.tdateEnd);
          const date = new Date(entry.tdateStart).toISOString().split('T')[0];
          this.timeData.push({ date: date, hoursWorked: hoursWorked, cid: entry.cid });
        });

        // Extract unique cids
        const cids = [...new Set(response.map((item: any) => item.cid))];

        // Fetch construction sites for each cid
        cids.forEach((cid: number) => {
          this.getConstructionSite(cid).subscribe(constructionSites => {
            constructionSites.forEach((constructionSite: any) => {
              this.constructionSiteMap.set(constructionSite.cid, constructionSite.cname);
            });
          });
        });
      },
      (error) => {
        console.error("Error fetching time tracking data:", error);
      }
    );
  }


  calculateHoursWorked(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const millisecondsDiff = Math.abs(end.getTime() - start.getTime());
    const hours = Math.floor(millisecondsDiff / (1000 * 60 * 60));
    const minutes = Math.floor((millisecondsDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} h ${minutes} min`;
  }

  getConstructionSite(cid: number): Observable<any[]> {
    const cidParam = encodeURIComponent(cid.toString());
    return this.http.get<any[]>(`http://${this.ipAdress}:3000/api/construction-sites/details?cid=${cidParam}`);
  }

  getDayOfWeek(dateString: string): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
  }
  getTimeDataForDate(date: string): any[] {
    const filteredData: any[] = [];
    this.timeData.forEach(entry => {
      if (entry.date == date) {
        filteredData.push(entry);
      }
    });

    return filteredData;
  }



}
