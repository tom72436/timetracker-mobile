import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { CookieService } from 'ngx-cookie-service';

interface absencesInterface {
  dates: Array<string>;
  reason: string;
}

@Component({
  selector: 'app-absences',
  templateUrl: './absences.page.html',
  styleUrls: ['./absences.page.scss'],
})

export class AbsencesPage implements OnInit{
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  reason!: string;
  dates!: Array<string>;
  absencesdb: any[] = [];
  absences: Array<absencesInterface> = [];
  isToastOpen = false;
  datevon!: Date;
  datebis!: Date;
  response: any = [];



  currentDate: string = new Date().toISOString();

  constructor(private http: HttpClient,private cookieService:CookieService){}


  ngOnInit(){
    this.getAbsences();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.reason && this.datevon && this.datebis) {
      const encodedReason = encodeURIComponent(this.reason);
      this.http.get('http://192.168.153.92:3000/api/absences/add?datevon=' + this.datevon + '&datebis=' + this.datebis + '&reason=' + encodedReason +'&uid=' +this.cookieService.get('uid')).subscribe(
        (response) => {
          // Assuming the server sends an array in response
          this.response = response;
          if (this.response && this.response.message === 'Absence added successfully') {
            this.modal.dismiss('confirm');
          } else {
            console.log('Error adding Absence');
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );

    }
    else {
      this.setOpen(true);
    }
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // TODO: update absence tab

      // const { dates, reason } = ev.detail.data;
      // this.message = `Hello, ${dates}! Other value: ${reason}`;

      this.message = `Reason: ${this.reason} Date: ${this.dates.toLocaleString()}`;

      this.absences.push({dates: this.dates, reason: this.reason});
      console.log(this.absences.length);
      // this.message = `Hello, ${ev.detail.data}!`;
      // console.log(this.message);
      // this.message = `Hello, ${this.reason}!`;
      // console.log(this.message);
      // console.log(this.reason);
      // console.log(this.dates);
      // console.log(this.dates.length);
      // this.dates=[];

    }
  }

  getAbsences() {
    this.http.get<any[]>('http://192.168.153.92:3000/api/user/absences?uid= '+   this.cookieService.get('uid')).subscribe(
      (response) => {
        this.absencesdb = response;
        console.log(this.absencesdb);
      },
      (error) => {
        console.error("No absences found");
      }

    );
  }
}
