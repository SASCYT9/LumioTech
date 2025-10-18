const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Can be null for guest orders
  },
  orderType: {
    type: String,
    enum: ['3d_model', 'custom'],
    required: true
  },
  // Contact info for guest orders
  guestInfo: {
    name: String,
    email: String,
    phone: String
  },
  // Order details
  items: [{
    fileName: String,
    filePath: String,
    material: String,
    quality: String,
    quantity: Number,
    dimensions: {
      x: Number,
      y: Number,
      z: Number
    },
    volume: Number,
    price: Number
  }],
  // Custom order details
  customDetails: {
    projectDescription: String,
    requirements: String,
    deadline: Date,
    budget: String,
    files: [String]
  },
  // Pricing
  pricing: {
    materialCost: Number,
    laborCost: Number,
    supportCost: Number,
    setupCost: Number,
    postProcessingCost: Number,
    subtotal: Number,
    discount: Number,
    total: Number
  },
  // Order status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_production', 'ready', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  // Progress tracking
  progress: [{
    stage: String,
    completedAt: Date,
    notes: String
  }],
  // Payment
  payment: {
    method: String,
    status: {
      type: String,
      enum: ['pending', 'partial', 'paid'],
      default: 'pending'
    },
    prepaymentAmount: Number,
    prepaymentDate: Date,
    finalPaymentAmount: Number,
    finalPaymentDate: Date
  },
  // Delivery
  shippingAddress: String,
  estimatedDeliveryDate: Date,
  actualDeliveryDate: Date,
  trackingNumber: String,
  // Metadata
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
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate order number
orderSchema.statics.generateOrderNumber = async function() {
  const count = await this.countDocuments();
  return `#${(count + 12341).toString().padStart(5, '0')}`;
};

module.exports = mongoose.model('Order', orderSchema);
