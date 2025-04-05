// backend/controllers/serviceController.js
import Request from '../models/Request.js';

export const createRequest = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newRequest = await Request.create({ name, email, message });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Request submission failed' });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests' });
  }
};
