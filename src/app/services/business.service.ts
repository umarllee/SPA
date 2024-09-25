import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  constructor(private http: HttpClient, private router: Router,) { }

  saveBo_owner(data: any) {
    return this.http.post<any>(`https://umdproject-73xbvwzbb-umds-projects-76f3b139.vercel.app/api/bo_owner`, data);
  }

  deleteBo_owner(id: number) {
    return this.http.delete<any>(`https://umdproject-73xbvwzbb-umds-projects-76f3b139.vercel.app/api/bo_owner/` + id);
  }

  updateBo_owner(id: number, data: any) {
    return this.http.put<any>(`https://umdproject-73xbvwzbb-umds-projects-76f3b139.vercel.app/api/bo_owner/` + id, data);
  }

  getBo_owner() {
    return this.http.get<any>(`https://umdproject-h1bxfubi2-umds-projects-76f3b139.vercel.app/api/bo_owner`);
  }

  saveImpDetails(data: any) {
    return this.http.post<any>(`https://umdproject-73xbvwzbb-umds-projects-76f3b139.vercel.app/api/bo_implementation`, data);
  }

  getImpDetails() {
    return this.http.get<any>(`https://umdproject-73xbvwzbb-umds-projects-76f3b139.vercel.app/api/bo_implementation`);
  }

  deleteImpDetails(id: number) {
    return this.http.delete<any>(`https://umdproject-73xbvwzbb-umds-projects-76f3b139.vercel.app/api/bo_implementation/` + id);
  }

  updateImpDetails(id: number, data: any) {
    return this.http.put<any>(`https://umdproject-73xbvwzbb-umds-projects-76f3b139.vercel.app/api/bo_implementation/` + id, data);
  }

  saveBusiness_term(data: any) {
    return this.http.post<any>(`https://umdproject-73xbvwzbb-umds-projects-76f3b139.vercel.app/api/business_term`, data);
  }

  getBusiness_term() {
    return this.http.get<any>(`https://umdproject-73xbvwzbb-umds-projects-76f3b139.vercel.app/api/business_term`);
  }

  updateBusiness_term(id:number, data:any) {
    return this.http.put<any>(`https://umdproject-73xbvwzbb-umds-projects-76f3b139.vercel.app/api/business_term/` + id, data);
  }

  deleteBusiness_term(id:number) {
    return this.http.delete<any>(`https://umdproject-73xbvwzbb-umds-projects-76f3b139.vercel.app/api/business_term/` + id);
  }

  saveBusinessRule(data: any) {
    return this.http.post<any>(`https://umdproject-i5capw55o-umds-projects-76f3b139.vercel.app/api/business_rules`, data);
  }

  getBusinessRule() {
    return this.http.get<any>(`https://umdproject-i5capw55o-umds-projects-76f3b139.vercel.app/api/business_rules`);
  }

  updateBusinessRule(id:number, data:any) {
    return this.http.put<any>(`https://umdproject-i5capw55o-umds-projects-76f3b139.vercel.app/api/business_rules/` + id, data);
  }

  deleteBusinessRule(id:number) {
    return this.http.delete<any>(`https://umdproject-i5capw55o-umds-projects-76f3b139.vercel.app/api/business_rules/` + id);
  }
}
