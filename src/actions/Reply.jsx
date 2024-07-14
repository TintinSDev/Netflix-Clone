import { Resend } from 'resend';


const RESEND_API_KEY = 're_YQT3zb5C_9pkqXYBdQWWKveUHqZGp57eW';

export async function sendEmail(email, message) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'TintinSDev Web 😃 <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Tinflix',
      html: `
        <h5>Welcome to Tinflix 😁</h5>
        <p>${message}</p>
      `,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Email sending failed');
  }

  return await res.json();
}

