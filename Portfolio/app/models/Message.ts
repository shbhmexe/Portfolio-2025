import mongoose, { Schema } from 'mongoose';

// Define the Message schema
const MessageSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  message: {
    type: String,
    required: [true, 'Message content is required']
  },
  status: {
    type: String,
    enum: ['pending', 'read', 'replied', 'archived'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Message model
// Use this approach to prevent model redefinition errors
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message; 