import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-construction-area',
  templateUrl: './select-construction-area.page.html',
  styleUrls: ['./select-construction-area.page.scss'],
})
export class SelectConstructionAreaPage implements OnInit {

  sites: any[] =[];

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.http.get<any[]>('http://192.168.67.92:3000/api/construction-sites').subscribe(
      (response) => {
        this.sites = response;
      },
      (error) => {
        console.error("No constructionSite found");
      }

    );
  }
  setCookie(cid: string) {
    if (this.cookieService.get('cid') != null) {
      this.cookieService.delete('cid');
      this.cookieService.set("cid", cid);
      this.router.navigate(['/time-tracking']);
    } else {
      this.cookieService.set("cid", cid);
      this.router.navigate(['/time-tracking']);
    }

  }

}
