import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

interface absencesInterface {
  dates: Array<string>;
  reason: string;
}

@Component({
  selector: 'app-absences',
  templateUrl: './absences.page.html',
  styleUrls: ['./absences.page.scss'],
})

export class AbsencesPage {
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  reason!: string;
  dates!: Array<string>;

  absences: Array<absencesInterface> = [];

  currentDate: string = new Date().toISOString();

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.reason && this.dates) {
      const data: absencesInterface = {dates: this.dates, reason: this.reason}
      this.modal.dismiss(data, 'confirm');
    }
    else {
      alert("You have to enter date and reason");
    }
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
}
