import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../lib/mongodb';
import Message from '../../models/Message';
import nodemailer from 'nodemailer';

// Nodemailer transporter configuration with secure settings
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  }
});

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Parse request body
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      }, { status: 400 });
    }

    // Create message in MongoDB
    const newMessage = await Message.create({
      name,
      email,
      phone: phone || '',
      message,
      status: 'pending'
    });

    // Only attempt email sending if not explicitly disabled
    const disableEmail = process.env.DISABLE_EMAIL_SENDING === 'true';
    let emailStatus = { success: true, adminEmail: true, userEmail: true, error: null };
    
    if (!disableEmail) {
      try {
        // Send email notification to admin (you)
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.PERSONAL_EMAIL, // Your personal email
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Message from Portfolio Contact Form</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr/>
            <small>Message ID: ${newMessage._id}</small>
          `
        });
      } catch (error: any) {
        console.error("Failed to send admin notification email:", error);
        emailStatus.adminEmail = false;
        emailStatus.error = error.message || 'Unknown error sending admin email';
      }

      try {
        // Send confirmation email to sender
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Message Received - Shubham Shukla Portfolio',
          html: `
            <h2>Thank you for your message, ${name}!</h2>
            <p>I have received your message and will get back to you soon.</p>
            <p>Best regards,<br/>Shubham Shukla</p>
          `
        });
      } catch (error: any) {
        console.error("Failed to send user confirmation email:", error);
        emailStatus.userEmail = false;
        emailStatus.error = error.message || 'Unknown error sending confirmation email';
      }
      
      emailStatus.success = emailStatus.adminEmail && emailStatus.userEmail;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully!',
      messageId: newMessage._id,
      emailStatus: disableEmail ? 'disabled' : emailStatus
    }, { status: 200 });

  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Something went wrong' 
    }, { status: 500 });
  }
} 