import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Menu = () => {
  const { menuItems, addToCart, cart, token, setCart, fetchMenuItems } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    availability: false,
  });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editId) {
        // Update existing menu item
        await axios.put(`http://localhost:5000/api/menu/${editId}`, formData, {
          headers: { Authorization: `${token}` },
        });
        setEditId(null);
      } else {
        // Create new menu item
        await axios.post('http://localhost:5000/api/menu', formData, {
          headers: { Authorization: `${token}` },
        });
      }
      fetchMenuItems(); // Refresh menu items after adding/updating
      setFormData({ name: '', category: '', price: '', availability: false });
      setSuccess('Menu item saved successfully!');
    } catch (err) {
      setError('Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({ ...item });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`, {
        headers: { Authorization: `${token}` },
      });
      fetchMenuItems();
      setSuccess('Menu item deleted successfully');
    } catch (err) {
      setError('Failed to delete menu item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>

      {/* Error or success message */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {/* Form for creating/updating menu items */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleInputChange}
              className="mr-2"
            />
            Available
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-green-500'}`}
        >
          {editId ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      {/* Display menu items in a grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <div key={item._id} className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">Category: {item.category}</p>
            <p className="text-sm">Price: ₹{item.price}</p>
            <p className="text-sm">Availability: {item.availability ? 'Yes' : 'No'}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => addToCart(item, 1)}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
