import express from 'express';
import { sendEmail } from './actions/Reply'; // Update the path accordingly
import process from 'process';

const app = express();
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { name, email } = req.body;

    try {
        // Ensure email and name are provided
        if (!email || !name) {
            return res.status(400).send({ error: 'Name and email are required' });
        }

        await sendEmail(email, "Welcome to our service!");
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ error: 'Failed to send email' });
    }
});
// Other routes and middleware
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
