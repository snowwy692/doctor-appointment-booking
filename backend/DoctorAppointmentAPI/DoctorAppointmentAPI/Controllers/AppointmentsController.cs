using DoctorAppointmentAPI.Data;
using DoctorAppointmentAPI.DTOs;
using DoctorAppointmentAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoctorAppointmentAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentsController(AppDbContext context)
        {
            _context = context;
        }

        // Book appointment - Patient only
        [HttpPost]
        [Authorize(Roles = "Patient")]
        public async Task<IActionResult> BookAppointment(AppointmentCreateDto dto)
        {
            var patient = await _context.Users.FindAsync(dto.PatientId);
            if (patient == null) return NotFound("Patient not found");

            var doctor = await _context.Doctors.FindAsync(dto.DoctorId);
            if (doctor == null) return NotFound("Doctor not found");

            // Check if slot already booked
            var slotTaken = await _context.Appointments.AnyAsync(a =>
                a.DoctorId == dto.DoctorId &&
                a.AppointmentDate.Date == DateTime.SpecifyKind(dto.AppointmentDate, DateTimeKind.Utc).Date &&
                a.TimeSlot == dto.TimeSlot &&
                a.Status != "Cancelled");

            if (slotTaken) return BadRequest("This time slot is already booked");

            var appointment = new Appointment
            {
                PatientId = dto.PatientId,
                DoctorId = dto.DoctorId,
                AppointmentDate = DateTime.SpecifyKind(dto.AppointmentDate, DateTimeKind.Utc),
                TimeSlot = dto.TimeSlot,
                Status = "Pending"
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return Ok("Appointment booked successfully");
        }

        // Get appointments by patient
        [HttpGet("patient/{patientId}")]
        [Authorize]
        public async Task<IActionResult> GetPatientAppointments(int patientId)
        {
            var appointments = await _context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor).ThenInclude(d => d.User)
                .Where(a => a.PatientId == patientId)
                .Select(a => new AppointmentResponseDto
                {
                    Id = a.Id,
                    PatientName = a.Patient.Name,
                    DoctorName = a.Doctor.User.Name,
                    Specialization = a.Doctor.Specialization,
                    AppointmentDate = a.AppointmentDate,
                    TimeSlot = a.TimeSlot,
                    Status = a.Status
                })
                .ToListAsync();

            return Ok(appointments);
        }

        // Get appointments by doctor
        [HttpGet("doctor/{doctorId}")]
        [Authorize]
        public async Task<IActionResult> GetDoctorAppointments(int doctorId)
        {
            var appointments = await _context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor).ThenInclude(d => d.User)
                .Where(a => a.DoctorId == doctorId)
                .Select(a => new AppointmentResponseDto
                {
                    Id = a.Id,
                    PatientName = a.Patient.Name,
                    DoctorName = a.Doctor.User.Name,
                    Specialization = a.Doctor.Specialization,
                    AppointmentDate = a.AppointmentDate,
                    TimeSlot = a.TimeSlot,
                    Status = a.Status
                })
                .ToListAsync();

            return Ok(appointments);
        }

        // Update appointment status - Doctor/Admin
        [HttpPut("{id}")]
        [Authorize(Roles = "Doctor,Admin")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null) return NotFound("Appointment not found");

            appointment.Status = status;
            await _context.SaveChangesAsync();

            return Ok("Appointment status updated");
        }

        // Cancel appointment - Patient only
        [HttpDelete("{id}")]
        [Authorize(Roles = "Patient")]
        public async Task<IActionResult> CancelAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null) return NotFound("Appointment not found");

            appointment.Status = "Cancelled";
            await _context.SaveChangesAsync();

            return Ok("Appointment cancelled");
        }

        // Get all appointments - Admin only
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllAppointments()
        {
            var appointments = await _context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor).ThenInclude(d => d.User)
                .Select(a => new AppointmentResponseDto
                {
                    Id = a.Id,
                    PatientName = a.Patient.Name,
                    DoctorName = a.Doctor.User.Name,
                    Specialization = a.Doctor.Specialization,
                    AppointmentDate = a.AppointmentDate,
                    TimeSlot = a.TimeSlot,
                    Status = a.Status
                })
                .ToListAsync();

            return Ok(appointments);
        }
    }
}