import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  constructor(private http: HttpClient, private router: Router,) { }

  saveBo_owner(data: any) {
    return this.http.post<any>(`https://umdproject-nvv9jxc7a-umds-projects-76f3b139.vercel.app/api/bo_owner`, data);
  }

  getBo_owner() {
    return this.http.get<any>(`https://umdproject-nvv9jxc7a-umds-projects-76f3b139.vercel.app/api/bo_owner`);
  }

  saveImpDetails(data: any) {
    return this.http.post<any>(`https://umdproject-nvv9jxc7a-umds-projects-76f3b139.vercel.app/api/bo_implementation`, data);
  }

  getImpDetails() {
    return this.http.get<any>(`https://umdproject-nvv9jxc7a-umds-projects-76f3b139.vercel.app/api/bo_implementation`);
  }
}
