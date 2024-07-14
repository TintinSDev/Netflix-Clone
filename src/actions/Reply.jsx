// import { Resend } from 'resend';


const RESEND_API_KEY = 're_YQT3zb5C_9pkqXYBdQWWKveUHqZGp57eW';

export const sendEmail = (email, message) => async () => {
  const res = await fetch('https://127.0.0.1:5000/send-email', {
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
// require('dotenv').config();
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);
// console.log(process.env.REACT_APP_RESEND_API_KEY);


// export const sendEmail = async (email, message) => {
//   try {
//     const res = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: [email],
//       subject: 'Welcome to Tinflix',
//       html: `<strong>${message}</strong>`,
//     });

//     return res;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error('Email sending failed');
//   }
// };

// const res = await fetch('http://127.0.0.1:5000/send-email, {
