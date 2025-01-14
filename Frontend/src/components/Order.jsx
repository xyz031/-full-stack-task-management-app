import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const OrderHistory = () => {
  const { token, cart, setCart } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = localStorage.getItem('userId');

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = useCallback(async () => {
    if (!userId) {
      setError('User ID not found. Please log in again.');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setPlacingOrder(true);
    setError('');
    setSuccess('');

    try {
      const orderData = {
        userId: userId,
        items: cart.map((item) => ({
          menuItemId: item._id,
          quantity: item.quantity,
        })),
      };

      await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: { Authorization: `${token}` },
      });

      setSuccess('Order placed successfully!');
      setCart([]); // Clear cart after placing order
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  }, [cart, token, userId, setCart]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setError('User ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${userId}`, {
          headers: { Authorization: `${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch order history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token, userId]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="py-4 col-span-full">
        <h2 className="text-2xl font-bold">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center p-2 border-b">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
        {cart.length > 0 && (
          <div className="text-right mt-4">
            <strong>Total: ₹{totalPrice.toFixed(2)}</strong>
            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className={`ml-4 px-4 py-2 rounded text-white ${
                placingOrder ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {placingOrder ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>

      <h2 className="text-2xl font-bold mb-4">Order History</h2>

      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 && !loading && !error ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 bg-white shadow rounded border border-gray-200"
            >
              <h3 className="font-semibold text-lg">Order #{order._id}</h3>
              <p className="text-sm text-gray-500">
                Total Amount: ₹{order.totalAmount.toFixed(2)}
              </p>
              <p
                className={`text-sm font-medium ${
                  order.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'
                }`}
              >
                Status: {order.status}
              </p>
              <ul className="mt-2 space-y-1">
                {order.items.map((item) => (
                  <li key={item.menuItemId?._id || item._id} className="flex justify-between">
                    {item.menuItemId ? (
                      <>
                        <span>
                          {item.menuItemId.name} x {item.quantity}
                        </span>
                        <span>
                          ${(item.menuItemId.price * item.quantity).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500">Item no longer available</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
