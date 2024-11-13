import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  paymentMethod:{
    type: String,
    required: true,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery']
  },
  paymentStatus:{
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId:{
    type: String,
  },
  amountPaid:{
    type: Number,
    required: true
  },
  paymentDate:{
    type: Date,
    required: true,
    default: Date.now
  }
});


export const Payment = mongoose.model('Payment', paymentSchema);
