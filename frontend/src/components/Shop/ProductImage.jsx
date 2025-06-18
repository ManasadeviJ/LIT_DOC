import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '100%', // 1:1 Aspect Ratio
  overflow: 'hidden',
  borderRadius: '12px',
  backgroundColor: '#2a2a2a',
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
}));

const ProductImage = ({ src, alt }) => {
  return (
    <ImageContainer>
      <img src={src} alt={alt} />
    </ImageContainer>
  );
};

export default ProductImage; 