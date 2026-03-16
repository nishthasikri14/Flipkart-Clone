import axios from "axios";

const URL = "https://flipkart-clone-hyap.onrender.com";

export const loadRazorpay = async (price) => {
  const orderAmount = Number(price) * 100;

  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;

  script.onerror = () => {
    alert("Razorpay SDK failed to load. Check your internet connection.");
  };

  script.onload = async () => {
    try {

      // create order from backend
      const orderResponse = await axios.post(`${URL}/create-order`, {
        amount: orderAmount,
      });

      const { amount, id: order_id, currency } = orderResponse.data;

      // get razorpay key
      const keyResponse = await axios.get(`${URL}/get-razorpay-key`);
      const razorpayKey = keyResponse.data.key;

      const options = {
        key: razorpayKey,
        amount: amount.toString(),
        currency: currency,
        name: "Flipkart Clone",
        description: "Payment for your order",
        order_id: order_id,

        handler: async function (response) {
          try {

            await axios.post(`${URL}/pay-order`, {
              amount: orderAmount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            const paymentId = response.razorpay_payment_id;

            window.location.href = `/success?id=${paymentId}`;

          } catch (error) {
            alert("Payment verification failed: " + error.message);
          }
        },

        prefill: {
          name: "Guest User",
          email: "user@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#2874f0",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Backend server error while creating order.");
    }
  };

  document.body.appendChild(script);
};