namespace Portfolio.API.Models;

public class Skill
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Category { get; set; } // Frontend, Backend, etc.
    public string? IconName { get; set; }
    public string? Proficiency { get; set; } // Expert, Advanced, Intermediate
    public string? Tier { get; set; } // Primary, Supporting, Specialized
    public int? YearsOfExperience { get; set; }
    public string? UsageContext { get; set; } // Brief context e.g., "Daily usage in React 19 apps"
    public string? UsageContextDe { get; set; }
}
