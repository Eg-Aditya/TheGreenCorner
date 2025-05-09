import React from "react";
import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  // Assuming order details are passed via state in React Router
  const location = useLocation();
  const {orderDetails} = location.state || {};
  console.log(orderDetails);
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
        🎉 Thank You for Your Order!
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Your order has been successfully placed. Below are the details:
      </p>

      {/* Order Summary */}
      <div className="border border-gray-300 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">🛍️ Order Summary</h3>
        <p>
          <strong>Order ID:</strong> {orderDetails.id || "123456"}
        </p>
        <p>
          <strong>Date:</strong> {orderDetails.date || new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Billing & Shipping Details */}
      <div className="border border-gray-300 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">📍 Shipping Details</h3>
        <p>
          <strong>Name:</strong> {orderDetails.firstName || "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {orderDetails.address || "123 Main Street, City, Country"}
        </p>
        <p>
          <strong>Phone:</strong> {orderDetails.phone || "+91 9876543210"}
        </p>
      </div>

      {/* Product List */}
      <div className="border border-gray-300 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">📦 Products Ordered</h3>
        <ul className="list-disc pl-5">
          {orderDetails.products?.length ? (
            orderDetails.products.map((product, index) => (
              <li key={index} className="mb-2">
                {product.name} - ₹{product.price} x {product.quantity}
              </li>
            ))
          ) : (
            <li>No products found</li>
          )}
        </ul>
      </div>

      {/* Payment Summary */}
      <div className="border border-gray-300 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">💳 Payment Summary</h3>
        <p>
          <strong>Subtotal:</strong> ₹{orderDetails.subtotal?.toFixed(2) || "0.00"}
        </p>
        <p>
          <strong>GST (18%):</strong> ₹
          {(orderDetails.subtotal ? orderDetails.subtotal * 0.18 : 0).toFixed(2)}
        </p>
        <p className="font-bold text-lg">
          <strong>Total Amount:</strong> ₹
          {(orderDetails.subtotal ? orderDetails.subtotal * 1.18 : 0).toFixed(2)}
        </p>
      </div>

      {/* Thank You Message */}
      <div className="text-center">
        <p className="text-lg font-semibold">🎈 Your order will be delivered soon! 🚚</p>
        <p className="text-gray-500">For any queries, contact thegreencorner@nursery.com</p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
