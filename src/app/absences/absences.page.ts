import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

export class AbsencesPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('modal2') modal2!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  reason!: string;
  dates!: Array<string>;
  absencesdb: any[] = [];
  absences: Array<absencesInterface> = [];
  isToastOpen = false;
  datevon!: Date;
  datebis!: Date;
  response: any = [];
  ipAddress: string = "localhost"


  currentDate: string = new Date().toISOString();

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }


  ngOnInit() {
    this.getAbsences();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  close() {
    this.modal2.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.reason && this.datevon && this.datebis) {
      const encodedReason = encodeURIComponent(this.reason);
      console.log(this.datevon)

      this.http.get(`http://${this.ipAddress}:3000/api/absences/add?datevon=${this.datevon}&datebis=${this.datebis}&reason=${encodedReason}&uid=${this.cookieService.get('uid')}`).subscribe(

        (response) => {
          // Assuming the server sends an array in response
          this.response = response;
          if (this.response && this.response.message === 'Absence added successfully') {
            this.modal.dismiss('confirm');
            window.location.reload();
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

      this.absences.push({ dates: this.dates, reason: this.reason });
      console.log(this.absences.length);

    }
  }

  getAbsences() {

    this.http.get<any[]>(`http://${this.ipAddress}:3000/api/user/absences?uid=${this.cookieService.get('uid')}`).subscribe(

      (response) => {
        this.absencesdb = response;
        console.log(this.absencesdb);
      },
      (error) => {
        console.error("No absences found");
      }

    );
  }


  delete(aid: number) {
    const aidParam = encodeURIComponent(aid.toString());

    if (confirm("Do you want to delete this absence?")) {
      this.http.get(`http://${this.ipAddress}:3000/api/absences/delete?aid=${aidParam}`).subscribe(
        (response: any) => {
          console.log('Absence deleted successfully');
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting absence:', error);
        }
      );
    }

  }
  // TODO: implement remove function
  removeAbsence(id: number, dateString: string) {
    const date = new Date(dateString)

    const currentDate = new Date();

    date.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (date >= currentDate) {
      this.delete(id);
    } else {
      console.log(dateString);
    }
  }
}
