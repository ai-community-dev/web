/**
 * Contact Form Handler - Google Apps Script
 * 
 * This script handles contact form submissions from the AI Community website.
 * It stores submissions in a Google Sheet and sends confirmation emails.
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Create a new Apps Script project (Extensions > Apps Script)
 * 3. Copy this code into Code.gs
 * 4. Deploy as Web App (Deploy > New deployment > Web app)
 * 5. Set "Execute as" to "Me" and "Who has access" to "Anyone"
 * 6. Copy the Web App URL to .env.local as NEXT_PUBLIC_CONTACT_SCRIPT_URL
 */

// Configuration
const SHEET_NAME = 'Contact Submissions';

// Email template configuration
const EMAIL_CONFIG = {
    fromName: 'AI Community',
    replyTo: 'contact@aicommunity.dev',
    subject: 'Thank you for contacting AI Community',
};

/**
 * Handle POST requests from the contact form
 */
function doPost(e) {
    try {
        // Parse form data
        const params = e.parameter;
        const name = params.name || '';
        const email = params.email || '';
        const mobile = params.mobile || '';
        const message = params.message || '';
        const timestamp = params.timestamp || new Date().toISOString();

        // Validate required fields
        if (!name || !email || !message) {
            return ContentService.createTextOutput(
                JSON.stringify({ success: false, error: 'Missing required fields' })
            ).setMimeType(ContentService.MimeType.JSON);
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return ContentService.createTextOutput(
                JSON.stringify({ success: false, error: 'Invalid email address' })
            ).setMimeType(ContentService.MimeType.JSON);
        }

        // Store in Google Sheet
        const stored = storeSubmission(name, email, mobile, message, timestamp);

        if (!stored) {
            throw new Error('Failed to store submission');
        }

        // Send confirmation email
        sendConfirmationEmail(name, email, mobile, message);

        // Return success response
        return ContentService.createTextOutput(
            JSON.stringify({ success: true, message: 'Message sent successfully' })
        ).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        Logger.log('Error processing contact form: ' + error.toString());
        return ContentService.createTextOutput(
            JSON.stringify({ success: false, error: 'Internal server error' })
        ).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
    return ContentService.createTextOutput(
        JSON.stringify({
            status: 'Contact Form API is running',
            timestamp: new Date().toISOString()
        })
    ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Store submission in Google Sheet
 */
function storeSubmission(name, email, mobile, message, timestamp) {
    try {
        const sheet = getOrCreateSheet();

        // Add headers if this is the first row
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(['Timestamp', 'Name', 'Email', 'Mobile', 'Message', 'Status']);
            sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
        }

        // Append the new submission
        sheet.appendRow([
            new Date(timestamp),
            name,
            email,
            mobile,
            message,
            'New'
        ]);

        return true;
    } catch (error) {
        Logger.log('Error storing submission: ' + error.toString());
        return false;
    }
}

/**
 * Send confirmation email to the user
 */
function sendConfirmationEmail(name, email, mobile, message) {
    try {
        const htmlBody = createEmailTemplate(name, mobile, message);

        MailApp.sendEmail({
            to: email,
            subject: EMAIL_CONFIG.subject,
            htmlBody: htmlBody,
            name: EMAIL_CONFIG.fromName,
            replyTo: EMAIL_CONFIG.replyTo
        });

        Logger.log('Confirmation email sent to: ' + email);
    } catch (error) {
        Logger.log('Error sending confirmation email: ' + error.toString());
    }
}

/**
 * Create HTML email template
 */
function createEmailTemplate(name, mobile, message) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Google Sans', Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #4285F4 0%, #34A853 100%); padding: 40px 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .content h2 { color: #202124; font-size: 24px; margin-bottom: 20px; }
    .content p { color: #5f6368; font-size: 16px; line-height: 1.6; margin-bottom: 15px; }
    .message-box { background-color: #f8f9fa; border-left: 4px solid #4285F4; padding: 15px 20px; margin: 20px 0; }
    .message-box p { margin: 5px 0; color: #202124; }
    .footer { background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0; }
    .footer p { color: #5f6368; font-size: 14px; margin: 5px 0; }
    .social-links { margin: 20px 0; }
    .social-links a { display: inline-block; margin: 0 10px; color: #4285F4; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AI Community</h1>
    </div>
    <div class="content">
      <h2>Thank you for reaching out, ${name}!</h2>
      <p>We've received your message and our team will get back to you as soon as possible.</p>
      
      <div class="message-box">
        <p><strong>Your Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        ${mobile ? `<p><strong>Contact Number:</strong> ${mobile}</p>` : ''}
      </div>

      <p>In the meantime, feel free to explore our communities and upcoming events on our website.</p>
      <p>We typically respond within 24-48 hours during business days.</p>
    </div>
    <div class="footer">
      <p><strong>AI Community</strong></p>
      <p>Uniting AI organizers and practitioners across the globe</p>
      <div class="social-links">
        <a href="https://www.linkedin.com/company/tfugindia/">LinkedIn</a> |
        <a href="https://x.com/tfugindia">Twitter</a> |
        <a href="https://www.instagram.com/tfugindia">Instagram</a>
      </div>
      <p style="font-size: 12px; color: #9aa0a6; margin-top: 20px;">
        This is an automated confirmation email. Please do not reply to this email.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Get or create the sheet
 */
function getOrCreateSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME);
    }

    return sheet;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Test function to verify setup
 */
function testContactForm() {
    const testData = {
        parameter: {
            name: 'Test User',
            email: 'test@example.com',
            mobile: '+91 1234567890',
            message: 'This is a test message from the contact form.',
            timestamp: new Date().toISOString()
        }
    };

    const result = doPost(testData);
    Logger.log(result.getContent());
}
