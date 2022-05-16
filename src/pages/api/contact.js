import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    }
  });

  const data = {
    from: 'no_reply@cherissaknol.nl',
    to: 'robingjkuiper@gmail.com',
    subject: 'Contact Form Message',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
    html: `<h1>${req.body.name} (${req.body.email})</h1> 
            <p>${req.body.message}</p>`
  };

  try {
    await transport.sendMail(data);
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err });
  }
}