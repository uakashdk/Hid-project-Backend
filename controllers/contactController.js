const transporter = require('../config/mailer');

const sendContactEmail = async (req, res) => {
    const { firstName, lastName, email, phone, message, consent } = req.body;

    if (!firstName || !lastName || !email || !phone || !message || !consent) {
        return res.status(400).json({ error: 'All fields and consent are required.' });
    }

    try {
        const mailOptions = {
            from: `"${firstName} ${lastName}" <${process.env.SMTP_USER}>`,
            to: process.env.OWNER_EMAIL,
            replyTo: email,
            subject: `New Inquiry from ${firstName} ${lastName}`,
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\nConsent: ${consent ? 'Yes' : 'No'}`,
            html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Phone:</strong> ${phone}</p>
                   <p><strong>Message:</strong></p>
                   <p>${message.replace(/\n/g, '<br>')}</p>
                   <p><strong>Consent Given:</strong> ${consent ? 'Yes' : 'No'}</p>`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Inquiry sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send inquiry. Please try again later.' });
    }
};

module.exports = {
    sendContactEmail
};
