import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

const sendEmail=async (recipientEmail:string) => {
            const otp = generateOTP();


            const mailOptions = {
              from: process.env.EMAIL,
              to: recipientEmail,
              subject: 'Your OTP Code',
              text: `Your OTP code is ${otp}`,
              html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #dddddd;
    }
    .header img {
      max-width: 150px;
    }
    .content {
      padding: 20px 0;
      text-align: center;
    }
    .otp-code {
      font-size: 24px;
      font-weight: bold;
      color: #333333;
      background-color: #f4f4f4;
      display: inline-block;
      padding: 10px 20px;
      margin: 10px 0;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #dddddd;
      font-size: 12px;
      color: #777777;
    }
    .footer a {
      color: #555555;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
   
    </div>
    <div class="content">
      <h2>Your One-Time Password (OTP)</h2>
      <p>Dear User,</p>
      <p>Thank you for choosing Campaign 360. To proceed, please use the following One-Time Password (OTP):</p>
      <div class="otp-code">${otp}</div>
      <p>This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
      <p>If you did not request this code, please ignore this email or contact our support team.</p>
    </div>
    <div class="footer">
      <p>Best regards,<br>Campaign 360 Team</p>
   
    </div>
  </div>
</body>
</html>
`,
            };
          
            try {
              const info = await transporter.sendMail(mailOptions);
              return otp; // Return the OTP for verification purposes
            } catch (error) {
              console.error('Error sending email:', error);
              throw new Error('Failed to send OTP email');
            }
          }

export {sendEmail}