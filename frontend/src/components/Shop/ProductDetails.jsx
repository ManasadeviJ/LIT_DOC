import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  Rating,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist } from '../../redux/reducers/cartReducer';
import { getProduct } from '../../services/api';
import ProductImage from './ProductImage';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';

// Dummy product data (fallback)
const dummyProduct = {
  id: '1',
  name: 'Regular Fit Cashmere jumper',
  brand: 'H&M',
  rating: 4.5,
  reviews: 120,
  price: 3199,
  originalPrice: 7999,
  discount: 60,
  description: 'A luxurious cashmere jumper with a regular fit. Made from 100% pure cashmere, this jumper offers exceptional softness and warmth.',
  colors: ['Black', 'Beige', 'Navy'],
  sizes: ['S', 'M', 'L', 'XL'],
  stock: 50,
  image: '/images/men.png',
  features: [
    '100% Pure Cashmere',
    'Regular Fit',
    'Machine washable',
    'Premium quality',
  ],
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#1E1E1E',
  color: '#FFFFFF',
  border: 'none',
  boxShadow: 'none',
  borderRadius: '12px',
}));

const ColorOption = styled(Box)(({ selected, color }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: color,
  border: selected ? '2px solid #FFFFFF' : '1px solid #555555',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': { opacity: 0.8 },
  transition: 'all 0.2s ease-in-out',
}));

const SizeOption = styled(Button)(({ selected }) => ({
  minWidth: 40,
  height: 40,
  borderRadius: '4px',
  borderColor: selected ? '#9333ea' : '#555555',
  color: selected ? '#FFFFFF' : '#CCCCCC',
  backgroundColor: selected ? '#9333ea' : 'transparent',
  fontFamily: 'Inter, sans-serif',
  fontSize: '1rem',
  fontWeight: 500,
  '&:hover': {
    borderColor: '#9333ea',
    backgroundColor: selected ? '#7c2cb4' : 'rgba(147, 51, 234, 0.1)',
  },
  transition: 'all 0.2s ease-in-out',
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  border: '1px solid rgba(255,255,255,.2)',
  color: '#fff',
  borderRadius: '8px',
  width: 36,
  height: 36,
  '&:hover': {
    background: '#fff3',
    transform: 'translateY(-2px)',
  },
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#9333ea',
  color: '#fff',
  borderRadius: '8px',
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#7c2cb4',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.2s ease-in-out',
  flexGrow: 1,
}));

const BuyNowButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#9333ea',
  border: '1px solid #9333ea',
  borderRadius: '8px',
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.2s ease-in-out',
  flexGrow: 1,
}));

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(dummyProduct); // Initialize with dummy data
  const [selectedColor, setSelectedColor] = useState(dummyProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(dummyProduct.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.cart.wishlist);
  const isWishlisted = product ? wishlist.some(item => item.name === product.name) : false;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await getProduct(id);
        if (data) {
          setProduct(data);
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0]);
          }
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Use dummy data as fallback
        setProduct(dummyProduct);
        setSelectedColor(dummyProduct.colors[0]);
        setSelectedSize(dummyProduct.sizes[0]);
        setSnackbarMessage('Using demo data. Backend connection failed.');
        setSnackbarSeverity('warning');
        setShowSnackbar(true);
      }
    };
    fetchProductData();
  }, [id]);

  const handleQuantityChange = (change) => {
    if (quantity + change > 0 && quantity + change <= product.stock) {
      setQuantity(quantity + change);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setSnackbarMessage('Please select a color and size.');
      setSnackbarSeverity('warning');
      setShowSnackbar(true);
      return;
    }

    const item = {
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    };
    dispatch(addToCart(item));
    setSnackbarMessage('Product added to cart!');
    setSnackbarSeverity('success');
    setShowSnackbar(true);
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      setSnackbarMessage('Please select a color and size before buying.');
      setSnackbarSeverity('warning');
      setShowSnackbar(true);
      return;
    }

    const item = {
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    };

    dispatch(addToCart(item));
    navigate('/checkout');
  };

  const handleWishlistClick = () => {
    dispatch(addToWishlist(product));
    setSnackbarMessage(isWishlisted ? 'Removed from wishlist!' : 'Added to wishlist!');
    setSnackbarSeverity('info');
    setShowSnackbar(true);
  };

  return (
    <Container maxWidth="lg" sx={{ 
      py: 8, 
      backgroundColor: '#121212', 
      minHeight: '100vh',
      color: '#FFFFFF',
    }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={0}>
            <ProductImage src={product.image} alt={product.name} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={0}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: '#AAAAAA',
                mb: 0.5
              }}>
                {product.brand}
              </Typography>
              <Typography variant="h4" component="h1" gutterBottom
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.1} readOnly
                  sx={{ color: '#FFD700' }}
                />
                <Typography variant="body2" sx={{ ml: 1,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  color: '#CCCCCC',
                }}
                >
                  ({product.reviews} reviews)
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              {product.discount > 0 && (
                <Typography variant="body2" sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.25rem',
                  color: '#9333ea',
                  fontWeight: 600,
                  mb: 0.5,
                }}>
                  {product.discount}% OFF
                </Typography>
              )}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <Typography variant="h5" component="p" sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  margin: 0,
                }}>
                  Rs. {product.price.toLocaleString()}
                </Typography>
                {product.originalPrice && (
                  <Typography variant="body1" sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1.2rem',
                    color: '#AAAAAA',
                    textDecoration: 'line-through',
                    margin: 0,
                  }}>
                    Rs. {product.originalPrice.toLocaleString()}
                  </Typography>
                )}
              </Box>
            </Box>

            <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,.1)' }} />

            <Typography variant="body1" paragraph className="product-description"
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: '#fffc',
                lineHeight: 1.6,
              }}
            >
              {product.description}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className="selection-container">
              <Typography variant="h6" sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#FFFFFF',
                margin: 0,
              }}
              >
                Color
              </Typography>
              <Box sx={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }} className="color-options">
                {product.colors.map((color) => (
                  <ColorOption
                    key={color}
                    selected={selectedColor === color}
                    color={color.toLowerCase() === 'gold' ? '#FFD700' : color.toLowerCase() === 'silver' ? '#C0C0C0' : color.toLowerCase() === 'rose gold' ? '#B76E79' : color.toLowerCase()}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </Box>

              <Typography variant="h6" sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#FFFFFF',
                margin: 0,
              }}
              >
                Size
              </Typography>
              <Box sx={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }} className="size-options">
                {product.sizes.map((size) => (
                  <SizeOption
                    key={size}
                    selected={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeOption>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }} className="quantity-selector">
              <Typography variant="h6" sx={{ mr: 1,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#FFFFFF',
              }}>
                Quantity:
              </Typography>
              <QuantityButton
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <RemoveIcon />
              </QuantityButton>
              <Box
                component="input"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                sx={{
                  width: '60px',
                  height: '36px',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,.2)',
                  borderRadius: '8px',
                  background: '#ffffff0d',
                  color: '#fff',
                  fontSize: '1rem',
                  padding: '0 5px',
                  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': { WebkitAppearance: 'none', margin: 0 },
                  MozAppearance: 'textfield',
                }}
                className="quantity-input"
              />
              <QuantityButton
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <AddIcon />
              </QuantityButton>
              <Typography
                variant="body2"
                sx={{ ml: 2,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  color: product.stock > 0 ? '#4CAF50' : '#FF0000',
                }}
              >
                {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }} className="action-buttons">
              <AddToCartButton
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </AddToCartButton>
              <BuyNowButton
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                Buy Now
              </BuyNowButton>
              <IconButton
                sx={{
                  border: '1px solid rgba(255,255,255,.2)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                  flexShrink: 0,
                  background: '#ffffff1a',
                  '&:hover': {
                    background: '#fff3',
                    transform: 'translateY(-2px)',
                  }
                }}
                onClick={handleWishlistClick}
              >
                {isWishlisted ? <FavoriteIcon sx={{ color: '#FF0000' }} /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>

            <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,.1)' }} />

            <Box className="product-details-list">
              <Typography variant="h6" gutterBottom sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 500,
                color: '#FFFFFF',
                mb: '1rem',
              }}>
                Product Features
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {product.features.map((feature, index) => (
                  <Box component="li" key={index} sx={{
                    position: 'relative',
                    paddingLeft: '1.5rem',
                    color: '#fffc',
                    padding: '0.5rem 0',
                    borderBottom: index === product.features.length - 1 ? 'none' : '1px solid rgba(255,255,255,.1)',
                    fontSize: '0.95rem',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: '0.5rem',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#9333ea',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    },
                  }}>
                    {feature}
                  </Box>
                ))}
              </Box>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetails;