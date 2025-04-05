// backend/models/Certificate.js
import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: {
    userName: String,
    courseName: String,
    date: Date
  },
  pdfUrl: String
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);
