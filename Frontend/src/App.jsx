import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppContext, AppProvider } from './context/AppContext';
import Login from './components/Login';
import Menu from './components/Menu';
import OrderHistory from './components/Order';
import Navbar from './components/Navbar';
import Register from './components/Register';
import { Toaster } from 'react-hot-toast';

// Route guard component
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AppContext);
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
