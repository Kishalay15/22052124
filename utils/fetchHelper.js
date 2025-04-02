require("dotenv").config();
const axios = require("axios");
const TEST_SERVER_URL = "http://20.244.56.144/evaluation-service";
const AUTH_TOKEN = process.env.AUTH_TOKEN;

async function fetchData(endpoint) {
  try {
    const response = await axios.get(`${TEST_SERVER_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        Accept: "application/json",
      },
    });
    console.log("Success:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Response from Server:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      });
      return null;
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Request failed:", error.message);
    }
    return null;
  }
}

module.exports = { fetchData };
