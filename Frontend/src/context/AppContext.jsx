import React, { createContext, useState } from 'react';
import { toast } from 'react-hot-toast';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [cart, setCart] = useState([]); // Ensure cart is initialized as an empty array

  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        const updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
        console.log('Updated cart:', updatedCart); // Log updated cart
        return updatedCart;
      }

      const newCart = [...prevCart, { ...item, quantity }];
      console.log('New cart:', newCart); // Log new cart
      return newCart;
    });

    // Use toast for notification
    toast.success(`${item.name} added to cart`);
  };

  return (
    <AppContext.Provider value={{ token, setToken, cart, setCart, addToCart }}>
      {children}
    </AppContext.Provider>
  );
};
