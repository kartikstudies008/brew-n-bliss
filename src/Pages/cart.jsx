import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

const handleCheckout = async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const totalAmount = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace("Rs.", ""));
    return total + itemPrice * item.quantity;
  }, 0);

  try {
    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalAmount }),
    });

    const order = await res.json();

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // replace this with your key
      amount: order.amount,
      currency: order.currency,
      name: "Coffee Shop",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (response) {
        // ✅ Send order info + cart to backend
        const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: 1, // Replace with actual user ID if logged in
            cart,
            amount: totalAmount,
          }),
        });

        if (verifyRes.ok) {
          alert("Payment successful! Order placed.");
          localStorage.removeItem("cart");
          setCartItems([]);
        } else {
          alert("Payment verification failed.");
        }
      },
      theme: {
        color: "#6f4e37",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (err) {
    console.error("Checkout failed:", err);
    alert("Something went wrong during checkout.");
  }
};

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace('Rs.', ''));
      return total + itemPrice * item.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="p-6 bg-[#f8f1e4] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#4b3621] text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-4 rounded shadow-md justify-between animate-fade-in-up"
            >
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title || item.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h4 className="font-semibold text-[#4b3621]">{item.title || item.name}</h4>
                  <p className="text-sm text-gray-600">{item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(index)}
                  className="text-[#6f4e37] px-2 py-1 border border-[#6f4e37] rounded"
                >
                  -
                </button>
                <span className="text-[#4b3621]">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(index)}
                  className="text-[#6f4e37] px-2 py-1 border border-[#6f4e37] rounded"
                >
                  +
                </button>
              </div>

              {/* Remove Item Button */}
              <button
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-800 font-bold text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price */}
          <div className="flex justify-between mt-6">
            <span className="font-semibold text-[#4b3621] text-xl">Total Price:</span>
            <span className="font-semibold text-[#6f4e37] text-xl">Rs{calculateTotalPrice()}</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="block mx-auto bg-[#4b3621] text-white px-6 py-2 rounded-lg shadow hover:bg-[#6f4e37] transition"
          >
            Buy Now
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Cart;
