using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestApi.Data;
using RestApi.Models;


namespace RestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AuthController(AppDbContext db)
        {
            _db = db;
        }

        // REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register(User request)
        {
            // check if email exists
            var existing = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existing != null)
            {
                return BadRequest(new { message = "Email already registered" });
            }

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = request.Password  // (plain for beginner demo)
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(user);
        }

        // LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User request)
        {
            var user = await _db.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            return Ok(user);
        }
    }
}
