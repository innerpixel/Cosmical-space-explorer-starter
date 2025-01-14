import mongoose from 'mongoose';

const profileRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['explorer', 'scientist', 'engineer', 'commander']
  },
  description: {
    type: String,
    required: true,
    minLength: 50,
    maxLength: 1000
  },
  skills: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  currentProfile: {
    type: String,
    required: true
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewNote: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
profileRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add indexes for common queries
profileRequestSchema.index({ status: 1, createdAt: -1 });
profileRequestSchema.index({ userId: 1, status: 1 });

const ProfileRequest = mongoose.model('ProfileRequest', profileRequestSchema);

export default ProfileRequest;
