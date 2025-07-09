import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- added
import AddProductForm from '../../components/AddProductForm';
import '../../App.css';

const EcomDashboard = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const navigate = useNavigate(); // <-- added

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>E-commerce Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <p>Welcome to the E-commerce dashboard. You are now authenticated.</p>
      <div className="admin-actions">
        <button onClick={() => setIsAddProductModalOpen(true)}>Add Product</button>
        <button onClick={() => navigate('/admin/edit-product')}>Edit Product</button>
        <button onClick={() => navigate('/admin/delete-product')}>Delete Product</button>
      </div>
      <AddProductForm
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </div>
  );
};

export default EcomDashboard;
