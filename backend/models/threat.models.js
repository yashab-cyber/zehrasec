import mongoose from "mongoose";

const ThreatSchema = new mongoose.Schema(
  {
    log: { 
      type: String, 
      required: true, 
      trim: true 
    },
    severity: { 
      type: String, 
      enum: ["Low", "Medium", "High"], 
      required: true,
      default: "Low"
    },
    // sourceIP: { 
    //   type: String, 
    //   required: false 
    // }
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

export default mongoose.model("Threat", ThreatSchema);
