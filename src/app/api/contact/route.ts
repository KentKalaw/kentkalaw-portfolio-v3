import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

  const myEmail = "kentfranciskalaw@gmail.com";
  
  try {
    const { name, email, subject, message, recaptchaToken } = await req.json();

    if (!recaptchaToken) {
      return NextResponse.json(
        { message: 'reCAPTCHA token is missing' },
        { status: 400 }
      );
    }

     const verificationResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );

    const verificationData = await verificationResponse.json();

    if (!verificationData.success || verificationData.score < 0.5) {
      console.log('reCAPTCHA verification failed:', verificationData);
      return NextResponse.json(
        { 
          message: 'reCAPTCHA verification failed. Please try again.',
          score: verificationData.score 
        },
        { status: 403 }
      );
    }

     if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const sanitize = (str: string) => str.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", 
      to: myEmail,
      replyTo: email,
      subject: `New Message: ${sanitize(subject)}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <p><strong>Subject:</strong> ${sanitize(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitize(message).replace(/\n/g, '<br>')}</p>
      `,
    });

   return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email." },
      { status: 500 }
    );
  }
}