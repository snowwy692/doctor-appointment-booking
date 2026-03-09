namespace DoctorAppointmentAPI.DTOs
{
    public class DoctorCreateDto
    {
        public int UserId { get; set; }
        public string Specialization { get; set; } = string.Empty;
        public int Experience { get; set; }
        public decimal Fees { get; set; }
    }
}