import mongoose from 'mongoose';

export interface IMessage extends mongoose.Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: Date;
}

const MessageSchema = new mongoose.Schema<IMessage>({
  name: { 
    type: String, 
    required: [true, 'Name is required'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: { 
    type: String, 
    trim: true 
  },
  message: { 
    type: String, 
    required: [true, 'Message is required'], 
    trim: true 
  },
  status: {
    type: String,
    enum: ['pending', 'read', 'replied'],
    default: 'pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  collection: 'contacts'
});

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema); 