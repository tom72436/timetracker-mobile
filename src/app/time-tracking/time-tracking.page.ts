import { Component, OnDestroy } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.page.html',
  styleUrls: ['./time-tracking.page.scss'],
})
export class TimeTrackingPage implements OnDestroy {
  timer: any;
  timeInSeconds: number = 0;
  todayWorked: Array<string> = [];

  timeStart: any;
  timeEnd: any;

  constructor(public photoService: PhotoService) { }

  ngOnDestroy() {
    this.stopTimer();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  // this method starts the timer and increases it every second
  startTimer() {
    this.timer = setInterval(() => {
      this.timeInSeconds++;
    }, 1000);
    this.timeStart = new Date().toLocaleTimeString();
    console.log(this.timeStart);
  }

  // stops the tiimer and resets it
  stopTimer() {
    if (this.timeInSeconds !== 0) {
      this.todayWorked.push(this.getTimeString());
      clearInterval(this.timer);
      this.resetTimer();

      this.timeEnd = new Date().toLocaleTimeString();
      console.log(this.timeEnd);
    }
  }

  resetTimer() {
    this.timeInSeconds = 0;
  }

  getTimeString() {
    // calculate hours, minutes, and seconds
    var hours = Math.floor(this.timeInSeconds / 3600);
    var minutes = Math.floor((this.timeInSeconds % 3600) / 60);
    var seconds = this.timeInSeconds % 60;

    // format and return the time string
    return `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  private formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

}
