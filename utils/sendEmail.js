import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

// Reusable sendEmail function
export const sendEmail = async (to, subject, message) => {
  try {
    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === "465", // true for SSL (465), false for TLS (587)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"WrapForge Admin" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5;">
          <h2 style="color:#ff6b00;">Admin Reply</h2>
          <p>${message}</p>
          <hr/>
          <p>Thank you,<br/>WrapForge Team</p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Email sending failed");
  }
};
