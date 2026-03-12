using System.ComponentModel.DataAnnotations;

namespace Portfolio.API.Models;

public class Education
{
    public int Id { get; set; }

    [Required]
    public string Degree { get; set; } = string.Empty;
    public string? DegreeDe { get; set; }

    [Required]
    public string Institution { get; set; } = string.Empty;
    public string? InstitutionDe { get; set; }

    [Required]
    public string Period { get; set; } = string.Empty;
    public string? PeriodDe { get; set; }

    [Required]
    public string Location { get; set; } = string.Empty;
    public string? LocationDe { get; set; }

    public string? Description { get; set; }
    public string? DescriptionDe { get; set; }

    public string? Focus { get; set; }
    public string? FocusDe { get; set; }

    public List<string>? RelevantModules { get; set; } = new();
}
