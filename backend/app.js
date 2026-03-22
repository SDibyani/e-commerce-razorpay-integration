
// import cors from 'cors';
// import express from 'express';
// import payment from './routes/productRoutes.js';

// const app=express();

// app.use(cors({
//   origin: "http://localhost:5173", // your frontend URL
//   credentials: true
// }));

// app.use(express.json());

// app.use("/api/v1",payment);
// export default app;


import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/productRoutes.js';

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use("/api/v1", paymentRoutes);

export default app;
