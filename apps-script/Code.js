function setup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = ["Timestamp", "Name", "Email"];

  // Check if headers exist, if not, append them
  var range = sheet.getRange(1, 1, 1, 3);
  var values = range.getValues()[0];

  if (values[0] !== "Timestamp" || values[1] !== "Name" || values[2] !== "Email") {
    sheet.insertRowsBefore(1, 1);
    range = sheet.getRange(1, 1, 1, 3);
    range.setValues([headers]);
    range.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait for up to 10 seconds for other processes to finish

  try {
    // 1. Parse the incoming data
    var email = "";
    var name = "";
    var timestamp = new Date();

    if (e.parameter && e.parameter.email) {
      email = e.parameter.email;
      name = e.parameter.name || "";
    } else if (e.postData && e.postData.contents) {
      try {
        var data = JSON.parse(e.postData.contents);
        email = data.email;
        name = data.name || "";
      } catch (jsonError) {
        // Fallback if parsing fails or content is not JSON
        console.error("JSON Parse Error: " + jsonError);
      }
    }

    if (!email) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'No email provided' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Save to Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([timestamp, name, email]);

    // 3. Send Welcome Email (Optional - be mindful of quotas)
    try {
      sendWelcomeEmail(email, name);
    } catch (emailError) {
      console.error("Email sending failed: " + emailError);
    }

    // 4. Return Success Response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Subscription successful'
    }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function sendWelcomeEmail(email, name) {
  var firstName = name ? name.split(' ')[0] : "there";
  if (firstName !== "there") {
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }

  var subject = "Welcome to AI Community!";

  var htmlBody = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #202124; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4285F4 0%, #34A853 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
           <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">AI Community</h1>
           <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.95;">India</p>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 18px; line-height: 1.6; margin: 0 0 20px 0; color: #202124;">Hello <strong>${firstName}</strong>,</p>
          
          <p style="font-size: 16px; line-height: 1.7; margin: 0 0 20px 0; color: #5f6368;">Welcome to the <strong style="color: #4285F4;">AI Community India</strong>! &#127881;</p>
          
          <p style="font-size: 16px; line-height: 1.7; margin: 0 0 30px 0; color: #5f6368;">You're now part of a vibrant network of developers, researchers, and AI enthusiasts shaping the future of technology across India.</p>

          <!-- Benefits Box -->
          <div style="background: #f8f9fa; padding: 24px; border-radius: 8px; border-left: 4px solid #34A853; margin: 0 0 30px 0;">
             <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #202124;">What's Next?</p>
             <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
               <tr>
                 <td style="padding: 8px 0; font-size: 15px; color: #5f6368; line-height: 1.6;">
                   &#10003; Exclusive event invitations
                 </td>
               </tr>
               <tr>
                 <td style="padding: 8px 0; font-size: 15px; color: #5f6368; line-height: 1.6;">
                   &#10003; Hands-on workshops &amp; resources
                 </td>
               </tr>
               <tr>
                 <td style="padding: 8px 0; font-size: 15px; color: #5f6368; line-height: 1.6;">
                   &#10003; Community updates &amp; spotlights
                 </td>
               </tr>
             </table>
          </div>

          <p style="font-size: 16px; line-height: 1.7; margin: 0 0 30px 0; color: #5f6368;">We can't wait to see what you'll build! &#128640;</p>
          
          <!-- CTA Section -->
          <div style="text-align: center; margin: 40px 0 30px 0;">
            <p style="font-size: 14px; color: #5f6368; margin: 0 0 8px 0;">Let's build the future together</p>
            <p style="font-size: 15px; color: #202124; font-weight: 600; margin: 0;">&#8212; The AI Community Team</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 30px 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="font-size: 14px; color: #5f6368; margin: 0 0 20px 0; font-weight: 500;">Connect with us</p>
            
            <!-- Social Media Links -->
            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 20px auto;">
              <tr>
                <td style="padding: 4px;">
                  <a href="https://www.facebook.com/TFUGIndia/" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #1877F2; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;">Facebook</a>
                </td>
                <td style="padding: 4px;">
                  <a href="https://www.instagram.com/tfugindia" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #E4405F; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;">Instagram</a>
                </td>
                <td style="padding: 4px;">
                  <a href="https://www.linkedin.com/company/tfugindia/" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #0A66C2; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;">LinkedIn</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 4px;">
                  <a href="https://x.com/tfugindia" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;">X (Twitter)</a>
                </td>
                <td style="padding: 4px;">
                  <a href="https://www.youtube.com/@TFUGIndia" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #FF0000; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;">YouTube</a>
                </td>
                <td style="padding: 4px;">
                  <a href="https://www.commudle.com/orgs/tfug" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #4285F4; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;">Commudle</a>
                </td>
              </tr>
            </table>
            
            <p style="font-size: 12px; color: #80868b; margin: 0; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} AI Community India. All rights reserved.
            </p>
        </div>
      </div>
      </body>
      </html>
    `;

  GmailApp.sendEmail(email, subject, "", {
    htmlBody: htmlBody,
    name: "AI Community"
  });
}


