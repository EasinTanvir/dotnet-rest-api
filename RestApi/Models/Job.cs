namespace RestApi.Models
{
    public class Job
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public decimal Salary { get; set; }
        public string Location { get; set; } = string.Empty;

        // New fields
        public string Category { get; set; } = string.Empty;     // onsite | remote | hybrid
        public string JobType { get; set; } = string.Empty;      // full-time | part-time
        public string RequiredSkills { get; set; } = string.Empty; // e.g. "React, Node, SQL"

        // Foreign key
        public int UserId { get; set; }
    }
}
