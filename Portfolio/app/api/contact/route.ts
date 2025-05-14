import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Dynamic imports for MongoDB
let connectMongoDB: any;
let Message: any;

// Log environment variables for debugging
console.log('DEBUG - API Environment Variables:');
console.log('EMAIL_HOST exists:', !!process.env.EMAIL_HOST);
console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
console.log('PERSONAL_EMAIL exists:', !!process.env.PERSONAL_EMAIL);
console.log('DISABLE_EMAIL_SENDING:', process.env.DISABLE_EMAIL_SENDING);
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI pattern match:', process.env.MONGODB_URI?.includes('mongodb://') || process.env.MONGODB_URI?.includes('mongodb+srv://'));

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

// Create Google-specific SMTP transporter for Gmail
console.log('Creating Gmail-specific transporter with config');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true
});

// Verify transporter configuration works
transporter.verify(function(error, success) {
  if (error) {
    console.error('Nodemailer transporter verification failed:', error);
  } else {
    console.log('Nodemailer server is ready to take our messages');
  }
});

const sendEmail = async (options: any) => {
  try {
    const info = await transporter.sendMail(options);
    console.log('Email sent successfully:', info.response);
    return { success: true, info };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};

export async function POST(request: NextRequest) {
  console.log('===== CONTACT FORM SUBMISSION STARTED =====');
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
    console.log('Received form data:', { name, email, phone: phone || '[not provided]', messageLength: message?.length });

    // Validate input
    if (!name || !email || !message) {
      console.error('Validation failed - missing required fields');
      return NextResponse.json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      }, { status: 400 });
    }

    // Create message in MongoDB
    let newMessage;
    let dbSuccess = false;
    try {
      console.log('Attempting to save message to database...');
      newMessage = await Message.create({
        name,
        email,
        phone: phone || '',
        message,
        status: 'pending'
      });
      console.log('Message saved to database:', newMessage._id);
      dbSuccess = true;
    } catch (saveError) {
      console.error('Error saving message to database:', saveError);
      newMessage = { _id: 'error-saving-' + Date.now() };
    }

    // Email sending
    let emailStatus = { 
      success: false,
      adminEmail: false, 
      userEmail: false, 
      error: null 
    };

    // Only attempt email sending if not explicitly disabled
    const disableEmail = process.env.DISABLE_EMAIL_SENDING === 'true';
    
    if (!disableEmail) {
      try {
        console.log('Sending admin notification email to:', process.env.PERSONAL_EMAIL);
        
        // Send admin notification
        const adminMailResult = await sendEmail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.PERSONAL_EMAIL,
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
        
        emailStatus.adminEmail = adminMailResult.success;
        
        // Send confirmation to user
        console.log('Sending confirmation email to user:', email);
        const userMailResult = await sendEmail({
          from: `"Shubham Shukla" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Message Received - Shubham Shukla Portfolio',
          html: `
            <h2>Thank you for your message, ${name}!</h2>
            <p>I have received your message and will get back to you soon.</p>
            <p>Best regards,<br/>Shubham Shukla</p>
          `
        });
        
        emailStatus.userEmail = userMailResult.success;
        emailStatus.success = adminMailResult.success && userMailResult.success;
        
      } catch (error: any) {
        console.error("Email sending error:", error);
        emailStatus.error = error.message || 'Unknown error sending emails';
      }
    } else {
      console.log('Email sending is disabled by configuration');
    }

    // Determine appropriate success message based on email status
    let userMessage = 'Message sent successfully!';
    
    if (dbSuccess && !emailStatus.success) {
      userMessage = 'Your message has been saved, but there was an issue sending the email notification. We\'ll still see your message and get back to you.';
    }

    console.log('===== CONTACT FORM SUBMISSION COMPLETED =====');
    return NextResponse.json({ 
      success: true, 
      message: userMessage,
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