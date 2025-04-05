// backend/controllers/certController.js
import Certificate from '../models/Certificate.js';
import PDFDocument from 'pdfkit';

export const generateCertificate = async (req, res) => {
  try {
    const { userName, courseName, date } = req.body;
    const doc = new PDFDocument();
    
    doc.text('ZEHRASEC Cybersecurity Certification', { align: 'center' })
       .moveDown(2)
       .text(`Awarded to: ${userName}`)
       .text(`For completing: ${courseName}`)
       .text(`Date: ${new Date(date).toLocaleDateString()}`);

    const certificate = await Certificate.create({
      user: req.user.userId,
      content: { userName, courseName, date }
    });

    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Certificate generation failed' });
  }
};
