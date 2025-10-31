const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  failedAttempts: { 
    type: Number, 
    default: 0 
  },
  isBlocked: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true
});

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.passwordHash = await bcrypt.hash(this.password, 10);
  next();
});

// 🔧 MÉTODO COMPAREPASSWORD CORREGIDO
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('🔐 Comparing:', candidatePassword, 'with hash:', this.passwordHash);
    const isMatch = await bcrypt.compare(candidatePassword, this.passwordHash);
    console.log('🔐 Password match result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('🔐 Password comparison error:', error);
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);