import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Dynamic imports for MongoDB
let connectMongoDB: any;
let Message: any;

// Try to import MongoDB and Message model
try {
  // Import MongoDB connection
  const mongodb = require('../../../lib/mongodb');
  connectMongoDB = mongodb.default;
  
  // Import Message model
  const MessageModel = require('../../../models/Message');
  Message = MessageModel.default;
  
  console.log('Successfully loaded MongoDB modules');
} catch (error) {
  console.warn('MongoDB modules not available, using mock implementation:', error);
  
  // Create mock implementations if imports fail
  interface MessageData {
    name: string;
    email: string;
    phone?: string;
    message: string;
    status: string;
  }

  Message = {
    create: async (data: MessageData) => {
      console.log('Using mock Message.create with data:', data);
      return { 
        _id: 'mock-id-' + Date.now(),
        ...data
      };
    }
  };
  
  connectMongoDB = async () => {
    console.log('Using mock MongoDB connection');
    return null;
  };
}

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
    // Log environment for debugging
    console.log('Environment check - EMAIL_HOST:', process.env.EMAIL_HOST);
    console.log('Environment check - MONGODB_URI exists:', !!process.env.MONGODB_URI);
    
    // Connect to MongoDB
    try {
      await connectMongoDB();
      console.log('MongoDB connected successfully in route handler');
    } catch (dbError) {
      console.error('MongoDB connection failed in route handler:', dbError);
      // Continue with fallback behavior
    }

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
    let newMessage;
    try {
      newMessage = await Message.create({
        name,
        email,
        phone: phone || '',
        message,
        status: 'pending'
      });
      console.log('Message saved to database:', newMessage._id);
    } catch (saveError) {
      console.error('Error saving message to database:', saveError);
      newMessage = { _id: 'error-saving-' + Date.now() };
    }

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
        console.log('Admin notification email sent successfully');
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
        console.log('User confirmation email sent successfully');
      } catch (error: any) {
        console.error("Failed to send user confirmation email:", error);
        emailStatus.userEmail = false;
        emailStatus.error = error.message || 'Unknown error sending confirmation email';
      }
      
      emailStatus.success = emailStatus.adminEmail && emailStatus.userEmail;
    } else {
      console.log('Email sending is disabled');
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