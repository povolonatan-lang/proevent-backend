import dotenv from 'dotenv';

dotenv.config();

class EmailService {
    constructor() {
        if (!process.env.BREVO_API_KEY) {
            console.warn('WARNING: Email Service missing BREVO_API_KEY in .env');
        } else {
            console.log('Email Service: Brevo API Key configured');
        }
    }

    async sendVerificationEmail(email, token) {
        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const verificationUrl = `${baseUrl}/verify-email?token=${token}`;
        
        const fromName = process.env.EMAIL_FROM_NAME || 'ProSports';
        // We use the same SMTP_USER env var for the sender email, since it's the verified email in Brevo
        const fromEmail = process.env.SMTP_USER || 'prinzi2900@gmail.com'; 

        const apiKey = process.env.BREVO_API_KEY;
        if (!apiKey) {
            console.error('Cannot send email: BREVO_API_KEY is missing');
            return null;
        }

        const payload = {
            sender: {
                name: fromName,
                email: fromEmail
            },
            to: [
                {
                    email: email
                }
            ],
            subject: 'Verifica tu cuenta de ProSports',
            htmlContent: `
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
            `
        };

        try {
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': apiKey,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                console.error('Brevo API Error Details:', data);
                throw new Error(data.message || 'Failed to send email via Brevo');
            }

            const data = await response.json();
            console.log('Email sent successfully via Brevo API, messageId:', data.messageId);
            return data;
        } catch (error) {
            console.error('Failed to send email to:', email, error.message);
            throw error;
        }
    }
}

export default new EmailService();
