import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendVerificationEmail(email, token) {
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Verify your ProSports Account',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e4e7; border-radius: 16px;">
                    <h1 style="color: #08060d; margin-bottom: 20px;">Welcome to ProSports!</h1>
                    <p style="color: #6b6375; font-size: 16px; line-height: 1.5;">Please click the button below to verify your email address and activate your account:</p>
                    <div style="margin: 30px 0; text-align: center;">
                        <a href="${verificationUrl}" style="background-color: #aa3bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Verificar cuenta</a>
                    </div>
                    <p style="color: #9ca3af; font-size: 14px;">If you did not request this, please ignore this email.</p>
                </div>
            `,
        };

        return await this.transporter.sendMail(mailOptions);
    }
}

export default new EmailService();
