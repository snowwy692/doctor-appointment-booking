import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppointmentService } from '../../services/appointment';
import { AuthService } from '../../services/auth';
import { DoctorService } from '../../services/doctor';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css'
})
export class DoctorDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  userName = '';

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private doctorService: DoctorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userName = user.name;

    // First get all doctors, find the one matching current user
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors) => {
        const doctor = doctors.find((d: any) => d.email === user.email);
        if (doctor) {
          this.appointmentService.getDoctorAppointments(doctor.id).subscribe({
            next: (res) => {
              this.appointments = res;
              this.cdr.detectChanges();
            },
            error: (err) => console.error(err)
          });
        }
      },
      error: (err) => console.error(err)
    });
  }

  updateStatus(id: number, status: string): void {
    this.appointmentService.updateStatus(id, status).subscribe({
      next: () => {
        const apt = this.appointments.find(a => a.id === id);
        if (apt) apt.status = status;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  getStatusClass(status: string): string {
    if (status === 'Pending') return 'badge bg-warning text-dark';
    if (status === 'Confirmed') return 'badge bg-success';
    if (status === 'Cancelled') return 'badge bg-danger';
    if (status === 'Done') return 'badge bg-secondary';
    return 'badge bg-info';
  }
}