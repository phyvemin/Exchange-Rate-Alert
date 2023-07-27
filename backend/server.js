const express = require('express');
const app = express();
const port = 3000;

// Dummy exchange rate data
const dummyExchangeRates = {
  USD: {
    EUR: 0.85,
    INR: 74.5,
  },
  EUR: {
    USD: 1.18,
    INR: 88.0,
  },
  INR: {
    USD: 0.013,
    EUR: 0.011,
  },
};
app.use(express.static('frontend'));
// Endpoint to fetch exchange rates
app.get('/api/exchange-rates', (req, res) => {
  try {
    const fromCurrency = req.query.from;
    const toCurrency = req.query.to;

    // Check if dummy data exists for the provided currencies
    if (!dummyExchangeRates[fromCurrency] || !dummyExchangeRates[fromCurrency][toCurrency]) {
      throw new Error('Invalid currency codes.');
    }

    const exchangeRate = dummyExchangeRates[fromCurrency][toCurrency];

    res.json({
      from: fromCurrency,
      to: toCurrency,
      rate: exchangeRate,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a route handler for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Exchange Rate App!'); // Replace with your desired homepage content
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
