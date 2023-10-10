const express = require('express');

const clothingData = require('./data'); // Assuming data.js is in the same directory

 

const app = express();

const PORT = 3000;

 

// Middleware to parse JSON

app.use(express.json());

 

// Get all products

app.get('/api/products', (req, res) => {

  res.json(clothingData);

});

 

// Filter products by name

app.get('/api/products/filterByName/:name', (req, res) => {

  const { name } = req.params;

  const filteredProducts = clothingData.filter(product =>

    product.name.toLowerCase().includes(name.toLowerCase())

  );

  res.json(filteredProducts);

});

 

// Filter products by brand

app.get('/api/products/filterByBrand/:brand', (req, res) => {

  const { brand } = req.params;

  const filteredProducts = clothingData.filter(

    product => product.brand.toLowerCase() === brand.toLowerCase()

  );

  res.json(filteredProducts);

});

 

// Filter products by price (integer) - Exact or Range

app.get('/api/products/filterByPrice/:price', (req, res) => {

    const { price } = req.params;

    const filteredProducts = clothingData.filter(product => {

      const productPrice = parseInt(product.price);

      const filterPrice = parseInt(price);

      return productPrice === filterPrice || (productPrice >= filterPrice - 10 && productPrice <= filterPrice + 10);

    });

    res.json(filteredProducts);

  });

 

  // Filter products by rating (integer) - Exact or Range

  app.get('/api/products/filterByRating/:rating', (req, res) => {

    const { rating } = req.params;

    const filteredProducts = clothingData.filter(product => {

      const productRating = parseInt(product.rating);

      const filterRating = parseInt(rating);

      return productRating === filterRating || (productRating >= filterRating - 1 && productRating <= filterRating + 1);

    });

    res.json(filteredProducts);

  });

 

 

 

// Search products by name

app.get('/api/products/searchByName/:name', (req, res) => {

  const { name } = req.params;

  const foundProduct = clothingData.find(product =>

    product.name.toLowerCase() === name.toLowerCase()

  );

  if (foundProduct) {

    res.json(foundProduct);

  } else {

    res.status(404).json({ message: 'Product not found' });

  }

});

 

// Start the server

app.listen(PORT, () => {

  console.log(`Server is running on http://localhost:${PORT}`);

});