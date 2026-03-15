import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment';
import { AuthService } from '../../services/auth';
import { DoctorService } from '../../services/doctor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-appointment',
  imports: [FormsModule, CommonModule],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css',
})
export class BookAppointmentComponent implements OnInit {
  doctorId!: number;
  doctor: any;
  appointmentDate = '';
  timeSlot = '';
  successMessage = '';
  errorMessage = '';

  timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private doctorService: DoctorService,
  ) {}

  ngOnInit(): void {
    this.doctorId = Number(this.route.snapshot.paramMap.get('doctorId'));
    this.doctorService.getDoctorById(this.doctorId).subscribe({
      next: (res) => (this.doctor = res),
      error: (err) => console.error(err),
    });
  }

  bookAppointment(): void {
    const user = this.authService.getUser();
    const data = {
      patientId: user.id,
      doctorId: this.doctorId,
      appointmentDate: new Date(this.appointmentDate).toISOString(),
      timeSlot: this.timeSlot,
    };

    this.appointmentService.bookAppointment(data).subscribe({
      next: () => {
        this.successMessage = 'Appointment booked successfully!';
        setTimeout(() => {
          this.router.navigate(['/patient-dashboard']).then(() => {
            window.location.reload();
          });
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'This slot is already booked. Please choose another.';
      },
    });
  }
}
