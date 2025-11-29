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

        // 2. Save to Google Sheet
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        sheet.appendRow([timestamp, name, email]);

        // 3. Fetch events (simulate or fetch from another source)
        var events = getUpcomingEvents(); // Returns array of event objects
        var eventsAvailable = Array.isArray(events) && events.length > 0;

        // 4. Send Welcome Email (Optional - be mindful of quotas)
        try {
            sendWelcomeEmail(email, name, events);
        } catch (emailError) {
            console.error("Email sending failed: " + emailError);
        }

        // 5. Return Success Response with events and status
        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            eventsAvailable: eventsAvailable,
            events: events,
            message: eventsAvailable ? 'Events found' : 'No upcoming events'
        }))
        .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

function sendWelcomeEmail(email, name, events) {
    var firstName = name ? name.split(' ')[0] : "there";
    if (firstName !== "there") {
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    }

    var subject = "Welcome to Google AI Community!";

    // Build events section HTML
    var eventsHtml = "";
    if (events && events.length > 0) {
        eventsHtml = `<div style="background: linear-gradient(to right, #f8f9fa, #ffffff); padding: 24px; border-radius: 12px; border-left: 4px solid #34A853; margin-bottom: 30px;">
            <p style="margin: 0 0 12px 0; font-size: 15px; font-weight: 600; color: #202124;">Upcoming Events:</p>
            <ul style="margin: 0; padding-left: 20px; color: #5f6368; font-size: 15px; line-height: 1.6;">
                ${events.map(ev => `<li style='margin-bottom:8px;'><strong>${ev.title}</strong> - ${ev.date}<br><span style='font-size:13px;'>${ev.location}</span></li>`).join('')}
            </ul>
        </div>`;
    } else {
        eventsHtml = `<div style="background: linear-gradient(to right, #f8f9fa, #ffffff); padding: 24px; border-radius: 12px; border-left: 4px solid #34A853; margin-bottom: 30px;">
            <p style="margin: 0 0 12px 0; font-size: 15px; font-weight: 600; color: #202124;">No upcoming events at the moment.</p>
        </div>`;
    }

    var htmlBody = `
      <div style="font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif; color: #202124; max-width: 600px; margin: 0 auto; padding: 40px 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
        ${eventsHtml}
        <div style="text-align: center; margin-bottom: 30px;">
           <h1 style="color: #4285F4; margin: 0; font-size: 24px; letter-spacing: -0.5px;">Google AI Community</h1>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Hello ${firstName},</p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Welcome aboard! We're thrilled to have you join the <strong>Google AI Community</strong> network.</p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">You are now part of a vibrant ecosystem of developers, researchers, and AI enthusiasts shaping the future of technology in India.</p>

        <div style="background: linear-gradient(to right, #f8f9fa, #ffffff); padding: 24px; border-radius: 12px; border-left: 4px solid #34A853; margin: 30px 0;">
           <p style="margin: 0 0 12px 0; font-size: 15px; font-weight: 600; color: #202124;">What to expect:</p>
           <ul style="margin: 0; padding-left: 20px; color: #5f6368; font-size: 15px; line-height: 1.6;">
             <li style="margin-bottom: 8px;">Exclusive invites to local TFUG meetups & events</li>
             <li style="margin-bottom: 8px;">Hands-on workshops & learning resources</li>
             <li style="margin-bottom: 0;">Community spotlights & success stories</li>
           </ul>
        </div>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">We can't wait to see what you'll build and share with the community.</p>
        
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #f1f3f4;">
            <p style="font-size: 14px; color: #5f6368; margin-bottom: 8px;">Let's build the future together.</p>
            <p style="font-size: 14px; color: #202124; font-weight: 600; margin: 0;">The Google AI Community Team</p>
        </div>
      </div>
    `;

    GmailApp.sendEmail(email, subject, "", {
        htmlBody: htmlBody,
        name: "Google AI Community"
    });
}

// Dummy function to simulate fetching events
function getUpcomingEvents() {
    // Replace with actual API call or data source as needed
    return [
        {
            title: "AI Meetup Delhi",
            date: "Dec 10, 2025",
            location: "Google Gurgaon Campus"
        },
        {
            title: "TensorFlow Workshop",
            date: "Jan 15, 2026",
            location: "Online"
        }
    ];
}
