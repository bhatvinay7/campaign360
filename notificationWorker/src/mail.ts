import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

const sendEmail=async (recipientEmail:string,userName:string,campaignName:string,content:string) => {
    


            const mailOptions = {
              from: process.env.EMAIL,
              to: recipientEmail,
              subject: 'New Campaign is launched!',
              text:`Grap exciting reward by participating in the Campaign` ,
              html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Notification Email</title>
  <style>
    body {
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      padding: 20px;
    }
    .header {
      background-color: #007BFF;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin: 20px 0;
      background-color: #28a745;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      color: #777777;
      font-size: 12px;
      padding: 20px;
    }
    @media (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>New Campaign is waiting for You</h1>
    </div>
    <div class="content">
      <p>Dear ${userName},</p>
      <h1>${campaignName}</h1>
      <p>${content}</p>
      
      <p>Thank you,<br>Campaign360</p>
    </div>
    <div class="footer">
      &copy; 2025 Campaign360. All rights reserved.
    </div>
  </div>
</body>
</html>
`

            };
          
            try {
              const info = await transporter.sendMail(mailOptions);
              return info 
            } catch (error) {
              console.error('Error while sending email:', error);
              throw new Error('Failed to send  email');
            }
          }

export {sendEmail}