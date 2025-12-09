using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestApi.Data;
using RestApi.Models;

namespace RestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobController : ControllerBase
    {
        private readonly AppDbContext _db;

        public JobController(AppDbContext db)
        {
            _db = db;
        }

        // CREATE JOB POST
        [HttpPost("create")]
        public async Task<IActionResult> CreateJob(Job request)
        {
            var user = await _db.Users.FindAsync(request.UserId);
            if (user == null)
                return BadRequest(new { message = "User not found" });

            _db.Jobs.Add(request);
            await _db.SaveChangesAsync();

            return Ok(request);
        }

        // GET JOB DETAILS
        [HttpGet("{jobId}")]
        public async Task<IActionResult> GetJobDetails(int jobId)
        {
            var job = await _db.Jobs.FindAsync(jobId);

            if (job == null)
                return NotFound(new { message = "Job not found" });

            return Ok(job);
        }

        // GET JOBS FOR A SPECIFIC USER
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetJobsByUser(int userId)
        {
            var jobs = await _db.Jobs
                .Where(j => j.UserId == userId)
                .ToListAsync();

            return Ok(jobs);
        }

        // GET ALL JOBS (with filters, search, pagination)
        [HttpGet("all")]
        public async Task<IActionResult> GetAllJobs(
            string? category,
            string? search,
            int page = 1,
            int pageSize = 10)
        {
            var query = _db.Jobs.AsQueryable();

            // Filter by category
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(j => j.Category.ToLower() == category.ToLower());
            }

            // Search by title (contains)
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(j => j.Title.ToLower().Contains(search.ToLower()));
            }

            // Pagination
            int totalItems = await query.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var jobs = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                totalItems,
                totalPages,
                currentPage = page,
                jobs
            });
        }
    }
}
