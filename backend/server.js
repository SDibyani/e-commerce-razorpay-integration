
// import app from './app.js';
// import dotenv from 'dotenv';
// dotenv.config({path:"./backend/config/config.env"});
// import Razorpay from 'razorpay';



// const port=process.env.PORT || 3000;

// console.log("Key:", process.env.RAZORPAY_API_KEY);
// console.log("Secret:", process.env.RAZORPAY_API_SECRET);

// export const instance=new Razorpay({
//     key_id:process.env.RAZORPAY_API_KEY,
//     key_secret:process.env.RAZORPAY_API_SECRET
// })

// app.listen(port,()=>{
//     console.log(`Server is running on port ${port} `);
// })

import app from './app.js';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/config/config.env' });

import Razorpay from 'razorpay';

// Debug to check env variables
console.log("Key:", process.env.RAZORPAY_API_KEY);
console.log("Secret:", process.env.RAZORPAY_API_SECRET);

// Create Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
