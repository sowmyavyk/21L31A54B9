const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 9876;

const WINDOW_SIZE = 10;
const NUMBERS_API = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibo',
  e: 'http://20.244.56.144/test/even',
  r: 'http://20.244.56.144/test/rand'
};
let numbersStore = [];
const calculateAverage = (nums) => {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((acc, num) => acc + num, 0);
  return (sum / nums.length).toFixed(2);
};

const fetchNumbers = async (type) => {
    try {
      const response = await axios.get(NUMBERS_API[type], {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTc1NDg5LCJpYXQiOjE3MjE5NzUxODksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQ5N2ExNzVkLWEzYTYtNDA5MC1hYTU1LTM5Y2Y1ODFmNzlhYyIsInN1YiI6InZ5YWthcmFuYW1zb3dteWEyMTAzQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiNDk3YTE3NWQtYTNhNi00MDkwLWFhNTUtMzljZjU4MWY3OWFjIiwiY2xpZW50U2VjcmV0IjoiTEFhWWNyVXRmWWRjc3NNdCIsIm93bmVyTmFtZSI6IlZ5YWthcmFuYW0gU293bXlhIiwib3duZXJFbWFpbCI6InZ5YWthcmFuYW1zb3dteWEyMTAzQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxTDMxQTU0QjkifQ.OkcwfC1FzZNAw1kgP-FHqGnZ0UkooGylocQXtVhGEaQ'
        },
        timeout: 5000 // Increase timeout to 5 seconds
      });
      return response.data.numbers || [];
    } catch (error) {
      console.error(`Error fetching numbers: ${error.message}`);
      return [];
    }
  };
  
  
app.use(express.json());

app.post('/numbers/:type', async (req, res) => {
    const type = req.params.type;
  
    if (!NUMBERS_API[type]) {
      return res.status(400).json({ error: 'Invalid type' });
    }
  
    try {
      const newNumbers = await fetchNumbers(type);
      if (newNumbers.length === 0) {
        return res.status(500).json({ error: 'Failed to fetch numbers' });
      }
  
      numbersStore = [...new Set([...numbersStore, ...newNumbers])].slice(-WINDOW_SIZE);
  
      const windowPrevState = numbersStore.slice(0, -newNumbers.length);
      const windowCurrState = numbersStore.slice(-WINDOW_SIZE);
      const avg = calculateAverage(windowCurrState);
  
      res.json({
        windowPrevState,
        windowCurrState,
        numbers: newNumbers,
        avg
      });
    } catch (error) {
      console.error(`Error in /numbers/:type endpoint: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});