namespace RestApi.Models
{
    public class JobApplication
    {
        public int Id { get; set; }

        // FK: Which job?
        public int JobId { get; set; }

        // FK: Who applied?
        public int UserId { get; set; }

        // Pending / Accepted / Rejected
        public string Status { get; set; } = "Pending";
    }
}
