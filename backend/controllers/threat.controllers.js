import Threat from "../models/threat.models.js";
import { analyzeThreat } from "../utils/AiThreatAnalysis.js";

// Get all stored threats
export const getThreats = async (req, res) => {
  try {
    const threats = await Threat.find();
    res.json(threats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Analyze new log data and store detected threats
export const detectAndStoreThreat = async (req, res) => {
  try {
    const { log } = req.body;

    // Validate input
    if (!log || typeof log !== "string") {
      return res.status(400).json({ message: "Invalid log data" });
    }

    // Analyze the threat level
    const threatLevel = analyzeThreat(log);

    // Store the detected threat in the database
    const newThreat = new Threat({ log, severity: threatLevel });
    await newThreat.save();

    res.json({ message: "Threat detected and stored", threat: newThreat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
