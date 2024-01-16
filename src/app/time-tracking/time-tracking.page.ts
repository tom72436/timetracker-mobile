import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.page.html',
  styleUrls: ['./time-tracking.page.scss'],
})
export class TimeTrackingPage {

  constructor(public photoService: PhotoService) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
