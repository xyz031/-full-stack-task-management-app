import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const [cart, setCart] = useState([]);  // Ensure cart is initialized as an empty array
  const [notification, setNotification] = useState('');


  
  

  // useEffect(() => {
  //   setCart(cart)
  // console.log(cart)
  // }, [cart]);
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
  
    setNotification(`${item.name} added to cart`);
    setTimeout(() => setNotification(''), 2000);
  };
  
  

  return (
    <AppContext.Provider value={{ token, setToken,  cart,setCart, addToCart }}>
      {children}
      {notification && (
        <div className="fixed top-4 right-4 p-3 bg-green-500 text-white rounded shadow">
          {notification}
        </div>
      )}
    </AppContext.Provider>
  );
};
