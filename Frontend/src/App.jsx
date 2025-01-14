import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './components/Login';
import Menu from './components/Menu';
import OrderHistory from './components/Order';
import Navbar from './components/Navbar';
import Register from './components/Register';


function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu />} />
        
          <Route path="/orders" element={<OrderHistory />} />
     
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
