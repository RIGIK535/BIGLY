const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: [
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in progress', 'delivered'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
