const axios = require('axios');
const register = async () => {
  try {
    const registerResponse = await axios.post('http://20.244.56.144/test/register', {
      companyName: 'goMart',
      ownerName: 'Vyakaranam Sowmya',
      rollNo: '21L31A54B9',
      ownerEmail: 'vyksowmya@gmail.com',
      accessCode: 'ZngVRi'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Registration Response:', registerResponse.data);
    const { clientID, clientSecret } = registerResponse.data;
    const authResponse = await axios.post('http://20.244.56.144/test/auth', {
      companyName: 'goMart',
      clientID: clientID,
      clientSecret: clientSecret,
      ownerName: 'Vyakaranam Sowmya',
      ownerEmail: 'vyksowmya@gmail.com',
      rollNo: '21L31A54B9'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Authorization Response:', authResponse.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};
register();