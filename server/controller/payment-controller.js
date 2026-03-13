import Razorpay from "razorpay";
// import { pool } from "../database/db.js"; // Iski abhi zaroorat nahi hai jab tak DB mein save na karein

export const createOrder = async (request, response) => {
  try {
    // 1. Check karein ki Keys load ho rahi hain ya nahi
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return response.status(500).json({ msg: "Razorpay keys are missing in .env file" });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 2. FIX: Frontend se 'amount' aa raha hai, 'price' nahi
    // Saath hi safety ke liye Number() use karein
    const amountInPaise = Number(request.body.amount) * 100;

    if (isNaN(amountInPaise) || amountInPaise <= 0) {
        return response.status(400).json({ msg: "Invalid amount received by server" });
    }

    const options = {
      amount: amountInPaise, 
      currency: "INR",
      receipt: `receipt_${Date.now()}` // Ek unique receipt ID dena achhi practice hai
    };

    const order = await instance.orders.create(options);

    // Frontend ko order details bhejein
    response.status(200).json(order);

  } catch (error) {
    console.log("RAZORPAY ERROR: ", error); // Isse terminal mein asli error dikhega
    response.status(500).json({ error: error.message });
  }
};

export const payOrder = async (req, res) => {
  // Yahan aap payment verification logic likh sakte hain
  res.status(200).json({ msg: "Payment verified successfully" });
};

export const paymentResponse = async (req, res) => {
  res.status(200).json({ msg: "Payment response received" });
};