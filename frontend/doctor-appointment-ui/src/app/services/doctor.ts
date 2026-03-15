import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:5186/api/Doctors';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')!).token 
    : '';
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
}

  getAllDoctors(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addDoctor(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders(), responseType: 'text' });
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders(), responseType: 'text' });
  }
}