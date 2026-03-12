using System.ComponentModel.DataAnnotations;

namespace Portfolio.API.Models;

public class ContactMessage
{
    public int Id { get; set; }

    [Required]
    public required string Name { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    public required string Subject { get; set; }

    [Required]
    public required string Message { get; set; }

    public DateTime SentAt { get; set; } = DateTime.UtcNow;
}
