import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  username!: string;
  password!: string;
  response: any = [];
  isToastOpen = false;
  ipAddress: string = "localhost";

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}



  login() {
    if (this.username && this.password) {
      this.getLogin();
    } else {
      alert('Please enter a username and password');
    }
  }
  getLogin() {
    if (this.username || this.password) {
    const encodedUsername = encodeURIComponent(this.username);
    const encodedPassword = encodeURIComponent(this.password);

    this.http.get(`http://${this.ipAddress}:3000/api/user/login?uname=${encodedUsername}&upassword=${encodedPassword}`).subscribe(

      (response) => {
        // Assuming the server sends an array in response
        this.response = response;
        if (this.response && this.response.message === 'Login successful') {
          this.cookieService.set('uid', this.response.user.uid);
          this.router.navigate(['/select-construction-area']);
        } else {
          this.setOpen(true);
          console.log('Invalid username or password');
        }
      },
      (error) => {
        this.setOpen(true);
        console.error('Error fetching data:', error);
      }
    );
    }
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
