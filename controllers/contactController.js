const transporter = require('../config/mailer');

const sendContactEmail = async (req, res) => {
    const { name, email, details } = req.body;

    if (!name || !email || !details) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: process.env.OWNER_EMAIL,
            replyTo: email,
            subject: `New Inquiry from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nProject Details:\n${details}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Project Details:</strong></p>
                   <p>${details.replace(/\n/g, '<br>')}</p>`,
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
