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
    private readonly IResendClient _resendClient;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
        
        var apiKey = _configuration["Resend:ApiKey"];
        _resendClient = new ResendClient(apiKey);
    }

    public async Task SendContactEmailAsync(string name, string email, string subject, string message)
    {
        try
        {
            var fromAddress = _configuration["Email:FromAddress"] ?? "noreply@resend.dev";
            var toAddress = _configuration["Email:ToAddress"];

            var emailRequest = new SendEmailRequest
            {
                From = $"Portfolio <{fromAddress}>",
                To = new[] { toAddress },
                ReplyTo = email,
                Subject = $"Portfolio Contact: {subject}",
                Html = $@"
                    <h2>New Contact Form Submission</h2>
                    <p><strong>From:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Subject:</strong> {subject}</p>
                    <hr>
                    <p><strong>Message:</strong></p>
                    <p>{System.Net.WebUtility.HtmlEncode(message)}</p>
                ",
                Text = $@"
New Contact Form Submission

From: {name}
Email: {email}
Subject: {subject}

Message:
{message}
                "
            };

            var result = await _resendClient.SendEmailAsync(emailRequest);

            _logger.LogInformation("Contact email sent successfully via Resend from {Email}, Message ID: {MessageId}", email, result.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact email via Resend from {Email}", email);
            throw;
        }
    }
}
