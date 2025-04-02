const axios = require("axios");
const TEST_SERVER_URL = "http://20.244.56.144/evaluation-service";
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
