import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:5186/api/Appointments';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')!).token 
    : '';
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
}

  bookAppointment(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders(), responseType: 'text' });
  }

  getPatientAppointments(patientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient/${patientId}`, { headers: this.getHeaders() });
  }

  getDoctorAppointments(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctor/${doctorId}`, { headers: this.getHeaders() });
  }

  getAllAppointments(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  updateStatus(id: number, status: string): Observable<any> {
  const token = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')!).token 
    : '';
  return this.http.put(`${this.apiUrl}/${id}`, JSON.stringify(status), {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }),
    responseType: 'text'
  });
}

  cancelAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders(), responseType: 'text' });
  }
}