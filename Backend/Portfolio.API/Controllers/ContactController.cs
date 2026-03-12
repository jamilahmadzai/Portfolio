using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Data;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly PortfolioDbContext _context;
    private readonly IEmailService _emailService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(
        PortfolioDbContext context,
        IEmailService emailService,
        ILogger<ContactController> logger)
    {
        _context = context;
        _emailService = emailService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult> SendMessage([FromBody] ContactMessage message)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            // Save to database
            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();

            // Send email notification
            await _emailService.SendContactEmailAsync(
                message.Name,
                message.Email,
                message.Subject,
                message.Message
            );

            return Ok(new { message = "Message received and email sent successfully!", id = message.Id });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing contact form submission");
            return StatusCode(500, new { message = "Failed to send message. Please try again later." });
        }
    }
}
