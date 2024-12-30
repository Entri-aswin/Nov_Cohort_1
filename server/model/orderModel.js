const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sessionId: {
            type: String,
            required: true,
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
                required: true,
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        orderStatus: { type: String, enum: ["processing", "transit", "out-for-delivey", "delivered"] },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
