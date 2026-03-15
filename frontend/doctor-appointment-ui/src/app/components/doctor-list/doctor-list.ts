import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DoctorService } from '../../services/doctor';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctor-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css'
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(
    private doctorService: DoctorService,
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (res) => {
        this.doctors = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  bookAppointment(doctorId: number): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/book', doctorId]);
  }
}