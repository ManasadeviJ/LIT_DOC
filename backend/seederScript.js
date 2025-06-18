const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Coupon = require('./models/Coupon');

dotenv.config();

const products = [
  {
    name: 'Regular Fit Cashmere jumper',
    description: 'A luxurious cashmere jumper with a regular fit. Made from 100% pure cashmere, this jumper offers exceptional softness and warmth.',
    price: 3199,
    originalPrice: 7999,
    discount: 60,
    imageUrl: '/images/men.png',
    category: 'Clothing',
    brand: 'H&M',
    rating: 4.5,
    reviews: 120,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Beige', 'Navy'],
    stock: 50,
    features: [
      '100% Pure Cashmere',
      'Regular Fit',
      'Machine washable',
      'Premium quality',
    ],
  },
  {
    name: 'Regular Fit Cashmere jumper (Variant 2)',
    description: 'Another luxurious cashmere jumper with slight variations in color options. Perfect for a sophisticated look.',
    price: 3299,
    originalPrice: 8099,
    discount: 59,
    imageUrl: '/images/men.png',
    category: 'Clothing',
    brand: 'H&M',
    rating: 4.4,
    reviews: 110,
    sizes: ['M', 'L', 'XL'],
    colors: ['Grey', 'White'],
    stock: 45,
    features: [
      'Soft and breathable',
      'Durable stitching',
      'Easy care',
      'Versatile design',
    ],
  },
  {
    name: 'Regular Fit Cashmere jumper (Variant 3)',
    description: 'A third option for the cashmere jumper, offering different sizes and a classic appeal.',
    price: 3099,
    originalPrice: 7899,
    discount: 61,
    imageUrl: '/images/men.png',
    category: 'Clothing',
    brand: 'H&M',
    rating: 4.6,
    reviews: 130,
    sizes: ['S', 'L', 'XL', 'XXL'],
    colors: ['Brown', 'Blue'],
    stock: 55,
    features: [
      'High-quality cashmere blend',
      'Comfortable fit',
      'Fade resistant',
      'All-season wear',
    ],
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    await Coupon.deleteMany();
    await Coupon.create({
      code: 'SAVE10',
      discountType: 'flat',
      discountValue: 100,
      active: true
    });
    console.log('Products seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts(); 