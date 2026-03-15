import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DoctorListComponent } from './components/doctor-list/doctor-list';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'book/:doctorId', component: BookAppointmentComponent },
  { path: 'patient-dashboard', component: PatientDashboardComponent },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: '**', redirectTo: 'login' }
];