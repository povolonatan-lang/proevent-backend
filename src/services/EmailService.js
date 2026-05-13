import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
    constructor() {
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;

        if (!user || !pass) {
            console.warn('WARNING: Email Service missing SMTP credentials in .env');
        }

        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // Use STARTTLS
            auth: {
                user: user,
                pass: pass,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Test connection on startup
        this.transporter.verify((error, success) => {
            if (error) {
                console.error('Email Service: Connection failed', error.message);
            } else {
                console.log('Email Service: Connection successful and ready');
            }
        });
    }

    async sendVerificationEmail(email, token) {
        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const verificationUrl = `${baseUrl}/verify-email?token=${token}`;
        
        const fromName = process.env.EMAIL_FROM_NAME || 'ProSports';
        const fromEmail = process.env.SMTP_USER;

        const mailOptions = {
            from: `"${fromName}" <${fromEmail}>`,
            to: email,
            subject: 'Verifica tu cuenta de ProSports',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e4e7; border-radius: 16px;">
                    <h1 style="color: #aa3bff; margin-bottom: 20px;">¡Bienvenido a ProSports!</h1>
                    <p style="color: #6b6375; font-size: 16px; line-height: 1.5;">Para activar tu cuenta y empezar a organizar eventos, por favor verifica tu correo electrónico haciendo clic en el siguiente botón:</p>
                    <div style="margin: 30px 0; text-align: center;">
                        <a href="${verificationUrl}" style="background-color: #aa3bff; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Verificar cuenta</a>
                    </div>
                    <p style="color: #9ca3af; font-size: 14px;">Si no solicitaste esta cuenta, puedes ignorar este mensaje.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #9ca3af; font-size: 12px; text-align: center;">ProSports Team</p>
                </div>
            `,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: %s', info.messageId);
            return info;
        } catch (error) {
            console.error('Failed to send email to:', email);
            throw error; // Rethrow so AuthService can log the full error
        }
    }
}

export default new EmailService();
