// backend/controllers/adminController.js
import User from '../models/User.js';
import Attendance from '../models/Attendance.js';
import Request from '../models/Request.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('user', 'name email');
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance' });
  }
};
