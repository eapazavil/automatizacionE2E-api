const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mock Database
const users = [
  { id: '1', username: 'standard_user', password: 'secret_sauce' }
];

const products = [
  {
    id: 1,
    name: 'Sauce Labs Backpack',
    desc: 'carry.allTheThings() with the sleek, streamlined Sly Pack',
    price: 29.99,
    image_url: '/images/sauce-backpack-1200x1500.jpg'
  },
  {
    id: 2,
    name: 'Sauce Labs Bike Light',
    desc: "A red light isn't the desired state in testing but it sure helps when riding your bike at night",
    price: 9.99,
    image_url: '/images/bike-light-1200x1500.jpg'
  }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({
      token: 'mock-jwt-token',
      user: { id: user.id, username: user.username }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Products endpoint
app.get('/api/products', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.json(products);
});

// Cart endpoint
app.post('/api/cart', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.json({ message: 'Item added to cart' });
});

// Checkout endpoint
app.post('/api/checkout', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.json({
    orderId: '12345',
    status: 'completed'
  });
});

module.exports = { app, port };