import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Box,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem, removeFromCart, clearCart, setCoupon, clearCoupon } from '../../redux/reducers/cartReducer';
import { validateCouponCode } from '../../services/api';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const SHIPPING_COST = 99;
  const TAX_RATE = 0.18; // 18% GST
  const coupon = useSelector(state => state.cart.coupon);
  const discount = useSelector(state => state.cart.discount);
  const couponApplied = useSelector(state => state.cart.couponApplied);
  const [couponInput, setCouponInput] = React.useState("");
  const [couponError, setCouponError] = React.useState("");

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * TAX_RATE);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + SHIPPING_COST + calculateTax() - discount;
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    dispatch(updateCartItem({ itemId, quantity }));
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleApplyCoupon = async () => {
    setCouponError("");
    dispatch(clearCoupon());
    try {
      const data = await validateCouponCode(couponInput);
      let discountValue = 0;
      if (data.discountType === 'flat') {
        discountValue = data.discountValue;
      } else if (data.discountType === 'percent') {
        const totalBeforeDiscount = calculateSubtotal() + calculateTax();
        discountValue = Math.round(totalBeforeDiscount * (data.discountValue / 100));
      }
      dispatch(setCoupon({ coupon: couponInput, discount: discountValue, couponApplied: true }));
      setCouponError("");
    } catch (err) {
      dispatch(clearCoupon());
      setCouponError(err.toString());
    }
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            bgcolor: 'background.default',
            border: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cart.map((item) => (
            <Card key={item._id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <CardMedia
                      component="img"
                      image={item.imageUrl}
                      alt={item.name}
                      sx={{
                        height: 140,
                        objectFit: 'contain',
                        bgcolor: '#f5f5f5',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Brand: {item.brand}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Color: {item.color}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Size: {item.size}
                        </Typography>
                      </Box>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveFromCart(item._id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="h6" color="primary">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography>Subtotal</Typography>
                <Typography>Rs. {calculateSubtotal().toLocaleString()}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography>Shipping</Typography>
                <Typography>Rs. {SHIPPING_COST}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography>Estimated Tax (18%)</Typography>
                <Typography>Rs. {calculateTax().toLocaleString()}</Typography>
              </Box>
              {discount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#4caf50' }}>Coupon Applied</Typography>
                  <Typography sx={{ color: '#4caf50' }}>-Rs. {discount.toLocaleString()}</Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Add a Promo Code
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  style={{ flex: 1, padding: '8px', borderRadius: 4, border: '1px solid #ccc' }}
                  disabled={couponApplied}
                />
                <Button
                  variant="contained"
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                  sx={{ backgroundColor: '#e0e0e0', color: '#222', '&:hover': { backgroundColor: '#bdbdbd' } }}
                >
                  Apply
                </Button>
              </Box>
              {couponApplied && (
                <Typography sx={{ color: '#4caf50', mt: 1, fontSize: 14 }}>
                  Coupon applied! Rs. {discount} off.
                </Typography>
              )}
              {couponError && (
                <Typography sx={{ color: '#ff5252', mt: 1, fontSize: 14 }}>
                  {couponError}
                </Typography>
              )}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 3,
              }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                Rs. {calculateTotal().toLocaleString()}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
              Taxes are estimated. Final tax will be calculated at checkout.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 