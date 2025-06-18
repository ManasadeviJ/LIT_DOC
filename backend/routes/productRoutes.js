const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Ensure this path is correct
// const { protect, admin } = require('../middleware/authMiddleware'); // Commented out for now

// @desc    GET all products from db
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    GET featured products from db
// @route   GET /api/products/featured
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    res.json(featuredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    GET product by id from db
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Public (for now, removed protect/admin)
router.post('/', async (req, res) => { 
  try {
    const { 
      name, 
      description, 
      price, 
      originalPrice, 
      discount, 
      imageUrl, // Changed from images to imageUrl as per schema
      category, 
      brand, 
      rating, 
      reviews, 
      sizes, 
      colors, 
      stock, // Changed from countInStock to stock
      features,
      featured
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      originalPrice,
      discount,
      imageUrl,
      category,
      brand,
      rating,
      reviews,
      sizes,
      colors,
      stock,
      features,
      featured,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message }); // Changed to 400 for bad request
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public (for now, removed protect/admin)
router.put('/:id', async (req, res) => {
  try {
    const { 
      name, 
      description, 
      price, 
      originalPrice, 
      discount, 
      imageUrl, 
      category, 
      brand, 
      rating, 
      reviews, 
      sizes, 
      colors, 
      stock, 
      features,
      featured
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name !== undefined ? name : product.name;
      product.description = description !== undefined ? description : product.description;
      product.price = price !== undefined ? price : product.price;
      product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
      product.discount = discount !== undefined ? discount : product.discount;
      product.imageUrl = imageUrl !== undefined ? imageUrl : product.imageUrl;
      product.category = category !== undefined ? category : product.category;
      product.brand = brand !== undefined ? brand : product.brand;
      product.rating = rating !== undefined ? rating : product.rating;
      product.reviews = reviews !== undefined ? reviews : product.reviews;
      product.sizes = sizes !== undefined ? sizes : product.sizes;
      product.colors = colors !== undefined ? colors : product.colors;
      product.stock = stock !== undefined ? stock : product.stock;
      product.features = features !== undefined ? features : product.features;
      product.featured = featured !== undefined ? featured : product.featured;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message }); // Changed to 400 for bad request
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public (for now, removed protect/admin)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;