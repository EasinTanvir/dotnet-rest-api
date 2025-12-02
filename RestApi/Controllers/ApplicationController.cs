using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestApi.Data;
using RestApi.Models;

namespace RestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ApplicationController(AppDbContext db)
        {
            _db = db;
        }

        // APPLY TO A JOB
        [HttpPost("apply")]
        public async Task<IActionResult> Apply(JobApplication request)
        {
            var job = await _db.Jobs.FindAsync(request.JobId);
            if (job == null)
                return BadRequest(new { message = "Job not found" });

            var user = await _db.Users.FindAsync(request.UserId);
            if (user == null)
                return BadRequest(new { message = "User not found" });

            // Prevent duplicate application
            var existing = await _db.JobApplications
                .FirstOrDefaultAsync(a => a.JobId == request.JobId && a.UserId == request.UserId);

            if (existing != null)
                return BadRequest(new { message = "Already applied" });

            _db.JobApplications.Add(request);
            await _db.SaveChangesAsync();

            return Ok(request);
        }

        // OWNER VIEW APPLICANTS FOR SPECIFIC JOB
        [HttpGet("applicants/{jobId}")]
        public async Task<IActionResult> GetApplicants(int jobId)
        {
            var applicants = await _db.JobApplications
                .Where(a => a.JobId == jobId)
                .ToListAsync();

            return Ok(applicants);
        }

        // OWNER UPDATE APPLICATION STATUS (ACCEPT/REJECT)
        [HttpPut("update-status/{applicationId}")]
        public async Task<IActionResult> UpdateStatus(int applicationId, [FromBody] string status)
        {
            var app = await _db.JobApplications.FindAsync(applicationId);
            if (app == null)
                return NotFound(new { message = "Application not found" });

            app.Status = status;  // "Accepted" or "Rejected"
            await _db.SaveChangesAsync();

            return Ok(app);
        }

        // USER VIEW JOBS THEY APPLIED TO
        [HttpGet("my-applications/{userId}")]
        public async Task<IActionResult> MyApplications(int userId)
        {
            var list = await _db.JobApplications
                .Where(a => a.UserId == userId)
                .ToListAsync();

            return Ok(list);
        }
    }
}
