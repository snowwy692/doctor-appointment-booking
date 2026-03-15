import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppointmentService } from '../../services/appointment';
import { DoctorService } from '../../services/doctor';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../models/appointment.model';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  doctors: Doctor[] = [];

  newDoctor = {
    userId: 0,
    specialization: '',
    experience: 0,
    fees: 0
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadAppointments();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (res) => {
        this.doctors = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe({
      next: (res) => {
        this.appointments = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  addDoctor(): void {
    this.doctorService.addDoctor(this.newDoctor).subscribe({
      next: () => {
        this.successMessage = 'Doctor added successfully!';
        this.errorMessage = '';
        this.newDoctor = { userId: 0, specialization: '', experience: 0, fees: 0 };
        this.loadDoctors();
      },
      error: () => {
        this.errorMessage = 'Failed to add doctor. Check the User ID.';
        this.successMessage = '';
      }
    });
  }

  deleteDoctor(id: number): void {
    if (confirm('Are you sure you want to remove this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          this.doctors = this.doctors.filter(d => d.id !== id);
          this.successMessage = 'Doctor removed successfully!';
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
    }
  }

  getStatusClass(status: string): string {
    if (status === 'Pending') return 'badge bg-warning text-dark';
    if (status === 'Confirmed') return 'badge bg-success';
    if (status === 'Cancelled') return 'badge bg-danger';
    if (status === 'Done') return 'badge bg-secondary';
    return 'badge bg-info';
  }
}