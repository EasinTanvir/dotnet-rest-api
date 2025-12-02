using Microsoft.EntityFrameworkCore;
using RestApi.Data;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add DB
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=dev.db"));


// Add CORS for Next.js
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

//  Enable CORS BEFORE controllers
app.UseCors("AllowNextJs");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
