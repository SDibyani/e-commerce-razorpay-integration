// import React from "react";
// import axios from 'axios';
// import "../styles/Products.css";

// function Products({products}) {
//      const checkoutHandler = async (amount) => {
//   try {
//     if (!window.Razorpay) {
//       alert("Razorpay SDK failed to load. Please check your internet connection.");
//       return;
//     }

//     // Get Razorpay key from backend
//     const { data: keyData } = await axios.get("/api/v1/getKey");
//     const { key } = keyData;

//     // Create order on backend
//     const { data: orderData } = await axios.post(
//       "/api/v1/payment/process",
//       { amount },
//       { headers: { "Content-Type": "application/json" } }
//     );

//     const { order } = orderData;

//     // Debug: check what order contains
//     console.log("Razorpay order:", order);

//     const options = {
//       key,
//       amount: order.amount, // must match backend's order amount in paise
//       currency: 'INR',
//       name: 'Dibyani',
//       description: 'Razorpay Integration',
//       order_id: order.id,
//       callback_url: '/api/v1/paymentVerification',
//       prefill: {
//         name: 'Dibyani',
//         email: 'sdibyani123@gmail.com',
//         contact: '7978947656'
//       },
//       theme: {
//         color: '#F37254'
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();

//   } catch (error) {
//     console.error("Payment error:", error);
//     alert("Something went wrong with payment. Check console for details.");
//   }
// };








    //  const checkoutHandler=async(amount)=>{
    //  const {data:keyData}=await axios.get("/api/v1/getKey"); 
    //  const {key}=keyData
     

    //  const {data:orderData}=await axios.post("/api/v1/payment/process",{
    //     amount
    //    })
    //    const {order}=orderData;
    //    console.log(order);
    //    const options = {
    //     key,
    //     amount,
    //     currency: 'INR',
    //     name: 'Dibyani',
    //     description: 'Razorpay Integration',
    //     order_id: order.id,
    //     callback_url: '/api/v1/paymentVerification', // Your success URL
    //     prefill: {
    //       name: 'Dibyani',
    //       email: 'sdibyani123@gmail.com',
    //       contact: '7978947656'
    //     },
    //     theme: {
    //       color: '#F37254'
    //     },
    //   };

    //   const rzp = new Razorpay(options);
    //   rzp.open();
    //  }



//   return (
//     <>
//       <div className="products-container">
//         {products.map((item)=>(
//            <div className="product-card" key={item.id}>
//           <img
//             src={item.image}
//             alt={item.title}
//             className="product-image"
//           ></img>
//           <h3 className="product-title">{item.title}</h3>
//           <p className="product-price">Price <strong>{item.price}</strong>/-</p>
//           <button className="pay-button" onClick={()=>checkoutHandler(item.price)}>Pay({item.price})/-</button>
//         </div>
//         ))}
        
//       </div>
//     </>
//   );
// }

// export default Products;




import React from "react";
import axios from 'axios';
import "../styles/Products.css";

function Products({ products }) {

  const checkoutHandler = async (amount) => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      // Get Razorpay key
      const { data: keyData } = await axios.get("/api/v1/getKey");
      const { key } = keyData;

      // Create order on backend
      const { data: orderData } = await axios.post(
        "/api/v1/payment/process",
        { amount },
        { headers: { "Content-Type": "application/json" } }
      );

      const { order } = orderData;

      const options = {
        key,
        amount: order.amount,
        currency: 'INR',
        name: 'Dibyani',
        description: 'Razorpay Integration',
        order_id: order.id,

        // ✅ ADD HANDLER HERE
      handler: async function (response) {
        const data = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

    //     // Send to backend for verification
    //     await axios.post("/api/v1/paymentVerification", data, {
    //       headers: { "Content-Type": "application/json" },
    //     });
    //   },


    try {
    const res = await axios.post("/api/v1/paymentVerification", data, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.data.success) {
      // ✅ Navigate on frontend instead of relying on backend redirect
      window.location.href = `/paymentSuccess?reference=${response.razorpay_payment_id}`;
    } else {
      alert("Payment verification failed!");
    }
  } catch (error) {
    console.error("Verification error:", error);
    alert("Something went wrong during verification!");
  }
},


        prefill: {
          name: 'Dibyani',
          email: 'sdibyani123@gmail.com',
          contact: '7978947656'
        },
        theme: { color: '#F37254' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Check console for details.");
    }
  };

  return (
    <div className="products-container">
      {products.map((item) => (
        <div className="product-card" key={item.id}>
          <img src={item.image} alt={item.title} className="product-image" />
          <h3 className="product-title">{item.title}</h3>
          <p className="product-price">Price <strong>{item.price}</strong>/-</p>
          <button className="pay-button" onClick={() => checkoutHandler(item.price)}>
            Pay({item.price})/-
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
