
// import {instance} from "../server.js";
// // export const processPayment=async(req,res)=>{
// //     const options={
// //         amount:Number(req.body.amount*100),
// //         currency:"INR"
// //     }

// //     const order=await instance.orders.create(options)
// //     res.status(200).json({
// //         success:true,
// //         order
// //     })
// // }

// //  xxxxxx
// export const processPayment = async (req, res) => {
//   try {
//     const { amount } = req.body;
//     if (!amount) return res.status(400).json({ success: false, message: "Amount is required" });

//     const options = { amount: Number(amount * 100), currency: "INR" };
//     const order = await instance.orders.create(options);

//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };




// export const getKey=async(req,res)=>{
//     res.status(200).json({
//         key:process.env.RAZORPAY_API_KEY
//     })
// }

import { instance } from "../server.js";
import crypto from "crypto";

export const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY
  });
};

export const processPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("Amount received from frontend:", amount);

    if (!amount) {
      return res.status(400).json({ success: false, message: "Amount is required" });
    }

    const options = {
      amount: Number(amount * 100), // amount in paise
      currency: "INR"
    };

    const order = await instance.orders.create(options);
    console.log("Razorpay Order:", order);

    res.status(200).json({ success: true, order });

  } catch (error) {
    console.error("Error in processPayment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// export const paymentVerification=async(req,res)=>{
//    const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;
//    const body=razorpay_order_id + "|" +razorpay_payment_id;
//    const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");
   
//    const isAuthentic=expectedSignature===razorpay_signature;
//    if(isAuthentic){
//     return res.redirect(`http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`)
//     }else{
//         res.status(400).json({
//             success:false
//         })
//     }
//    }


export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // ✅ Send JSON instead of redirect
    return res.status(200).json({
      success: true,
      reference: razorpay_payment_id,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

    