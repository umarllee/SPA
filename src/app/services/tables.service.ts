import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  constructor(private http: HttpClient, private router: Router,) { }

  getBadgeData() {
    return this.http.get<any>(`https://umdproject-jb780fb6n-umds-projects-76f3b139.vercel.app/api/badge`);
  }
}
