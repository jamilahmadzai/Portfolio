using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Data;
using Portfolio.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public ResumeController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet("experience")]
    public async Task<ActionResult<IEnumerable<Experience>>> GetExperience([FromQuery] string? lang)
    {
        var experiences = await _context.Experiences.OrderByDescending(e => e.Id).ToListAsync();

        if (lang == "de")
        {
            foreach (var exp in experiences)
            {
                if (!string.IsNullOrEmpty(exp.RoleDe)) exp.Role = exp.RoleDe;
                if (!string.IsNullOrEmpty(exp.PeriodDe)) exp.Period = exp.PeriodDe;
                if (!string.IsNullOrEmpty(exp.LocationDe)) exp.Location = exp.LocationDe;
                if (exp.DescriptionDe != null && exp.DescriptionDe.Count > 0) exp.Description = exp.DescriptionDe;
            }
        }

        return Ok(experiences);
    }

    [HttpGet("skills")]
    public async Task<ActionResult<IEnumerable<Skill>>> GetSkills([FromQuery] string? lang)
    {
        var skills = await _context.Skills.ToListAsync();

        if (lang == "de")
        {
            foreach (var skill in skills)
            {
                if (!string.IsNullOrEmpty(skill.UsageContextDe)) skill.UsageContext = skill.UsageContextDe;
            }
        }

        return Ok(skills);
    }

    [HttpGet("education")]
    public async Task<ActionResult<IEnumerable<Education>>> GetEducation([FromQuery] string? lang)
    {
        var education = await _context.Educations.ToListAsync();

        if (lang == "de")
        {
            foreach (var edu in education)
            {
                if (!string.IsNullOrEmpty(edu.DegreeDe)) edu.Degree = edu.DegreeDe;
                if (!string.IsNullOrEmpty(edu.InstitutionDe)) edu.Institution = edu.InstitutionDe;
                if (!string.IsNullOrEmpty(edu.PeriodDe)) edu.Period = edu.PeriodDe;
                if (!string.IsNullOrEmpty(edu.LocationDe)) edu.Location = edu.LocationDe;
                if (!string.IsNullOrEmpty(edu.DescriptionDe)) edu.Description = edu.DescriptionDe;
                if (!string.IsNullOrEmpty(edu.FocusDe)) edu.Focus = edu.FocusDe;
            }
        }

        return Ok(education);
    }

    [HttpGet("projects")]
    public async Task<ActionResult<IEnumerable<Project>>> GetProjects([FromQuery] string? lang)
    {
        var projects = await _context.Projects.ToListAsync();

        if (lang == "de")
        {
            foreach (var proj in projects)
            {
                if (!string.IsNullOrEmpty(proj.TitleDe)) proj.Title = proj.TitleDe;
                if (!string.IsNullOrEmpty(proj.DescriptionDe)) proj.Description = proj.DescriptionDe;
                if (proj.FeaturesDe != null && proj.FeaturesDe.Count > 0) proj.Features = proj.FeaturesDe;
            }
        }

        return Ok(projects);
    }

    [HttpGet("download")]
    public IActionResult DownloadCV()
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "cv", "Jamil_Ur_Rehman_CV.pdf");

        if (!System.IO.File.Exists(filePath))
        {
            return NotFound("CV file not found");
        }

        return PhysicalFile(filePath, "application/pdf", "Jamil_Ur_Rehman_CV.pdf");
    }
}
