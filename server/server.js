import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Resend } from 'resend';
import 'dotenv/config';
import path from 'path';

const app = express()
const port = process.env.SERVER_PORT;
const resendApiKey = process.env.RESEND_API_KEY;
const emailRecipientEmail = process.env.EMAIL_RECIPIENT;
const resendEmailFrom = process.env.FROM_EMAIL;
const wwwroot = path.join(process.cwd(), "wwwroot");

// Create an emailer instance for sending emails.
const emailer = new Resend(resendApiKey);
async function sendEmail({ applicantName, applicantEmail, applicantMessage }) {
    try {
        await emailer.emails.send({
            from: `Applicant <${resendEmailFrom}>`,
            to: [emailRecipientEmail],
            subject: `New Application from ${applicantName}`,
            html: `
            <h2>Application from ${applicantName}</h2>
            <h3>${applicantEmail}</h3>
            <p>${applicantMessage}</p>`,
        });
    } catch (error) {
        throw error; // Re-throw the error to handle it in the endpoint
    }
}


// accept JSON post requests.
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(wwwroot));
app.post('api/apply', async (req, res) => {
    const { applicantName, applicantEmail, applicantMessage } = req.body;

    if (!applicantName || !applicantEmail || !applicantMessage) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await sendEmail({ applicantName, applicantEmail, applicantMessage });
        res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to send application email' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(wwwroot, 'index.html'));
});

app.listen(port, () => console.log(`Application server running on port ${port}`));