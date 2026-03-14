using Portfolio.API.Data;
using Portfolio.API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Priority 1: Check for DATABASE_URL (Railway's standard, works for cross-project)
var connectionString = builder.Configuration["DATABASE_URL"];

// Priority 2: Fall back to ConnectionStrings:DefaultConnection
if (string.IsNullOrEmpty(connectionString))
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

// If it's a Railway URL starting with postgresql://, parse it manually
if (connectionString?.StartsWith("postgresql://") == true)
{
    var databaseUri = new Uri(connectionString);
    var userInfo = databaseUri.UserInfo.Split(':');
    connectionString = $"Host={databaseUri.Host};Port={databaseUri.Port};Database={databaseUri.AbsolutePath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true;";
}

builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Resend
builder.Services.AddHttpClient<Resend.IResend, Resend.ResendClient>((client) =>
{
    var key = builder.Configuration["Resend:ApiKey"] ?? builder.Configuration["Resend__ApiKey"];
    if (!string.IsNullOrEmpty(key))
    {
        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", key.Trim());
    }
});

builder.Services.AddScoped<Portfolio.API.Services.IEmailService, Portfolio.API.Services.EmailService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.SetIsOriginAllowed(_ => true) // Allow any origin
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials(); // Required for some browsers
    });
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    try
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<PortfolioDbContext>();
        context.Database.Migrate();
        Seeder.Seed(context);
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating or seeding the database.");
    }
}

app.Run();
