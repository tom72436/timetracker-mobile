import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit{
  user!: any;
  ipAddress: string = "192.168.126.92"

  constructor(private location: Location,private http: HttpClient,private cookieService:CookieService) {}

  ngOnInit(){
    this.getDetails();
  }

  back() {
    this.location.back();
  }
  getDetails(){
    this.http.get<any[]>(`http://${this.ipAddress}:3000/api/user/details?uid=${this.cookieService.get('uid')}`).subscribe(
      (response) => {
        this.user = response;
        console.log(this.user);
      },
      (error) => {
        console.error("No users found");
      }

    );
  }

  deleteCookies() {
    this.cookieService.delete('uid');
  }
}
