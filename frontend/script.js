// Define your Fixer API access key
const accessKey = '468d0475385bc1203da285742ce6af5f';

// Function to fetch exchange rates from Fixer API
async function fetchExchangeRates(fromCurrency, toCurrency) {
  try {
    const response = await fetch(`http://data.fixer.io/api/latest?access_key=${accessKey}&symbols=${toCurrency}&format=1`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    // Update the UI with the exchange rate data
    const exchangeRateElement = document.getElementById('currentRates');
    const exchangeRate = data.rates[toCurrency];
    exchangeRateElement.innerText = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}\nFetched at: ${new Date(data.timestamp * 1000)}`;
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);
    // Update the UI to display an error message
    const exchangeRateElement = document.getElementById('currentRates');
    exchangeRateElement.innerText = 'Error fetching exchange rates. Please try again later.';
  }
}

document.getElementById('toCurrency').addEventListener('change', function (event) {
  const toCurrency = event.target.value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  fetchExchangeRates(fromCurrency, toCurrency);
});
