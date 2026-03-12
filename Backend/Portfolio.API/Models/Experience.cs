namespace Portfolio.API.Models;

public class Experience
{
    public int Id { get; set; }
    public required string Role { get; set; }
    public string? RoleDe { get; set; }
    public required string Company { get; set; }
    public required string Period { get; set; }
    public string? PeriodDe { get; set; }
    public required string Location { get; set; }
    public string? LocationDe { get; set; }
    public List<string> Description { get; set; } = new();
    public List<string>? DescriptionDe { get; set; } = new();
    public List<string> TechStack { get; set; } = new();
}
