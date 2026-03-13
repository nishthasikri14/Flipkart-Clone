import axios from 'axios';
const url = 'http://localhost:8000';

export const loadRazorpay = (price) => {
    // FIX 1: Convert to Number safely and multiply by 100 for Paise
    const orderAmount = Number(price) * 100; 

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    
    script.onerror = () => {
        alert('Razorpay SDK failed to load. Are you online?');
    };

    script.onload = async () => {
        try {
            // Backend call to create order
            const result = await axios.post(`${url}/create-order`, {
                amount: orderAmount,
            });
            
            const { amount, id: order_id, currency } = result.data;

            // Getting API Key from backend
            const { data: { key: razorpayKey } } = await axios.get(`${url}/get-razorpay-key`);

            const options = {
                key: razorpayKey,
                amount: amount.toString(),
                currency: currency,
                name: 'Flipkart Clone',
                description: 'Payment for your order',
                order_id: order_id,
                handler: async function (response) {
                    try {
                        // Verifying payment on backend
                        const paymentResult = await axios.post(`${url}/pay-order`, {
                            amount: orderAmount,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                        });

                        // FIX 2: Success Redirection with Order ID
                        // Alert ki jagah hum seedhe Success page par bhejenge
                        const paymentId = response.razorpay_payment_id;
                        window.location.href = `/success?id=${paymentId}`;

                    } catch (payErr) {
                        alert("Payment verification failed at backend: " + payErr.message);
                    }
                },
                prefill: {
                    name: 'Guest User',
                    email: 'user@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#2874f0', // Flipkart Blue
                },
            };  
            
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (err) {
            // FIX 3: Detailed error for Status 500
            console.error("Payment Error:", err);
            alert("Status 500: Backend server is not responding correctly. Check terminal.");
        }
    };
    
    document.body.appendChild(script);
}