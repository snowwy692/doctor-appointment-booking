namespace DoctorAppointmentAPI.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public string Specialization { get; set; } = string.Empty;
        public int Experience { get; set; }
        public decimal Fees { get; set; }
    }
}