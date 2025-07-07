const express = require('express');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

/**
 * Fetches the real-time gold price in USD per gram using Coingecko's "tether-gold" endpoint.
 * If the request fails or the value is invalid, falls back to a default value.
 */
async function getGoldPrice() {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=tether-gold&vs_currencies=usd'
    );
    const goldPrice = response.data['tether-gold']?.usd;

    console.log("Gold price (USD/g):", goldPrice);

    if (!goldPrice || isNaN(goldPrice)) {
      throw new Error("Invalid gold price");
    }

    return goldPrice;
  } catch (error) {
    console.error('Gold price fetch failed. Using fallback value.', error.message);
    return 75.5; // fallback value
  }
}

/**
 * GET /products
 * Loads products from JSON file, calculates dynamic price and popularity score,
 * and applies optional filters from query parameters: minPrice, maxPrice, minScore.
 */
app.get('/products', async (req, res) => {
  try {
    const rawData = fs.readFileSync('./products.json', 'utf8');
    const products = JSON.parse(rawData);
    const goldPrice = await getGoldPrice();

    // Enrich product data with dynamic price and popularity score (out of 5)
    let enriched = products.map(product => {
      const price = (product.popularityScore + 1) * product.weight * goldPrice;
      const popularityOutOf5 = product.popularityScore * 5;

      console.log(
        `${product.name}: (${product.popularityScore} + 1) * ${product.weight} * ${goldPrice} = ${price}`
      );

      return {
        ...product,
        price: parseFloat(price.toFixed(2)),
        popularityOutOf5: parseFloat(popularityOutOf5.toFixed(1)),
      };
    });

    // Apply filters if query parameters are provided
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    const minScore = parseFloat(req.query.minScore);

    if (!isNaN(minPrice)) {
      enriched = enriched.filter(p => p.price >= minPrice);
    }
    if (!isNaN(maxPrice)) {
      enriched = enriched.filter(p => p.price <= maxPrice);
    }
    if (!isNaN(minScore)) {
      enriched = enriched.filter(p => p.popularityOutOf5 >= minScore);
    }

    res.json(enriched);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
});
