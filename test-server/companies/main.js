const axios = require('axios');
const BASE_URL = 'http://20.244.56.144/test/companies';

const fetchProducts = async (companyName, categoryName, top, minPrice, maxPrice) => {
  try {
    const response = await axios.get(`${BASE_URL}/${companyName}/categories/${categoryName}/products`, {
      params: {
        top,
        minPrice,
        maxPrice
      },
      timeout: 5000 
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    return [];
  }
};
const example = async () => {
  const companyName = 'AMZ';
  const categoryName = 'Laptop';
  const top = '10'; 
  const minPrice = 1;
  const maxPrice = 10000;
  const products = await fetchProducts(companyName, categoryName, top, minPrice, maxPrice);
  console.log(products);
};

example();