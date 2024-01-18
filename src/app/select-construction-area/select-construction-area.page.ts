import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-construction-area',
  templateUrl: './select-construction-area.page.html',
  styleUrls: ['./select-construction-area.page.scss'],
})
export class SelectConstructionAreaPage implements OnInit {

  sites: any[] =[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.http.get<any[]>('http://192.168.244.92:3000/api/construction-sites').subscribe(
      (response) => {
        this.sites = response;
      },
      (error) => {
        console.error("No constructionSite found");
      }

    );
  }
}
