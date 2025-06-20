import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import theme from './theme';
import bodyBg from './assets/body-bg.png'; // Import the background image
import Notification from './components/Notification';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import DeleteProductForm from './components/DeleteProductForm';

// Components
import LandingPageNavbar from './components/LandingPageNavbar/Navbar';
import LandingPage from './components/LandingPage';
import SearchBar from './components/SearchBar';
import CategoryCards from './components/CategoryCards';
import FilterBar from './components/FilterBar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './components/Shop/ProductDetails';
import Cart from './components/Shop/Cart';
import GameModes from './pages/GameModes';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/AdminLogin';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated using sessionStorage
  const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
  
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

// Simple admin dashboard component
const AdminDashboard = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);

  // For demo, you can set a default productId and productName for edit/delete modals
  const demoProductId = '';
  const demoProductName = '';

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-dashboard centered-admin-dashboard">
      <div className="admin-header centered-admin-header">
        <h1 className="centered-admin-title">Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <p className="centered-admin-welcome">Welcome to the admin dashboard. You are now authenticated.</p>
      <div className="centered-admin-actions">
        <button
          className="admin-action-btn"
          onClick={() => setIsAddProductModalOpen(true)}
        >
          Add Product
        </button>
        <button
          className="admin-action-btn"
          onClick={() => setIsEditProductModalOpen(true)}
        >
          Edit Product
        </button>
        <button
          className="admin-action-btn"
          onClick={() => setIsDeleteProductModalOpen(true)}
        >
          Delete Product
        </button>
      </div>
      <AddProductForm
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
      <EditProductForm
        isOpen={isEditProductModalOpen}
        onClose={() => setIsEditProductModalOpen(false)}
        productId={demoProductId}
      />
      <DeleteProductForm
        isOpen={isDeleteProductModalOpen}
        onClose={() => setIsDeleteProductModalOpen(false)}
        productId={demoProductId}
        productName={demoProductName}
      />
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isShopPage = location.pathname.startsWith('/shop');
  const isProductDetailsPage = location.pathname.startsWith('/product/');
  const isAdminLogin = location.pathname === '/admin/login';
  const isAdminDashboard = location.pathname === '/admin/dashboard';
  const isWishlist = location.pathname === '/wishlist';
  const isCart = location.pathname === '/cart';
  const isGameModes = location.pathname === '/game-modes';
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';
  const isProfile = location.pathname === '/profile';
  const isOrders = location.pathname === '/orders';
  const isSettings = location.pathname === '/settings';
  const isCheckout = location.pathname === '/checkout';
  const isOrderConfirmation = location.pathname === '/order-confirmation';

  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflowX: 'hidden',
    // background: `url(${bodyBg}) no-repeat center center fixed`,
    // backgroundSize: 'cover',
  };

  return (
    <div style={{ ...appStyle, backgroundColor: '#121212' }}>
      {!(isAdminLogin || isAdminDashboard) && <LandingPageNavbar />}
      <main style={{
        flex: 1,
        // background: `url(${bodyBg}) no-repeat center center fixed`,
        // backgroundSize: 'cover',
        // backgroundColor: 'transparent',
      }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/game-modes" element={<GameModes />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!(isAdminLogin || isAdminDashboard) && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <WishlistProvider>
          <Router>
            <AppContent />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
