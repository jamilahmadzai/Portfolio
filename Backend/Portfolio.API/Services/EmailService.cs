using MailKit.Net.Smtp;
using MimeKit;

namespace Portfolio.API.Services;

public interface IEmailService
{
    Task SendContactEmailAsync(string name, string email, string subject, string message);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendContactEmailAsync(string name, string email, string subject, string message)
    {
        try
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(name, _configuration["Email:FromAddress"]));

            emailMessage.To.Add(new MailboxAddress("Jamil Ur Rehman", _configuration["Email:ToAddress"]));

            emailMessage.ReplyTo.Add(new MailboxAddress(name, email));

            emailMessage.Subject = $"Portfolio Contact: {subject}";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                    <h2>New Contact Form Submission</h2>
                    <p><strong>From:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Subject:</strong> {subject}</p>
                    <hr>
                    <p><strong>Message:</strong></p>
                    <p>{message.Replace("\n", "<br>")}</p>
                ",
                TextBody = $@"
New Contact Form Submission

From: {name}
Email: {email}
Subject: {subject}

Message:
{message}
                "
            };

            emailMessage.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();

            _logger.LogInformation("Attempting to connect to SMTP server: {Server}:{Port}",
                _configuration["Email:SmtpServer"],
                _configuration["Email:SmtpPort"]);

            await client.ConnectAsync(
                _configuration["Email:SmtpServer"],
                int.Parse(_configuration["Email:SmtpPort"] ?? "465"),
                MailKit.Security.SecureSocketOptions.SslOnConnect
            );

            _logger.LogInformation("Connected to SMTP server, attempting authentication...");

            await client.AuthenticateAsync(
                _configuration["Email:Username"],
                _configuration["Email:Password"]
            );

            await client.SendAsync(emailMessage);

            await client.DisconnectAsync(true);

            _logger.LogInformation("Contact email sent successfully from {Email}", email);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact email from {Email}", email);
            throw;
        }
    }
}
