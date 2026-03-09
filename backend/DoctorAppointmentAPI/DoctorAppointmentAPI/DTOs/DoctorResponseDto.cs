namespace DoctorAppointmentAPI.DTOs
{
    public class DoctorResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public int Experience { get; set; }
        public decimal Fees { get; set; }
    }
}