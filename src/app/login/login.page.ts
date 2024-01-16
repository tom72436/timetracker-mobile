import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username!: string;
  password!: string;

  constructor(private router: Router) { }

  login() {
    if(this.username && this.password) {
      console.log(this.username);
      this.router.navigate(['/select-construction-area']);
    }
    else {
      alert("Please enter a username and password");
    }
  }
}
