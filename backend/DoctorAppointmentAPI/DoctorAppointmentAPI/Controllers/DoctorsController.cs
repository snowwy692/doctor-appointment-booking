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
    public class DoctorsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DoctorsController(AppDbContext context)
        {
            _context = context;
        }

        // GET all doctors - anyone can view
        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _context.Doctors
                .Include(d => d.User)
                .Select(d => new DoctorResponseDto
                {
                    Id = d.Id,
                    Name = d.User.Name,
                    Email = d.User.Email,
                    Specialization = d.Specialization,
                    Experience = d.Experience,
                    Fees = d.Fees
                })
                .ToListAsync();

            return Ok(doctors);
        }

        // GET single doctor by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctor(int id)
        {
            var doctor = await _context.Doctors
                .Include(d => d.User)
                .Where(d => d.Id == id)
                .Select(d => new DoctorResponseDto
                {
                    Id = d.Id,
                    Name = d.User.Name,
                    Email = d.User.Email,
                    Specialization = d.Specialization,
                    Experience = d.Experience,
                    Fees = d.Fees
                })
                .FirstOrDefaultAsync();

            if (doctor == null) return NotFound("Doctor not found");

            return Ok(doctor);
        }

        // POST add doctor - Admin only
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddDoctor(DoctorCreateDto dto)
        {
            // Check if user exists
            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null) return NotFound("User not found");

            // Check if already a doctor
            if (await _context.Doctors.AnyAsync(d => d.UserId == dto.UserId))
                return BadRequest("This user is already a doctor");

            var doctor = new Doctor
            {
                UserId = dto.UserId,
                Specialization = dto.Specialization,
                Experience = dto.Experience,
                Fees = dto.Fees
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return Ok("Doctor added successfully");
        }

        // DELETE doctor - Admin only
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return NotFound("Doctor not found");

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return Ok("Doctor deleted successfully");
        }
    }
}