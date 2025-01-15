import ProfileRequest from '../models/ProfileRequest.js';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

export const submitRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    console.log('Request body:', req.body);
    console.log('User from request:', req.user);

    const { type, description, skills, currentProfile } = req.body;
    const userId = req.user.id; // From auth middleware

    // Check if user has a pending request
    const pendingRequest = await ProfileRequest.findOne({
      userId,
      status: 'pending'
    });

    if (pendingRequest) {
      return res.status(400).json({
        message: 'You already have a pending profile request'
      });
    }

    const profileRequest = new ProfileRequest({
      userId,
      type,
      description,
      skills,
      currentProfile
    });

    console.log('Profile request to save:', profileRequest);

    await profileRequest.save();

    res.status(201).json({
      message: 'Profile request submitted successfully',
      request: profileRequest
    });
  } catch (error) {
    console.error('Profile request submission error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      message: 'Failed to submit profile request',
      error: error.message
    });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const requests = await ProfileRequest.find({ status: 'pending' })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error('Get pending requests error:', error);
    res.status(500).json({
      message: 'Failed to fetch pending requests'
    });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const adminId = req.user.id;

    const request = await ProfileRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({
        message: 'Profile request not found'
      });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({
        message: 'This request has already been processed'
      });
    }

    // Update request status
    request.status = 'approved';
    request.reviewedBy = adminId;
    request.reviewNote = req.body.note;
    await request.save();

    // Update user profile
    await User.findByIdAndUpdate(request.userId, {
      profile: { type: request.type }
    });

    res.json({
      message: 'Profile request approved successfully',
      request
    });
  } catch (error) {
    console.error('Approve request error:', error);
    res.status(500).json({
      message: 'Failed to approve request'
    });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const adminId = req.user.id;

    const request = await ProfileRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({
        message: 'Profile request not found'
      });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({
        message: 'This request has already been processed'
      });
    }

    request.status = 'rejected';
    request.reviewedBy = adminId;
    request.reviewNote = req.body.reason;
    await request.save();

    res.json({
      message: 'Profile request rejected successfully',
      request
    });
  } catch (error) {
    console.error('Reject request error:', error);
    res.status(500).json({
      message: 'Failed to reject request'
    });
  }
};

export const getUserRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await ProfileRequest.find({ userId })
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error('Get user requests error:', error);
    res.status(500).json({
      message: 'Failed to fetch user requests'
    });
  }
};

export const getRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user.id;

    const request = await ProfileRequest.findOne({
      _id: requestId,
      userId
    });

    if (!request) {
      return res.status(404).json({
        message: 'Profile request not found'
      });
    }

    res.json({
      status: request.status,
      updatedAt: request.updatedAt,
      reviewNote: request.reviewNote
    });
  } catch (error) {
    console.error('Get request status error:', error);
    res.status(500).json({
      message: 'Failed to fetch request status'
    });
  }
};
