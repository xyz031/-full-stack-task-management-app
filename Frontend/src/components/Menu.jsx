import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Menu = () => {
  const { addToCart, token, setCart } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('https://full-stack-task-management-app-m4rh.onrender.com/api/menu', {
          headers: { Authorization: `${token}` },
        });
        setMenuItems(res.data.map((item) => ({ ...item, id: item._id })));
      } catch (err) {
        console.error(err);
        toast.error('Failed to load menu items');
      }
    };

    if (token) {
      fetchItems();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        // Update existing menu item
        await axios.put(
          `https://full-stack-task-management-app-m4rh.onrender.com/api/menu/${editId}`,
          formData,
          { headers: { Authorization: `${token}` } }
        );
        toast.success('Menu item updated successfully!');
        setEditId(null);
      } else {
        // Create new menu item
        await axios.post(
          'https://full-stack-task-management-app-m4rh.onrender.com/api/menu',
          formData,
          { headers: { Authorization: `${token}` } }
        );
        toast.success('Menu item added successfully!');
      }

      const updatedMenuItems = await axios.get('https://full-stack-task-management-app-m4rh.onrender.com/api/menu', {
        headers: { Authorization: `${token}` },
      });
      setMenuItems(updatedMenuItems.data);
      setFormData({ name: '', category: '', price: '', availability: false });
    } catch (err) {
      console.error(err);
      toast.error('Failed to save menu item');
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

    try {
      await axios.delete(`https://full-stack-task-management-app-m4rh.onrender.com/api/menu/${id}`, {
        headers: { Authorization: `${token}` },
      });
      toast.success('Menu item deleted successfully');
      const updatedMenuItems = await axios.get('https://full-stack-task-management-app-m4rh.onrender.com/api/menu', {
        headers: { Authorization: `${token}` },
      });
      setMenuItems(updatedMenuItems.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete menu item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-[url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')] bg-cover min-h-screen">
      <h1 className="text-4xl font-bold  text-center mb-8">Menu Management</h1>
  
      <form 
        onSubmit={handleSubmit} 
        className="max-w-xl mx-auto mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div className="mb-4">
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
          className={`w-full px-4 py-3 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-green-500'} shadow-md`}
        >
          {editId ? 'Update Item' : 'Add Item'}
        </button>
      </form>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div 
            key={item._id} 
            className="p-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">Category: {item.category}</p>
            <p className="text-sm">Price: ₹{item.price}</p>
            <p className="text-sm">Availability: {item.availability ? 'Yes' : 'No'}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => addToCart(item, 1)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md"
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
