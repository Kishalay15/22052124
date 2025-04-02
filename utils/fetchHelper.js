const axios = require("axios");
const TEST_SERVER_URL = "https://test-social-media-api.com";
async function fetchData(endpoint) {
  try {
    const response = await axios.get(`${TEST_SERVER_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}
module.exports = { fetchData };
