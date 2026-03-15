import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppointmentService } from '../../services/appointment';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-patient-dashboard',
  imports: [CommonModule],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css'
})
export class PatientDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  userName = '';

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userName = user.name;
    this.appointmentService.getPatientAppointments(user.id).subscribe({
      next: (res) => {
        this.appointments = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  cancelAppointment(id: number): void {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.appointmentService.cancelAppointment(id).subscribe({
        next: () => {
          const apt = this.appointments.find(a => a.id === id);
          if (apt) apt.status = 'Cancelled';
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