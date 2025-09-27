import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Professional email template
const getOtpEmailTemplate = (otp: string, expiryMinutes: number = 5) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Verification Code - Notes App</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .welcome-text {
            font-size: 16px;
            color: #4b5563;
            margin-bottom: 24px;
            line-height: 1.7;
        }
        
        .otp-section {
            text-align: center;
            margin: 30px 0;
        }
        
        .otp-label {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }
        
        .otp-code {
            font-size: 42px;
            font-weight: 700;
            color: #1f2937;
            letter-spacing: 8px;
            background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
            padding: 20px;
            border-radius: 12px;
            border: 2px dashed #c7d2fe;
            margin: 15px 0;
            display: inline-block;
            min-width: 300px;
        }
        
        .expiry-info {
            background: #fffbeb;
            border-left: 4px solid #f59e0b;
            padding: 16px;
            border-radius: 8px;
            margin: 25px 0;
        }
        
        .expiry-info strong {
            color: #d97706;
        }
        
        .security-tips {
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            padding: 16px;
            border-radius: 8px;
            margin: 20px 0;
            font-size: 14px;
        }
        
        .security-tips ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        .security-tips li {
            margin-bottom: 8px;
        }
        
        .footer {
            background: #f8fafc;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        
        .footer p {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .support-info {
            color: #9ca3af;
            font-size: 13px;
            margin-top: 15px;
        }
        
        .logo {
            font-size: 20px;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 10px;
        }
        
        @media (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            
            .otp-code {
                font-size: 32px;
                letter-spacing: 6px;
                min-width: 250px;
                padding: 15px;
            }
            
            .header {
                padding: 25px 15px;
            }
            
            .header h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔒 Secure Verification</h1>
            <p>Notes App - Your Digital Notebook</p>
        </div>
        
        <div class="content">
            <div class="welcome-text">
                <p>Hello,</p>
                <p>You're just one step away from accessing your Notes App account. Use the verification code below to complete your authentication process.</p>
            </div>
            
            <div class="otp-section">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
                <div style="color: #6b7280; font-size: 14px; margin-top: 10px;">
                    Enter this code in the verification field to proceed
                </div>
            </div>
            
            <div class="expiry-info">
                <strong>⚠️ Important:</strong> This verification code will expire in <strong>${expiryMinutes} minutes</strong> for security reasons.
            </div>
            
            <div class="security-tips">
                <strong>🔐 Security Tips:</strong>
                <ul>
                    <li>Never share this code with anyone</li>
                    <li>Our team will never ask for your verification code</li>
                    <li>Ensure you're on the official Notes App website</li>
                    <li>Delete this email after use for security</li>
                </ul>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 25px;">
                If you didn't request this code, please ignore this email or contact our support team immediately.
            </p>
        </div>
        
        <div class="footer">
            <div class="logo">📝 Notes App</div>
            <p>Your trusted companion for organizing thoughts and ideas</p>
            <p>Secure • Simple • Synchronized</p>
            <div class="support-info">
                Need help? Contact our support team at support@notesapp.com<br>
                © 2024 Notes App. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
`;

export const sendOtpEmail = async (email: string, otp: string) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email configuration missing - please check your environment variables");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email address format provided");
  }

  let transporter;
  try {
    // Create email transporter
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      pool: false, // Disable pooling to fix multiple email issue
    } as any);

    // Verify SMTP connection
    await transporter.verify();
    console.log(`📧 SMTP connection verified for: ${email}`);

    const mailOptions = {
      from: {
        name: "Notes App Security",
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: "🔒 Your Verification Code - Notes App",
      html: getOtpEmailTemplate(otp, 5),
      text: `
Notes App - Verification Code

Hello,

Your verification code is: ${otp}

This code will expire in 5 minutes for security reasons.

Security Tips:
- Never share this code with anyone
- Our team will never ask for your verification code
- Ensure you're on the official Notes App website
- Delete this email after use

If you didn't request this code, please ignore this email or contact our support team immediately.

Best regards,
Notes App Team
📝 Your trusted companion for organizing thoughts and ideas
      `.trim()
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully to ${email}, Message ID: ${info.messageId}`);

    // Close transporter to prevent hanging connections
    transporter.close();

  } catch (err) {
    // Ensure transporter is closed even if there's an error
    if (transporter) {
      transporter.close();
    }
    
    console.error(`❌ Failed to send OTP email to ${email}:`, err);
    throw new Error("Unable to send verification email. Please try again in a few moments.");
  }
};