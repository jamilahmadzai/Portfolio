using Resend;

namespace Portfolio.API.Services;

public interface IEmailService
{
    Task SendContactEmailAsync(string name, string email, string subject, string message);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;
    private readonly IResend _resend;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger, IResend resend)
    {
        _configuration = configuration;
        _logger = logger;
        _resend = resend;
    }

    public async Task SendContactEmailAsync(string name, string email, string subject, string message)
    {
        try
        {
            var fromAddress = _configuration["Email:FromAddress"] ?? "onboarding@resend.dev";
            var toAddress = _configuration["Email:ToAddress"];

            var emailMessage = new EmailMessage
            {
                From = $"Portfolio <{fromAddress}>",
                To = { toAddress ?? throw new InvalidOperationException("Email:ToAddress is not configured.") },
                Subject = $"Portfolio Contact: {subject}",
                HtmlBody = $@"
                    <h2>New Contact Form Submission</h2>
                    <p><strong>From:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Subject:</strong> {subject}</p>
                    <hr>
                    <p><strong>Message:</strong></p>
                    <p>{System.Net.WebUtility.HtmlEncode(message).Replace("\n", "<br>")}</p>
                "
            };

            await _resend.EmailSendAsync(emailMessage);

            _logger.LogInformation("Contact email sent successfully via Resend from {Email}", email);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact email via Resend from {Email}", email);
            throw;
        }
    }
}
