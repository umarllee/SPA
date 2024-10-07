import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComboboxService {
  constructor(private http: HttpClient, private router: Router,) { }
  api = "https://umdproject-2wpwcyy2y-umds-projects-76f3b139.vercel.app/api"
  saveBo_owner(data: any) {
    return this.http.post<any>(this.api + `/asset_type`, data);
  }
  getBo_owner() {
    return this.http.get<any>(this.api + `/asset_type`);
  }
}
