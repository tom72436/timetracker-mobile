import { CookieService } from 'ngx-cookie-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.page.html',
  styleUrls: ['./time-tracking.page.scss'],
})
export class TimeTrackingPage implements OnInit {
  cid!: string;

  timer: any;
  timeInSeconds: number = 0;
  todayWorked: Array<string> = [];

  //array whit the data from the DB
  time!: any[];
  //converted time to display
  convertedTimeStart: any;
  convertedTimeEnd: any;

  isToastOpen = false;
  params!: any[];
  constructionArea!: string;

  ipAddress: string = "localhost";

  constructor(public photoService: PhotoService, private http: HttpClient, private cookieService: CookieService,  private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    this.cid = this.cookieService.get('cid');
    this.getTime();
    this.getConstuctionArea();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.cid = this.cookieService.get('cid');
        this.getTime();
        this.getConstuctionArea();
      }
    });
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.getTime();
      event.target.complete();
    }, 2000);
  }
  // ngOnDestroy() {
  //   this.stopTimer();
  // }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  // this method starts the timer and increases it every second
  // startTimer() {
  //   this.timer = setInterval(() => {
  //     this.timeInSeconds++;
  //   }, 1000);
  //   this.timeStart = new Date().toISOString();

  //   console.log(this.timeStartdb);
  // }

  // // stops the tiimer and resets it
  // stopTimer() {
  //   if (this.timeInSeconds !== 0) {
  //     this.todayWorked.push(this.getTimeString());
  //     clearInterval(this.timer);
  //     this.resetTimer();

  //     this.timeEnd = new Date().toLocaleTimeString();
  //     this.timeEnddb = new Date().toLocaleString();
  //     console.log(this.timeEnd);
  //     console.log(this.timeEnddb);
  //   }
  // }

  // resetTimer() {
  //   this.timeInSeconds = 0;
  // }

  // getTimeString() {
  //   // calculate hours, minutes, and seconds
  //   var hours = Math.floor(this.timeInSeconds / 3600);
  //   var minutes = Math.floor((this.timeInSeconds % 3600) / 60);
  //   var seconds = this.timeInSeconds % 60;

  //   // format and return the time string
  //   return `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  // }

  // private formatTime(time: number): string {
  //   return time < 10 ? `0${time}` : `${time}`;
  // }


  convertTime() {
    if (Array.isArray(this.time)) {
      this.time.forEach(entry => {
        const timeStartdb = new Date(entry?.tdateStart);
        const timeEnddb = entry?.tdateEnd ? new Date(entry.tdateEnd) : null;

        if (timeStartdb instanceof Date) {
          entry.convertedTimeStart = timeStartdb.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
          console.error('Invalid start date object:', timeStartdb);
        }

        if (timeEnddb instanceof Date) {
          entry.convertedTimeEnd = timeEnddb.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          entry.displayString = `From ${entry.convertedTimeStart} to ${entry.convertedTimeEnd}`;
        } else {
          console.error('Invalid end date object:', timeEnddb);
          entry.displayString = `From ${entry.convertedTimeStart}`;
        }
      });
    } else {
      console.error('Invalid time array:', this.time);
    }
  }




  setTime() {
    // Check if there are entries with no endDate
    const entriesWithNoEndDate = this.time.filter(entry => entry?.tdateEnd === null);

    if (entriesWithNoEndDate.length > 0) {
      console.log('Cannot set time. There are entries with no endDate.');
      this.setOpen(true);

      return;
    }

    this.http.get(`http://${this.ipAddress}:3000/api/timetracking/save?cid=${this.cid}&uid=${this.cookieService.get('uid')}`).subscribe(
      (response: any) => {
        console.log('Time saved successfully');
        this.getTime();
      },
      (error) => {
        console.error('Error saving time:', error);
        // Handle errors or show appropriate messages to the user
      }
    );
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  getTime() {
    this.time =[];
    this.http.get(`http://${this.ipAddress}:3000/api/timetracking/get?cid=${this.cid}&uid=${this.cookieService.get('uid')}`).subscribe(
      (response: any) => {
        this.time = response;
        console.log(this.time);
        this.convertTime();
      },
      (error) => {
        console.error('Error deleting user:', error);
        // Handle errors or show appropriate messages to the user
      }
    );
  }

  updateTime() {
    let tidToUpdate = null;

    for (let i = 0; i < this.time.length; i++) {
      if (this.time[i]?.tdateEnd == null) {
        tidToUpdate = this.time[i].tid;
        break;
      }
    }

    if (tidToUpdate !== null) {
      // Perform the HTTP request with the found tid
      this.http.get(`http://${this.ipAddress}:3000/api/timetracking/update?cid=${this.cid}&uid=${this.cookieService.get('uid')}&tid=${tidToUpdate}`).subscribe(
        (response: any) => {
          console.log(response);
          window.location.reload();
        },
        (error) => {
          console.error('Error updating time:', error);
          // Handle errors or show appropriate messages to the user
        }
      );
    } else {
      console.log('No non-null tdateEnd found, no update needed');
    }
  }


  saveImage(image: string) {
    this.http.get(`http://${this.ipAddress}:3000/api/images/save?cid=${this.cid}&uid=${this.cookieService.get('uid')}&image=${image}`).subscribe(
      (response: any) => {
        console.log('Image saved successfully:', response);

      },
      (error) => {
        console.error('Error saving image:', error);

      }
    );
  }

  saveImage2(image: any[]) {
    console.log(image);
  }

  getConstuctionArea(){
    const cid = parseInt(this.cookieService.get('cid'));
    this.http.get<any[]>(`http://${this.ipAddress}:3000/api/construction-sites/details?cid=${cid}`).subscribe(
      (response) => {
        console.log('Constuction area saved successfully:', response[0].cname);
        this.constructionArea = response[0].cname;
      },
      (error) => {
        console.error("No construction area found");
      }

    );
  }

}


