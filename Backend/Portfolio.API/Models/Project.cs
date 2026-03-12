using System.ComponentModel.DataAnnotations;

namespace Portfolio.API.Models;

public class Project
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;
    public string? TitleDe { get; set; }

    [Required]
    public string Organization { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;
    public string? DescriptionDe { get; set; }

    public List<string> Features { get; set; } = new();
    public List<string>? FeaturesDe { get; set; } = new();

    public List<string> TechStack { get; set; } = new();

    public string? ImageUrl { get; set; }

    public string? ProjectUrl { get; set; }

    public bool IsInternalProject { get; set; } = true;
    public string? ArchitectureDescription { get; set; }
    public string? ArchitectureDescriptionDe { get; set; }
    public string? ArchitectureImpact { get; set; }
    public string? ArchitectureImpactDe { get; set; }
}
