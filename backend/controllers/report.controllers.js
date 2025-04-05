import Report from "../models/report.models.js";

export const createReport = async (req, res) => {
  try {
    const { description, severity } = req.body;
    const newReport = new Report({ userId: req.user.userId, description, severity });

    await newReport.save();
    res.status(201).json({ message: "Report created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.userId });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
