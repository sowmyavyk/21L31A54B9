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
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTc3MDU4LCJpYXQiOjE3MjE5NzY3NTgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE5N2VkOWEyLTFhOTktNDQ3My05NmI5LTAyOTYxYWZkMjRkNyIsInN1YiI6InZ5a3Nvd215YUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6ImE5N2VkOWEyLTFhOTktNDQ3My05NmI5LTAyOTYxYWZkMjRkNyIsImNsaWVudFNlY3JldCI6ImdUVFZJWU1SS3NHSGNmd0siLCJvd25lck5hbWUiOiJWeWFrYXJhbmFtIFNvd215YSIsIm93bmVyRW1haWwiOiJ2eWtzb3dteWFAZ21haWwuY29tIiwicm9sbE5vIjoiMjFMMzFBNTRCOSJ9.7JMSay2W0WBl8IZTAcpvuD4exovzCWgmW_NNQfBljKI'
        },
        timeout: 10000
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