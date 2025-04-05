import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  description: { 
    type: String, 
    required: true 
  },
  severity: { 
    type: String, 
    enum: ["Low", "Medium", "High"], 
    required: true 
  },
},{timestamps:true});

export default mongoose.model("Report", ReportSchema);
