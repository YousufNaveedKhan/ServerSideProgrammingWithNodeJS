const nodeMailer = require("nodemailer");

const { APP_EMAIL, APP_PASS, MAIL_TO } = process.env;

const practiceMode = !APP_EMAIL || !APP_PASS;

async function sendEmail() {
try {
    const transporter = practiceMode
    ? nodeMailer.createTransport({ jsonTransport: true })
    : nodeMailer.createTransport({
        service: "gmail",
        auth: { user: APP_EMAIL, pass: APP_PASS },
      });

  const mailOptions = {
    from: APP_EMAIL || "info@aptech.com.pk",
    to: MAIL_TO || "example@gmail.com",
    subject: "Welcome to our website",
    text: "We are testing our mailer app",
    html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome Email</title>
        </head>

        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">

            <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden;">

                <!-- Header -->
                <div style="background-color: #1e293b; padding: 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">
                        GFT Solutions
                    </h1>

                    <p style="color: #cbd5e1; margin: 10px 0 0;">
                        We Code Your Concept
                    </p>
                </div>

                <!-- Email Content -->
                <div style="padding: 35px 30px; color: #334155;">

                    <h2 style="color: #0f172a; margin-top: 0;">
                        Welcome, Yousuf!
                    </h2>

                    <p style="font-size: 15px; line-height: 1.7;">
                        Thank you for connecting with <strong>GFT Solutions</strong>.
                        We're excited to have you here!
                    </p>

                    <p style="font-size: 15px; line-height: 1.7;">
                        We believe in turning innovative ideas into meaningful
                        digital experiences through technology, creativity,
                        and collaboration.
                    </p>

                    <!-- Button -->
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://wearegft.com"
                           style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-size: 15px; font-weight: bold;">
                            Visit Our Website
                        </a>
                    </div>

                    <p style="font-size: 15px; line-height: 1.7;">
                        If you have any questions, feel free to reach out.
                        We're always happy to help!
                    </p>

                    <p style="font-size: 15px; line-height: 1.7;">
                        Best Regards,<br>
                        <strong>Team GFT Solutions</strong>
                    </p>

                </div>

                <!-- Footer -->
                <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">

                    <p style="color: #64748b; font-size: 13px; margin: 5px;">
                        © 2026 GFT Solutions. All rights reserved.
                    </p>

                    <p style="font-size: 13px; margin: 8px;">
                        <a href="https://wearegft.com"
                           style="color: #2563eb; text-decoration: none;">
                            www.wearegft.com
                        </a>
                    </p>

                    <p style="color: #94a3b8; font-size: 11px; margin-bottom: 0;">
                        This is an automated email. Please do not reply directly.
                    </p>

                </div>

            </div>

        </body>
        </html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);

  if (practiceMode) {
    console.log("PRACTICE MODE: ", JSON.parse(info.message));
  }else {
    console.log("Email Sent! ", info.messageId);
  }
} catch (error) {
  console.log("Failed: ", error.message)
}
}

sendEmail();