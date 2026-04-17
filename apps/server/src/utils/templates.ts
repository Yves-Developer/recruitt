export const getShortlistTemplate = (name: string, jobTitle: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1a2e05; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #eef2e8; border-radius: 16px; background-color: #fdfdfc; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #8fdc1a; }
        .content { margin-bottom: 30px; }
        .button { display: inline-block; padding: 12px 24px; background-color: #8fdc1a; color: #1a2e05; text-decoration: none; border-radius: 8px; font-weight: bold; }
        .footer { font-size: 12px; color: #737373; text-align: center; margin-top: 40px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Recruitt</div>
        </div>
        <div class="content">
            <h1>Great news, ${name}!</h1>
            <p>We are excited to inform you that you have been <strong>shortlisted</strong> for the <strong>${jobTitle}</strong> position.</p>
            <p>Our team was very impressed with your background and match for this role. We would like to move forward with the next steps in our recruitment process.</p>
            <p>You will receive a separate email shortly with details about the interview schedule.</p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Recruitt AI Talent Platform. All rights reserved.
        </div>
    </div>
</body>
</html>
`;

export const getRejectTemplate = (name: string, jobTitle: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1a2e05; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #eef2e8; border-radius: 16px; background-color: #fdfdfc; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #8fdc1a; }
        .content { margin-bottom: 30px; }
        .footer { font-size: 12px; color: #737373; text-align: center; margin-top: 40px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Recruitt</div>
        </div>
        <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for your interest in the <strong>${jobTitle}</strong> position at our company and for the time you spent during the application process.</p>
            <p>After careful review of all applications, we have decided to move forward with other candidates who more closely match our current requirements.</p>
            <p>We will keep your profile in our talent pool and reach out if a position that matches your skills becomes available in the future.</p>
            <p>We wish you the best of luck in your job search.</p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Recruitt AI Talent Platform. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
